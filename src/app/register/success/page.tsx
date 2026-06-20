"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

export default function RegistrationSuccessPage() {
  return (
    <div className="hackx-theme min-h-screen bg-[#010814] flex items-center justify-center p-4 overflow-hidden relative">
      {/* ── BACKGROUND DIAGNAL ACCENT ── */}
      <div 
        className="absolute bottom-0 right-0 w-[60vw] h-[60vw] md:w-[35vw] md:h-[35vw] bg-gradient-to-br from-[#038491] via-[#0A3878] to-[#010814] pointer-events-none z-0"
        style={{
          clipPath: "polygon(100% 0, 100% 100%, 0 100%)",
          borderTopLeftRadius: "20%",
        }}
      />
      <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-[#1A6FD4]/5 blur-[120px] rounded-full pointer-events-none" />

      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-md bg-[#041A3A]/45 border border-white/10 shadow-[0_20px_50px_rgba(26,111,212,0.15)] rounded-3xl p-8 text-center flex flex-col items-center gap-6"
      >
        <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
          <CheckCircle2 className="w-10 h-10 animate-bounce" />
        </div>

        <div className="space-y-2">
          <h3 className="text-2xl font-black uppercase text-white">
            Registration Successful!
          </h3>
          <p className="text-sm text-white/60 font-light leading-relaxed">
            Welcome to the hackX Ambassador Network. Your application has been received and is currently under review by our Ambassador coordinators.
          </p>
        </div>

        <div className="w-full space-y-3 pt-2">
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 text-left text-xs space-y-1">
            <div className="text-white/40">Status</div>
            <div className="text-emerald-400 font-semibold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Pending Review
            </div>
          </div>
        </div>

        <Link 
          href="/login"
          className="btn-primary w-full py-4 text-sm font-bold uppercase tracking-wider text-center"
        >
          Go to Portal Login
        </Link>
      </motion.div>
    </div>
  );
}
