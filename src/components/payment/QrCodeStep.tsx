import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy, Check, QrCode, Loader2 } from "lucide-react";

interface QrCodeStepProps {
  qrCode: string;
  qrCodeBase64: string;
  quantity: number;
  total: string;
  onCancel: () => void;
}

export default function QrCodeStep({ qrCode, qrCodeBase64, quantity, total, onCancel }: QrCodeStepProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(qrCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      // fallback
      const textarea = document.createElement("textarea");
      textarea.value = qrCode;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  return (
    <div className="rounded-xl border border-border bg-card p-6 space-y-6 shadow-2xl animate-fade-in">
      {/* Header */}
      <div className="text-center space-y-1">
        <div className="flex items-center justify-center gap-2">
          <QrCode className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold text-foreground">Escaneie o QR Code</h2>
        </div>
        <p className="text-sm text-muted-foreground">
          {quantity} crédito{quantity > 1 ? "s" : ""} • <span className="font-mono font-semibold">R$ {total}</span>
        </p>
      </div>

      {/* QR Code */}
      <div className="flex justify-center">
        <div className="rounded-xl bg-white p-4 shadow-inner">
          {qrCodeBase64 ? (
            <img
              src={`data:image/png;base64,${qrCodeBase64}`}
              alt="QR Code PIX"
              className="w-56 h-56"
            />
          ) : (
            <div className="w-56 h-56 flex items-center justify-center">
              <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
            </div>
          )}
        </div>
      </div>

      {/* Copy code */}
      <div className="space-y-2">
        <p className="text-xs text-muted-foreground text-center">Ou copie o código PIX:</p>
        <Button
          onClick={handleCopy}
          variant="outline"
          className="w-full font-mono text-xs gap-2"
        >
          {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
          {copied ? "Código copiado!" : "Copiar código de pagamento"}
        </Button>
      </div>

      {/* Status */}
      <div className="flex items-center justify-center gap-2 rounded-lg bg-muted/50 border border-border p-3">
        <Loader2 className="w-4 h-4 animate-spin text-primary" />
        <span className="text-sm text-muted-foreground">Aguardando pagamento...</span>
      </div>

      {/* Cancel */}
      <button
        onClick={onCancel}
        className="w-full text-sm text-muted-foreground hover:text-foreground transition-colors text-center"
      >
        Cancelar
      </button>
    </div>
  );
}
