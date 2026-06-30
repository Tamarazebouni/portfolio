"use client";

import { motion } from "motion/react";
import type { ComponentPropsWithoutRef } from "react";

import { brandName } from "@/data/site";

type BrandMarkProps = {
  className: string;
  hidden?: boolean;
  sharedLayout?: boolean;
} & ComponentPropsWithoutRef<"h1">;

export function BrandMark({
  className,
  hidden = false,
  sharedLayout = false,
  ...props
}: BrandMarkProps) {
  const resolvedClassName = hidden ? `${className} opacity-0` : className;

  return (
    <motion.h1
      layoutId={sharedLayout ? "brand-name" : undefined}
      className={resolvedClassName}
      {...props}
    >
      {brandName}
    </motion.h1>
  );
}
