/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { AnimatePresence } from "motion/react";
import { Intro } from "./components/Intro";
import { Survey } from "./components/Survey";
import { Result } from "./components/Result";
import { Admin } from "./components/Admin";
import { encodeZyphra } from "./lib/zyphra";

type Screen = "intro" | "survey" | "result" | "admin";

export default function App() {
  const [screen, setScreen] = useState<Screen>("intro");
  const [zyphraCode, setZyphraCode] = useState("");

  const handleSurveyComplete = (answers: Record<string, any>) => {
    const code = encodeZyphra(answers);
    setZyphraCode(code);
    setScreen("result");
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-100 font-sans selection:bg-indigo-500/30 flex flex-col">
      <main className="flex-1 flex flex-col items-center justify-center relative overflow-hidden">
        {/* Background effects */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-indigo-900/20 blur-[120px] rounded-full mix-blend-screen" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-purple-900/20 blur-[120px] rounded-full mix-blend-screen" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
        </div>

        <div className="w-full z-10 flex flex-col items-center justify-center min-h-screen">
          <AnimatePresence mode="wait">
            {screen === "intro" && (
              <Intro 
                key="intro" 
                onStart={() => setScreen("survey")} 
                onAdmin={() => setScreen("admin")} 
              />
            )}
            {screen === "survey" && (
              <Survey 
                key="survey" 
                onComplete={handleSurveyComplete} 
              />
            )}
            {screen === "result" && (
              <Result 
                key="result" 
                zyphraCode={zyphraCode} 
                onRestart={() => setScreen("intro")} 
              />
            )}
            {screen === "admin" && (
              <Admin 
                key="admin" 
                onBack={() => setScreen("intro")} 
              />
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
