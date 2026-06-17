"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

/* ─── Event Data ─── */
const events = [
  {
    id: "registrations",
    date: "June 23",
    title: "Registrations Open",
    description:
      "Doors open to universities across Sri Lanka. Free to enter. Just bring an idea worth fighting for.",
    accentColor: "#5BB8FF",
    imageUrl:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "proposal",
    date: "July 31",
    title: "Proposal Submission",
    description:
      "Teams submit structured proposals and a one to two minute product introduction video, screened by industry professionals.",
    accentColor: "#1A6FD4",
    imageUrl:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "designx",
    date: "Sep – Oct",
    title: "designX Workshops",
    description:
      "Four expert-led sessions covering business modelling, startup structuring, and market validation. Exclusive to semi-finalists.",
    accentColor: "#F5A524",
    imageUrl:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "ideax",
    date: "October 3",
    title: "ideaX Semi-Finals",
    description:
      "Thirty teams. One stage. Present a working prototype to a panel of expert judges and earn your spot at the Grand Finals.",
    accentColor: "#5BB8FF",
    imageUrl:
      "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "finals",
    date: "November 11",
    title: "Grand Finals",
    description:
      "The main event. Finalist teams present fully developed solutions before industry leaders, investors, and government officials.",
    accentColor: "#F5A524",
    imageUrl:
      "https://images.unsplash.com/photo-1531058020387-3be344556be6?w=800&auto=format&fit=crop&q=80",
  },
];

/* ════════════════════════════════════════════
   START ICON — diamond gem (2D flat, sky blue)
   Sits flush at the very top of the line
   ════════════════════════════════════════════ */
function StartGem() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex items-center justify-center z-20"
      style={{ width: 48, height: 48 }}
    >
      {/* Soft glow */}
      <div
        className="absolute inset-0 rounded-full blur-lg"
        style={{ background: "radial-gradient(circle, rgba(91,184,255,0.4) 0%, transparent 70%)" }}
      />
      <svg viewBox="0 0 48 48" width={48} height={48} style={{ overflow: "visible" }}>
        <defs>
          <linearGradient id="gem-fill" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#d6f0ff" />
            <stop offset="45%" stopColor="#5BB8FF" />
            <stop offset="100%" stopColor="#1A6FD4" />
          </linearGradient>
          <linearGradient id="gem-shade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#5BB8FF" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#0A3878" stopOpacity="0.95" />
          </linearGradient>
        </defs>

        {/* Outer diamond shape */}
        {/* top facet */}
        <polygon points="24,3 9,18 24,22 39,18" fill="url(#gem-fill)" />
        {/* bottom-left facet */}
        <polygon points="9,18 24,22 24,45" fill="url(#gem-shade)" />
        {/* bottom-right facet */}
        <polygon points="39,18 24,22 24,45" fill="#1A6FD4" opacity="0.85" />

        {/* Edge lines */}
        <polyline points="24,3 9,18 24,45 39,18 24,3"
          fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="0.8" strokeLinejoin="round" />
        <line x1="9" y1="18" x2="39" y2="18"
          stroke="rgba(255,255,255,0.2)" strokeWidth="0.6" />
        <line x1="24" y1="22" x2="24" y2="45"
          stroke="rgba(255,255,255,0.12)" strokeWidth="0.6" />

        {/* Glint */}
        <ellipse cx="21" cy="11" rx="3" ry="2"
          fill="white" opacity="0.5" transform="rotate(-15 21 11)" />
      </svg>
    </motion.div>
  );
}

/* ════════════════════════════════════════════
   END ICON — trophy cup (2D flat, gold)
   Sits flush at the very bottom of the line
   ════════════════════════════════════════════ */
