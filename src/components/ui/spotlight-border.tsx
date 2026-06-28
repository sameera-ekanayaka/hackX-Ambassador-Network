"use client";

import { useState, ReactNode, CSSProperties } from "react";

interface SpotlightBorderProps {
  children: ReactNode;
  /** Must match the card's own border-radius exactly */
  borderRadius?: string;
  /** Seconds per full revolution */
  duration?: number;
  className?: string;
  style?: CSSProperties;
}

/**
 * Wraps any card with a continuously-spinning border beam.
 *
 * Technique: @property animates --border-angle (0deg → 360deg).
 * A conic-gradient uses that angle as its `from` position so the
 * comet sweeps the full 360° every cycle — no child-div rotation,
 * no translate drift, guaranteed full-perimeter travel.
 * CSS mask-composite:xor clips everything except the 1.5px border strip.
 */
export function SpotlightBorder({
  children,
  borderRadius = "24px",
  duration = 2.4,
  className = "",
  style,
}: SpotlightBorderProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`relative ${className}`}
      style={style}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}

      {/* Border beam — the conic-gradient's from-angle is animated directly */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          borderRadius,
          pointerEvents: "none",
          opacity: hovered ? 1 : 0,
          transition: "opacity 700ms ease",
          padding: "1.5px",
          // conic-gradient from var(--border-angle): the whole gradient rotates
          // as --border-angle goes 0→360deg, so the bright comet sweeps the full border
          background:
            "conic-gradient(from var(--border-angle, 0deg) at 50% 50%, transparent 0%, transparent 68%, rgba(26,111,212,0.3) 76%, rgba(91,184,255,0.8) 86%, rgba(210,240,255,1) 91%, rgba(91,184,255,0.8) 96%, transparent 100%)",
          animation: hovered
            ? `border-beam-rotate ${duration}s linear infinite`
            : "none",
          // only the 1.5px padding strip is visible
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          zIndex: 30,
        }}
      />
    </div>
  );
}
