import React from "react";

type StatsCardProps = {
  title: string;
  description: string;
  stats?: string;
  rangeStartDate?: string;
  rangeEndDate?: string;
};

export default function StatsCard({
  title,
  description,
  stats,
  rangeStartDate,
  rangeEndDate,
}: StatsCardProps) {
  return (
    <div className="group relative flex flex-col items-start">
      <div className="w-full h-full rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
        <h2 className="flex items-center text-sm font-semibold text-zinc-900 dark:text-zinc-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 flex-none"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              className="fill-zinc-100 stroke-zinc-400 dark:fill-zinc-100/10 dark:stroke-zinc-500"
            />
          </svg>
          <span className="ml-3">{title}</span>
        </h2>
        <dl className="mt-4 space-y-4">
          <div className="flex flex-wrap gap-x-2">
            <dt className="sr-only">Description</dt>
            <dd className="w-full flex-none text-sm font-medium text-zinc-900 dark:text-zinc-100">
              {description}
            </dd>
            {stats && (
              <>
                <dt className="sr-only">Stats</dt>
                <dd className="text-xs text-zinc-500 dark:text-zinc-400">
                  {stats}
                </dd>
              </>
            )}
            {rangeStartDate && rangeEndDate && (
              <>
                <dt className="sr-only">Date range</dt>
                <dd
                  className="ml-auto text-xs"
                  aria-label={`${rangeStartDate} until ${rangeEndDate}`}
                >
                  <time
                    className="text-zinc-200 dark:dark:text-zinc-100"
                    dateTime={rangeStartDate}
                  >
                    {rangeStartDate}
                  </time>
                  <span
                    className="text-zinc-200 dark:dark:text-zinc-100"
                    aria-hidden="true"
                  >
                    —
                  </span>
                  <time
                    className="text-zinc-200 dark:dark:text-zinc-100"
                    dateTime={rangeEndDate}
                  >
                    {rangeEndDate}
                  </time>
                </dd>
              </>
            )}
          </div>
        </dl>
      </div>
    </div>
  );
}
