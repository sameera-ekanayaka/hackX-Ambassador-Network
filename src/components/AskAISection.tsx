"use client";

import { motion } from "framer-motion";

export default function AskAISection() {
  return (
    <section id="ask-ai" className="relative w-full bg-[#010814] py-32 overflow-hidden z-10 border-t border-white/5">
      {/* Background Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div 
          animate={{ x: [0, 60, -60, 0], y: [0, 60, -60, 0], scale: [1, 1.2, 0.8, 1] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-[20%] right-[10%] w-[500px] h-[500px] bg-[#1A6FD4] opacity-[0.06] blur-[120px] rounded-full" 
        />
        <motion.div 
          animate={{ x: [0, -40, 40, 0], y: [0, -40, 40, 0], scale: [1, 0.9, 1.1, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[20%] left-[10%] w-[400px] h-[400px] bg-[#5BB8FF] opacity-[0.05] blur-[100px] rounded-full" 
        />
      </div>

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-6 shadow-[0_0_20px_rgba(91,184,255,0.1)]">
            <div className="w-2 h-2 rounded-full bg-[#5BB8FF] animate-pulse" />
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-white/80">
              Ask hackX
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">Got a Question? <br className="hidden md:block"/> Get an Answer.</h2>
          <p className="text-lg text-white/60 font-light max-w-2xl mx-auto">
            Not sure if your idea qualifies? Wondering what judges look for in a proposal? Ask anything about hackX 11.0 and get an instant AI-powered answer.
          </p>
        </motion.div>

        {/* AI Chat Interface Mockup */}
        <motion.div 
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full rounded-3xl p-[1px] group"
        >
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-white/20 via-white/5 to-transparent opacity-50" />
          
          <div className="relative rounded-[23px] bg-[#010814]/80 backdrop-blur-3xl overflow-hidden border border-white/10 shadow-2xl flex flex-col h-[500px]">
            
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-white/[0.02]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#1A6FD4] to-[#5BB8FF] flex items-center justify-center shadow-[0_0_10px_#5BB8FF]">
                  <span className="text-white font-bold text-xs">AI</span>
                </div>
                <span className="text-sm font-semibold text-white tracking-wide">hackX Assistant</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-white/10" />
                <div className="w-3 h-3 rounded-full bg-white/10" />
                <div className="w-3 h-3 rounded-full bg-white/10" />
              </div>
            </div>

            {/* Chat Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              
              {/* User Message */}
              <div className="flex justify-end">
                <div className="max-w-[80%] px-5 py-3 rounded-2xl rounded-tr-none bg-white/10 backdrop-blur-md text-white text-sm font-light leading-relaxed border border-white/5">
                  Does our product need to be fully built by the time we register?
                </div>
              </div>

              {/* AI Response */}
              <div className="flex justify-start">
                <div className="max-w-[85%] px-5 py-4 rounded-2xl rounded-tl-none bg-[#1A6FD4]/10 backdrop-blur-md border border-[#5BB8FF]/20 text-white/90 text-sm font-light leading-relaxed shadow-[0_0_20px_rgba(26,111,212,0.1)]">
                  <span className="font-semibold text-[#5BB8FF] block mb-2">No, it does not.</span>
                  At the registration stage, you only need to submit your idea and a structured proposal outlining the problem, solution, and impact. 
                  <br/><br/>
                  A working prototype is only required later, by the <strong className="text-white">ideaX Semi-Finals</strong> on October 3. Take your time to refine the core concept first!
                </div>
              </div>

            </div>

            {/* Input Area */}
            <div className="p-4 bg-white/[0.02] border-t border-white/5">
              <div className="relative flex items-center bg-black/40 border border-white/10 rounded-full px-4 py-2 focus-within:border-[#5BB8FF]/50 focus-within:bg-[#041A3A]/40 transition-colors">
                <input 
                  type="text" 
                  placeholder="Ask a question about hackX..." 
                  className="flex-1 bg-transparent border-none outline-none text-white text-sm px-2 py-2 placeholder:text-white/30"
                  disabled
                />
                <button className="w-10 h-10 rounded-full bg-gradient-to-r from-[#1A6FD4] to-[#5BB8FF] flex items-center justify-center hover:opacity-90 transition-opacity shrink-0">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </button>
              </div>
              <p className="text-center mt-3 text-[10px] text-white/30 uppercase tracking-widest">
                Powered by AI. For official queries, contact coordinators.
              </p>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
