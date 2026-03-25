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
    <div className="max-w-2xl w-full mx-auto px-4 py-12">
      <div className="mb-8 flex justify-between items-center text-zinc-500 text-sm font-mono">
        <span>Sujeto de prueba #{Math.floor(Math.random() * 9000) + 1000}</span>
        <span>{currentIndex + 1} / {QUESTIONS.length}</span>
      </div>

      <div className="h-2 w-full bg-zinc-800 rounded-full mb-12 overflow-hidden">
        <motion.div 
          className="h-full bg-indigo-500"
          initial={{ width: 0 }}
          animate={{ width: `${((currentIndex + 1) / QUESTIONS.length) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      <div className="relative min-h-[300px]">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            initial={{ opacity: 0, x: 50 * direction }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 * direction }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <h2 className="text-2xl md:text-3xl font-medium text-white mb-8 leading-tight">
              {question.label}
            </h2>

            {question.type === "text" && (
              <input
                type="text"
                autoFocus
                value={currentAnswer}
                onChange={(e) => setAnswers({ ...answers, [question.id]: e.target.value })}
                onKeyDown={handleKeyDown}
                placeholder="Escribe tu respuesta aquí..."
                className="w-full bg-zinc-900/50 border border-zinc-700 rounded-xl p-4 text-white text-lg focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
              />
            )}

            {question.type === "select" && (
              <div className="grid gap-3">
                {question.options?.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => {
                      setAnswers({ ...answers, [question.id]: opt });
                      setTimeout(() => {
                        if (isLast) onComplete({ ...answers, [question.id]: opt });
                        else { setDirection(1); setCurrentIndex(prev => prev + 1); }
                      }, 300);
                    }}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      currentAnswer === opt 
                        ? "bg-indigo-600/20 border-indigo-500 text-white" 
                        : "bg-zinc-900/50 border-zinc-800 text-zinc-300 hover:border-zinc-600 hover:bg-zinc-800"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}

            {question.type === "scale" && (
              <div className="flex flex-col gap-6">
                <div className="flex justify-between gap-2">
                  {Array.from({ length: (question.max || 5) - (question.min || 1) + 1 }).map((_, i) => {
                    const val = (question.min || 1) + i;
                    return (
                      <button
                        key={val}
                        onClick={() => setAnswers({ ...answers, [question.id]: val })}
                        className={`flex-1 aspect-square rounded-xl border flex items-center justify-center text-lg font-medium transition-all ${
                          currentAnswer === val
                            ? "bg-indigo-600 border-indigo-500 text-white scale-110 shadow-lg"
                            : "bg-zinc-900/50 border-zinc-800 text-zinc-400 hover:border-zinc-600 hover:bg-zinc-800"
                        }`}
                      >
                        {val}
                      </button>
                    );
                  })}
                </div>
                <div className="flex justify-between text-xs text-zinc-500 uppercase tracking-wider font-semibold">
                  <span>Nada</span>
                  <span>Totalmente</span>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex justify-between mt-12 pt-8 border-t border-zinc-800">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="flex items-center gap-2 px-6 py-3 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-zinc-400 transition-all"
        >
          <ArrowLeft size={20} />
          <span>Atrás</span>
        </button>

        <button
          onClick={handleNext}
          disabled={!currentAnswer && currentAnswer !== 0}
          className="flex items-center gap-2 px-8 py-3 rounded-xl bg-white text-black font-bold hover:bg-zinc-200 disabled:opacity-50 disabled:hover:bg-white transition-all"
        >
          <span>{isLast ? "Finalizar" : "Siguiente"}</span>
          {isLast ? <Check size={20} /> : <ArrowRight size={20} />}
        </button>
      </div>
    </div>
  );
}
