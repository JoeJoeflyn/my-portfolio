"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import React from "react";
import Button from "../button";
import ResumeButton from "../resume-button";
import { LINKS } from "@/app/shared/constant";

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-200 ${scrolled ? "glass" : "bg-transparent"}`}
    >
      <div className="flex items-center justify-between h-16 section md:h-20">
        <Link
          href="/"
          className="text-lg font-black font-display tracking-tighter transition-colors uppercase hover:text-[var(--yellow)]"
        >
          NTT<span className="text-[var(--yellow)]">_</span>
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          {LINKS.map(({ href, label }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`relative px-4 py-2 text-sm font-body font-bold uppercase tracking-wider transition-colors duration-150 ${
                  isActive
                    ? "text-[var(--text-primary)] bg-[var(--surface)] border-2 border-[var(--yellow)]"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] border-2 border-transparent"
                }`}
              >
                {label}
              </Link>
            );
          })}
        </nav>
        <div className="hidden items-center gap-2 md:flex">
          <ResumeButton />
          <Button />
        </div>
        <div className="flex items-center gap-2 md:hidden">
          <ResumeButton />
          <Button />
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 text-[var(--text-secondary)] border-2 border-[var(--border-heavy)] transition-colors hover:text-[var(--yellow)] hover:border-[var(--yellow)]"
            aria-label="Toggle menu"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="square"
            >
              {menuOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="4" y1="6" x2="20" y2="6" />
                  <line x1="4" y1="12" x2="20" y2="12" />
                  <line x1="4" y1="18" x2="20" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="bg-[var(--bg)] border-[var(--border-heavy)] border-t-2 md:hidden">
          <nav className="flex flex-col py-4 gap-2 section">
            {LINKS.map(({ href, label }) => {
              const isActive = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className={`px-4 py-3 text-sm font-body font-bold uppercase tracking-wider transition-colors ${
                    isActive
                      ? "text-[var(--text-primary)] bg-[var(--surface)] border-2 border-[var(--yellow)]"
                      : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] border-2 border-transparent"
                  }`}
                >
                  {label}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
