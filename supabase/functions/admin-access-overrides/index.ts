import { corsHeaders } from "../_shared/cors.ts";
import { supabaseAdmin } from "../_shared/supabaseClient.ts";

type OverridesPayload = {
  allowedPagesAdd: string[];
  allowedPagesRemove: string[];
};

type RequestBodyGetUserContext = {
  action: "get_user_context";
  userId: string;
};

type RequestBodySetUserOverrides = {
  action: "set_user_overrides";
  userId: string;
  overrides: Partial<OverridesPayload>;
};

type RequestBodySetTeamOverrides = {
  action: "set_team_overrides";
  teamId: string;
  overrides: Partial<OverridesPayload>;
};

type RequestBody = RequestBodyGetUserContext | RequestBodySetUserOverrides | RequestBodySetTeamOverrides;

async function requireAdminUser(req: Request) {
  const authHeader = req.headers.get("Authorization") ?? "";
  const token = authHeader.replace("Bearer ", "");

  if (!token) {
    return { error: "missing_auth", userId: null as string | null };
  }

  const { data, error } = await supabaseAdmin.auth.getUser(token);

  if (error || !data?.user) {
    return { error: "invalid_auth", userId: null as string | null };
  }

  const userId = data.user.id;

  const { data: profile } = await supabaseAdmin.from("profiles").select("role").eq("id", userId).maybeSingle();

  if (!profile || profile.role !== "admin") {
    return { error: "forbidden", userId: null as string | null };
  }

  return { error: null as string | null, userId };
}

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      ...corsHeaders,
      "Content-Type": "application/json"
    }
  });
}

function normalizePaths(raw: unknown): string[] {
  const arr = Array.isArray(raw) ? raw : [];
  const out: string[] = [];
  const seen = new Set<string>();
  for (const item of arr) {
    if (typeof item !== "string") continue;
    const p = item.trim();
    if (!p) continue;
    if (seen.has(p)) continue;
    seen.add(p);
    out.push(p);
  }
  out.sort();
  return out;
}

function validateDashboardPaths(paths: string[]) {
  for (const p of paths) {
    if (!p.startsWith("/dashboard")) {
      return { ok: false as const, error: "invalid_dashboard_path", details: p };
    }
  }
  return { ok: true as const };
}

function validateNoOverlap(add: string[], remove: string[]) {
  const set = new Set(add);
  for (const p of remove) {
    if (set.has(p)) return { ok: false as const, error: "allowed_pages_add_remove_overlap" };
  }
  return { ok: true as const };
}

async function getUserContext(userId: string) {
  const { data: profile, error: profileError } = await supabaseAdmin
    .from("profiles")
    .select("id, allowed_pages_add, allowed_pages_remove")
    .eq("id", userId)
    .maybeSingle();

  if (profileError) return jsonResponse({ error: "profile_fetch_failed" }, 500);
  if (!profile) return jsonResponse({ error: "user_not_found" }, 404);

  const { data: memberships, error: membershipsError } = await supabaseAdmin
    .from("team_members")
    .select("team_id")
    .eq("user_id", userId);

  if (membershipsError) return jsonResponse({ error: "team_membership_fetch_failed" }, 500);

  const teamIds = Array.isArray(memberships) ? memberships.map((m: any) => m.team_id).filter((id: any) => !!id) : [];

  let teamOverrides: any[] = [];
  if (teamIds.length > 0) {
    const { data: t, error: tError } = await supabaseAdmin
      .from("team_access_overrides")
      .select("team_id, allowed_pages_add, allowed_pages_remove")
      .in("team_id", teamIds);
    if (tError) return jsonResponse({ error: "team_overrides_fetch_failed" }, 500);
    teamOverrides = Array.isArray(t) ? t : [];
  }

  return jsonResponse({
    profile,
    teamIds,
    teamOverrides
  });
}

async function setUserOverrides(adminId: string, userId: string, overrides: Partial<OverridesPayload>) {
  const { data: before } = await supabaseAdmin
    .from("profiles")
    .select("id, allowed_pages_add, allowed_pages_remove")
    .eq("id", userId)
    .maybeSingle();

  if (!before) return jsonResponse({ error: "user_not_found" }, 404);

  const allowedPagesAdd = normalizePaths(overrides.allowedPagesAdd ?? before.allowed_pages_add ?? []);
  const allowedPagesRemove = normalizePaths(overrides.allowedPagesRemove ?? before.allowed_pages_remove ?? []);

  const addCheck = validateDashboardPaths(allowedPagesAdd);
  if (!addCheck.ok) return jsonResponse({ error: addCheck.error, details: addCheck.details }, 400);

  const removeCheck = validateDashboardPaths(allowedPagesRemove);
  if (!removeCheck.ok) return jsonResponse({ error: removeCheck.error, details: removeCheck.details }, 400);

  const overlap = validateNoOverlap(allowedPagesAdd, allowedPagesRemove);
  if (!overlap.ok) return jsonResponse({ error: overlap.error }, 400);

  const { data: updated, error: updateError } = await supabaseAdmin
    .from("profiles")
    .update({
      allowed_pages_add: allowedPagesAdd,
      allowed_pages_remove: allowedPagesRemove,
      updated_at: new Date().toISOString()
    })
    .eq("id", userId)
    .select("id, allowed_pages_add, allowed_pages_remove")
    .maybeSingle();

  if (updateError) return jsonResponse({ error: "profile_update_failed" }, 500);

  try {
    await supabaseAdmin.rpc("insert_audit_log", {
      actor_id: adminId,
      entity_table: "profiles",
      entity_id: String(userId),
      action: "admin_access_overrides_set_user",
      old_data: {
        allowed_pages_add: (before as any).allowed_pages_add ?? [],
        allowed_pages_remove: (before as any).allowed_pages_remove ?? []
      },
      new_data: {
        allowed_pages_add: allowedPagesAdd,
        allowed_pages_remove: allowedPagesRemove
      }
    });
  } catch {
  }

  try {
    await supabaseAdmin.from("activities").insert({
      user_id: userId,
      type: "admin_access_overrides_updated",
      points: 0,
      metadata: {
        allowed_pages_add: allowedPagesAdd,
        allowed_pages_remove: allowedPagesRemove
      }
    });
  } catch {
  }

  return jsonResponse({ profile: updated });
}

