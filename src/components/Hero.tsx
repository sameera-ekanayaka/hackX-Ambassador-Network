"use client";

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import ShaderBackground from './ShaderBackground';
import UnderwaterEffect from './UnderwaterEffect';
import HeroForeground from './HeroForeground';

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);

  // Track the Hero section's scroll relative to the viewport
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Fade out title and buttons as the user scrolls down
  const titleOp = useTransform(scrollYProgress, [0, 0.6], [1, 0], { clamp: true });
  const titleY  = useTransform(scrollYProgress, [0, 0.6], ["0px", "-40px"], { clamp: true });
  
  const botOp   = useTransform(scrollYProgress, [0, 0.5], [1, 0], { clamp: true });
  const botY    = useTransform(scrollYProgress, [0, 0.5], ["0px", "-20px"], { clamp: true });

  // Zoom in the background and foreground layers (scale 1.0 -> 1.3) over the scroll
  const zoomScale = useTransform(scrollYProgress, [0, 1], [1.0, 1.3], { clamp: true });

  // BG scroll parallax (makes the background scroll slower)
  const bgY = useTransform(scrollYProgress, [0, 1], ["0px", "150px"], { clamp: true });

  return (
    <motion.section
      ref={ref}
      style={{
        position: "relative",
        zIndex: 1,
        width: "100%",
        height: "100vh",
        overflow: "hidden",
      }}
    >

      {/* ── z-2: WebGL Shader (atmospheric tint across full hero) ── */}
      <div style={{ position: "absolute", inset: 0, zIndex: 2, overflow: "hidden" }}>
        <ShaderBackground />
      </div>

      {/* ── z-3: BG Image + Underwater Effects ── */}
      {/* Outer: scroll parallax (y + scale) | Inner: entry zoom-IN animation */}
      <motion.div style={{
        position: "absolute", inset: 0, zIndex: 3,
        y: bgY, scale: zoomScale, transformOrigin: "center center",
        overflow: "hidden",
      }}>
        <motion.div
          initial={{ scale: 0.92, opacity: 0 }}
          animate={{ scale: 1,   opacity: 1 }}
          transition={{ duration: 2.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ position: "absolute", inset: 0, transformOrigin: "center center" }}
        >
          <Image
            src="/Hero - BG Img.png"
            alt=""
            fill
            priority
            style={{ objectFit: "cover", objectPosition: "center center" }}
            quality={95}
          />
          {/* Water caustics + bubble particles — only over the BG image */}
          <UnderwaterEffect />
        </motion.div>
      </motion.div>

      {/* ── z-4: Dark atmosphere overlay (between BG and title) ── */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 4, pointerEvents: "none",
        background: [
          "radial-gradient(ellipse 60% 60% at 50% 44%, rgba(1,8,20,0.1) 0%, rgba(1,8,20,0.65) 100%)",
          "linear-gradient(to bottom, rgba(1,8,20,0.35) 0%, rgba(4,26,58,0.3) 50%, rgba(1,8,20,0.88) 100%)",
        ].join(", "),
      }} />

      {/* ── z-5: Hero Title (seen through the cave-opening window) ── */}
      <motion.div style={{
        position: "absolute", inset: 0, zIndex: 5,
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "flex-start",
        paddingTop: "clamp(110px, 22vh, 200px)",
        y: titleY, opacity: titleOp,
      }}>
        <h1 style={{
          fontFamily: "'TT Hoves Pro Expanded', 'TT Hoves Pro', sans-serif",
          fontWeight: 800,
          textAlign: "center",
          lineHeight: 1.07,
          letterSpacing: "-0.025em",
          margin: 0, padding: "0 20px",
        }}>
          {/* Line 1 */}
          <motion.span
            initial={{ opacity: 0, y: 28, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            style={{
              display: "block",
              fontSize: "clamp(2.2rem, 4.8vw, 4.5rem)",
              color: "#ffffff",
              // NO text shadow per user request
            }}
          >
            Sri Lanka&apos;s Premier
          </motion.span>

          {/* Line 2 — sky-blue gradient */}
          <motion.span
            initial={{ opacity: 0, y: 28, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.9, delay: 0.38, ease: [0.22, 1, 0.36, 1] }}
            style={{
              display: "block",
              fontSize: "clamp(2.2rem, 4.8vw, 4.5rem)",
              background: "linear-gradient(100deg, #5BB8FF 0%, #d6f0ff 50%, #5BB8FF 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            National Startup
          </motion.span>

          {/* Line 3 */}
          <motion.span
            initial={{ opacity: 0, y: 28, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.9, delay: 0.56, ease: [0.22, 1, 0.36, 1] }}
            style={{
              display: "block",
              fontSize: "clamp(2.2rem, 4.8vw, 4.5rem)",
              color: "rgba(255,255,255,0.88)",
            }}
          >
            Challenge.
          </motion.span>
        </h1>
      </motion.div>

      {/* ── z-50: Hero Foreground ── */}
      <HeroForeground scrollProgress={scrollYProgress} />

      {/* ── Bottom fade overlay to fade the Hero Foreground into the dark background ── */}
      <div style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: "-2px",
        height: "380px",
        zIndex: 51,
        background: "linear-gradient(to bottom, transparent 0%, rgba(1, 8, 20, 0.15) 20%, rgba(1, 8, 20, 0.6) 60%, rgba(1, 8, 20, 0.9) 85%, #010814 100%)",
        pointerEvents: "none",
      }} />



      {/* ── z-60: Subtitle + Buttons (above the foreground) ── */}
      <motion.div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        zIndex: 60,
        display: "flex", flexDirection: "column", alignItems: "center",
        paddingBottom: "clamp(28px, 5.5vh, 60px)",
        y: botY, opacity: botOp,
      }}>

        {/* Atmospheric bottom fade — no visible box */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          height: "300px", pointerEvents: "none", zIndex: -1,
          background: "linear-gradient(to bottom, transparent 0%, rgba(1,8,20,0.45) 40%, rgba(1,8,20,0.78) 100%)",
        }} />

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily: "'TT Hoves Pro', sans-serif",
            fontSize: "clamp(0.88rem, 1.5vw, 1.1rem)",
            fontWeight: 300,
            color: "rgba(255,255,255,0.62)",
            textAlign: "center",
            maxWidth: "440px",
            lineHeight: 1.8,
            letterSpacing: "0.01em",
            marginBottom: "26px",
            padding: "0 24px",
          }}
        >
          Where university students turn bold ideas into real ventures.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: "flex", gap: "14px", alignItems: "center", flexWrap: "wrap", justifyContent: "center" }}
        >
          <button className="btn-primary">
            Register Now
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
          <button className="btn-secondary">
            Learn More
          </button>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.9 }}
          style={{
            display: "flex", flexDirection: "column",
            alignItems: "center", gap: "7px", marginTop: "26px",
          }}
        >
          <span style={{
            fontFamily: "'TT Hoves Pro', sans-serif",
            fontSize: "0.6rem", letterSpacing: "0.24em",
            color: "rgba(255,255,255,0.2)", textTransform: "uppercase",
          }}>Scroll to explore</span>

          {/* Scroll wheel — flexbox for reliable dot centering */}
          <div style={{
            width: "22px", height: "36px",
            border: "1.5px solid rgba(91,184,255,0.22)",
            borderRadius: "11px",
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            paddingTop: "5px",
            boxSizing: "border-box",
          }}>
            <div className="scroll-dot" style={{
              width: "4px", height: "4px",
              borderRadius: "50%",
              background: "#5BB8FF",
              flexShrink: 0,
            }} />
          </div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
