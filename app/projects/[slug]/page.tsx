import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import fs from "fs";
import path from "path";
import { ArrowLeft, ExternalLink, FileText, GitBranch, Star, GitFork } from "lucide-react";
import { marked } from "marked";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import TechIcon from "../../components/tech-icon";
import { ScrollReveal } from "../../components/scroll-reveal";
import { getGitHubRepo, getGitHubRepoReadme, getGitHubRepos } from "../../api/github-repos";

export const dynamic = "force-dynamic";

const LOGO_DIR = path.join(process.cwd(), "public", "images");

const getRepoLogo = (repoName: string): string | null => {
  const candidates = [
    `${repoName}-logo.png`,
    `${repoName}-logo.webp`,
    `${repoName}-logo.jpg`,
    `${repoName}-logo.svg`,
    `${repoName}.png`,
    `${repoName}.webp`,
    `${repoName}.jpg`,
  ];
  for (const file of candidates) {
    if (fs.existsSync(path.join(LOGO_DIR, file))) {
      return `/images/${file}`;
    }
  }
  return null;
};

export async function generateStaticParams() {
  const repos = await getGitHubRepos();
  return repos.map((r) => ({ slug: r.name }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const repo = await getGitHubRepo(slug);
  if (!repo) return { title: "Project Not Found" };
  return {
    title: `${repo.name} — Nguyen Thai Tai`,
    description: repo.description ?? `${repo.name} project`,
  };
}

const FILES = [
  { id: "readme", label: "README.md", icon: "file" },
  { id: "stats", label: "stats.json", icon: "file" },
  { id: "topics", label: "topics.json", icon: "file" },
  { id: "repo", label: "repository.link", icon: "link" },
] as const;

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [repo, readme] = await Promise.all([
    getGitHubRepo(slug),
    getGitHubRepoReadme(slug),
  ]);

  if (!repo) notFound();

  const readmeHtml = readme ? marked.parse(readme, { async: false }) as string : "";
  const createdYear = new Date(repo.created_at).getFullYear();
  const pushedDate = new Date(repo.pushed_at).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  const logo = getRepoLogo(repo.name);

  return (
    <div className="pt-24 md:pt-36">
      {/* Header */}
      <section className="section">
        <div className="max-w-5xl">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 border-2 border-[var(--border-heavy)] px-3 py-1.5 font-body text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] transition-all hover:border-[var(--yellow)] hover:text-[var(--yellow)]"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to projects
          </Link>
        </div>
      </section>

      <ScrollReveal>
        <div className="section mt-8">
          <div className="grid grid-cols-1 gap-0 lg:grid-cols-[260px_1fr]">
            {/* Sidebar — file tree */}
            <aside className="border-r-0 border-[var(--border-heavy)] bg-[var(--surface)] lg:border-r-2">
              <div className="border-b-2 border-[var(--border-heavy)] px-5 py-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center border-2 border-[var(--border-heavy)] bg-[var(--surface-high)]">
                    {logo ? (
                      <Image src={logo} alt={repo.name} width={24} height={24} className="h-6 w-6 object-contain" />
                    ) : repo.language ? (
                      <TechIcon
                        name={repo.language}
                        className="h-5 w-5"
                        fallback={repo.name.slice(0, 2)}
                      />
                    ) : (
                      <span className="font-body text-xs font-bold">
                        {repo.name.slice(0, 2).toUpperCase()}
                      </span>
                    )}
                  </div>
                  <div>
                    <div className="font-display text-sm font-extrabold">
                      {repo.name}
                    </div>
                    <div className="font-body text-xs uppercase tracking-widest text-[var(--text-muted)]">
                      {createdYear}
                    </div>
                  </div>
                </div>
              </div>
              <nav className="py-2">
                {FILES.map((file) => (
                  <a
                    key={file.id}
                    href={`#${file.id}`}
                    className="flex items-center gap-2 border-l-[3px] border-transparent px-5 py-2.5 font-body text-sm text-[var(--text-secondary)] transition-all hover:border-[var(--yellow)] hover:bg-[var(--surface-high)] hover:text-[var(--yellow)]"
                  >
                    {file.icon === "link" ? (
                      <ExternalLink className="h-3.5 w-3.5 text-[var(--text-muted)]" />
                    ) : (
                      <FileText className="h-3.5 w-3.5 text-[var(--text-muted)]" />
                    )}
                    {file.label}
                  </a>
                ))}
              </nav>
            </aside>

            {/* Main content pane */}
            <main className="px-6 py-8 lg:px-12">
              {/* Breadcrumb */}
              <div className="mb-6 font-body text-xs tracking-wide text-[var(--text-muted)]">
                projects <span className="text-[var(--border-heavy)]">/</span>{" "}
                {repo.name}{" "}
                <span className="text-[var(--border-heavy)]">/</span>{" "}
                <span className="text-[var(--yellow)]">README.md</span>
              </div>

              <h1 className="font-display text-4xl font-black leading-[0.9] tracking-tighter sm:text-5xl">
                {repo.name}
              </h1>
              <p className="mt-4 max-w-xl font-body text-sm leading-relaxed text-[var(--text-secondary)]">
                {repo.description ?? "No description provided."}
              </p>

              {/* README */}
              {readmeHtml ? (
                <section id="readme" className="mt-12 scroll-mt-24">
                  <h2 className="mb-4 flex items-center gap-3 font-display text-xl font-extrabold">
                    <span className="font-body text-sm text-[var(--yellow)]">01</span>
                    README
                  </h2>
                  <div
                    className="prose-card max-w-2xl"
                    dangerouslySetInnerHTML={{ __html: readmeHtml }}
                  />
                </section>
              ) : (
                <section id="readme" className="mt-12 scroll-mt-24">
                  <h2 className="mb-4 flex items-center gap-3 font-display text-xl font-extrabold">
                    <span className="font-body text-sm text-[var(--yellow)]">01</span>
                    Overview
                  </h2>
                  <p className="max-w-2xl font-body text-sm leading-7 text-[var(--text-secondary)]">
                    {repo.description ?? "No README or description available for this repository."}
                  </p>
                </section>
              )}

              {/* Stats */}
              <section id="stats" className="mt-10 scroll-mt-24">
                <h2 className="mb-4 flex items-center gap-3 font-display text-xl font-extrabold">
                  <span className="font-body text-sm text-[var(--yellow)]">02</span>
                  Stats
                </h2>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                  <Card className="border-2 border-[var(--border-heavy)] bg-[var(--surface)] p-5 shadow-none">
                    <div className="flex items-center gap-2 font-display text-2xl font-black text-[var(--yellow)]">
                      <Star className="h-4 w-4" />
                      {repo.stargazers_count}
                    </div>
                    <div className="mt-1.5 font-body text-xs uppercase tracking-widest text-[var(--text-muted)]">
                      stars
                    </div>
                  </Card>
                  <Card className="border-2 border-[var(--border-heavy)] bg-[var(--surface)] p-5 shadow-none">
                    <div className="flex items-center gap-2 font-display text-2xl font-black text-[var(--yellow)]">
                      <GitFork className="h-4 w-4" />
                      {repo.forks_count}
                    </div>
                    <div className="mt-1.5 font-body text-xs uppercase tracking-widest text-[var(--text-muted)]">
                      forks
                    </div>
                  </Card>
                  <Card className="border-2 border-[var(--border-heavy)] bg-[var(--surface)] p-5 shadow-none">
                    <div className="font-display text-lg font-black text-[var(--yellow)]">
                      {repo.language ?? "—"}
                    </div>
                    <div className="mt-1.5 font-body text-xs uppercase tracking-widest text-[var(--text-muted)]">
                      language
                    </div>
                  </Card>
                  <Card className="border-2 border-[var(--border-heavy)] bg-[var(--surface)] p-5 shadow-none">
                    <div className="font-display text-lg font-black text-[var(--yellow)]">
                      {pushedDate}
                    </div>
                    <div className="mt-1.5 font-body text-xs uppercase tracking-widest text-[var(--text-muted)]">
                      last push
                    </div>
                  </Card>
                </div>
              </section>

              {/* Topics */}
              {repo.topics.length > 0 && (
                <section id="topics" className="mt-10 scroll-mt-24">
                  <h2 className="mb-4 flex items-center gap-3 font-display text-xl font-extrabold">
                    <span className="font-body text-sm text-[var(--yellow)]">03</span>
                    Topics
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {repo.topics.map((topic) => (
                      <Badge
                        key={topic}
                        className="border-[var(--border-heavy)] bg-[var(--surface)] font-body text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]"
                      >
                        {topic}
                      </Badge>
                    ))}
                  </div>
                </section>
              )}

              {/* Repo link */}
              <section id="repo" className="mt-10 scroll-mt-24">
                <h2 className="mb-4 flex items-center gap-3 font-display text-xl font-extrabold">
                  <span className="font-body text-sm text-[var(--yellow)]">{repo.topics.length > 0 ? "04" : "03"}</span>
                  Repository
                </h2>
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border-2 border-[var(--yellow)] px-5 py-3 font-body text-sm font-bold uppercase tracking-wider text-[var(--yellow)] transition-all hover:bg-[var(--yellow)] hover:text-black"
                >
                  <GitBranch className="h-4 w-4" />
                  {repo.name}
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
                {repo.homepage && (
                  <a
                    href={repo.homepage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-3 inline-flex items-center gap-2 border-2 border-[var(--border-heavy)] px-5 py-3 font-body text-sm font-bold uppercase tracking-wider text-[var(--text-secondary)] transition-all hover:border-[var(--yellow)] hover:text-[var(--yellow)]"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Live demo
                  </a>
                )}
              </section>
            </main>
          </div>
        </div>
      </ScrollReveal>

      <div className="section">
        <hr className="my-16 rule" />
      </div>
    </div>
  );
}
