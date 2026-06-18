"use client";

import React, { useEffect, useState } from "react";
import { cn } from "../shared/utils";

export const Marquee = ({
  children,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  children: React.ReactNode;
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => { addAnimation(); }, []);

  const [start, setStart] = useState(false);
  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      Array.from(scrollerRef.current.children).forEach((item) => {
        if (scrollerRef.current) scrollerRef.current.appendChild(item.cloneNode(true));
      });
      getDirection(); getSpeed(); setStart(true);
    }
  }
  const getDirection = () => {
    if (containerRef.current) containerRef.current.style.setProperty("--animation-direction", direction === "left" ? "forwards" : "reverse");
  };
  const getSpeed = () => {
    if (containerRef.current) {
      const d = speed === "fast" ? "36s" : speed === "normal" ? "55s" : "90s";
      containerRef.current.style.setProperty("--animation-duration", d);
    }
  };
  return (
    <div ref={containerRef} className={cn("scroller relative z-20 overflow-hidden border-y-2 border-[var(--border-heavy)]", className)}>
      <div className="absolute left-0 z-40 w-20 bg-linear-to-r from-[var(--bg)] inset-y-0 pointer-events-none to-transparent" />
      <div className="absolute right-0 z-40 w-20 bg-linear-to-l from-[var(--bg)] inset-y-0 pointer-events-none to-transparent" />
      <div ref={scrollerRef} className={cn("flex min-w-full shrink-0 gap-12 py-4 w-max flex-nowrap", start && "animate-scroll", pauseOnHover && "hover:[animation-play-state:paused]")}>
        {children}
      </div>
    </div>
  );
}
