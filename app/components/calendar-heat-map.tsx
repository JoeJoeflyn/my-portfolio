"use client";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import "../globals.css";

type GitHubContributionLevel =
  | "NONE"
  | "FIRST_QUARTILE"
  | "SECOND_QUARTILE"
  | "THIRD_QUARTILE"
  | "FOURTH_QUARTILE";

type HeatmapDay = {
  readonly date: string;
  readonly count: number;
  readonly level?: GitHubContributionLevel;
};

type HeatmapVariant = "wakatime" | "github";

const GITHUB_LEVEL_CLASS: Record<GitHubContributionLevel, string> = {
  NONE: "github-scale-0",
  FIRST_QUARTILE: "github-scale-1",
  SECOND_QUARTILE: "github-scale-2",
  THIRD_QUARTILE: "github-scale-3",
  FOURTH_QUARTILE: "github-scale-4",
};

const isGitHubContributionLevel = (value: unknown): value is GitHubContributionLevel =>
  value === "NONE" ||
  value === "FIRST_QUARTILE" ||
  value === "SECOND_QUARTILE" ||
  value === "THIRD_QUARTILE" ||
  value === "FOURTH_QUARTILE";

export default function CalendarHeatmapComponent({
  days,
  variant = "wakatime",
}: {
  readonly days?: readonly HeatmapDay[];
  readonly variant?: HeatmapVariant;
}) {
  return (
    <div className={`heatmap heatmap--${variant}`}>
      <CalendarHeatmap
        values={(days ?? []).map((day) => ({
          date: day.date.replace(/-/g, "/"),
          count: day.count,
          level: day.level,
        }))}
        gutterSize={3}
        classForValue={(value) => {
          if (variant === "github") {
            if (!value) return "github-empty";
            const contributionLevel: unknown = value.level;
            return isGitHubContributionLevel(contributionLevel)
              ? GITHUB_LEVEL_CLASS[contributionLevel]
              : GITHUB_LEVEL_CLASS.NONE;
          }

          if (!value) return "color-empty";
          const count = Number(value.count);
          if (count <= 1) return "color-scale-1";
          if (count <= 3) return "color-scale-2";
          if (count <= 5) return "color-scale-3";
          if (count <= 7) return "color-scale-4";
          if (count <= 9) return "color-scale-5";
          return "color-scale-6";
        }}
        titleForValue={(value) => {
          if (!value) {
            return "";
          }

          return `${value.date}: ${value.count}`;
        }}
        showMonthLabels={true}
        showWeekdayLabels={true}
      />
    </div>
  );
}
