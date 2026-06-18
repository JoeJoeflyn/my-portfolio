import React from "react";

type StatsCardProps = {
  title: string;
  description: string;
  stats?: string;
  rangeStartDate?: string;
  rangeEndDate?: string;
};

export default function StatsCard({ title, description, stats, rangeStartDate, rangeEndDate }: StatsCardProps) {
  return (
    <div className="p-5 card">
      <h2 className="flex items-center text-[var(--text-muted)] text-xs font-body font-bold tracking-widest gap-2 uppercase">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-4 w-4">
          <path strokeLinecap="square" strokeLinejoin="miter" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
        {title}
      </h2>
      <div className="mt-3">
        <div className="text-2xl text-[var(--text-primary)] font-display font-extrabold">{description}</div>
        {stats && <div className="mt-1 text-[var(--text-muted)] text-xs font-body">{stats}</div>}
        {rangeStartDate && rangeEndDate && (
          <div className="mt-2 text-[var(--text-muted)] text-xs font-body">
            <time dateTime={rangeStartDate}>{rangeStartDate}</time><span aria-hidden="true"> — </span><time dateTime={rangeEndDate}>{rangeEndDate}</time>
          </div>
        )}
      </div>
    </div>
  );
}
