"use client";

import { AnimatePresence, motion } from "motion/react";

import { BrandMark } from "@/components/portfolio/BrandMark";

export function IntroOverlay({ introComplete }: { introComplete: boolean }) {
  return (
    <AnimatePresence>
      {!introComplete && (
        <motion.section
          key="intro"
          className="fixed inset-0 z-50 grid place-items-center overflow-hidden bg-background"
          aria-label="Portfolio opening"
          exit={{ backgroundColor: "rgba(255, 255, 255, 0)" }}
          transition={{ duration: 0.95, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.img
            layoutId="hero-image"
            src="/images/hero.avif"
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
          <BrandMark
            sharedLayout
            className="relative px-6 text-center editorial-heading text-[clamp(0.875rem,2.5vw,1.5rem)] tracking-[0.12em] text-white mix-blend-difference"
          />
        </motion.section>
      )}
    </AnimatePresence>
  );
}
