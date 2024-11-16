"use client";
import { useTheme } from "next-themes";
import Image from "next/image";
import React, { useEffect, useState, useMemo, memo } from "react";

export default memo(function Button() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Wait until the component is mounted to render
  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const moonImage = useMemo(() => (
    <Image
      alt="moon"
      loading="lazy"
      width={16}
      height={16}
      src="/images/moon.svg"
    />
  ), []);

  const sunImage = useMemo(() => (
    <Image
      alt="sun"
      loading="lazy"
      width={16}
      height={16}
      src="/images/sun.svg"
    />
  ), []);

  if (!mounted) {
    // Avoid rendering anything during server-side rendering
    return null;
  }

  return (
    <button
      onClick={toggleTheme}
      type="button"
      aria-label="Toggle dark mode"
      className="group rounded-full bg-white/90 px-3 py-2 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur transition dark:bg-zinc-800/90 dark:ring-white/10 dark:hover:ring-white/20"
    >
      {theme === "dark" ? moonImage : sunImage}
    </button>
  );
});
