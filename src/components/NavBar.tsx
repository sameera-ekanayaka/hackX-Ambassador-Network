"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");

  const navLinks = [
    { label: "About", href: "#about" },
    { label: "Rewards", href: "#rewards" },
    { label: "Journey", href: "#journey" },
    { label: "FAQ", href: "#chatbot" },
    { label: "Contact", href: "#contact" },
    { label: "Apply", href: "#apply-form" }
  ];

  useEffect(() => {
    const sections = ["about", "rewards", "journey", "chatbot", "contact", "apply-form"];

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      let currentSection = "";
      
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 160 && rect.bottom > 160) {
            currentSection = sectionId;
            break;
          }
        }
      }

      const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50;
      if (isAtBottom && sections.length > 0) {
        currentSection = sections[sections.length - 1];
      }

      setActiveSection(currentSection);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
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
          <nav className="hidden lg:flex items-center gap-1 bg-white/[0.02] border border-white/[0.06] rounded-full p-1 relative backdrop-blur-md">
            {navLinks.map((item) => {
              const isActive = item.href === `#${activeSection}`;

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`relative px-4 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-full transition-colors duration-300 ${
                    isActive
                      ? "text-white"
                      : "text-white/60 hover:text-white/90"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeNavTab"
                      className="absolute inset-0 bg-white/[0.08] border border-white/[0.12] rounded-full shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),_0_8px_16px_rgba(0,0,0,0.2)]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      style={{ originY: "0px" }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* CTA Buttons */}
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="hidden sm:inline-flex items-center justify-center px-5 py-2 rounded-full text-sm font-semibold text-white/80 hover:text-white bg-white/[0.04] border border-white/10 hover:border-white/25 hover:bg-white/[0.08] transition-all duration-300 cursor-pointer"
            >
              Portal Login
            </Link>
            <button
              onClick={() => {
                const el = document.getElementById("apply-form");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
              className="flex items-center justify-center px-5 py-2 rounded-full text-sm font-bold text-white transition-all duration-300 cursor-pointer"
              style={{
                background: "linear-gradient(135deg, #1A6FD4 0%, #5BB8FF 100%)",
                boxShadow: "0 0 20px rgba(91,184,255,0.25), inset 0 1px 0 rgba(255,255,255,0.2)",
              }}
              onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 0 32px rgba(91,184,255,0.5), inset 0 1px 0 rgba(255,255,255,0.2)")}
              onMouseLeave={e => (e.currentTarget.style.boxShadow = "0 0 20px rgba(91,184,255,0.25), inset 0 1px 0 rgba(255,255,255,0.2)")}
            >
              Apply Now
            </button>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
