import dynamic from "next/dynamic";
import {
  getAllTime,
  getInsights,
  getStats,
  getSummaries,
} from "../api/wakatime";
import StatsCard from "../components/stat-card";
const CalendarHeatmapComponent = dynamic(
  () => import("../components/calendar-heat-map"),
  {
    ssr: false,
  }
);
const ChartBar = dynamic(() => import("../components/chart-bar"), {
  ssr: false,
});

export async function generateMetadata() {
  return {
    title: "WakaTime - Nguyen Thai Tai",
    description: "This is where my WakaTime metrics will be shown here.",
  };
}

export default async function Page() {
  const [getWakaAllTime, getWakaStats, getWakaSummaries, getWakaInsights] =
    await Promise.all([
      getAllTime(),
      getStats(),
      getSummaries(),
      getInsights(),
    ]);

  const dailyAverage = `${Math.floor(
    getWakaAllTime.daily_average / 3600
  )} hrs ${Math.floor(
    (getWakaAllTime.daily_average % 3600) / 60
  )} mins per day`;

  const lastSevenDays =
    getWakaStats?.human_readable_daily_average_including_other_language ||
    getWakaStats?.grand_total.text ||
    "";

  const wakaSummary = `Daily Average: ${
    getWakaSummaries[0]
      ?.human_readable_daily_average_including_other_language ||
    getWakaSummaries[0]?.grand_total.text ||
    ""
  } mins per day`;

  const bestDayDescription = `Most Active Day: ${getWakaStats?.best_day?.date}`;
  const bestDayStats = `with ${getWakaStats?.best_day?.text} of activity`;

  return (
    <div className="sm:px-8 mt-16 sm:mt-32">
      <div className="mx-auto max-w-7xl lg:px-8">
        <div className="relative px-4 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-2xl lg:max-w-5xl">
            <>
              <header className="max-w-2xl">
                <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
                  My WakaTime Stats
                </h1>
                <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
                  This is where my WakaTime metrics will be shown here.
                </p>
              </header>
              <div className="md:mt-16 mt-20">
                <div className="grid md:grid-cols-2 gap-x-8 gap-y-8 grid-cols-1">
                  <StatsCard
                    title="All time coding"
                    description={`Coded ${getWakaAllTime.text} last year`}
                    stats={dailyAverage}
                    rangeStartDate={getWakaAllTime.range.start_date}
                    rangeEndDate={getWakaAllTime.range.end_text}
                  />
                  <StatsCard
                    title="Last 7 days"
                    description="Daily Average"
                    stats={lastSevenDays}
                  />
                  <StatsCard
                    title="Best Day"
                    description={bestDayDescription}
                    stats={bestDayStats}
                  />
                  <ChartBar
                    title="Operating Systems"
                    data={getWakaStats.operating_systems}
                  />
                  <ChartBar title="Categories" data={getWakaStats.categories} />
                  <ChartBar title="Editors" data={getWakaStats.editors} />
                  <ChartBar title="Languages" data={getWakaStats.languages} />
                </div>
              </div>
              <div className="md:mt-16 mt-20">
                <header className="max-w-2xl md:mb-16 mb-20">
                  <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
                    My Activity Last Year
                  </h1>
                </header>
                <CalendarHeatmapComponent days={getWakaInsights.days} />
              </div>
            </>
            <>
              <header className="max-w-2xl my-20 md:mt-16">
                <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
                  Today Stats
                </h1>
              </header>
              <div className="md:mt-16 mt-20">
                <div className="grid md:grid-cols-2 gap-x-8 gap-y-8 grid-cols-1">
                  <StatsCard
                    title="Daily Average"
                    description="Daily Average"
                    stats={wakaSummary}
                  />
                  <ChartBar
                    title="Operating Systems"
                    data={getWakaSummaries[1].operating_systems}
                  />
                  <ChartBar
                    title="Categories"
                    data={getWakaSummaries[1].categories}
                  />
                  <ChartBar
                    title="Editors"
                    data={getWakaSummaries[1].editors}
                  />
                  <ChartBar
                    title="Languages"
                    data={getWakaSummaries[1].languages}
                  />
                </div>
              </div>
            </>
          </div>
        </div>
      </div>
    </div>
  );
}
