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
   3D GEM — top of the line (CSS + SVG facets)
   Rotates on Y-axis, showing lit facets
   ════════════════════════════════════════════ */
function GemCrystal() {
  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: 64, height: 64, perspective: "220px" }}
    >
      {/* Outer ambient glow */}
      <div
        className="absolute inset-0 rounded-full blur-xl"
        style={{ background: "radial-gradient(circle, rgba(91,184,255,0.35) 0%, transparent 70%)" }}
      />

      <motion.div
        style={{ transformStyle: "preserve-3d", width: 56, height: 56, position: "relative" }}
        animate={{ rotateY: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      >
        <svg
          viewBox="0 0 56 56"
          width={56}
          height={56}
          style={{ overflow: "visible", filter: "drop-shadow(0 0 8px rgba(91,184,255,0.7))" }}
        >
          <defs>
            {/* Face gradients simulating different light angles */}
            <linearGradient id="g-top-l" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#d6f0ff" />
              <stop offset="100%" stopColor="#5BB8FF" />
            </linearGradient>
            <linearGradient id="g-top-r" x1="1" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#7ecbff" />
              <stop offset="100%" stopColor="#1A6FD4" />
            </linearGradient>
            <linearGradient id="g-mid-l" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#1A6FD4" />
              <stop offset="100%" stopColor="#0A3878" />
            </linearGradient>
            <linearGradient id="g-mid-r" x1="1" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3a8de0" />
              <stop offset="100%" stopColor="#0A3878" />
            </linearGradient>
            <linearGradient id="g-bot-l" x1="0" y1="1" x2="1" y2="0">
              <stop offset="0%" stopColor="#041A3A" />
              <stop offset="100%" stopColor="#1A6FD4" />
            </linearGradient>
            <linearGradient id="g-bot-r" x1="1" y1="1" x2="0" y2="0">
              <stop offset="0%" stopColor="#041A3A" />
              <stop offset="100%" stopColor="#5BB8FF" />
            </linearGradient>
          </defs>

          {/* ── Gem shape: octahedron-ish diamond ──
              Center: 28,28
              Top:    28,4
              Left:   4,24   Right:  52,24
              Mid-L:  10,32  Mid-R:  46,32
              Bottom: 28,54
          */}
          {/* Upper-left face */}
          <polygon points="28,4 4,24 28,26"    fill="url(#g-top-l)" opacity="0.95" />
          {/* Upper-right face */}
          <polygon points="28,4 52,24 28,26"   fill="url(#g-top-r)" opacity="0.9" />
          {/* Left girdle face */}
          <polygon points="4,24 10,34 28,26"   fill="url(#g-mid-l)" opacity="0.85" />
          {/* Right girdle face */}
          <polygon points="52,24 46,34 28,26"  fill="url(#g-mid-r)" opacity="0.85" />
          {/* Lower-left face */}
          <polygon points="10,34 28,54 28,26"  fill="url(#g-bot-l)" opacity="0.9" />
          {/* Lower-right face */}
          <polygon points="46,34 28,54 28,26"  fill="url(#g-bot-r)" opacity="0.9" />
          {/* Left-bottom outer */}
          <polygon points="4,24 10,34 28,54 14,46" fill="url(#g-bot-l)" opacity="0.5" />
          {/* Right-bottom outer */}
          <polygon points="52,24 46,34 28,54 42,46" fill="url(#g-bot-r)" opacity="0.5" />

          {/* Edge highlights */}
          <line x1="28" y1="4"  x2="4"  y2="24" stroke="rgba(255,255,255,0.5)" strokeWidth="0.5" />
          <line x1="28" y1="4"  x2="52" y2="24" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5" />
          <line x1="28" y1="4"  x2="28" y2="26" stroke="rgba(255,255,255,0.6)" strokeWidth="0.5" />
          <line x1="28" y1="26" x2="28" y2="54" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />

          {/* Top glint */}
          <ellipse cx="26" cy="10" rx="3" ry="2"
            fill="white" opacity="0.55"
            transform="rotate(-20 26 10)"
          />
        </svg>
      </motion.div>
    </div>
  );
}

/* ════════════════════════════════════════════
   3D ORB — bottom of the line (gold trophy orb)
   Layered radial gradients + pulsing glow ring
   ════════════════════════════════════════════ */
