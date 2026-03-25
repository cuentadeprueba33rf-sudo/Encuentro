import { motion } from "motion/react";
import { Lock } from "lucide-react";

interface IntroProps {
  onStart: () => void;
  onAdmin: () => void;
}

export function Intro({ onStart, onAdmin }: IntroProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4 relative"
    >
      <div className="max-w-md w-full bg-zinc-900/50 p-8 rounded-3xl border border-zinc-800 backdrop-blur-sm shadow-2xl">
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="text-6xl mb-6"
        >
          🤫
        </motion.div>
        
        <h1 className="text-3xl font-bold text-white mb-4 tracking-tight">
          Test de Honestidad Brutal
        </h1>
        
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 mb-8">
          <p className="text-red-400 font-medium flex items-center justify-center gap-2">
            <span>⚠️</span> Esta encuesta NO es seria.
          </p>
          <p className="text-zinc-400 text-sm mt-2">
            Tus respuestas serán codificadas usando el protocolo de alta seguridad ZyphraCode v2.
          </p>
        </div>

        <button
          onClick={onStart}
          className="w-full py-4 px-6 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-lg transition-all transform hover:scale-[1.02] active:scale-95 shadow-[0_0_20px_rgba(79,70,229,0.3)]"
        >
          Continuar
        </button>
      </div>

      <button 
        onClick={onAdmin}
        className="absolute bottom-4 right-4 p-3 text-zinc-700 hover:text-zinc-500 transition-colors"
        title="Modo Admin"
      >
        <Lock size={20} />
      </button>
    </motion.div>
  );
}
