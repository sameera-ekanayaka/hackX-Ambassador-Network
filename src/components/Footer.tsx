"use client";

import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    /*
      The footer is intentionally tall (min-height 680px) and uses overflow:hidden.
      All decorative images sit INSIDE these bounds — no overflow tricks needed.
      The statue is centered and sized to show its full height within the footer.
      Layer order (z-index):
        0 → Rotating glow circle  (deepest background)
        1 → Side pillars
        2 → Single gradient veil  (left/right fade + top blend)
        3 → Text content
        4 → Center statue         (topmost)
    */
    <footer
      className="w-full relative overflow-hidden"
      style={{ background: "#01050A", minHeight: "680px" }}
    >
      {/* Top blend — merges seamlessly with the section above */}
      <div
        className="absolute top-0 inset-x-0 h-48 pointer-events-none"
        style={{
          zIndex: 5,
          background: "linear-gradient(to bottom, #010814 0%, transparent 100%)"
        }}
      />

      {/* ── LAYER 0: Rotating glow circle ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1400px] h-[1400px] translate-y-1/2"
          style={{ opacity: 0.45 }}
        >
          <div className="footer-circle-spin relative w-full h-full">
            <Image
              src="/footer circle.png"
              alt=""
              fill
              style={{
                objectFit: "contain",
                filter:
                  "brightness(0) saturate(100%) invert(30%) sepia(90%) saturate(1500%) hue-rotate(200deg) brightness(1.6) drop-shadow(0 0 40px #1A6FD4) drop-shadow(0 0 100px rgba(26,111,212,0.6))"
              }}
            />
          </div>
        </div>
      </div>

      {/* ── LAYER 1: Side pillars ── */}
      {/* Left */}
      <div
        className="absolute bottom-0 left-0 w-[400px] h-[420px] pointer-events-none overflow-hidden"
        style={{ zIndex: 1, opacity: 0.75 }}
      >
        <div className="relative w-full h-full translate-y-16">
          <Image
            src="/footer-side.webp"
            alt=""
            fill
            style={{ objectFit: "contain", objectPosition: "bottom left" }}
          />
        </div>
      </div>

      {/* Right */}
      <div
        className="absolute bottom-0 right-0 w-[400px] h-[420px] pointer-events-none overflow-hidden"
        style={{ zIndex: 1, opacity: 0.75 }}
      >
        <div className="relative w-full h-full translate-y-16">
          <Image
            src="/footer-side.webp"
            alt=""
            fill
            style={{ objectFit: "contain", objectPosition: "bottom right", transform: "scaleX(-1)" }}
          />
        </div>
      </div>

      {/* ── LAYER 2: Single gradient veil ──
          Fades the edges so text is readable above the pillars.
          One CSS background with multiple stops — not two separate divs. */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 2,
          background:
            "linear-gradient(to right, #01050A 5%, transparent 28%, transparent 72%, #01050A 95%)"
        }}
      />

      {/* ── LAYER 3: Text & logos ── */}
      <div
        className="absolute bottom-0 inset-x-0 pb-8 px-12"
        style={{ zIndex: 3 }}
      >
        {/* Two-column row */}
        <div className="max-w-7xl mx-auto grid grid-cols-2 gap-6 mb-8">
          {/* Left */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="w-fit">
              <div className="relative" style={{ width: "130px", height: "40px" }}>
                <Image
                  src="/hackxlogo.webp"
                  alt="hackX Logo"
                  fill
                  style={{ objectFit: "contain", objectPosition: "left center" }}
                />
              </div>
            </Link>
            <p className="text-white/55 text-sm font-light max-w-[240px] leading-relaxed">
              Sri Lanka&apos;s premier national startup challenge for undergraduates across all universities.
            </p>
          </div>

          {/* Right */}
          <div className="flex flex-col items-end gap-4">
            <p className="text-white/55 text-sm font-light max-w-[280px] leading-relaxed text-right">
              Organized by the Dept. of Industrial Management, University of Kelaniya — under the Patronage of the Ministry of Science &amp; Technology and NSF Sri Lanka.
            </p>
            {/* Organizers logo strip */}
            <div
              className="relative overflow-hidden"
              style={{ width: "320px", height: "40px" }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 right-0 w-[320px] h-[140px]">
                <Image
                  src="/allorganizerslogo.webp"
                  alt="Organizers"
                  fill
                  style={{ objectFit: "contain", objectPosition: "right center" }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="max-w-7xl mx-auto pt-5 border-t border-white/10 flex items-center justify-between">
          <p className="text-xs text-white/30">&copy; {new Date().getFullYear()} hackX 11.0.</p>
          <div className="flex items-center gap-3">
            <a href="#" className="social-glass" aria-label="Facebook">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
            <a href="#" className="social-glass" aria-label="Instagram">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
            </a>
            <a href="#" className="social-glass" aria-label="YouTube">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>
            </a>
            <a href="#" className="social-glass" aria-label="TikTok">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 15.66a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.06z"/></svg>
            </a>
          </div>
        </div>
      </div>

      {/* ── LAYER 4: Center statue — on top of everything ──
          Anchored to the bottom, sized to fill the full footer height.
          overflow:hidden on the footer clips the bottom naturally.
          The head sits at the top of the footer where the gradient blends it above. */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{ zIndex: 4, width: "560px", height: "660px" }}
      >
        <Image
          src="/footer-center.webp"
          alt=""
          fill
          style={{ objectFit: "contain", objectPosition: "bottom center" }}
        />
        {/* Subtle bottom fade */}
        <div
          className="absolute inset-x-0 bottom-0 h-12"
          style={{ background: "linear-gradient(to top, #01050A, transparent)" }}
        />
      </div>
    </footer>
  );
}
