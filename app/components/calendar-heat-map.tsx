"use client";
import { WakaInsightsType } from "@/app/shared/interface";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import "../globals.css";
export default function CalendarHeatmapComponent({
  days,
}: {
  days: WakaInsightsType[];
}) {
  return (
    <>
      <CalendarHeatmap
        values={days.map((day: WakaInsightsType) => {
          return {
            date: day.date.replace(/-/g, "/"),
            count: day.total,
          };
        })}
        gutterSize={3}
        onMouseOver={(event, value) => {
          return "color-red";
        }}
        classForValue={(value) => {
          if (!value) {
            return "color-empty";
          } else if (+String(value.count)[0] <= 1) {
            return "color-scale-1";
          } else if (+String(value.count)[0] <= 3) {
            return "color-scale-2";
          } else if (+String(value.count)[0] <= 5) {
            return "color-scale-3";
          } else if (+String(value.count)[0] <= 7) {
            return "color-scale-4";
          } else if (+String(value.count)[0] <= 9) {
            return "color-scale-5";
          } else {
            return "color-scale-6";
          }
        }}
        showMonthLabels={true}
        showWeekdayLabels={true}
      />
    </>
  );
}
