"use client";

import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";

const defaultVariants = {
  hidden: { rotateX: -90, opacity: 0 },
  visible: { rotateX: 0, opacity: 1 },
};

export function FlipText({
  children,
  duration = 0.5,
  delayMultiple = 0.08,
  repeat = false,
  className,
  as: Component = "span",
  variants,
  ...props
}) {
  const MotionComponent = motion(Component);
  const characters = React.Children.toArray(children).join("").split("");
  const [iteration, setIteration] = useState(0);

  useEffect(() => {
    if (!repeat) return;

    const totalDelay = duration + characters.length * delayMultiple;
    const interval = setInterval(() => {
      setIteration((prev) => prev + 1);
    }, totalDelay * 2200);

    return () => clearInterval(interval);
  }, [repeat, duration, delayMultiple, characters.length]);

  return (
    <div className="flex justify-center space-x-2 text-primary">
      <AnimatePresence mode="wait">
        {characters.map((char, i) => (
          <MotionComponent
            key={`${char}-${i}-${iteration}`}
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={variants || defaultVariants}
            transition={{
              duration,
              delay: i * delayMultiple,
            }}
            className={cn("origin-center drop-shadow-sm", className)}
            {...props}
          >
            {char}
          </MotionComponent>
        ))}
      </AnimatePresence>
    </div>
  );
}
