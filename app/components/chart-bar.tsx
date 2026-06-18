import type { WakaStatItemType } from "@/app/shared/interface";
import ProgressBar from "./progress-bar";

type ChartBarProps = {
  readonly title: string;
  readonly data: readonly WakaStatItemType[];
};

export default function ChartBar({ title, data }: ChartBarProps) {
  return (
    <div className="p-5 card">
      <h2 className="flex items-center text-[var(--text-muted)] text-xs font-body font-bold tracking-widest gap-2 uppercase">{title}</h2>
      <div className="mt-4 space-y-3">
        {data.map((item, index: number) => (
          <div key={index} className="flex items-center gap-3">
            <span className="w-20 text-[var(--text-secondary)] text-xs font-body font-bold shrink-0 truncate">{item.name}</span>
            <div className="flex-1"><ProgressBar label={item.name} text={item.text} score={item.percent} /></div>
            <span className="w-10 text-[var(--text-muted)] text-right text-xs font-body font-bold tabular-nums">{item.percent}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
