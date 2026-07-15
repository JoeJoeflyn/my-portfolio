import Link from "next/link";
import Image from "next/image";
import fs from "fs";
import path from "path";
import TechIcon from "../components/tech-icon";
import { ScrollReveal } from "../components/scroll-reveal";
import { getGitHubRepos, type GitHubRepo } from "../api/github-repos";

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

export async function generateMetadata() {
  return { title: "Projects — Nguyen Thai Tai", description: "Projects I've built." };
}

// Projects joined/contributed to that aren't on personal GitHub — kept manually
const JOINED_PROJECTS = [
  { name: "A-Board", description: "Team task management with board, table, and timeline views — built for small-to-medium teams.", href: "https://github.com/asta-nguyen/a-board", company: null },
  { name: "VibePro", description: "Creative workspace for the modern web. Monorepo with Next.js 15, NestJS 11, Drizzle, and NextAuth.", href: "https://github.com/asta-nguyen/vibepro", company: null },
  { name: "Redact Tool", description: "Browser-based document redaction. Drop a file, watch the conveyor-belt scan sweep through it, review what was caught, and download a redacted copy.", href: "https://github.com/JoeJoeflyn/redact-tool", company: null },
  { name: "Bus Booking", description: "Full-stack bus booking platform with seat selection, booking flow, and admin dashboard. Frontend + backend across two repos.", href: "https://github.com/davidcm146/bus-booking-fe", company: null },
  { name: "Medirspace", description: "Cloud image hosting and editing platform with gRPC microservices and Chrome capture extension.", href: "https://www.medir.space/", company: null },
  { name: "Ok Money", description: "Full-stack money management platform with dashboard, backend APIs, and monorepo tooling.", href: "https://github.com/JoeJoeflyn", company: null },
  { name: "Gaza Soup Kitchen", description: "Charity and fundraising website with dynamic navigation and Strapi CMS.", href: "https://github.com/JoeJoeflyn", company: null },
  { name: "NaviDKD Portal", description: "Healthcare management portal for patient records, appointments, and API integration.", href: "https://github.com/JoeJoeflyn", company: null },
];

// Company projects that aren't on personal GitHub — kept manually
const COMPANY_PROJECTS = [
  { name: "Vizera", description: "AI platform for architecture that generates design ideas and visual concepts for architects.", href: "https://consortiagroup.co/en/portfolio", company: "Consortia Group" },
  { name: "Skalaview", description: "Marketing platform developed at Consortia Group with responsive UIs, scalable backend, and application performance optimizations.", href: "https://consortiagroup.co/en/portfolio", company: "Consortia Group" },
  { name: "Midwest Loan Services", description: "Financial services platform built at Consortia Group with Sequelize ORM, Redis caching, and production-grade feature delivery.", href: "https://consortiagroup.co/en/portfolio", company: "Consortia Group" },
];

export default async function ProjectsPage() {
  const repos = await getGitHubRepos();

  // Map GitHub repos to project cards
  const githubProjects = repos.map((repo: GitHubRepo) => ({
    name: repo.name,
    description: repo.description ?? "No description",
    href: repo.html_url,
    repo: repo.name,
    language: repo.language,
    stars: repo.stargazers_count,
    caseStudy: repo.name,
    company: null,
    logo: getRepoLogo(repo.name),
  }));

  // Joined projects (no case study, external link)
  const joinedProjects = JOINED_PROJECTS.map((p) => ({
    ...p,
    repo: p.name,
    language: null,
    stars: 0,
    caseStudy: null,
    logo: null,
  }));

  // Company projects (no case study, external link)
  const companyProjects = COMPANY_PROJECTS.map((p) => ({
    ...p,
    repo: p.company,
    language: null,
    stars: 0,
    caseStudy: null,
    logo: null,
  }));

  const projects = [...githubProjects, ...joinedProjects, ...companyProjects];

  return (
    <div className="pt-24 md:pt-36">
      <section className="section">
        <div className="max-w-4xl">
          <span className="section-label">PROJECTS</span>
          <h1 className="mb-8 mt-6 text-5xl font-black font-display leading-[0.85] tracking-tighter lg:text-8xl sm:text-7xl">
            THINGS<br />
            <span className="text-gradient">BUILT</span>
          </h1>
          <p className="max-w-lg text-[var(--text-secondary)] text-sm font-body leading-relaxed">
            A selection of projects shipped. Each one sharpened a different edge.
          </p>
        </div>
      </section>
      <div className="section"><hr className="my-14 rule" /></div>
      <ScrollReveal>
        <section className="section">
          <div className="grid gap-4 lg:grid-cols-3 sm:grid-cols-2">
            {projects.map((project, i) => {
              const linkHref = project.caseStudy ? `/projects/${project.caseStudy}` : project.href;
              const isInternal = !!project.caseStudy;
              return (
              <Link key={project.name} href={linkHref} {...(isInternal ? {} : { target: "_blank", rel: "noopener noreferrer" })} className="flex flex-col p-6 card group">
                <span className="mb-4 text-[var(--text-muted)] text-xs font-body font-bold tracking-widest">[{String(i + 1).padStart(2, "0")}]</span>
                <div className="flex items-center justify-center mb-5 h-10 w-10 text-[var(--text-muted)] bg-[var(--surface-high)] border-2 border-[var(--border-heavy)] transition-colors group-hover:text-[var(--yellow)] group-hover:border-[var(--yellow)]">
                  {project.company ? (
                    <Image src="/images/consortia-group.webp" alt={project.company} width={40} height={40} className="h-5 w-5 object-contain" />
                  ) : project.logo ? (
                    <Image src={project.logo} alt={project.name} width={40} height={40} className="h-5 w-5 object-contain" />
                  ) : project.language ? (
                    <TechIcon name={project.language} className="h-5 w-5" fallback={project.name.slice(0, 2)} />
                  ) : (
                    <span className="font-body text-xs font-bold">{project.name.slice(0, 2).toUpperCase()}</span>
                  )}
                </div>
                <div className="flex flex-1 flex-col card-distort">
                  <h2 className="text-xl font-display font-extrabold transition-colors group-hover:text-[var(--yellow)]">{project.name}</h2>
                  <p className="flex-1 mt-3 text-[var(--text-secondary)] text-sm font-body leading-relaxed">{project.description}</p>
                  <div className="flex items-center justify-between mt-6">
                    <div className="flex items-center text-[var(--text-muted)] text-xs font-body font-bold gap-2 transition-colors group-hover:text-[var(--yellow)]">
                      {isInternal ? (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" className="h-3.5 w-3.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                      ) : (
                        <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" /></svg>
                      )}
                      <span>{isInternal ? "case study" : project.repo}</span>
                    </div>
                    {project.stars > 0 && (
                      <span className="flex items-center gap-1 font-body text-xs text-[var(--text-muted)]">
                        <svg viewBox="0 0 24 24" fill="currentColor" className="h-3 w-3"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                        {project.stars}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
              );
            })}
          </div>
        </section>
      </ScrollReveal>
      <div className="section"><hr className="my-16 rule" /></div>
    </div>
  );
}
