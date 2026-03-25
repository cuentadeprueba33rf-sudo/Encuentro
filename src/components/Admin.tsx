import { useState } from "react";
import { motion } from "motion/react";
import { ArrowLeft, Unlock, AlertTriangle, Lock } from "lucide-react";
import { decodeZyphra } from "../lib/zyphra";
import { QUESTIONS } from "./Survey";

interface AdminProps {
  onBack: () => void;
}

export function Admin({ onBack }: AdminProps) {
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
          className="flex items-center gap-2 text-zinc-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Volver</span>
        </button>

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
          <div className="flex flex-col items-center justify-center mb-8">
            <div className="w-16 h-16 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mb-4 border border-red-500/20">
              <Lock size={32} />
            </div>
            <h2 className="text-2xl font-bold text-white">Acceso Restringido</h2>
            <p className="text-zinc-500 text-sm mt-2 text-center">Ingresa la contraseña para acceder al decodificador.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Contraseña"
                className="w-full bg-zinc-950 border border-zinc-700 rounded-xl p-4 text-white focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all"
                autoFocus
              />
            </div>
            {authError && (
              <p className="text-red-400 text-sm text-center">{authError}</p>
            )}
            <button
              type="submit"
              className="w-full py-4 px-6 bg-red-600 hover:bg-red-500 text-white rounded-xl font-bold transition-all"
            >
              Desbloquear
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
      className="max-w-3xl w-full mx-auto px-4 py-8"
    >
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-zinc-400 hover:text-white mb-8 transition-colors"
      >
        <ArrowLeft size={20} />
        <span>Volver</span>
      </button>

      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-red-500/10 text-red-500 rounded-xl border border-red-500/20">
          <Unlock size={24} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">Terminal Admin</h2>
          <p className="text-zinc-500 text-sm">Decodificador ZyphraCode v2</p>
        </div>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 mb-8">
        <label className="block text-sm font-medium text-zinc-400 mb-2">
          Ingresa el código Zyphra:
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full h-32 bg-zinc-950 border border-zinc-700 rounded-xl p-4 text-zinc-300 font-mono text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all mb-4 custom-scrollbar"
          placeholder="ZYPH-..."
        />
        
        <button
          onClick={handleDecode}
          disabled={!input}
          className="w-full py-3 px-4 bg-red-600 hover:bg-red-500 disabled:bg-zinc-800 disabled:text-zinc-500 text-white rounded-xl font-bold transition-all flex items-center justify-center gap-2"
        >
          <Unlock size={18} />
          <span>Decodificar</span>
        </button>

        {error && (
          <div className="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-3 text-red-400">
            <AlertTriangle size={20} className="shrink-0 mt-0.5" />
            <p className="text-sm">{error}</p>
          </div>
        )}
      </div>

      {decodedData && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden"
        >
          <div className="bg-zinc-950 px-6 py-4 border-b border-zinc-800 flex justify-between items-center">
            <h3 className="font-bold text-white">Datos Extraídos</h3>
            <span className="text-xs font-mono text-zinc-500 bg-zinc-900 px-2 py-1 rounded">JSON PARSED</span>
          </div>
          
          <div className="p-6">
            <div className="space-y-6">
              {QUESTIONS.map((q) => {
                const answer = decodedData[q.id];
                if (answer === undefined) return null;
                
                return (
                  <div key={q.id}>
                    <p className="text-sm text-zinc-400 mb-2">{q.label}</p>
                    <div className="bg-zinc-950 p-3 rounded-lg border border-zinc-800 text-zinc-200">
                      {answer}
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="mt-8 pt-6 border-t border-zinc-800">
              <p className="text-xs text-zinc-500 mb-2 font-mono">RAW JSON:</p>
              <pre className="text-xs text-zinc-400 bg-zinc-950 p-4 rounded-lg overflow-x-auto custom-scrollbar border border-zinc-800">
                {JSON.stringify(decodedData, null, 2)}
              </pre>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
