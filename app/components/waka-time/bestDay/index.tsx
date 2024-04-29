import { WakaStatsType } from "@/app/shared/interface";
import React from "react";

export default function BestDay({
  getWakaStats,
}: {
  getWakaStats: WakaStatsType;
}) {
  return (
    <li className="group relative flex flex-col items-start">
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
          <span className="ml-3">Best Day</span>
        </h2>
        <ol className="mt-4 space-y-4">
          <li className="flex gap-4">
            <dl className="flex flex-auto flex-wrap gap-x-2">
              <dd className="w-full flex-none text-sm font-medium text-zinc-900 dark:text-zinc-100">
                Most Active Day: {getWakaStats?.best_day.date}
              </dd>
              <dd className="text-xs text-zinc-500 dark:text-zinc-400">
                with {getWakaStats?.best_day.text} of activity
              </dd>
            </dl>
          </li>
        </ol>
      </div>
    </li>
  );
}
