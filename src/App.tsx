import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import About from "./pages/About";
import Pricing from "./pages/Pricing";
import Checkout from "./pages/Checkout";
import Support from "./pages/Support";
import Dashboard from "./pages/Dashboard";
import Affiliates from "./pages/dashboard/Affiliates";
import Ranking from "./pages/dashboard/Ranking";
import Gamification from "./pages/dashboard/Gamification";
import Calendar from "./pages/dashboard/Calendar";
import Missions from "./pages/dashboard/Missions";
import Achievements from "./pages/dashboard/Achievements";
import Settings from "./pages/dashboard/Settings";
import Dashboard2 from "./pages/Dashboard2";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/about" element={<About />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/support" element={<Support />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/affiliates" element={<Affiliates />} />
          <Route path="/dashboard/ranking" element={<Ranking />} />
          <Route path="/dashboard/gamification" element={<Gamification />} />
          <Route path="/dashboard/calendar" element={<Calendar />} />
          <Route path="/dashboard/missions" element={<Missions />} />
          <Route path="/dashboard/achievements" element={<Achievements />} />
          <Route path="/dashboard/settings" element={<Settings />} />
          <Route path="/dashboard2" element={<Dashboard2 />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
