import { getGitHubContributions } from "../api/github-contributions";
import { getAllTime, getSummaries, getYearStats, getYearSummaries } from "../api/wakatime";
import StatsCard from "../components/stat-card";
import { CalendarHeatmapComponent, ChartBar } from "../components/waka-time-content";
import { ScrollReveal } from "../components/scroll-reveal";
import type { WakaSummaryType } from "../shared/interface";

const getTodayDate = () => new Date().toISOString().split("T")[0];

const mapWakaHeatmapDays = (summaries?: readonly WakaSummaryType[] | null) =>
  (summaries ?? []).flatMap((summary) => {
    const date = summary.range?.date;
    const count = summary.grand_total?.total_seconds;

    if (!date || typeof count !== "number") {
      return [];
    }

    return [{
      date,
      count,
    }];
  });

export async function generateMetadata() {
  return { title: "WakaTime — Nguyen Thai Tai", description: "My coding activity and WakaTime statistics." };
}
export const dynamic = "force-dynamic";

export default async function WakaTimePage() {
  const [allTime, stats, summaries, yearSummaries, githubCalendar] = await Promise.all([
    getAllTime(),
    getYearStats(),
    getSummaries(),
    getYearSummaries(),
    getGitHubContributions(),
  ]);

  const todaySummary = summaries?.find((summary: WakaSummaryType) => summary.range.date === getTodayDate()) ?? summaries?.at(-1);
  const wakaHeatmapDays = mapWakaHeatmapDays(yearSummaries);
  const hasWakaData = Boolean(allTime || stats || summaries?.length || wakaHeatmapDays.length > 0);
  const hasGitHubData = Boolean(githubCalendar && githubCalendar.days.length > 0);

  if (!hasWakaData && !hasGitHubData) {
    return (
      <div className="pt-24 md:pt-36">
        <section className="section">
          <div className="max-w-4xl">
            <span className="section-label">WAKATIME</span>
            <h1 className="mb-8 mt-6 text-5xl font-black font-display leading-[0.9] tracking-tighter sm:text-7xl">
              CODING
              <br />
              <span className="text-gradient">STATS</span>
            </h1>
            <p className="text-[var(--text-secondary)] text-sm font-body">
              Configure your WakaTime credentials or add `GITHUB_PAT` to load activity heatmaps.
            </p>
          </div>
        </section>
      </div>
    );
  }

  const dailyAverage = allTime ? `${Math.floor(allTime.daily_average / 3600)}h ${Math.floor((allTime.daily_average % 3600) / 60)}m` : "";
  const yearlyAverage = stats?.human_readable_daily_average_including_other_language || stats?.human_readable_total || "—";
  const wakaSummary = todaySummary?.grand_total?.text || "—";
  const bestDayText = `${stats?.best_day?.date}`, bestDayValue = `${stats?.best_day?.text}`;

  return (
    <div className="pt-24 md:pt-36">
      <section className="section">
        <div className="max-w-4xl">
          <span className="section-label">WAKATIME</span>
          <h1 className="mb-8 mt-6 text-5xl font-black font-display leading-[0.9] tracking-tighter sm:text-7xl">
            CODING
            <br />
            <span className="text-gradient">STATS</span>
          </h1>
        </div>
      </section>
      <div className="section"><hr className="my-14 rule" /></div>
      {hasWakaData ? (
        <>
          <ScrollReveal><section className="section"><div className="grid grid-cols-2 gap-4 lg:grid-cols-4"><StatsCard title="Daily Average" description={dailyAverage} stats={`${allTime?.text || "—"}`} /><StatsCard title="Last Year" description="Daily average" stats={yearlyAverage} /><StatsCard title="Best Day" description={bestDayText} stats={bestDayValue} /><StatsCard title="Today" description="Coding time" stats={wakaSummary} /></div></section></ScrollReveal>
          <ScrollReveal><section className="mt-10 section"><div className="grid gap-4 md:grid-cols-2">{stats?.categories && <ChartBar title="Categories" data={stats.categories} />}{stats?.languages && <ChartBar title="Languages" data={stats.languages} />}{stats?.editors && <ChartBar title="Editors" data={stats.editors} />}{stats?.operating_systems && <ChartBar title="OS" data={stats.operating_systems} />}</div></section></ScrollReveal>
          <ScrollReveal><section className="mt-10 section"><span className="block mb-6 section-label">TODAY BREAKDOWN</span><div className="grid gap-4 md:grid-cols-2">{todaySummary?.operating_systems && <ChartBar title="Operating Systems" data={todaySummary.operating_systems} />}{todaySummary?.categories && <ChartBar title="Categories" data={todaySummary.categories} />}{todaySummary?.editors && <ChartBar title="Editors" data={todaySummary.editors} />}{todaySummary?.languages && <ChartBar title="Languages" data={todaySummary.languages} />}</div></section></ScrollReveal>
          <ScrollReveal><section className="mt-14 section"><span className="block mb-6 section-label">WAKATIME ACTIVITY — LAST YEAR</span><div className="p-6 card"><CalendarHeatmapComponent days={wakaHeatmapDays} variant="wakatime" /></div></section></ScrollReveal>
        </>
      ) : (
        <ScrollReveal><section className="section"><div className="p-6 card"><p className="text-[var(--text-secondary)] text-sm font-body">Configure WakaTime API credentials to see your coding stats.</p></div></section></ScrollReveal>
      )}
      <ScrollReveal><section className="mt-14 section"><span className="block mb-6 section-label">GITHUB CONTRIBUTIONS — LAST YEAR</span><div className="p-6 card space-y-5"><div><p className="text-[var(--text-secondary)] text-sm font-body">{githubCalendar ? `${githubCalendar.totalContributions.toLocaleString()} contributions from @${githubCalendar.username} in the last year.` : "Add `GITHUB_PAT` to your server environment to load the GitHub contribution calendar."}</p></div>{githubCalendar && <CalendarHeatmapComponent days={githubCalendar.days} variant="github" />}</div></section></ScrollReveal>
      <div className="section"><hr className="my-16 rule" /></div>
    </div>
  );
}
