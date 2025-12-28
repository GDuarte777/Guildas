import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  MessageCircle, 
  Copy, 
  ExternalLink, 
  Smartphone, 
  Send,
  CheckCircle2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "sonner";
import { GlassCard } from "@/components/GlassCard";
import { DashboardLayout } from "@/components/DashboardLayout";

export default function WhatsAppGenerator() {
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [generatedLink, setGeneratedLink] = useState("");

  // Clean phone number (remove non-digits)
  const cleanPhone = (number: string) => {
    return number.replace(/\D/g, "");
  };

  // Format phone for display (simple mask)
  const formatPhoneDisplay = (val: string) => {
    // Basic logic to keep input clean, real masking can be complex
    return val;
  };

  useEffect(() => {
    const cleaned = cleanPhone(phone);
    if (!cleaned) {
      setGeneratedLink("");
      return;
    }

    // Encode message
    const encodedMessage = encodeURIComponent(message);
    const link = `https://wa.me/${cleaned}${message ? `?text=${encodedMessage}` : ""}`;
    setGeneratedLink(link);
  }, [phone, message]);

  const copyToClipboard = () => {
    if (!generatedLink) return;
    navigator.clipboard.writeText(generatedLink);
    toast.success("Link copiado com sucesso!");
  };

  const openLink = () => {
    if (!generatedLink) return;
    window.open(generatedLink, "_blank");
  };

  return (
    <DashboardLayout>
      <div className="space-y-8 p-6 pb-24">
        <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white flex items-center gap-3">
            <div className="p-2 rounded-lg bg-green-500/10 border border-green-500/20">
              <MessageCircle className="w-6 h-6 text-green-500" />
            </div>
            Gerador de Link WhatsApp
          </h1>
          <p className="text-muted-foreground mt-2">
            Crie links diretos para o seu WhatsApp com mensagens personalizadas.
          </p>
        </div>
      </header>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Form Section */}
        <div className="space-y-6">
          <GlassCard className="p-6 border-green-500/20">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-200 flex items-center gap-2">
                  <Smartphone className="w-4 h-4" />
                  Número do WhatsApp
                </label>
                <Input
                  placeholder="Ex: 5511999999999 (DDD + Número)"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="bg-white/50 dark:bg-black/20 border-gray-200 dark:border-white/10 focus:border-green-500 transition-all font-mono"
                />
                <p className="text-xs text-muted-foreground">
                  Insira o código do país (ex: 55 para Brasil) seguido do DDD e número.
                </p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-200 flex items-center gap-2">
                  <Send className="w-4 h-4" />
                  Mensagem Pré-definida (Opcional)
                </label>
                <Textarea
                  placeholder="Ex: Olá! Vim pelo Instagram e gostaria de mais informações."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="bg-white/50 dark:bg-black/20 border-gray-200 dark:border-white/10 focus:border-green-500 transition-all min-h-[120px] resize-none"
                />
                <p className="text-xs text-muted-foreground">
                  Essa mensagem aparecerá automaticamente no campo de texto do seu cliente.
                </p>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Preview & Action Section */}
        <div className="space-y-6">
          <Card className="border-green-500/20 bg-gradient-to-br from-green-500/5 to-transparent overflow-hidden relative">
            <div className="absolute top-0 right-0 p-32 bg-green-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                Seu Link Gerado
              </CardTitle>
              <CardDescription>
                Copie e use na sua Bio, Stories ou anúncios.
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="p-4 rounded-lg bg-black/5 dark:bg-black/40 border border-gray-200 dark:border-white/10 font-mono text-sm break-all min-h-[60px] flex items-center text-gray-600 dark:text-gray-300">
                {generatedLink || "Preencha o número para gerar o link..."}
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button 
                  onClick={copyToClipboard} 
                  disabled={!generatedLink}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-500/20"
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copiar Link
                </Button>
                
                <Button 
                  onClick={openLink} 
                  disabled={!generatedLink}
                  variant="outline"
                  className="flex-1 border-green-500/30 hover:bg-green-500/10 text-green-600 dark:text-green-400"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Testar Link
                </Button>
              </div>

              {/* Preview Mockup */}
              {message && (
                <div className="mt-8 pt-6 border-t border-gray-200 dark:border-white/10">
                  <p className="text-sm font-medium mb-3 text-muted-foreground">Pré-visualização no WhatsApp:</p>
                  <div className="bg-[#E5DDD5] dark:bg-[#0b141a] p-4 rounded-lg max-w-sm mx-auto shadow-inner">
                    <div className="bg-[#DCF8C6] dark:bg-[#005c4b] p-3 rounded-lg rounded-tr-none shadow-sm inline-block max-w-full">
                      <p className="text-sm text-gray-800 dark:text-gray-100 whitespace-pre-wrap leading-relaxed">
                        {message}
                      </p>
                      <div className="text-[10px] text-gray-500 dark:text-gray-400 text-right mt-1">
                        12:00
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
  </div>
      </div>
      </div>
    </DashboardLayout>
  );
}