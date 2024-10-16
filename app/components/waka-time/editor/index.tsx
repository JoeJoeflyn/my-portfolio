import { WakaStatsType } from "@/app/shared/interface";
import ProgressBar from "../progressBar";

export default function Editor({ editors }: { editors: WakaStatsType[] }) {
  return (
    <div className="group relative flex flex-col items-start">
      <div className="rounded-2xl w-full h-full border border-zinc-100 p-6 dark:border-zinc-700/40">
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
          <span className="ml-3">Editors</span>
        </h2>
        <div className="mt-4">
          <div className="flex">
            <div className="w-full flex flex-col gap-2 text-sm font-medium text-zinc-900 dark:text-zinc-100">
              {editors?.map((operating: WakaStatsType, index: number) => (
                <div key={index} className="grid grid-cols-5 items-baseline">
                  <div className="whitespace-nowrap">{operating.name}:</div>
                  <ProgressBar
                    text={operating.text}
                    label={operating.name}
                    score={operating.percent}
                  />
                  <div>{operating.percent}%</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
