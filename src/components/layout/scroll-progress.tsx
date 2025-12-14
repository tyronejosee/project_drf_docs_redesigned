"use client";

import React from "react";
import { motion, MotionProps, useScroll } from "motion/react";

import { cn } from "@/lib/utils";

const ScrollProgress = React.forwardRef<
  HTMLDivElement,
  Omit<React.HTMLAttributes<HTMLElement>, keyof MotionProps>
>(({ className, ...props }, ref) => {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      ref={ref}
      className={cn(
        "fixed inset-x-0 top-0 z-50 h-1 origin-left rounded-full bg-gradient-to-r from-[#A97CF8] via-[#F38CB8] to-[#FDCC92]",
        className
      )}
      style={{ scaleX: scrollYProgress }}
      {...props}
    />
  );
});

ScrollProgress.displayName = "ScrollProgress";

export { ScrollProgress };
