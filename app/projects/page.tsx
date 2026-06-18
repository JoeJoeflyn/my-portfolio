import Link from "next/link";
import Image from "next/image";
import TechIcon from "../components/tech-icon";
import { ScrollReveal } from "../components/scroll-reveal";

export async function generateMetadata() {
  return { title: "Projects — Nguyen Thai Tai", description: "Projects I've built." };
}

const projects = [
  { name: "KamehaDB", description: "Local-first, cross-platform database GUI with built-in AI chat and Monaco editor.", href: "https://github.com/asta-nguyen/kamehadb", repo: "kamehadb", icon: "/images/kamehadb-logo.png", company: null },
  { name: "OpenEZ Graph", description: "Local-first code intelligence engine for indexing codebases into reusable retrieval.", href: "https://github.com/asta-nguyen/openez-graph", repo: "openez-graph", icon: "/images/openez-graph-logo.png", company: null },
  { name: "Medirspace", description: "Cloud image hosting and editing platform with gRPC microservices and Chrome capture extension.", href: "https://www.medir.space/", repo: "medirspace", icon: "Nextdotjs", company: null },
  { name: "Ok Money", description: "Full-stack money management platform with dashboard, backend APIs, and monorepo tooling.", href: "https://github.com/JoeJoeflyn", repo: "ok-money", icon: "Nodedotjs", company: null },
  { name: "Gaza Soup Kitchen", description: "Charity and fundraising website with dynamic navigation and Strapi CMS.", href: "https://github.com/JoeJoeflyn", repo: "gaza-soup-kitchen", icon: "Strapi", company: null },
  { name: "NaviDKD Portal", description: "Healthcare management portal for patient records, appointments, and API integration.", href: "https://github.com/JoeJoeflyn", repo: "navidkd-portal", icon: "Vuedotjs", company: null },
  { name: "E-Commerce Platform", description: "Full-featured e-commerce app with product listings, rich text editing, and image previews.", href: "https://github.com/JoeJoeflyn/e-commerce-web", repo: "e-commerce-web", icon: "React", company: null },
  { name: "Vizera", description: "AI platform for architecture that generates design ideas and visual concepts for architects.", href: "https://consortiagroup.co/en/portfolio", repo: "Consortia Group", icon: null, company: "Consortia Group" },
  { name: "Skalaview", description: "Marketing platform developed at Consortia Group with responsive UIs, scalable backend, and application performance optimizations.", href: "https://consortiagroup.co/en/portfolio", repo: "Consortia Group", icon: null, company: "Consortia Group" },
  { name: "Midwest Loan Services", description: "Financial services platform built at Consortia Group with Sequelize ORM, Redis caching, and production-grade feature delivery.", href: "https://consortiagroup.co/en/portfolio", repo: "Consortia Group", icon: null, company: "Consortia Group" },
];

export default async function ProjectsPage() {
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
            {projects.map((project, i) => (
              <a key={project.name} href={project.href} target="_blank" rel="noopener noreferrer" className="flex flex-col p-6 card group">
                <span className="mb-4 text-[var(--text-muted)] text-xs font-body font-bold tracking-widest">[{String(i + 1).padStart(2, "0")}]</span>
                <div className="flex items-center justify-center mb-5 h-10 w-10 text-[var(--text-muted)] bg-[var(--surface-high)] border-2 border-[var(--border-heavy)] transition-colors group-hover:text-[var(--yellow)] group-hover:border-[var(--yellow)]">
                  {project.icon && project.icon.startsWith("/") ? (
                    <Image src={project.icon} alt={project.repo} width={40} height={40} className="h-5 w-5 object-contain" />
                  ) : project.company ? (
                    <Image src="/images/consortia-group.webp" alt={project.company} width={40} height={40} className="h-5 w-5 object-contain" />
                  ) : (
                    <TechIcon name={(project.icon || "React") as string} className="h-5 w-5" fallback={project.name.slice(0, 2)} />
                  )}
                </div>
                <div className="flex flex-1 flex-col card-distort">
                  <h2 className="text-xl font-display font-extrabold transition-colors group-hover:text-[var(--yellow)]">{project.name}</h2>
                  <p className="flex-1 mt-3 text-[var(--text-secondary)] text-sm font-body leading-relaxed">{project.description}</p>
                  <div className="flex items-center mt-6 text-[var(--text-muted)] text-xs font-body font-bold gap-2 transition-colors group-hover:text-[var(--yellow)]">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" /></svg>
                    <span>{project.repo}</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>
      </ScrollReveal>
      <div className="section"><hr className="my-16 rule" /></div>
    </div>
  );
}
