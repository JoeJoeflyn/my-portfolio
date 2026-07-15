"use client";

import dynamic from "next/dynamic";

const CalendarHeatmapComponent = dynamic(() => import("./calendar-heat-map"), { ssr: false });
const ChartBar = dynamic(() => import("./chart-bar"), { ssr: false });

export { CalendarHeatmapComponent, ChartBar };
