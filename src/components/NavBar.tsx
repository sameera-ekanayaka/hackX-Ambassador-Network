"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { X, Menu } from "lucide-react";

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { label: "About", href: "#about" },
    { label: "Rewards", href: "#rewards" },
    { label: "Leaderboard", href: "#leaderboard" },
    { label: "Journey", href: "#journey" },
    { label: "FAQ", href: "#chatbot" },
    { label: "Contact", href: "#contact" },
    { label: "Apply", href: "#apply-form" }
  ];

  useEffect(() => {
    const sectionIds = ["about", "rewards", "leaderboard", "journey", "chatbot", "contact", "apply-form"];

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      let bestSection = "";
      let bestCoverage = 0;

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const { top, bottom } = el.getBoundingClientRect();
          const visibleTop = Math.max(0, top);
          const visibleBottom = Math.min(window.innerHeight, bottom);
          const coverage = Math.max(0, visibleBottom - visibleTop);
          if (coverage > bestCoverage) {
            bestCoverage = coverage;
            bestSection = id;
          }
        }
      }

      setActiveSection(bestSection);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    // Small delay to let drawer close before scrolling
    setTimeout(() => {
      const id = href.replace("#", "");
      const el = document.getElementById(id);
      el?.scrollIntoView({ behavior: "smooth" });
    }, 200);
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50 pt-4 sm:pt-6 px-4 sm:px-6 pointer-events-none"
      >
        <div className="max-w-7xl mx-auto pointer-events-auto">
          {/* Liquid Glass Panel */}
          <div
            className="flex items-center justify-between rounded-full px-5 py-3 sm:py-3.5 transition-all duration-500"
            style={{
              background: scrolled
                ? "rgba(1, 8, 20, 0.65)"
                : "rgba(1, 8, 20, 0.45)",
              backdropFilter: "blur(24px) saturate(1.8)",
              WebkitBackdropFilter: "blur(24px) saturate(1.8)",
              border: "1px solid rgba(91, 184, 255, 0.15)",
              boxShadow: scrolled
                ? "0 10px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)"
                : "0 4px 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.08)",
            }}
          >
            {/* Logo */}
            <Link href="/" className="flex items-center group">
              <div className="relative" style={{ width: "100px", height: "30px" }}>
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
                    className={`relative px-4 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-full transition-all duration-300 ${
                      isActive
                        ? "text-white bg-white/[0.09] border border-white/[0.14] shadow-[inset_0_1px_1px_rgba(255,255,255,0.12),_0_4px_12px_rgba(0,0,0,0.2)]"
                        : "text-white/60 hover:text-white/90 border border-transparent"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* Right side: CTA + Hamburger */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* CTA Button — desktop/tablet only */}
              <button
                onClick={() => {
                  const el = document.getElementById("apply-form");
                  el?.scrollIntoView({ behavior: "smooth" });
                }}
                className="hidden md:flex items-center justify-center px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-bold text-white transition-all duration-300 cursor-pointer"
                style={{
                  background: "linear-gradient(135deg, #1A6FD4 0%, #5BB8FF 100%)",
                  boxShadow: "0 0 20px rgba(91,184,255,0.25), inset 0 1px 0 rgba(255,255,255,0.2)",
                }}
                onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 0 32px rgba(91,184,255,0.5), inset 0 1px 0 rgba(255,255,255,0.2)")}
                onMouseLeave={e => (e.currentTarget.style.boxShadow = "0 0 20px rgba(91,184,255,0.25), inset 0 1px 0 rgba(255,255,255,0.2)")}
              >
                Apply Now
              </button>

              {/* Hamburger — mobile only */}
              <button
                className="lg:hidden flex items-center justify-center w-10 h-10 rounded-full bg-white/[0.05] border border-white/[0.08] text-white/80 hover:text-white hover:bg-white/[0.10] transition-all duration-300"
                onClick={() => setMobileOpen(true)}
                aria-label="Open menu"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileOpen(false)}
            />

            {/* Drawer panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-0 right-0 bottom-0 z-[70] w-72 lg:hidden flex flex-col"
              style={{
                background: "rgba(1, 8, 20, 0.96)",
                backdropFilter: "blur(32px)",
                borderLeft: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-white/[0.06]">
                <div className="relative" style={{ width: "90px", height: "26px" }}>
                  <Image
                    src="/hackxlogo.webp"
                    alt="hackX Logo"
                    fill
                    style={{ objectFit: "contain", objectPosition: "left center" }}
                  />
                </div>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="w-8 h-8 rounded-full bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-white/60 hover:text-white transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Nav Links */}
              <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-1">
                {navLinks.map((item, idx) => {
                  const isActive = item.href === `#${activeSection}`;
                  return (
                    <motion.button
                      key={item.label}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05, duration: 0.3 }}
                      onClick={() => handleNavClick(item.href)}
                      className={`w-full text-left px-5 py-3.5 rounded-2xl text-sm font-semibold uppercase tracking-widest transition-all duration-300 ${
                        isActive
                          ? "text-white bg-[#1A6FD4]/20 border border-[#5BB8FF]/20"
                          : "text-white/55 hover:text-white hover:bg-white/[0.04] border border-transparent"
                      }`}
                    >
                      {item.label}
                    </motion.button>
                  );
                })}
              </nav>

              {/* Drawer Footer CTA */}
              <div className="px-6 pb-8 pt-4 border-t border-white/[0.06]">
                <button
                  onClick={() => handleNavClick("#apply-form")}
                  className="w-full py-3.5 rounded-full text-sm font-bold text-white text-center"
                  style={{
                    background: "linear-gradient(135deg, #1A6FD4 0%, #5BB8FF 100%)",
                    boxShadow: "0 0 20px rgba(91,184,255,0.25)",
                  }}
                >
                  Apply as Ambassador
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
