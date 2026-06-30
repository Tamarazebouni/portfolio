"use client";

import { AnimatePresence, motion } from "motion/react";

import { BrandMark } from "@/components/portfolio/BrandMark";

export function IntroOverlay({ introComplete }: { introComplete: boolean }) {
  return (
    <AnimatePresence>
      {!introComplete && (
        <motion.section
          key="intro"
          className="fixed inset-0 z-50 overflow-hidden bg-background"
          aria-label="Portfolio opening"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.32, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.img
            src="/images/hero.avif"
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="editorial-grain-overlay" aria-hidden="true" />
          <BrandMark
            className="absolute left-5 top-5 z-20 editorial-heading text-[clamp(0.875rem,2.5vw,1.5rem)] tracking-[0.12em] text-black lg:left-[4.5rem] lg:top-8 xl:left-[5.5rem]"
          />
        </motion.section>
      )}
    </AnimatePresence>
  );
}
