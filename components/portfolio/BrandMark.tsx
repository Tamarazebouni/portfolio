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

  if (sharedLayout) {
    return (
      <motion.h1 layoutId="brand-name" className={resolvedClassName}>
        {brandName}
      </motion.h1>
    );
  }

  return <h1 className={resolvedClassName}>{brandName}</h1>;
}