async function setTeamOverrides(adminId: string, teamId: string, overrides: Partial<OverridesPayload>) {
  const { data: team, error: teamError } = await supabaseAdmin.from("teams").select("id").eq("id", teamId).maybeSingle();
  if (teamError) return jsonResponse({ error: "team_fetch_failed" }, 500);
  if (!team) return jsonResponse({ error: "team_not_found" }, 404);

  const { data: before } = await supabaseAdmin
    .from("team_access_overrides")
    .select("team_id, allowed_pages_add, allowed_pages_remove")
    .eq("team_id", teamId)
    .maybeSingle();

  const allowedPagesAdd = normalizePaths(overrides.allowedPagesAdd ?? (before as any)?.allowed_pages_add ?? []);
  const allowedPagesRemove = normalizePaths(overrides.allowedPagesRemove ?? (before as any)?.allowed_pages_remove ?? []);

  const addCheck = validateDashboardPaths(allowedPagesAdd);
  if (!addCheck.ok) return jsonResponse({ error: addCheck.error, details: addCheck.details }, 400);

  const removeCheck = validateDashboardPaths(allowedPagesRemove);
  if (!removeCheck.ok) return jsonResponse({ error: removeCheck.error, details: removeCheck.details }, 400);

  const overlap = validateNoOverlap(allowedPagesAdd, allowedPagesRemove);
  if (!overlap.ok) return jsonResponse({ error: overlap.error }, 400);

  const payload = {
    team_id: teamId,
    allowed_pages_add: allowedPagesAdd,
    allowed_pages_remove: allowedPagesRemove,
    updated_at: new Date().toISOString()
  };

  const { data: updated, error: upsertError } = await supabaseAdmin
    .from("team_access_overrides")
    .upsert(payload, { onConflict: "team_id" })
    .select("team_id, allowed_pages_add, allowed_pages_remove")
    .maybeSingle();

  if (upsertError) return jsonResponse({ error: "team_overrides_upsert_failed" }, 500);

  try {
    await supabaseAdmin.rpc("insert_audit_log", {
      actor_id: adminId,
      entity_table: "team_access_overrides",
      entity_id: String(teamId),
      action: "admin_access_overrides_set_team",
      old_data: {
        allowed_pages_add: (before as any)?.allowed_pages_add ?? [],
        allowed_pages_remove: (before as any)?.allowed_pages_remove ?? []
      },
      new_data: {
        allowed_pages_add: allowedPagesAdd,
        allowed_pages_remove: allowedPagesRemove
      }
    });
  } catch {
  }

  return jsonResponse({ teamOverrides: updated });
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const { error, userId: adminId } = await requireAdminUser(req);

  if (error === "missing_auth") return jsonResponse({ error: "missing_auth" }, 401);
  if (error === "invalid_auth") return jsonResponse({ error: "invalid_auth" }, 401);
  if (error === "forbidden") return jsonResponse({ error: "forbidden" }, 403);

  const { data: rateOk, error: rateError } = await supabaseAdmin.rpc("check_rate_limit", {
    rate_key: `admin-access-overrides:${adminId}`,
    window_seconds: 60,
    max_requests: 60
  });

  if (rateError) return jsonResponse({ error: "rate_limit_unavailable" }, 500);
  if (rateOk === false) return jsonResponse({ error: "rate_limited" }, 429);

  try {
    const body = (await req.json()) as RequestBody;

    if (body.action === "get_user_context") {
      return await getUserContext(body.userId);
    }

    if (body.action === "set_user_overrides") {
      return await setUserOverrides(adminId as string, body.userId, body.overrides);
    }

    if (body.action === "set_team_overrides") {
      return await setTeamOverrides(adminId as string, body.teamId, body.overrides);
    }

    return jsonResponse({ error: "invalid_action" }, 400);
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    return jsonResponse({ error: message }, 500);
  }
});