function EndTrophy() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex items-center justify-center z-20"
      style={{ width: 52, height: 52 }}
    >
      {/* Pulsing glow */}
      <motion.div
        className="absolute inset-0 rounded-full blur-lg pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(245,165,36,0.45) 0%, transparent 70%)" }}
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      />
      <svg viewBox="0 0 52 52" width={52} height={52} style={{ overflow: "visible" }}>
        <defs>
          <linearGradient id="trophy-body" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFE082" />
            <stop offset="50%" stopColor="#F5A524" />
            <stop offset="100%" stopColor="#c17200" />
          </linearGradient>
          <linearGradient id="trophy-base" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F5A524" />
            <stop offset="100%" stopColor="#7a4400" />
          </linearGradient>
        </defs>

        {/* Cup body */}
        <path
          d="M16,8 L36,8 L33,26 Q26,32 26,32 Q26,32 19,26 Z"
          fill="url(#trophy-body)"
        />
        {/* Left handle arc */}
        <path
          d="M16,10 Q6,10 6,18 Q6,26 16,24"
          fill="none" stroke="url(#trophy-body)" strokeWidth="4" strokeLinecap="round"
        />
        {/* Right handle arc */}
        <path
          d="M36,10 Q46,10 46,18 Q46,26 36,24"
          fill="none" stroke="url(#trophy-body)" strokeWidth="4" strokeLinecap="round"
        />
        {/* Stem */}
        <rect x="23" y="32" width="6" height="7" fill="#c17200" rx="1" />
        {/* Base plate */}
        <rect x="15" y="38" width="22" height="5" rx="2" fill="url(#trophy-base)" />
        {/* Base highlight line */}
        <line x1="16" y1="39.5" x2="36" y2="39.5"
          stroke="rgba(255,230,100,0.4)" strokeWidth="1" />

        {/* Cup highlight */}
        <path
          d="M19,10 Q20,9 24,9"
          fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.2" strokeLinecap="round"
        />

        {/* Star on cup */}
        <polygon
          points="26,14 27.2,17.4 30.8,17.4 28,19.4 29.2,22.8 26,20.8 22.8,22.8 24,19.4 21.2,17.4 24.8,17.4"
          fill="rgba(255,255,255,0.5)"
        />
      </svg>
    </motion.div>
  );
}

