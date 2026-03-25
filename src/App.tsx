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
    <div className="min-h-screen bg-[#050505] text-zinc-100 font-sans selection:bg-indigo-500/30 flex flex-col overflow-x-hidden">
      <main className="flex-1 flex flex-col items-center justify-center relative">
        {/* Professional Background Mesh */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500/10 blur-[120px] rounded-full" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full" />
          <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-purple-500/5 blur-[100px] rounded-full" />
          
          {/* Subtle Grid Pattern */}
          <div className="absolute inset-0 opacity-[0.03]" 
               style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
          
          {/* Noise overlay */}
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.15] mix-blend-overlay" />
        </div>

        <div className="w-full z-10 flex flex-col items-center justify-center min-h-screen py-6 md:py-12">
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
