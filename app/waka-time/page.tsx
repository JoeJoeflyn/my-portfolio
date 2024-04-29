import {
  getAllTime,
  getInsights,
  getStats,
  getSummaries,
} from "../api/wakatime";
import AllTime from "../components/waka-time/allTime";
import BestDay from "../components/waka-time/bestDay";
import CalendarHeatmapComponent from "../components/waka-time/calendarHeatmap";
import Category from "../components/waka-time/category";
import Editor from "../components/waka-time/editor";
import Languages from "../components/waka-time/language";
import LastSevenDays from "../components/waka-time/lastSevenDays";
import OperatingSystem from "../components/waka-time/operatingSystem";

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
                <ul
                  role="list"
                  className="grid md:grid-cols-2 gap-x-8 gap-y-8 grid-cols-1"
                >
                  <AllTime getWakaAllTime={getWakaAllTime} />
                  <LastSevenDays getWakaStats={getWakaStats} />
                  <BestDay getWakaStats={getWakaStats} />
                  <OperatingSystem
                    operatingSystems={getWakaStats.operating_systems}
                  />
                  <Category categories={getWakaStats.categories} />
                  <Editor editors={getWakaStats.editors} />
                  <Languages languages={getWakaStats.languages} />
                </ul>
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
                <ul
                  role="list"
                  className="grid md:grid-cols-2 gap-x-8 gap-y-8 grid-cols-1"
                >
                  <LastSevenDays getWakaStats={getWakaSummaries[0]} />
                  <OperatingSystem
                    operatingSystems={getWakaSummaries[1].operating_systems}
                  />
                  <Category categories={getWakaSummaries[1].categories} />
                  <Editor editors={getWakaSummaries[1].editors} />
                  <Languages languages={getWakaSummaries[1].languages} />
                </ul>
              </div>
            </>
          </div>
        </div>
      </div>
    </div>
  );
}
