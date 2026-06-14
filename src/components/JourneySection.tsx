"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { GalleryItem } from "@/components/ui/circular-gallery";

const events: GalleryItem[] = [
  {
    id: "registrations",
    date: "June 23",
    title: "Registrations Open",
    description:
      "Doors open to universities across Sri Lanka. Free to enter. Just bring an idea worth fighting for.",
    accentColor: "#5BB8FF",
    imageUrl:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "proposal",
    date: "July 31",
    title: "Proposal Submission",
    description:
      "Teams submit structured proposals and a one to two minute product introduction video, screened by industry professionals.",
    accentColor: "#1A6FD4",
    imageUrl:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "designx",
    date: "Sep – Oct",
    title: "designX Workshops",
    description:
      "Four expert-led sessions covering business modelling, startup structuring, and market validation. Exclusive to semi-finalists.",
    accentColor: "#F5A524",
    imageUrl:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "ideax",
    date: "October 3",
    title: "ideaX Semi-Finals",
    description:
      "Thirty teams. One stage. Present a working prototype to a panel of expert judges and earn your spot at the Grand Finals.",
    accentColor: "#5BB8FF",
    imageUrl:
      "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "finals",
    date: "November 11",
    title: "Grand Finals",
    description:
      "The main event. Finalist teams present fully developed solutions before industry leaders, investors, and government officials.",
    accentColor: "#F5A524",
    imageUrl:
      "https://images.unsplash.com/photo-1531058020387-3be344556be6?w=600&auto=format&fit=crop&q=80",
  },
];

const N = events.length;

export default function JourneySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 55,
    damping: 18,
    mass: 0.9,
  });

  useEffect(() => {
    return smoothProgress.on("change", (v) => {
      const idx = Math.max(0, Math.min(N - 1, Math.floor(v * N)));
      setActiveIdx(idx);
    });
  }, [smoothProgress]);

  const handleDotClick = (idx: number) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const sectionTop = rect.top + scrollTop;
    const sectionHeight = rect.height;
    const targetScroll =
      sectionTop + (idx / N) * (sectionHeight - window.innerHeight);
    window.scrollTo({ top: targetScroll, behavior: "smooth" });
  };

  const active = events[activeIdx];

  return (
    <section
      id="timeline"
      ref={sectionRef}
      className="relative bg-[#010814] z-10"
      style={{ height: `${N * 100}vh` }}
    >
      {/* Edge fades */}
      <div
        className="absolute top-0 inset-x-0 h-32 pointer-events-none z-30"
        style={{ background: "linear-gradient(to top, transparent, #010814)" }}
      />
      <div
        className="absolute bottom-0 inset-x-0 h-32 pointer-events-none z-30"
        style={{ background: "linear-gradient(to bottom, transparent, #010814)" }}
      />

      {/* Sticky viewport */}
      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center">

        {/* Ambient blobs */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div
            className="absolute w-[600px] h-[600px] rounded-full blur-[160px] opacity-[0.05]"
            style={{ background: active.accentColor, top: "30%", left: "20%", transition: "background 0.8s ease" }}
          />
        </div>

        <div className="max-w-7xl mx-auto w-full h-full px-6 md:px-8 flex flex-col justify-between pt-[10vh] pb-[8vh] z-10 relative">
          {/* ─── Header ─── */}
          <div className="flex-shrink-0 text-center relative">
            <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#5BB8FF]/60 mb-2 block">
              Every great venture starts somewhere
            </span>
            <h2 className="text-5xl md:text-6xl font-black text-white tracking-tight">
              The Journey
            </h2>
          </div>

          {/* ─── Two-column body ─── */}
          <div className="flex-1 flex items-center gap-16 md:gap-24 relative mt-6">

            {/* LEFT: Subtle Card Switcher / Fade-out Transition */}
            <div className="w-[45%] h-[560px] flex-shrink-0 relative flex items-center justify-start">
              <div
                className="relative w-[440px] h-[540px] rounded-2xl overflow-hidden transition-all duration-750 ease-out group"
                style={{
                  border: `1px solid ${active.accentColor}40`,
                  boxShadow: `0 20px 50px rgba(0,0,0,0.6), 0 0 30px ${active.accentColor}15`,
                  background: '#020C1B',
                }}
              >
                {/* Image Container with AnimatePresence for smooth cross-fades */}
                <div className="absolute inset-0 w-full h-full overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeIdx}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.05 }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                      className="absolute inset-0 w-full h-full"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={active.imageUrl}
                        alt={active.title}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      {/* Accent tint overlay */}
                      <div
                        className="absolute inset-0 transition-opacity duration-500 group-hover:opacity-40"
                        style={{
                          background: `linear-gradient(to bottom, ${active.accentColor}05 0%, rgba(2,12,27,0.7) 100%)`,
                        }}
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* RIGHT: Stage info + nav */}
            <div className="flex-1 flex flex-col justify-center gap-8 min-w-0">

              {/* Active stage info */}
              <div>
                <motion.div
                  key={activeIdx}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-4"
                    style={{
                      background: `${active.accentColor}18`,
                      border: `1px solid ${active.accentColor}40`,
                      color: active.accentColor,
                    }}
                  >
                    {active.date}
                  </div>
                  <h3 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-3 leading-tight">
                    {active.title}
                  </h3>
                  <p className="text-white/55 text-sm md:text-base leading-relaxed font-light max-w-sm">
                    {active.description}
                  </p>
                </motion.div>
              </div>

              {/* Stage navigation list */}
              <div className="flex flex-col gap-1">
                {events.map((ev, i) => {
                  const isActive = i === activeIdx;
                  return (
                    <button
                      key={ev.id}
                      onClick={() => handleDotClick(i)}
                      className="flex items-center gap-3 py-2 px-3 rounded-xl text-left transition-all duration-300 group w-full"
                      style={{
                        background: isActive ? `${ev.accentColor}10` : "transparent",
                      }}
                    >
                      {/* indicator */}
                      <div
                        className="w-1.5 h-1.5 rounded-full flex-shrink-0 transition-all duration-300"
                        style={{
                          background: isActive ? ev.accentColor : "rgba(255,255,255,0.2)",
                          boxShadow: isActive ? `0 0 6px ${ev.accentColor}` : "none",
                          transform: isActive ? "scale(1.4)" : "scale(1)",
                        }}
                      />
                      <span
                        className="text-xs transition-colors duration-300 font-medium"
                        style={{
                          color: isActive ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.3)",
                        }}
                      >
                        {ev.title}
                      </span>
                      <span
                        className="ml-auto text-[10px] font-bold tracking-widest uppercase"
                        style={{
                          color: isActive ? ev.accentColor : "rgba(255,255,255,0.15)",
                        }}
                      >
                        {ev.date}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Progress strip */}
              <div>
                <div className="h-[2px] w-full bg-white/[0.06] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700 ease-in-out"
                    style={{
                      width: `${((activeIdx + 1) / N) * 100}%`,
                      background: active.accentColor,
                    }}
                  />
                </div>
                <p className="text-white/20 text-[10px] tracking-widest uppercase mt-2">
                  Stage {activeIdx + 1} of {N}
                </p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
