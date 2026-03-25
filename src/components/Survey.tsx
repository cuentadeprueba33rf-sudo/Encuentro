import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, ArrowLeft, Check } from "lucide-react";

export const QUESTIONS = [
  { id: "q1", type: "text", label: "¿Qué es lo más raro que haces mientras estás sentado/a en el baño?" },
  { id: "q2", type: "text", label: "Sé honesto/a, ¿quién te gusta actualmente? (Nombre o iniciales)" },
  { id: "q3", type: "select", label: "Si pudieras borrar a una persona de tu vida con un botón, ¿lo harías?", options: ["Sí, sin dudarlo", "Depende del día", "No, soy un ángel", "Ya lo he intentado mentalmente"] },
  { id: "q4", type: "scale", label: "Del 1 al 10, ¿qué tan probable es que revises el celular de tu pareja si lo deja desbloqueado?", min: 1, max: 10 },
  { id: "q5", type: "text", label: "¿Cuál es tu secreto más vergonzoso que nadie en tu familia sabe?" },
  { id: "q6", type: "select", label: "¿Qué haces cuando nadie te está viendo?", options: ["Hablar solo/a en voz alta", "Hurgarme la nariz", "Stalkear a mi ex", "Llorar por escenarios imaginarios"] },
  { id: "q7", type: "scale", label: "¿Qué tan sucio/a está tu historial de búsqueda ahora mismo?", min: 1, max: 5 },
  { id: "q8", type: "text", label: "Si tuvieras que fingir tu propia muerte mañana, ¿cuál sería tu plan?" },
  { id: "q9", type: "select", label: "¿Cuál es tu peor hábito tóxico?", options: ["Ghostear gente", "Crear problemas en mi cabeza", "Gastar dinero que no tengo", "Hacerme la víctima"] },
  { id: "q10", type: "text", label: "¿A quién stalkeas más en redes sociales sin que se dé cuenta?" },
  { id: "q11", type: "scale", label: "Nivel de hipocresía cuando te cae mal alguien pero tienes que saludarlo/a.", min: 1, max: 10 },
  { id: "q12", type: "text", label: "Escribe el último pensamiento turbio o raro que se te cruzó por la cabeza hoy." },
];

interface SurveyProps {
  onComplete: (answers: Record<string, any>) => void;
}