/* ─── Individual event row ─── */
function EventRow({
  event,
  index,
}: {
  event: (typeof events)[0];
  index: number;
}) {
  const rowRef = useRef<HTMLDivElement>(null);
  const isEven = index % 2 === 0;

  const { scrollYProgress } = useScroll({
    target: rowRef,
    offset: ["start 80%", "start 30%"],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const cardX = useTransform(scrollYProgress, [0, 1], [isEven ? -40 : 40, 0]);
  const imgX = useTransform(scrollYProgress, [0, 1], [isEven ? 40 : -40, 0]);

  return (
    <div
      ref={rowRef}
      className="relative grid items-center gap-0 py-16 md:py-20"
      style={{ gridTemplateColumns: "1fr 48px 1fr" }}
    >
      {/* ── LEFT ── */}
      <div className="flex justify-end pr-8 md:pr-12">
        {isEven ? (
          <motion.div style={{ opacity, x: cardX }}>
            <GlassCard event={event} />
          </motion.div>
        ) : (
          <motion.div style={{ opacity, x: imgX }} className="w-full max-w-[420px]">
            <EventImage event={event} />
          </motion.div>
        )}
      </div>

      {/* ── CENTER dot ── */}
      <div className="flex justify-center items-center relative z-10">
        <motion.div style={{ opacity }}>
          <motion.div
            className="w-4 h-4 rounded-full border-2 flex items-center justify-center"
            style={{ borderColor: event.accentColor }}
          >
            <motion.div
              className="w-2 h-2 rounded-full"
              style={{ background: event.accentColor }}
              animate={{
                boxShadow: [
                  `0 0 0px 0px ${event.accentColor}00`,
                  `0 0 8px 3px ${event.accentColor}70`,
                  `0 0 0px 0px ${event.accentColor}00`,
                ],
              }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>
      </div>

      {/* ── RIGHT ── */}
      <div className="flex justify-start pl-8 md:pl-12">
        {isEven ? (
          <motion.div style={{ opacity, x: imgX }} className="w-full max-w-[420px]">
            <EventImage event={event} />
          </motion.div>
        ) : (
          <motion.div style={{ opacity, x: cardX }}>
            <GlassCard event={event} />
          </motion.div>
        )}
      </div>
    </div>
  );
}

/* ─── Liquid glass card ─── */
function GlassCard({ event }: { event: (typeof events)[0] }) {
  return (
    <div
      className="relative w-full max-w-[420px] rounded-2xl p-7 overflow-hidden"
      style={{
        background: "rgba(4, 20, 50, 0.45)",
        backdropFilter: "blur(24px) saturate(1.8)",
        WebkitBackdropFilter: "blur(24px) saturate(1.8)",
        border: `1px solid ${event.accentColor}28`,
        boxShadow: `0 8px 40px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.08), 0 0 24px ${event.accentColor}08`,
      }}
    >
      {/* Top refraction line */}
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background: `linear-gradient(90deg, transparent, ${event.accentColor}55, transparent)`,
        }}
      />
      {/* Corner glow */}
      <div
        className="absolute top-0 right-0 w-32 h-32 pointer-events-none"
        style={{
          background: `radial-gradient(circle at top right, ${event.accentColor}12 0%, transparent 70%)`,
        }}
      />

      <div
        className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-5"
        style={{
          background: `${event.accentColor}15`,
          border: `1px solid ${event.accentColor}35`,
          color: event.accentColor,
        }}
      >
        <span className="w-1.5 h-1.5 rounded-full" style={{ background: event.accentColor }} />
        {event.date}
      </div>

      <h3 className="text-white font-black text-xl md:text-2xl tracking-tight leading-tight mb-3">
        {event.title}
      </h3>
      <p className="text-white/55 text-sm leading-relaxed font-light">
        {event.description}
      </p>
    </div>
  );
}

/* ─── Event image ─── */
function EventImage({ event }: { event: (typeof events)[0] }) {
  return (
    <div
      className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden"
      style={{
        border: `1px solid ${event.accentColor}20`,
        boxShadow: `0 12px 40px rgba(0,0,0,0.5), 0 0 20px ${event.accentColor}10`,
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={event.imageUrl} alt={event.title} className="w-full h-full object-cover" />
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(135deg, rgba(1,8,20,0.35) 0%, rgba(1,8,20,0.08) 100%)" }}
      />
    </div>
  );
}

/* ════════════════════════════════════════════
   MAIN SECTION
   ════════════════════════════════════════════ */
export default function JourneySection() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 20%", "end 80%"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 20,
    mass: 0.8,
  });

  const lineHeight = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  /* The center column is 48px wide — line is 1px centered within it */
  const lineLeft = "calc(50% - 0.5px)";

  return (
    <section
      id="timeline"
      ref={sectionRef}
      className="relative w-full bg-[#010814] py-32 overflow-hidden z-10"
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-[200px]"
          style={{ background: "rgba(91,184,255,0.03)" }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">

        {/* ─── Header ─── */}
        <div className="text-center mb-24">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-6xl font-black text-white tracking-tight"
          >
            The Journey
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-white/40 text-sm mt-4 tracking-wide"
          >
            Every great venture starts somewhere. Yours starts here.
          </motion.p>
        </div>

        {/* ─── Timeline body ─── */}
        {/*
          Structure:
            [icon row]          ← StartGem, line begins here
            [event rows...]     ← each has its own dot
            [icon row]          ← EndTrophy, line ends here

          The line is absolutely positioned across the full inner block.
          We use padding-top/bottom on the icon rows so the line runs
          edge-to-edge through the center of each icon.
        */}
        <div className="relative" id="timeline-body">

          {/* ── Faint background rail — spans full height of this block ── */}
          <div
            className="absolute top-0 bottom-0 w-px pointer-events-none"
            style={{ left: lineLeft, background: "rgba(255,255,255,0.06)" }}
          />

          {/* ── Scroll-filled colored line ── */}
          <div
            className="absolute top-0 w-px overflow-hidden pointer-events-none"
            style={{ left: lineLeft, height: "100%" }}
          >
            <motion.div
              className="w-full origin-top"
              style={{
                height: lineHeight,
                background: "linear-gradient(to bottom, #5BB8FF 0%, #1A6FD4 50%, #F5A524 100%)",
                boxShadow: "0 0 6px rgba(91,184,255,0.5)",
              }}
            />
          </div>

          {/* ── START GEM ── */}
          <div
            className="relative z-20 flex justify-center"
            style={{ gridTemplateColumns: "1fr 48px 1fr" }}
          >
            <StartGem />
          </div>

          {/* ── EVENT ROWS ── */}
          {events.map((event, index) => (
            <EventRow key={event.id} event={event} index={index} />
          ))}

          {/* ── END TROPHY ── */}
          <div className="relative z-20 flex justify-center">
            <EndTrophy />
          </div>
        </div>
      </div>

      {/* Bottom blend */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, #010814)" }}
      />
    </section>
  );
}
