import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, Unlock, AlertTriangle, Lock } from "lucide-react";
import { decodeZyphra } from "../lib/zyphra";
import { QUESTIONS } from "./Survey";

interface AdminProps {
  onBack: () => void;
}

export const Admin: React.FC<AdminProps> = ({ onBack }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  
  const [input, setInput] = useState("");
  const [decodedData, setDecodedData] = useState<any>(null);
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "Samc12344") {
      setIsAuthenticated(true);
      setAuthError("");
    } else {
      setAuthError("Contraseña incorrecta");
    }
  };

  const handleDecode = () => {
    try {
      setError("");
      const data = decodeZyphra(input.trim());
      setDecodedData(data);
    } catch (err: any) {
      setError(err.message || "Error al decodificar. Verifica el formato.");
      setDecodedData(null);
    }
  };

  if (!isAuthenticated) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="max-w-md w-full mx-auto px-4 py-8"
      >
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-zinc-500 hover:text-white mb-12 transition-colors group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-xs font-bold uppercase tracking-widest">Volver</span>
        </button>

        <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-6 md:p-10 backdrop-blur-xl">
          <div className="flex flex-col items-center justify-center mb-10">
            <div className="w-20 h-20 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mb-6 border border-red-500/20">
              <Lock size={32} />
            </div>
            <h2 className="text-2xl font-display font-bold text-white">Acceso Restringido</h2>
            <p className="text-zinc-500 text-xs mt-3 text-center font-medium uppercase tracking-widest">Security Protocol Required</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest ml-1">Master Key</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-black/40 border border-zinc-800 rounded-2xl p-4 text-white text-center tracking-[0.5em] focus:outline-none focus:border-red-500/50 transition-all"
                autoFocus
              />
            </div>
            {authError && (
              <p className="text-red-500 text-[10px] font-bold text-center uppercase tracking-widest animate-pulse">{authError}</p>
            )}
            <button
              type="submit"
              className="w-full py-4 px-6 bg-red-600 hover:bg-red-500 text-white rounded-2xl font-bold text-sm uppercase tracking-[0.2em] transition-all shadow-lg shadow-red-900/20"
            >
              Autenticar
            </button>
          </form>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-5xl w-full mx-auto px-4 md:px-6 py-6 md:py-8"
    >
      <div className="flex justify-between items-center mb-12">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-xs font-bold uppercase tracking-widest">Cerrar Sesión</span>
        </button>
        
        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-white text-xs font-bold uppercase tracking-widest">Admin Terminal</div>
            <div className="text-green-500 text-[10px] font-bold uppercase tracking-widest">System Online</div>
          </div>
          <div className="w-10 h-10 bg-zinc-900 rounded-full border border-zinc-800 flex items-center justify-center text-zinc-400">
            <Unlock size={18} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-6 md:gap-8 items-start w-full">
        <div className="space-y-6 min-w-0">
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl md:rounded-3xl p-4 md:p-8 backdrop-blur-xl">
            <h3 className="text-white text-sm font-bold uppercase tracking-widest mb-6 flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
              Entrada de Datos
            </h3>
            
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full h-48 bg-black/40 border border-zinc-800 rounded-2xl p-5 text-zinc-400 font-mono text-xs focus:outline-none focus:border-indigo-500/50 transition-all mb-6 custom-scrollbar leading-relaxed"
              placeholder="Pegue el código ZYPH-..."
            />
            
            <button
              onClick={handleDecode}
              disabled={!input}
              className="w-full py-4 px-4 bg-white text-black hover:bg-zinc-200 disabled:bg-zinc-900 disabled:text-zinc-700 rounded-2xl font-bold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2"
            >
              <Unlock size={14} />
              <span>Ejecutar Decodificación</span>
            </button>

            {error && (
              <div className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-start gap-3 text-red-500">
                <AlertTriangle size={16} className="shrink-0 mt-0.5" />
                <p className="text-[10px] font-bold uppercase tracking-widest leading-relaxed">{error}</p>
              </div>
            )}
          </div>
        </div>

        <div className="min-h-[400px] md:min-h-[600px] min-w-0">
          <AnimatePresence mode="wait">
            {decodedData ? (
              <motion.div 
                key="results"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-zinc-900/50 border border-zinc-800 rounded-3xl overflow-hidden backdrop-blur-xl"
              >
                <div className="bg-black/40 px-5 md:px-8 py-4 md:py-5 border-b border-zinc-800 flex justify-between items-center">
                  <h3 className="font-bold text-white text-[10px] md:text-xs uppercase tracking-widest">Resultados del Análisis</h3>
                  <div className="flex gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-500/50" />
                    <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
                    <div className="w-2 h-2 rounded-full bg-green-500/50" />
                  </div>
                </div>
                
                <div className="p-4 md:p-8 space-y-6 md:space-y-8 max-h-[500px] md:max-h-[600px] overflow-y-auto custom-scrollbar">
                  {QUESTIONS.map((q) => {
                    const answer = decodedData[q.id];
                    if (answer === undefined) return null;
                    
                    return (
                      <div key={q.id} className="group">
                        <p className="text-[9px] md:text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-2 md:mb-3 group-hover:text-indigo-400 transition-colors">
                          {q.label}
                        </p>
                        <div className="bg-black/30 p-3 md:p-4 rounded-xl md:rounded-2xl border border-zinc-800/50 text-zinc-300 text-xs md:text-sm leading-relaxed break-words">
                          {answer}
                        </div>
                      </div>
                    );
                  })}
                  
                  <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-zinc-800/50">
                    <p className="text-[9px] md:text-[10px] text-zinc-600 font-bold uppercase tracking-widest mb-3 md:mb-4">Raw System Data</p>
                    <pre className="text-[9px] md:text-[10px] text-zinc-500 bg-black/50 p-4 md:p-6 rounded-xl md:rounded-2xl overflow-x-auto whitespace-pre-wrap break-all custom-scrollbar border border-zinc-800/50 font-mono leading-relaxed max-w-full">
                      {JSON.stringify(decodedData, null, 2)}
                    </pre>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-12 bg-zinc-900/20 border border-zinc-800/50 border-dashed rounded-3xl">
                <div className="w-16 h-16 bg-zinc-900 rounded-full flex items-center justify-center text-zinc-700 mb-6">
                  <Unlock size={32} />
                </div>
                <h3 className="text-zinc-500 font-display font-bold text-lg mb-2">Esperando Datos</h3>
                <p className="text-zinc-700 text-sm max-w-xs">Ingrese un código Zyphra válido para iniciar el proceso de extracción de datos.</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
