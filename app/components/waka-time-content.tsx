"use client";

import dynamic from "next/dynamic";

const CalendarHeatmapComponent = dynamic(
  () => import("../components/calendar-heat-map"),
  { ssr: false }
);
const ChartBar = dynamic(() => import("../components/chart-bar"), {
  ssr: false,
});

export { CalendarHeatmapComponent, ChartBar };
