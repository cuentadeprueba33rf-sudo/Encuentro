import React from "react";
import { motion } from "motion/react";
import { Lock } from "lucide-react";

interface IntroProps {
  onStart: () => void;
  onAdmin: () => void;
}

export const Intro: React.FC<IntroProps> = ({ onStart, onAdmin }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4 relative max-w-5xl w-full"
    >
      <div className="flex flex-col items-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-6 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold tracking-widest uppercase"
        >
          Protocolo ZyphraCode v2.0
        </motion.div>

        <h1 className="text-3xl md:text-7xl font-display font-bold text-white mb-6 tracking-tight leading-[1.1]">
          Test de <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-blue-500">Honestidad Brutal</span>
        </h1>
        
        <p className="text-zinc-400 text-base md:text-xl max-w-2xl mb-12 leading-relaxed">
          Un sistema de evaluación personal de alta fidelidad. 
          Tus respuestas serán procesadas mediante algoritmos de encriptación irreversible.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
          <button
            onClick={onStart}
            className="flex-1 py-4 px-8 bg-white text-black hover:bg-zinc-200 rounded-full font-bold text-lg transition-all transform hover:scale-[1.02] active:scale-98 shadow-xl"
          >
            Iniciar Evaluación
          </button>
          <button
            onClick={() => window.open('https://github.com', '_blank')}
            className="flex-1 py-4 px-8 bg-zinc-900 border border-zinc-800 text-white hover:bg-zinc-800 rounded-full font-bold text-lg transition-all"
          >
            Documentación
          </button>
        </div>

        <div className="mt-16 flex items-center gap-8 text-zinc-600 grayscale opacity-50">
          <div className="font-display font-bold text-xl">TRUSTED</div>
          <div className="font-display font-bold text-xl">SECURE</div>
          <div className="font-display font-bold text-xl">ENCRYPTED</div>
        </div>
      </div>

      <div className="bg-red-500/5 border border-red-500/10 rounded-2xl p-4 mt-12 max-w-md">
        <p className="text-red-400/80 text-xs font-medium flex items-center justify-center gap-2 uppercase tracking-tighter">
          <span>⚠️</span> Aviso: El contenido de esta evaluación es de carácter experimental y no vinculante.
        </p>
      </div>

      <button 
        onClick={onAdmin}
        className="absolute bottom-[-40px] right-4 p-3 text-zinc-800 hover:text-zinc-600 transition-colors"
        title="Modo Admin"
      >
        <Lock size={16} />
      </button>
    </motion.div>
  );
}
