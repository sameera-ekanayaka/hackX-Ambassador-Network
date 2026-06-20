"use client";

import { useState, useEffect, useTransition, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Lock, AtSign, ArrowLeft, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { login } from "@/app/login/actions";

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const messageParam = searchParams.get("message");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState<{ type: "success" | "error" | null; message: string }>({
    type: null,
    message: "",
  });

  // Sync Supabase redirect error messages
  useEffect(() => {
    if (messageParam) {
      setStatus({
        type: "error",
        message: decodeURIComponent(messageParam),
      });
    }
  }, [messageParam]);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ type: null, message: "" });

    // Client-side validations
    if (!email.trim()) {
      setStatus({ type: "error", message: "Email is required." });
      return;
    }
    if (email.includes("@") && !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setStatus({ type: "error", message: "Please enter a valid email address." });
      return;
    }
    if (!password) {
      setStatus({ type: "error", message: "Password is required." });
      return;
    }
    if (password.length < 6) {
      setStatus({ type: "error", message: "Password must be at least 6 characters long." });
      return;
    }

    // Call server action using React transition
    startTransition(async () => {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);
      
      try {
        await login(formData);
      } catch (err) {
        console.error("Login transition error:", err);
      }
    });
  };

  return (
    <main className="relative min-h-screen w-full bg-[#010814] flex items-center justify-center overflow-hidden">
      
      {/* ── BACKGROUND ACCENTS & SPLIT ── */}
      {/* Slanted Teal/Cyan/Blue Panel (Right Side on Desktop) */}
      <div 
        className="absolute inset-y-0 right-0 w-full md:w-[60%] bg-gradient-to-tr from-[#038491] via-[#0A3878] to-[#1A6FD4] pointer-events-none hidden md:block shadow-[inset_10px_0_30px_rgba(0,0,0,0.3)]"
        style={{
          clipPath: "polygon(22% 0, 100% 0, 100% 100%, 38% 100%)",
          borderLeft: "1px solid rgba(255, 255, 255, 0.1)",
        }}
      />
      {/* Visual background decor for mobile (gradient blobs) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden md:hidden">
        <div className="absolute -top-1/4 -right-1/4 w-[300px] h-[300px] bg-[#038491] opacity-20 blur-[100px] rounded-full" />
        <div className="absolute -bottom-1/4 -left-1/4 w-[300px] h-[300px] bg-[#1A6FD4] opacity-20 blur-[100px] rounded-full" />
      </div>

      {/* Back to Home Link */}
      <Link 
        href="/" 
        className="absolute top-6 left-6 z-30 flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold text-white/60 hover:text-white bg-white/[0.03] border border-white/5 hover:border-white/10 transition-all duration-300"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Home</span>
      </Link>

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 items-center gap-8 min-h-screen pt-20 pb-12">
        
        {/* Left Side: Form (spans 7 cols on medium/large) */}
        <div className="md:col-span-7 flex flex-col justify-center max-w-xl mx-auto w-full md:pr-12">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="w-full text-left"
          >
            {/* Header titles */}
            <h1 
              className="text-5xl md:text-6xl font-black text-white tracking-tight mb-2 uppercase"
            >
              Login
            </h1>
            <p className="text-lg text-white/55 font-light tracking-wide mb-10">
              Ambassador Portal
            </p>

            {/* Form */}
            <form onSubmit={handleLoginSubmit} className="space-y-6">
              
              {/* Email Address Input */}
              <div className="space-y-2">
                <label className="block text-xs font-extrabold tracking-widest text-[#5BB8FF] uppercase">
                  Email Address
                </label>
                <div 
                  className="w-full bg-[#EDF2F7] rounded-xl py-4.5 px-6 flex items-center border-b-[4px] border-[#038491] text-black shadow-lg transition-all focus-within:ring-2 focus-within:ring-[#5BB8FF]/50"
                >
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email or username"
                    disabled={isPending}
                    autoComplete="off"
                    className="bg-transparent flex-grow text-neutral-900 font-bold placeholder-neutral-400 focus:outline-none text-base w-full border-none p-0 outline-none"
                  />
                  <AtSign className="w-5 h-5 text-neutral-400 ml-3 shrink-0" />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <label className="block text-xs font-extrabold tracking-widest text-[#5BB8FF] uppercase">
                  Password
                </label>
                <div 
                  className="w-full bg-[#EDF2F7] rounded-xl py-4.5 px-6 flex items-center border-b-[4px] border-[#038491] text-black shadow-lg transition-all focus-within:ring-2 focus-within:ring-[#5BB8FF]/50"
                >
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    disabled={isPending}
                    autoComplete="new-password"
                    className="bg-transparent flex-grow text-neutral-900 font-bold placeholder-neutral-400 focus:outline-none text-base w-full border-none p-0 outline-none"
                  />
                  <Lock className="w-5 h-5 text-neutral-400 ml-3 shrink-0" />
                </div>
              </div>

              {/* Alert Message Box */}
              <AnimatePresence mode="wait">
                {status.type && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className={`flex items-start gap-3 p-4 rounded-xl text-sm ${
                      status.type === "success" 
                        ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400" 
                        : "bg-rose-500/10 border border-rose-500/20 text-rose-400"
                    }`}
                  >
                    {status.type === "success" ? (
                      <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
                    ) : (
                      <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                    )}
                    <span className="font-medium">{status.message}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="submit"
                  disabled={isPending}
                  className="btn-primary w-full sm:w-auto px-10 py-4 text-sm font-extrabold uppercase tracking-wider disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Logging in...</span>
                    </>
                  ) : (
                    <span>Login</span>
                  )}
                </button>

                <div className="text-center sm:text-right">
                  <span className="text-xs text-white/45 block mb-1">New to the family?</span>
                  <Link 
                    href="/register" 
                    className="text-xs font-bold text-[#5BB8FF] hover:underline transition-colors uppercase tracking-wider"
                  >
                    Register Now
                  </Link>
                </div>
              </div>

            </form>
          </motion.div>

        </div>

        {/* Right Side: Visual content (spans 5 cols) */}
        <div className="md:col-span-5 hidden md:flex flex-col justify-center items-center text-center text-white/95 p-6 relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="relative w-36 h-36 mx-auto mb-4 drop-shadow-[0_0_24px_rgba(91,184,255,0.3)]">
              <Image 
                src="/hackxlogo.webp" 
                alt="hackX Logo" 
                fill 
                style={{ objectFit: "contain" }}
                className="opacity-90 hover:scale-105 transition-transform duration-500"
              />
            </div>
            
            <h2 className="text-2xl font-black uppercase tracking-tight">
              Ambassador Portal
            </h2>
            
            <p className="text-xs text-white/75 font-light leading-relaxed max-w-xs mx-auto">
              Access your dashboard, track referred teams, count milestones, and claim rewards.
            </p>
          </motion.div>
        </div>

      </div>

    </main>
  );
}

export default function LoginPage() {
  return (
    <div className="hackx-theme min-h-screen bg-brand-black text-white">
      <Suspense fallback={
        <main className="min-h-screen w-full bg-[#010814] flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-[#5BB8FF]" />
        </main>
      }>
        <LoginContent />
      </Suspense>
    </div>
  );
}
