"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { PixelCanvas } from "@/components/ui/pixel-canvas";

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24, filter: "blur(4px)" },
  whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] as const },
});

const StatCard = ({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) => (
  <motion.div
    {...fade(delay)}
    className={`relative overflow-hidden rounded-3xl bg-[#041A3A]/20 backdrop-blur-[40px] border border-white/5 shadow-sm transition-all duration-500 hover:bg-[#041A3A]/35 hover:border-white/10 group ${className}`}
  >
    <PixelCanvas
      gap={10}
      speed={20}
      colors={["#1A6FD4", "#5BB8FF", "#0A3878"]}
    />
    <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/0 group-hover:from-white/[0.03] group-hover:to-transparent transition-colors duration-500 pointer-events-none" />
    <div className="relative z-10 w-full h-full">{children}</div>
  </motion.div>
);

export default function NewSection2() {
  return (
    <section className="relative w-full bg-[#010814] pt-48 pb-0 overflow-hidden z-10">
      {/* Ambient blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ x: [0, 50, -50, 0], y: [0, -50, 50, 0], scale: [1, 1.1, 0.9, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-10%] left-[10%] w-[600px] h-[600px] bg-[#1A6FD4] opacity-[0.05] blur-[150px] rounded-full"
        />
        <motion.div
          animate={{ x: [0, -60, 60, 0], y: [0, 60, -60, 0], scale: [1, 0.8, 1.2, 1] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[10%] right-[5%] w-[800px] h-[800px] bg-[#5BB8FF] opacity-[0.03] blur-[180px] rounded-full"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Eyebrow */}
        <motion.div {...fade(0)} className="flex justify-start mb-16">
          <div className="px-5 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-[#5BB8FF] animate-pulse shadow-[0_0_10px_#5BB8FF]" />
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-white/80">
              What is hackX?
            </span>
          </div>
        </motion.div>

        {/* ── Two-Column Layout: Left = Narrative, Right = Bento Stats ── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-20 items-start">

          {/* LEFT — Narrative */}
          <div className="md:col-span-6 flex flex-col space-y-8 md:pt-4">
            <motion.h2
              {...fade(0.05)}
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.05]"
            >
              More Than a<br className="hidden md:block" /> Hackathon.
            </motion.h2>

            <motion.div {...fade(0.15)} className="space-y-6 text-[1.05rem] md:text-[1.15rem] text-white/55 font-light leading-relaxed">
              <p>
                hackX is Sri Lanka&apos;s premier inter-university startup challenge, organised by the Industrial
                Management Science Students&apos; Association at the Department of Industrial Management,
                University of Kelaniya.
              </p>
              <p>
                Since 2015, hackX has brought together the sharpest undergraduate minds from across the
                country to turn real problems into scalable, investable solutions — through mentorship,
                business development, prototype building, and a Grand Finals stage.
              </p>
            </motion.div>

            <motion.div {...fade(0.25)}>
              <button className="btn-primary">
                Delegate Booklet
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                </svg>
              </button>
            </motion.div>
          </div>

          {/* RIGHT — Bento Stats Grid */}
          <div className="md:col-span-6 grid grid-cols-2 gap-5">
            {/* Stat: 11 Editions */}
            <StatCard className="col-span-1 min-h-[200px] p-8 flex flex-col justify-center items-center text-center" delay={0.1}>
              <div className="text-5xl md:text-6xl font-black text-white mb-2 tracking-tighter">11</div>
              <p className="text-white/75 font-medium tracking-wide text-sm">Editions</p>
              <p className="text-[10px] text-white/35 mt-1 uppercase tracking-widest">10+ Years Impact</p>
            </StatCard>

            {/* Stat: 24 Universities */}
            <StatCard className="col-span-1 min-h-[200px] p-8 flex flex-col justify-center items-center text-center" delay={0.18}>
              <div className="text-5xl md:text-6xl font-black text-white mb-2 tracking-tighter">24</div>
              <p className="text-white/75 font-medium tracking-wide text-sm">Universities</p>
              <p className="text-[10px] text-white/35 mt-1 uppercase tracking-widest">In 2025</p>
            </StatCard>

            {/* Stat: 265+ Teams — spans full width */}
            <StatCard className="col-span-2 min-h-[220px] p-10 flex flex-col justify-center items-center text-center" delay={0.26}>
              <div
                className="text-6xl md:text-7xl font-black mb-3 tracking-tighter"
                style={{
                  background: "linear-gradient(135deg, #5BB8FF 0%, #ffffff 60%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  filter: "drop-shadow(0 0 18px rgba(91,184,255,0.35))",
                }}
              >
                265+
              </div>
              <p className="text-white/75 font-medium text-lg tracking-wide">Teams Participating</p>
              <p className="text-xs text-white/35 mt-1 uppercase tracking-widest">Across The Country</p>
            </StatCard>


          </div>
        </div>

        {/* ── Video Player ── */}
        <motion.div
          {...fade(0.2)}
          className="w-full mt-28 md:mt-40"
        >
          {/* Label */}
          <motion.p {...fade(0.1)} className="text-xs font-bold tracking-[0.2em] uppercase text-white/40 mb-6 text-center">
            Watch — hackX 10.0 Grand Finals
          </motion.p>

          <div className="relative w-full rounded-[2rem] p-[1px] group">
            {/* Animated shimmer border */}
            <div
              className="absolute inset-0 rounded-[2rem] opacity-60 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
              style={{
                background: "linear-gradient(90deg, rgba(91,184,255,0) 0%, rgba(91,184,255,0.7) 50%, rgba(91,184,255,0) 100%)",
                backgroundSize: "200% 100%",
                animation: "shimmerBorder 3s linear infinite",
              }}
            />
            {/* Glow */}
            <div className="absolute inset-0 rounded-[2rem] bg-[#5BB8FF] opacity-[0.06] blur-2xl pointer-events-none group-hover:opacity-[0.12] transition-opacity duration-700" />

            {/* Frame */}
            <div className="relative rounded-[2rem] bg-[#010814]/90 backdrop-blur-3xl p-3 md:p-5 border border-white/5">
              <div className="aspect-video w-full rounded-[1.25rem] overflow-hidden bg-black relative border border-white/10 shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)]">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/JSFG-IE8n_c?modestbranding=1&rel=0&color=white"
                  title="hackX Previous Year Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                  style={{ border: 0 }}
                />
              </div>
            </div>

            <style>{`
              @keyframes shimmerBorder {
                0% { background-position: 200% 0; }
                100% { background-position: -200% 0; }
              }
            `}</style>
          </div>
        </motion.div>
      </div>

      {/* Seamless bottom fade into next section */}
      <div
        className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, #010814)" }}
      />
    </section>
  );
}
