import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Copy, Check, Send, RotateCcw } from "lucide-react";

interface ResultProps {
  zyphraCode: string;
  onRestart: () => void;
}

export function Result({ zyphraCode, onRestart }: ResultProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    localStorage.setItem("lastZyphraCode", zyphraCode);
  }, [zyphraCode]);

  const handleCopy = async () => {
    const fallbackCopy = () => {
      const textArea = document.createElement("textarea");
      textArea.value = zyphraCode;
      textArea.style.position = "absolute";
      textArea.style.left = "-999999px";
      document.body.prepend(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (error) {
        console.error("Fallback copy failed", error);
      } finally {
        textArea.remove();
      }
    };

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(zyphraCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } else {
        fallbackCopy();
      }
    } catch (err) {
      console.error("Failed to copy with navigator.clipboard", err);
      fallbackCopy();
    }
  };

  const handleWhatsApp = () => {
    const text = `Descifra esto si puedes 😈\n\n${zyphraCode}`;
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl w-full mx-auto px-6 py-12 flex flex-col items-center"
    >
      <div className="w-full flex flex-col md:flex-row gap-12 items-start">
        <div className="flex-1 space-y-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-[10px] font-bold tracking-widest uppercase mb-4 border border-green-500/20">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              Procesamiento Exitoso
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6 leading-tight">
              Informe de <span className="text-indigo-400">Codificación</span>
            </h2>
            <p className="text-zinc-400 text-lg leading-relaxed">
              Tus respuestas han sido transformadas en un hash de alta seguridad mediante el protocolo Zyphra v2.0. 
              Este código es el único registro existente de tu evaluación.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-zinc-900/50 border border-zinc-800">
              <div className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest mb-1">Algoritmo</div>
              <div className="text-white font-mono text-sm">Zyphra-B64-V2</div>
            </div>
            <div className="p-4 rounded-2xl bg-zinc-900/50 border border-zinc-800">
              <div className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest mb-1">Integridad</div>
              <div className="text-white font-mono text-sm">100% Verificada</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              onClick={handleWhatsApp}
              className="flex-1 flex items-center justify-center gap-3 py-4 px-6 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full font-bold transition-all shadow-lg shadow-indigo-900/20"
            >
              <Send size={18} />
              <span className="text-sm uppercase tracking-widest">Enviar WhatsApp</span>
            </button>
            
            <button
              onClick={onRestart}
              className="flex items-center justify-center gap-3 py-4 px-8 bg-zinc-900 border border-zinc-800 text-white hover:bg-zinc-800 rounded-full font-bold transition-all"
            >
              <RotateCcw size={18} />
              <span className="text-sm uppercase tracking-widest">Reiniciar</span>
            </button>
          </div>
        </div>

        <div className="w-full md:w-[400px] shrink-0">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Lock size={120} />
            </div>
            
            <div className="relative z-10">
              <div className="flex justify-between items-center mb-6">
                <div className="text-xs font-mono text-indigo-400 font-bold tracking-widest uppercase">
                  ZyphraCode Output
                </div>
                <button
                  onClick={handleCopy}
                  className="p-2 text-zinc-500 hover:text-white transition-colors"
                  title="Copiar código"
                >
                  {copied ? <Check size={18} className="text-green-400" /> : <Copy size={18} />}
                </button>
              </div>

              <div className="bg-black/40 rounded-2xl p-5 border border-zinc-800/50">
                <p className="font-mono text-zinc-400 break-all text-[11px] leading-relaxed max-h-[300px] overflow-y-auto custom-scrollbar pr-2">
                  {zyphraCode}
                </p>
              </div>

              <div className="mt-6 pt-6 border-t border-zinc-800/50 flex items-center justify-between">
                <div className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest">
                  Status: Encrypted
                </div>
                <div className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest">
                  v2.0.4
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
