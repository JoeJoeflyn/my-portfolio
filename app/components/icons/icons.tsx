import Link from "next/link";
import TechIcon from "../tech-icon";
import type { SocialLink } from "@/app/shared/interface";

export const IconLink = (item: SocialLink) => {
  const fallbackLabel = item.label?.slice(0, 1) || item.href.slice(0, 1).toUpperCase();

  return (
    <Link
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={item.label}
      className="flex items-center justify-center h-10 w-10 bg-[var(--surface)] border-2 border-[var(--border-heavy)] duration-150 group transition-colors hover:text-[var(--yellow)] hover:bg-[var(--surface-elevated)] hover:border-[var(--yellow)]"
    >
      {item.kind === "resume" ? (
        <svg className="h-5 w-5 transition-opacity" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" strokeLinejoin="miter">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
        </svg>
      ) : (
        <TechIcon name={item.icon} className="h-5 w-5 transition-opacity" fallback={fallbackLabel} />
      )}
    </Link>
  );
};
