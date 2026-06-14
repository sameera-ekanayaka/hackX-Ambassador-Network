"use client";

import { motion, animate, useMotionTemplate, useMotionValue } from "framer-motion";
import { useRef, useEffect } from "react";

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 28, filter: "blur(6px)" },
  whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] as const },
});

const prizes = [
  {
    rank: "1st",
    label: "Grand Champions",
    tagline: "The pinnacle. National recognition, investor access, and a prize that matches the ambition.",
    accent: "#FFD700",
    glow: "rgba(255,215,0,0.18)",
    border: "rgba(255,215,0,0.22)",
    icon: "✦",
    size: "large",
  },
  {
    rank: "2nd",
    label: "Runners-Up",
    tagline: "Second on stage. First in line for what comes next.",
    accent: "#C0C8D8",
    glow: "rgba(192,200,216,0.14)",
    border: "rgba(192,200,216,0.18)",
    icon: "◆",
    size: "medium",
  },
  {
    rank: "3rd",
    label: "Third Place",
    tagline: "The podium is proof. Your idea earned its place on a national stage.",
    accent: "#CD8B4A",
    glow: "rgba(205,139,74,0.14)",
    border: "rgba(205,139,74,0.18)",
    icon: "◇",
    size: "medium",
  },
];

interface AIGradientBorderProps {
  children: React.ReactNode;
  className?: string;
  duration?: number;
  accentColor: string;
}

const AIGradientBorder = ({
  children,
  className = "",
  duration = 4,
  accentColor,
}: AIGradientBorderProps) => {
  const turn = useMotionValue(0);

  useEffect(() => {
    const controls = animate(turn, 1, {
      ease: "linear",
      duration,
      repeat: Infinity,
    });
    return () => controls.stop();
  }, [duration, turn]);

  // Premium rotating gradient mixing the prize's custom accent color with royal blue, sky blue and white highlights
  const gradient = useMotionTemplate`conic-gradient(from ${turn}turn, transparent 0%, ${accentColor}00 5%, ${accentColor} 12%, #ffffff 20%, #1A6FD4 28%, #5BB8FF 36%, ${accentColor} 44%, ${accentColor}00 52%, transparent 56%)`;

  return (
    <div className={`relative p-px ${className}`}>
      {/* Rotating border line */}
      <motion.div
        style={{ backgroundImage: gradient }}
        className="absolute inset-0 rounded-[inherit] z-10"
      />

      {/* Card Content Wrapper */}
      <div className="relative rounded-[inherit] overflow-hidden h-full flex flex-col z-20">
        <div className="relative h-full flex flex-col">{children}</div>
      </div>
    </div>
  );
};

export default function PrizesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section ref={sectionRef} className="relative w-full bg-[#010814] py-32 overflow-hidden z-10">

      {/* Ambient deep glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.06, 0.1, 0.06] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] rounded-full"
          style={{ background: "radial-gradient(ellipse, rgba(255,215,0,0.07) 0%, transparent 70%)" }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Header */}
        <div className="text-center mb-20">
          <motion.span {...fade(0)} className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-[#5BB8FF] mb-5">
            What You Win
          </motion.span>
          <motion.h2
            {...fade(0.08)}
            className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.05] mb-6"
          >
            Built for Builders.<br className="hidden md:block" /> Rewarded Like Champions.
          </motion.h2>
          <motion.p {...fade(0.16)} className="text-lg text-white/50 font-light max-w-xl mx-auto leading-relaxed">
            Three podium spots. Real prizes. Real investor exposure. And recognition on Sri Lanka&apos;s biggest student innovation stage.
          </motion.p>
        </div>

        {/* Prize Cards — Podium layout: 2nd | 1st | 3rd */}
        <div className="flex flex-col md:flex-row items-stretch justify-center gap-6">
          {[prizes[1], prizes[0], prizes[2]].map((prize, visualIdx) => {
            const isFirst = prize.size === "large";
            return (
              <motion.div
                key={prize.rank}
                {...fade(0.1 + visualIdx * 0.1)}
                className="w-full md:w-[330px] relative group flex flex-col"
                style={{ alignSelf: "stretch" }}
              >
                <AIGradientBorder
                  accentColor={prize.accent}
                  duration={isFirst ? 3 : 4.5}
                  className="rounded-3xl border border-white/[0.06] transition-all duration-500 group-hover:scale-[1.02] h-full flex-1 flex flex-col"
                >
                  {/* Inner Card Container */}
                  <div
                    className="relative overflow-hidden rounded-[23px] h-full flex flex-col justify-between p-8 md:p-10 flex-1"
                    style={{
                      background: `linear-gradient(145deg, #031126 0%, #010610 100%)`,
                      backdropFilter: "blur(32px) saturate(1.6)",
                      WebkitBackdropFilter: "blur(32px) saturate(1.6)",
                      minHeight: isFirst ? "480px" : "420px",
                    }}
                  >
                    <div>
                      {/* Icon */}
                      <motion.div
                        animate={{ y: [0, -6, 0], opacity: [0.7, 1, 0.7] }}
                        transition={{ duration: 3 + visualIdx, repeat: Infinity, ease: "easeInOut" }}
                        className="mb-6"
                        style={{
                          fontSize: isFirst ? "3rem" : "2rem",
                          color: prize.accent,
                          filter: `drop-shadow(0 0 12px ${prize.accent})`,
                        }}
                      >
                        {prize.icon}
                      </motion.div>

                      {/* Rank */}
                      <div
                        className="font-black tracking-tighter mb-2 leading-none"
                        style={{
                          fontSize: isFirst ? "5.5rem" : "3.5rem",
                          background: `linear-gradient(135deg, ${prize.accent} 0%, rgba(255,255,255,0.75) 100%)`,
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          backgroundClip: "text",
                        }}
                      >
                        {prize.rank}
                      </div>

                      <p className="text-white font-bold text-lg mb-3 tracking-tight">{prize.label}</p>
                      <p className="text-white/45 font-light text-sm leading-relaxed">{prize.tagline}</p>
                    </div>

                    <div className="mt-8 pt-5 border-t border-white/[0.08]">
                      <p className="text-xs font-bold tracking-widest uppercase" style={{ color: prize.accent, opacity: 0.7 }}>
                        Grand Finals · hackX 11.0
                      </p>
                    </div>

                    <div
                      className="absolute bottom-0 right-0 w-32 h-32 pointer-events-none"
                      style={{ background: `radial-gradient(circle at bottom right, ${prize.glow} 0%, transparent 70%)` }}
                    />
                  </div>
                </AIGradientBorder>
              </motion.div>
            );
          })}
        </div>

        {/* Note */}
        <motion.p {...fade(0.5)} className="text-center text-white/30 text-xs mt-12 tracking-wide">
          Plus: Mentorship access · Investor introductions · National media coverage · hackX Digital Certificate
        </motion.p>
      </div>

      {/* Seamless blend */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, #010814)" }}
      />
    </section>
  );
}