export function Survey({ onComplete }: SurveyProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [direction, setDirection] = useState(1);

  const question = QUESTIONS[currentIndex];
  const isLast = currentIndex === QUESTIONS.length - 1;
  const currentAnswer = answers[question.id] || "";

  const handleNext = () => {
    if (!currentAnswer && currentAnswer !== 0) return; // Require answer
    if (isLast) {
      onComplete(answers);
    } else {
      setDirection(1);
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && currentAnswer) {
      handleNext();
    }
  };

  return (
    <div className="max-w-3xl w-full mx-auto px-6 py-12">
      <div className="mb-12 flex justify-between items-end">
        <div>
          <div className="text-indigo-400 text-[10px] font-bold tracking-[0.2em] uppercase mb-2">
            Session ID: {Math.floor(Math.random() * 900000) + 100000}
          </div>
          <h3 className="text-zinc-500 text-sm font-medium">
            Módulo de Evaluación {currentIndex + 1} de {QUESTIONS.length}
          </h3>
        </div>
        <div className="text-right">
          <span className="text-3xl font-display font-bold text-white">
            {Math.round(((currentIndex + 1) / QUESTIONS.length) * 100)}%
          </span>
        </div>
      </div>

      <div className="h-1 w-full bg-zinc-900 rounded-full mb-20 overflow-hidden">
        <motion.div 
          className="h-full bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.5)]"
          initial={{ width: 0 }}
          animate={{ width: `${((currentIndex + 1) / QUESTIONS.length) * 100}%` }}
          transition={{ duration: 0.5, ease: "circOut" }}
        />
      </div>

      <div className="relative min-h-[400px]">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            className="absolute inset-0"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-12 leading-[1.2] tracking-tight">
              {question.label}
            </h2>

            <div className="max-w-2xl">
              {question.type === "text" && (
                <div className="relative group">
                  <input
                    type="text"
                    autoFocus
                    value={currentAnswer}
                    onChange={(e) => setAnswers({ ...answers, [question.id]: e.target.value })}
                    onKeyDown={handleKeyDown}
                    placeholder="Escribe tu respuesta..."
                    className="w-full bg-transparent border-b-2 border-zinc-800 py-4 text-2xl text-white placeholder:text-zinc-700 focus:outline-none focus:border-indigo-500 transition-all duration-300"
                  />
                  <div className="absolute bottom-0 left-0 h-0.5 bg-indigo-500 w-0 group-focus-within:w-full transition-all duration-500" />
                </div>
              )}

              {question.type === "select" && (
                <div className="grid gap-4">
                  {question.options?.map((opt, idx) => (
                    <button
                      key={opt}
                      onClick={() => {
                        setAnswers({ ...answers, [question.id]: opt });
                        setTimeout(() => {
                          if (isLast) onComplete({ ...answers, [question.id]: opt });
                          else { setDirection(1); setCurrentIndex(prev => prev + 1); }
                        }, 400);
                      }}
                      className={`group relative p-5 rounded-2xl border text-left transition-all duration-300 flex items-center justify-between ${
                        currentAnswer === opt 
                          ? "bg-indigo-500/10 border-indigo-500 text-white" 
                          : "bg-zinc-900/30 border-zinc-800/50 text-zinc-400 hover:border-zinc-700 hover:bg-zinc-800/50"
                      }`}
                    >
                      <span className="text-lg font-medium">{opt}</span>
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                        currentAnswer === opt ? "border-indigo-500 bg-indigo-500" : "border-zinc-700"
                      }`}>
                        {currentAnswer === opt && <Check size={14} className="text-black stroke-[3]" />}
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {question.type === "scale" && (
                <div className="flex flex-col gap-10">
                  <div className="flex justify-between items-center gap-2">
                    {Array.from({ length: (question.max || 5) - (question.min || 1) + 1 }).map((_, i) => {
                      const val = (question.min || 1) + i;
                      return (
                        <button
                          key={val}
                          onClick={() => setAnswers({ ...answers, [question.id]: val })}
                          className={`flex-1 h-16 rounded-xl border flex items-center justify-center text-xl font-display font-bold transition-all duration-300 ${
                            currentAnswer === val
                              ? "bg-white border-white text-black scale-105 shadow-[0_0_30px_rgba(255,255,255,0.2)]"
                              : "bg-zinc-900/50 border-zinc-800 text-zinc-500 hover:border-zinc-600 hover:text-zinc-300"
                          }`}
                        >
                          {val}
                        </button>
                      );
                    })}
                  </div>
                  <div className="flex justify-between text-[10px] text-zinc-600 font-bold uppercase tracking-[0.2em]">
                    <span>Mínimo</span>
                    <span>Máximo</span>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex justify-between mt-20 pt-10 border-t border-zinc-900">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="flex items-center gap-3 px-6 py-3 rounded-full text-zinc-500 hover:text-white hover:bg-zinc-900 disabled:opacity-0 transition-all duration-300"
        >
          <ArrowLeft size={18} />
          <span className="text-sm font-bold uppercase tracking-widest">Atrás</span>
        </button>

        <button
          onClick={handleNext}
          disabled={!currentAnswer && currentAnswer !== 0}
          className="flex items-center gap-3 px-10 py-4 rounded-full bg-indigo-600 text-white font-bold hover:bg-indigo-500 disabled:opacity-50 disabled:grayscale transition-all duration-300 shadow-lg shadow-indigo-900/20"
        >
          <span className="text-sm uppercase tracking-widest">{isLast ? "Finalizar" : "Continuar"}</span>
          {isLast ? <Check size={18} /> : <ArrowRight size={18} />}
        </button>
      </div>
    </div>
  );
}