function TrophyOrb() {
  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: 72, height: 72 }}
    >
      {/* Pulsing outer ring */}
      <motion.div
        className="absolute rounded-full border"
        style={{
          width: 68, height: 68,
          borderColor: "rgba(245,165,36,0.3)",
        }}
        animate={{ scale: [1, 1.25, 1], opacity: [0.6, 0, 0.6] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Second pulse ring */}
      <motion.div
        className="absolute rounded-full border"
        style={{
          width: 52, height: 52,
          borderColor: "rgba(245,165,36,0.4)",
        }}
        animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      />

      {/* The orb itself */}
      <motion.div
        className="relative rounded-full overflow-hidden"
        style={{ width: 44, height: 44 }}
        animate={{ rotateZ: 360 }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      >
        {/* Base sphere gradient */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: "radial-gradient(circle at 35% 32%, #FFD97A 0%, #F5A524 38%, #c17200 70%, #3a1f00 100%)",
          }}
        />
        {/* Specular highlight */}
        <div
          className="absolute rounded-full"
          style={{
            top: "12%", left: "18%",
            width: "38%", height: "28%",
            background: "radial-gradient(ellipse, rgba(255,255,255,0.65) 0%, rgba(255,255,255,0) 100%)",
            transform: "rotate(-20deg)",
          }}
        />
        {/* Atmosphere rim */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            boxShadow: "inset -6px -6px 14px rgba(0,0,0,0.5), inset 2px 2px 6px rgba(255,220,100,0.3)",
          }}
        />
        {/* Rotating band to show 3D spin */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: "linear-gradient(90deg, transparent 30%, rgba(255,200,50,0.15) 50%, transparent 70%)",
          }}
        />
      </motion.div>

      {/* Outer glow */}
      <div
        className="absolute inset-0 rounded-full blur-lg pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(245,165,36,0.3) 0%, transparent 70%)" }}
      />
    </div>
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
  const isEven = index % 2 === 0; // even → card left, image right

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
      className="relative grid grid-cols-[1fr_80px_1fr] items-center gap-0 py-16 md:py-20"
    >
      {/* ── LEFT SLOT ── */}
      <div className="flex justify-end pr-6 md:pr-10">
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

      {/* ── CENTER: dot on the line ── */}
      <div className="flex flex-col items-center justify-center relative z-10">
        <motion.div style={{ opacity }} className="flex items-center justify-center">
          <motion.div
            style={{ borderColor: event.accentColor }}
            className="w-5 h-5 rounded-full border-2 flex items-center justify-center"
          >
            <motion.div
              style={{ background: event.accentColor }}
              className="w-2.5 h-2.5 rounded-full"
              animate={{
                boxShadow: [
                  `0 0 0px 0px ${event.accentColor}00`,
                  `0 0 10px 4px ${event.accentColor}60`,
                  `0 0 0px 0px ${event.accentColor}00`,
                ],
              }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>
      </div>

      {/* ── RIGHT SLOT ── */}
      <div className="flex justify-start pl-6 md:pl-10">
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

/* ─── Liquid glass info card ─── */
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
      {/* Top-edge refraction highlight */}
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background: `linear-gradient(90deg, transparent, ${event.accentColor}50, transparent)`,
        }}
      />
      {/* Corner glow */}
      <div
        className="absolute top-0 right-0 w-32 h-32 pointer-events-none"
        style={{
          background: `radial-gradient(circle at top right, ${event.accentColor}12 0%, transparent 70%)`,
        }}
      />

      {/* Date badge */}
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

/* ─── Event image tile ─── */
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
        style={{
          background: `linear-gradient(135deg, rgba(1,8,20,0.35) 0%, rgba(1,8,20,0.1) 100%)`,
        }}
      />
      <div
        className="absolute inset-0"
        style={{ boxShadow: `inset 0 0 0 1px ${event.accentColor}20` }}
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

  return (
    <section
      id="timeline"
      ref={sectionRef}
      className="relative w-full bg-[#010814] py-32 overflow-hidden z-10"
    >
      {/* Ambient blob */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-[200px]"
          style={{ background: "rgba(91,184,255,0.03)" }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">

        {/* ─── Section Header ─── */}
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
        <div className="relative">

          {/* Faint rail — full height */}
          <div
            className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-px pointer-events-none"
            style={{ background: "rgba(255,255,255,0.06)" }}
          />

          {/* Scroll-filled colored line */}
          <div
            className="absolute left-1/2 top-0 -translate-x-1/2 w-px overflow-hidden pointer-events-none"
            style={{ height: "100%" }}
          >
            <motion.div
              className="w-full origin-top"
              style={{
                height: lineHeight,
                background: "linear-gradient(to bottom, #5BB8FF 0%, #1A6FD4 50%, #F5A524 100%)",
                boxShadow: "0 0 8px rgba(91,184,255,0.5)",
              }}
            />
          </div>

          {/* ── TOP 3D GEM — sits above the first event ── */}
          <div className="relative grid grid-cols-[1fr_80px_1fr] items-center pb-6">
            <div />
            <div className="flex justify-center items-center z-20">
              <GemCrystal />
            </div>
            <div />
          </div>

          {/* Events */}
          {events.map((event, index) => (
            <EventRow key={event.id} event={event} index={index} />
          ))}

          {/* ── BOTTOM 3D ORB — sits below the last event ── */}
          <div className="relative grid grid-cols-[1fr_80px_1fr] items-center pt-6">
            <div />
            <div className="flex justify-center items-center z-20">
              <TrophyOrb />
            </div>
            <div />
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
