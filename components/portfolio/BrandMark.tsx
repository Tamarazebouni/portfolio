"use client";

import { motion } from "motion/react";

import { brandName } from "@/data/site";

type BrandMarkProps = {
  className: string;
  hidden?: boolean;
  sharedLayout?: boolean;
};

export function BrandMark({
  className,
  hidden = false,
  sharedLayout = false,
}: BrandMarkProps) {
  const resolvedClassName = hidden ? `${className} opacity-0` : className;

  return (
    <motion.h1
      layoutId={sharedLayout ? "brand-name" : undefined}
      className={resolvedClassName}
    >
      {brandName}
    </motion.h1>
  );
}
