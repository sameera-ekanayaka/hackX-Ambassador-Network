"use client";

import * as React from "react";
import { motion, Variants } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

interface HeroSectionProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title: React.ReactNode;
  subtitle: string;
  primaryButtonText: React.ReactNode;
  onPrimaryClick?: () => void;
  secondaryButtonText?: string;
  onSecondaryClick?: () => void;
  imageUrl: string;
  foregroundUrl?: string;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.18, delayChildren: 0.2 },
  },
};

const itemVariants: Variants = {
  hidden: { y: 28, opacity: 0, filter: "blur(6px)" },
  visible: {
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

const HeroSection = React.forwardRef<HTMLDivElement, HeroSectionProps>(
  (
    {
      className,
      title,
      subtitle,
      primaryButtonText,
      onPrimaryClick,
      secondaryButtonText,
      onSecondaryClick,
      imageUrl,
      foregroundUrl,
      ...props
    },
    ref
  ) => {
    return (
      <section
        ref={ref}
        className={cn(
          "relative flex min-h-[90vh] w-full items-center justify-center overflow-hidden",
          className
        )}
        {...props}
      >
        {/* Background Image */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${imageUrl})` }}
          aria-hidden="true"
        />

        {/* Dark gradient overlay — bottom-heavy so text pops */}
        <div
          className="absolute inset-0 z-[1]"
          style={{
            background:
              "linear-gradient(to top, rgba(1,8,20,0.92) 0%, rgba(1,8,20,0.55) 50%, rgba(1,8,20,0.30) 100%)",
          }}
          aria-hidden="true"
        />

        {/* Left/right edge fade */}
        <div
          className="absolute inset-0 z-[1] hidden md:block"
          style={{
            background:
              "linear-gradient(to right, rgba(1,8,20,0.5) 0%, transparent 30%, transparent 70%, rgba(1,8,20,0.5) 100%)",
          }}
          aria-hidden="true"
        />

        {/* Animated blue glow blobs */}
        <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
          <motion.div
            animate={{ x: [0, 30, -30, 0], y: [0, -40, 40, 0], scale: [1, 1.05, 0.95, 1] }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#1A6FD4] opacity-[0.07] blur-[140px] rounded-full"
          />
          <motion.div
            animate={{ x: [0, -40, 40, 0], y: [0, 40, -40, 0], scale: [1, 0.9, 1.1, 1] }}
            transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#5BB8FF] opacity-[0.05] blur-[160px] rounded-full"
          />
        </div>

        {/* Optional foreground image layer */}
        {foregroundUrl && (
          <div
            className="absolute inset-0 z-[2] bg-contain bg-bottom bg-no-repeat pointer-events-none"
            style={{ backgroundImage: `url(${foregroundUrl})` }}
            aria-hidden="true"
          />
        )}

        {/* Content */}
        <motion.div
          className="relative z-10 flex max-w-4xl flex-col items-center justify-center text-center px-4 sm:px-6 pt-28 sm:pt-32 pb-16 sm:pb-20"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black text-white tracking-tight leading-[1.05] mb-5 sm:mb-6"
            style={{ fontFamily: "'TT Hoves Pro Expanded', 'TT Hoves Pro', sans-serif" }}
            variants={itemVariants}
          >
            {title}
          </motion.h1>

          <motion.p
            className="text-base sm:text-lg md:text-xl text-white/60 font-light leading-relaxed max-w-2xl mb-8 sm:mb-12"
            variants={itemVariants}
          >
            {subtitle}
          </motion.p>

          <motion.div
            className="flex items-center gap-4 flex-wrap justify-center"
            variants={itemVariants}
          >
            <Button
              size="lg"
              className="btn-primary"
              onClick={onPrimaryClick}
            >
              {primaryButtonText}
            </Button>

            {secondaryButtonText && (
              <Button
                size="lg"
                variant="secondary"
                onClick={onSecondaryClick}
              >
                {secondaryButtonText}
              </Button>
            )}
          </motion.div>
        </motion.div>
      </section>
    );
  }
);

HeroSection.displayName = "HeroSection";

export { HeroSection };
