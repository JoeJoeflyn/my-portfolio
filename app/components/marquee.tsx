"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const SPEEDS = { fast: "36s", normal: "55s", slow: "90s" } as const;

export const Marquee = ({
  children,
  direction = "left",
  speed = "fast",
  className,
}: {
  children: React.ReactNode;
  direction?: "left" | "right";
  speed?: keyof typeof SPEEDS;
  className?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    if (!containerRef.current || !scrollerRef.current) return;
    Array.from(scrollerRef.current.children).forEach((item) => {
      scrollerRef.current?.appendChild(item.cloneNode(true));
    });
    containerRef.current.style.setProperty("--animation-direction", direction === "left" ? "forwards" : "reverse");
    containerRef.current.style.setProperty("--animation-duration", SPEEDS[speed]);
    setStart(true);
  }, [direction, speed]);

  return (
    <div ref={containerRef} className={cn("scroller relative z-20 overflow-hidden border-y-2 border-[var(--border-heavy)]", className)}>
      <div className="absolute left-0 z-40 w-20 bg-linear-to-r from-[var(--bg)] inset-y-0 pointer-events-none to-transparent" />
      <div className="absolute right-0 z-40 w-20 bg-linear-to-l from-[var(--bg)] inset-y-0 pointer-events-none to-transparent" />
      <div ref={scrollerRef} className={cn("flex min-w-full shrink-0 gap-12 py-4 w-max flex-nowrap", start && "animate-scroll", "hover:[animation-play-state:paused]")}>
        {children}
      </div>
    </div>
  );
};
