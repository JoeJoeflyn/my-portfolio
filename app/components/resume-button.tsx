"use client";
import Link from "next/link";

export default function ResumeButton() {
  return (
    <Link href="/resume.pdf" target="_blank" rel="noopener noreferrer"
      className="flex items-center px-4 py-2 text-[var(--yellow)] text-sm font-body font-bold tracking-wider border-2 border-[var(--yellow)] duration-150 gap-2 group transition-colors uppercase hover:text-[var(--bg)] hover:bg-[var(--yellow)]"
    >
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" strokeLinejoin="miter">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
      </svg>
      <span>RESUME</span>
    </Link>
  );
}
