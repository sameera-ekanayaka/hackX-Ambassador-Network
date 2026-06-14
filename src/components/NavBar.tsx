"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50"
      style={{ paddingTop: scrolled ? "12px" : "20px", paddingBottom: scrolled ? "12px" : "20px", transition: "padding 0.5s ease" }}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Liquid Glass Panel */}
        <div
          className="flex items-center justify-between rounded-full px-6 py-3 transition-all duration-500"
          style={{
            background: scrolled
              ? "rgba(1, 8, 20, 0.35)"
              : "rgba(255, 255, 255, 0.04)",
            backdropFilter: "blur(28px) saturate(1.8) brightness(1.15)",
            WebkitBackdropFilter: "blur(28px) saturate(1.8) brightness(1.15)",
            border: scrolled
              ? "1px solid rgba(255,255,255,0.10)"
              : "1px solid rgba(255,255,255,0.07)",
            boxShadow: scrolled
              ? "0 8px 40px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.08), 0 0 0 0.5px rgba(255,255,255,0.04)"
              : "0 4px 24px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.06)",
          }}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <div className="relative" style={{ width: "120px", height: "36px" }}>
              <Image
                src="/hackxlogo.webp"
                alt="hackX Logo"
                fill
                style={{ objectFit: "contain", objectPosition: "left center" }}
                priority
              />
            </div>
          </Link>

          {/* Desktop Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {["Timeline", "Ambassadors", "Memories", "FAQ"].map((item) => (
              <Link
                key={item}
                href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                className="text-sm font-medium text-white/65 hover:text-white transition-colors duration-200 tracking-wide"
              >
                {item}
              </Link>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="flex items-center gap-3">
            <button
              className="hidden md:flex items-center justify-center px-5 py-2 rounded-full text-sm font-medium text-white/70 hover:text-white transition-all duration-300"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.10)",
                backdropFilter: "blur(8px)",
              }}
            >
              Contact
            </button>
            <button
              className="flex items-center justify-center px-5 py-2 rounded-full text-sm font-bold text-white transition-all duration-300"
              style={{
                background: "linear-gradient(135deg, #1A6FD4 0%, #5BB8FF 100%)",
                boxShadow: "0 0 20px rgba(91,184,255,0.25), inset 0 1px 0 rgba(255,255,255,0.2)",
              }}
              onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 0 32px rgba(91,184,255,0.5), inset 0 1px 0 rgba(255,255,255,0.2)")}
              onMouseLeave={e => (e.currentTarget.style.boxShadow = "0 0 20px rgba(91,184,255,0.25), inset 0 1px 0 rgba(255,255,255,0.2)")}
            >
              Register Now
            </button>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
