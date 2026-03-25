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
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-3xl w-full mx-auto px-4 py-12 flex flex-col items-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", bounce: 0.5 }}
        className="w-24 h-24 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mb-8 border border-green-500/30"
      >
        <Check size={40} />
      </motion.div>

      <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center">
        ¡Análisis Completado!
      </h2>
      
      <p className="text-zinc-400 text-center mb-12 max-w-lg">
        Tus respuestas han sido procesadas y encriptadas en ZyphraCode v2. 
        Nadie podrá leer tus secretos sin el decodificador.
      </p>

      <div className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl p-6 mb-8 relative group">
        <div className="absolute -top-3 left-6 bg-zinc-950 px-2 text-xs font-mono text-indigo-400 uppercase tracking-widest">
          ZyphraCode v2 Output
        </div>
        
        <p className="font-mono text-zinc-300 break-all text-sm leading-relaxed max-h-64 overflow-y-auto custom-scrollbar">
          {zyphraCode}
        </p>

        <button
          onClick={handleCopy}
          className="absolute top-4 right-4 p-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-lg transition-colors flex items-center gap-2 border border-zinc-700"
        >
          {copied ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
          <span className="text-xs font-medium">{copied ? "Copiado" : "Copiar"}</span>
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
        <button
          onClick={handleWhatsApp}
          className="flex-1 flex items-center justify-center gap-2 py-4 px-6 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-xl font-bold transition-all shadow-lg shadow-green-900/20"
        >
          <Send size={20} />
          <span>Enviar por WhatsApp</span>
        </button>
        
        <button
          onClick={onRestart}
          className="flex items-center justify-center gap-2 py-4 px-6 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl font-bold transition-all"
        >
          <RotateCcw size={20} />
          <span>Repetir</span>
        </button>
      </div>
    </motion.div>
  );
}
