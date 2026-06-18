import React from "react";

export default function ProgressBar({ label, text, score }: { label?: string; text?: string; score?: number }) {
  const s = score ?? 0;
  return (
    <div className="w-full">
      <div className="flex justify-between mb-1">
        <span className="text-[var(--text-secondary)] text-xs font-body font-bold">{label}</span>
        <span className="text-[var(--text-muted)] text-xs font-body font-bold">{text}</span>
      </div>
      <div className="h-2 w-full bg-[var(--surface-high)] border-2 border-[var(--border-heavy)]">
        <div className="h-full bg-[var(--yellow)] duration-500 transition-all" style={{ width: `${s}%` }} />
      </div>
    </div>
  );
}
