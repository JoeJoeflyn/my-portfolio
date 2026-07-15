import { getGitHubContributions } from "../api/github-contributions";
import { getGitHubRepos } from "../api/github-repos";
import { getAllTime, getYearStats, getYearSummaries } from "../api/wakatime";
import type { WakaSummaryType } from "@/app/shared/interface";
import { CalendarHeatmapComponent } from "./waka-dynamic";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const mapWakaHeatmapDays = (summaries?: readonly WakaSummaryType[] | null) =>
  (summaries ?? []).flatMap((summary) => {
    const date = summary.range?.date;
    const count = summary.grand_total?.total_seconds;
    if (!date || typeof count !== "number") return [];
    return [{ date, count }];
  });

export default async function NowDashboard() {
  const [allTime, stats, yearSummaries, githubCalendar, repos] = await Promise.all([
    getAllTime(),
    getYearStats(),
    getYearSummaries(),
    getGitHubContributions(),
    getGitHubRepos(),
  ]);

  const wakaHeatmapDays = mapWakaHeatmapDays(yearSummaries);
  const hasData =
    Boolean(allTime || stats || wakaHeatmapDays.length > 0 || githubCalendar);

  if (!hasData) return null;

  const totalContributions = githubCalendar?.totalContributions ?? 0;
  const totalText = allTime?.text ?? "—";
  const dailyAvg = allTime
    ? `${Math.floor(allTime.daily_average / 3600)}h ${Math.floor((allTime.daily_average % 3600) / 60)}m`
    : "—";

  const topLanguages = (stats?.languages ?? [])
    .slice(0, 5)
    .map((lang) => ({
      name: lang.name,
      percent: Math.round((lang.percent ?? 0) * 10) / 10,
    }));

  return (
    <section className="section mt-28 md:mt-36">
      <div className="max-w-5xl">
        <span className="section-label">NOW // ACTIVITY</span>
        <h2 className="mb-10 mt-6 text-5xl font-black font-display leading-[0.85] tracking-tighter sm:text-6xl">
          What I&apos;m <span className="text-gradient">building</span>
        </h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {/* GitHub heatmap — big anchor (4 cols) */}
          <Card
            className="col-span-1 border-2 border-[var(--border-heavy)] bg-[var(--surface)] p-6 shadow-none sm:col-span-2 lg:col-span-4"
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-display text-sm font-bold uppercase tracking-wider text-[var(--text-primary)]">
                GitHub Contributions
              </h3>
              <span className="font-body text-xs uppercase tracking-widest text-[var(--text-muted)]">
                {totalContributions} / yr
              </span>
            </div>
            {githubCalendar && githubCalendar.days.length > 0 ? (
              <div className="heatmap--github overflow-x-auto">
                <CalendarHeatmapComponent
                  days={githubCalendar.days}
                  variant="github"
                />
              </div>
            ) : (
              <p className="py-8 text-center font-body text-xs text-[var(--text-muted)]">
                Configure GITHUB_PAT to load contributions
              </p>
            )}
          </Card>

          {/* Commit stat (2 cols) */}
          <Card className="col-span-1 border-2 border-[var(--border-heavy)] bg-[var(--surface)] p-6 shadow-none sm:col-span-1 lg:col-span-2">
            <div className="mb-2 font-body text-xs uppercase tracking-widest text-[var(--text-muted)]">
              // commits
            </div>
            <div className="font-display text-4xl font-black text-[var(--yellow)]">
              {totalContributions}
            </div>
            <div className="mt-1 font-body text-xs uppercase tracking-widest text-[var(--text-muted)]">
              this year
            </div>
            <div className="mt-6">
              <div className="font-display text-2xl font-black text-[var(--yellow)]">
                {dailyAvg}
              </div>
              <div className="mt-1 font-body text-xs uppercase tracking-widest text-[var(--text-muted)]">
                daily average
              </div>
            </div>
          </Card>

          {/* Total coded (2 cols) */}
          <Card className="col-span-1 border-2 border-[var(--border-heavy)] bg-[var(--surface)] p-6 shadow-none sm:col-span-1 lg:col-span-2">
            <div className="mb-2 font-body text-xs uppercase tracking-widest text-[var(--text-muted)]">
              // coded
            </div>
            <div className="font-display text-2xl font-black text-[var(--yellow)]">
              {totalText}
            </div>
            <div className="mt-1 font-body text-xs uppercase tracking-widest text-[var(--text-muted)]">
              all time
            </div>
          </Card>

          {/* WakaTime heatmap (2 cols) */}
          <Card className="col-span-1 border-2 border-[var(--border-heavy)] bg-[var(--surface)] p-6 shadow-none sm:col-span-1 lg:col-span-2">
            <div className="mb-4 font-body text-xs uppercase tracking-widest text-[var(--text-muted)]">
              // wakatime
            </div>
            {wakaHeatmapDays.length > 0 ? (
              <div className="heatmap--wakatime overflow-x-auto">
                <CalendarHeatmapComponent
                  days={wakaHeatmapDays}
                  variant="wakatime"
                />
              </div>
            ) : (
              <p className="py-4 text-center font-body text-xs text-[var(--text-muted)]">
                Configure WakaTime API to load
              </p>
            )}
          </Card>

          {/* Top languages (2 cols) */}
          <Card className="col-span-1 border-2 border-[var(--border-heavy)] bg-[var(--surface)] p-6 shadow-none sm:col-span-1 lg:col-span-2">
            <div className="mb-4 font-body text-xs uppercase tracking-widest text-[var(--text-muted)]">
              // top languages
            </div>
            {topLanguages.length > 0 ? (
              <div className="space-y-2.5">
                {topLanguages.map((lang) => (
                  <div key={lang.name} className="flex items-center gap-3">
                    <span className="w-20 font-body text-xs text-[var(--text-secondary)]">
                      {lang.name}
                    </span>
                    <div className="h-3.5 flex-1 border border-[var(--border-heavy)] bg-[var(--surface-high)]">
                      <div
                        className="h-full bg-[var(--yellow)]"
                        style={{ width: `${lang.percent}%` }}
                      />
                    </div>
                    <span className="w-10 text-right font-body text-xs font-bold text-[var(--text-primary)]">
                      {lang.percent}%
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="py-4 text-center font-body text-xs text-[var(--text-muted)]">
                No language data
              </p>
            )}
          </Card>

          {/* Currently building (6 cols) */}
          <Card className="col-span-1 border-2 border-[var(--border-heavy)] bg-[var(--surface)] p-6 shadow-none sm:col-span-2 lg:col-span-6">
            <div className="mb-3 font-body text-xs uppercase tracking-widest text-[var(--text-muted)]">
              // currently building
            </div>
            {repos.length > 0 ? (
              <>
                <h3 className="font-display text-lg font-extrabold text-[var(--text-primary)]">
                  {repos[0].name}
                </h3>
                <p className="mt-2 max-w-2xl font-body text-sm leading-relaxed text-[var(--text-secondary)]">
                  {repos[0].description ?? "No description provided."}{" "}
                  <span className="text-[var(--yellow)]">
                    last push {new Date(repos[0].pushed_at).toLocaleDateString("en-US", { month: "short", day: "numeric" })}.
                  </span>
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {repos[0].language && (
                    <Badge
                      className="border-[var(--border-heavy)] bg-[var(--surface-high)] font-body text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]"
                    >
                      {repos[0].language}
                    </Badge>
                  )}
                  {repos[0].topics.slice(0, 4).map((topic) => (
                    <Badge
                      key={topic}
                      className="border-[var(--border-heavy)] bg-[var(--surface-high)] font-body text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]"
                    >
                      {topic}
                    </Badge>
                  ))}
                </div>
              </>
            ) : (
              <p className="py-4 text-center font-body text-xs text-[var(--text-muted)]">
                Configure GITHUB_PAT to load projects
              </p>
            )}
          </Card>
        </div>
      </div>
    </section>
  );
}
