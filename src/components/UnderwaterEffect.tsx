"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function UnderwaterEffect() {
  const [bubbles, setBubbles] = useState<Array<{ id: number; left: string; size: number; duration: number; delay: number }>>([]);

  useEffect(() => {
    // Generate random bubbles
    const newBubbles = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 6 + 2, // 2px to 8px
      duration: Math.random() * 10 + 10, // 10s to 20s
      delay: Math.random() * 5,
    }));
    setBubbles(newBubbles);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {/* Deep water gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#010814]/10 via-[#0A3878]/5 to-[#010814]/80 z-10" />
      
      {/* Light rays from top */}
      <div 
        className="absolute top-0 left-0 right-0 h-[60vh] opacity-20"
        style={{
          background: "linear-gradient(180deg, rgba(91,184,255,0.15) 0%, rgba(91,184,255,0) 100%)",
          maskImage: "repeating-linear-gradient(to right, transparent, transparent 40px, black 40px, black 80px)",
          WebkitMaskImage: "repeating-linear-gradient(to right, transparent, transparent 40px, black 40px, black 80px)"
        }}
      />

      {/* Floating Bubbles */}
      {bubbles.map((bubble) => (
        <motion.div
          key={bubble.id}
          className="absolute bottom-[-20px] rounded-full bg-white/20 blur-[1px]"
          style={{
            left: bubble.left,
            width: bubble.size,
            height: bubble.size,
          }}
          animate={{
            y: ["0vh", "-120vh"],
            x: ["0px", `${Math.random() * 100 - 50}px`],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: bubble.duration,
            repeat: Infinity,
            delay: bubble.delay,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}
