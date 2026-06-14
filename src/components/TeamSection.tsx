"use client";

import { motion, useMotionValue, useTransform, useMotionTemplate } from "framer-motion";
import React, { useState, useCallback, useRef, useEffect } from "react";

/* ─── OC Data ─── */
const coordinators = [
  {
    name: "Ashan Perera",
    role: "President — hackX 11.0",
    email: "president@hackx.lk",
    phone: "+94 77 000 0001",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
  },
  {
    name: "Dilmi Rathnayake",
    role: "Secretary General",
    email: "secretary@hackx.lk",
    phone: "+94 77 000 0002",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80",
  },
  {
    name: "Kavinda Silva",
    role: "Head of Technology",
    email: "tech@hackx.lk",
    phone: "+94 77 000 0003",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&q=80",
  },
  {
    name: "Nethmi Fernando",
    role: "Head of Marketing",
    email: "marketing@hackx.lk",
    phone: "+94 77 000 0004",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&q=80",
  },
  {
    name: "Isuru Wickrama",
    role: "Head of Finance",
    email: "finance@hackx.lk",
    phone: "+94 77 000 0005",
    avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=800&q=80",
  },
];

function CoordCard({ coord }: { coord: typeof coordinators[0] }) {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  const rotateX = useTransform(mouseY, [0, 1], [8, -8]);
  const rotateY = useTransform(mouseX, [0, 1], [-8, 8]);
  const background = useMotionTemplate`radial-gradient(circle at ${useTransform(mouseX, v => v*100)}% ${useTransform(mouseY, v => v*100)}%, rgba(255,255,255,0.15) 0%, transparent 60%)`;

  return (
    <motion.div 
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="relative w-full h-full rounded-3xl overflow-hidden group shadow-2xl bg-[#041A3A]/20"
    >
      {/* Background Image */}
      <img
        src={coord.avatar}
        alt={coord.name}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      
      {/* Dark gradient for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#010814] via-[#010814]/40 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-70" />

      {/* Glare effect */}
      <motion.div 
        style={{ background }} 
        className="absolute inset-0 pointer-events-none z-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" 
      />

      {/* Info overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 flex flex-col justify-end" style={{ transform: "translateZ(30px)" }}>
        <p className="text-white font-bold text-xl md:text-2xl tracking-tight leading-tight mb-1">
          {coord.name}
        </p>
        <p className="text-[#5BB8FF] text-xs md:text-sm font-medium tracking-wide">
          {coord.role}
        </p>

        {/* Links (reveal on hover for desktop, always show on mobile) */}
        <div className="mt-3 flex flex-col gap-2 opacity-100 md:opacity-0 md:translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          <a
            href={`mailto:${coord.email}`}
            className="flex items-center gap-1.5 text-white/70 hover:text-white transition-colors text-[11px]"
            onClick={e => e.stopPropagation()}
          >
            <svg className="w-3 h-3 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
            </svg>
            <span className="truncate">{coord.email}</span>
          </a>
          <a
            href={`tel:${coord.phone.replace(/\s/g, "")}`}
            className="flex items-center gap-1.5 text-white/70 hover:text-white transition-colors text-[11px]"
            onClick={e => e.stopPropagation()}
          >
            <svg className="w-3 h-3 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
            </svg>
            <span>{coord.phone}</span>
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export default function TeamSection() {
  const [active, setActive] = useState(1000); // Start high for infinite looping
  const N = coordinators.length;

  const next = useCallback(() => setActive(a => a + 1), []);
  const prev = useCallback(() => setActive(a => a - 1), []);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((a) => a + 1);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section 
      id="oc"
      className="relative w-full bg-[#010814] py-32 overflow-hidden z-10" 
    >
      {/* Ambient background blur */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ x: [0, 30, -30, 0], y: [0, -20, 20, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/3 right-0 w-[400px] h-[400px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(91,184,255,0.04) 0%, transparent 70%)" }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div className="max-w-2xl">
            <motion.span
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-xs font-bold tracking-[0.2em] uppercase text-[#5BB8FF] mb-3 block"
            >
              Organising Committee
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: 0.07 }}
              className="text-4xl md:text-5xl font-black text-white tracking-tight"
            >
              Meet the OC.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.14 }}
              className="text-white/50 mt-4 text-sm md:text-base font-light leading-relaxed max-w-lg"
            >
              Have a question? Reach the right person directly. Our team is ready to propel your startup journey forward.
            </motion.p>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={prev}
              className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 bg-white/5 hover:bg-white/10 border border-white/10"
            >
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/>
              </svg>
            </button>
            <button
              onClick={next}
              className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 bg-white/5 hover:bg-white/10 border border-white/10"
            >
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
        </div>

        {/* ─── Arc Carousel ─── */}
        <div 
          className="relative w-full h-[450px] md:h-[550px] mt-16 flex justify-center items-center overflow-hidden [perspective:1200px]"
          style={{
            maskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
            WebkitMaskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
          }}
        >
          {[-3, -2, -1, 0, 1, 2, 3].map((offset) => {
            const absoluteIndex = active + offset;
            const wrappedIndex = ((absoluteIndex % N) + N) % N;
            const coord = coordinators[wrappedIndex];
            const absOffset = Math.abs(offset);
            
            // The magic math for the arc layout
            const rotateZ = offset * 4; // Tilt cards on the sides
            const translateY = absOffset * absOffset * 15; // Drop down on the sides
            
            // Dynamic translation for responsive horizontal spread
            const translateX = `calc(${offset} * clamp(200px, 20vw, 320px))`; 
            
            const scale = 1 - absOffset * 0.05; // Slightly shrink outer cards
            const zIndex = 20 - absOffset; // Center item on top
            
            return (
              <motion.div
                key={absoluteIndex}
                className="absolute w-[220px] h-[320px] md:w-[280px] md:h-[420px] cursor-pointer touch-none"
                animate={{
                  x: translateX,
                  y: translateY,
                  rotateZ: rotateZ,
                  scale: scale,
                  zIndex: zIndex,
                  opacity: absOffset > 2 ? 0 : 1, // Hide items too far out
                }}
                transition={{
                  type: "spring",
                  stiffness: 250,
                  damping: 28,
                  mass: 0.8
                }}
                onClick={() => setActive(absoluteIndex)}
              >
                <CoordCard coord={coord} />
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Seamless blend into the next dark section */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, #010814)" }}
      />
    </section>
  );
}
