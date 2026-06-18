import {
  CAREER,
  FIRST_ROW,
  ICON_URL,
  INTRO,
  SECOND_ROW,
  THIRD_ROW,
} from "@/app/shared/constant";
import type { CareerLogo } from "@/app/shared/interface";
import { marked } from "marked";
import Image from "next/image";
import { getGithub } from "./api/github";
import ImageSection from "./components/image-sticky";
import { IconLink } from "./components/icons/icons";
import { Marquee } from "./components/marquee";
import { ScrollReveal } from "./components/scroll-reveal";
import TechIcon from "./components/tech-icon";

export const revalidate = 3600;
export async function generateMetadata() {
  return {
    title: "About — Nguyen Thai Tai",
    description: "Full-stack web developer based in Ho Chi Minh City.",
  };
}

function assertNever(value: never): never {
  throw new Error(`Unhandled: ${JSON.stringify(value)}`);
}
function renderCareerLogo(logo: CareerLogo) {
  switch (logo.kind) {
    case "icon":
      return (
        <TechIcon
          name={logo.name}
          className="h-6 w-6"
          fallback={<span className="text-xs font-bold">{logo.fallback}</span>}
        />
      );
    case "image":
      return (
        <Image
          src={logo.src}
          alt={logo.alt}
          width={48}
          height={48}
          className="p-2 h-full w-full object-contain"
        />
      );
    case "text":
      return <span className="text-xs font-bold">{logo.text}</span>;
    default:
      return assertNever(logo);
  }
}

export default async function Home() {
  const readme = await getGithub();
  const readmeHtml = readme ? marked.parse(readme, { async: false }) : "";
  return (
    <div className="pt-24 md:pt-36">
      <section className="relative section">
        <div className="max-w-4xl animate-stagger">
          <div className="flex items-center mb-12 gap-6">
            <ImageSection />
            <div className="flex gap-3">
              {ICON_URL.map((item) => (
                <IconLink key={item.href} {...item} />
              ))}
            </div>
          </div>

          <h1 className="text-5xl font-black font-display leading-[0.85] tracking-tighter lg:text-[7rem] sm:text-7xl">
            NGUYEN
            <br />
            <span className="text-gradient">THAI TAI</span>
          </h1>

          <div className="p-6 mt-10 max-w-2xl bg-[var(--surface)] border-2 border-[var(--border-heavy)]">
            <span className="block mb-3 text-[var(--text-muted)] text-xs font-body font-bold tracking-widest uppercase">
              <span className="text-[var(--yellow)]">&#x25A0;</span>{" "}
              terminal.txt
            </span>
            <p className="text-[var(--text-secondary)] text-sm font-body leading-relaxed">
              <span className="text-[var(--yellow)]">$</span> {INTRO}
            </p>
          </div>

          <div className="flex flex-wrap mt-8 gap-3">
            <span className="tag">FRESHER</span>
            <span className="tag">HCMC</span>
            <span className="tag">OPEN SOURCE</span>
          </div>
        </div>
      </section>

      <ScrollReveal>
        <section className="mt-28 md:mt-36">
          <div className="mb-6 section">
            <span className="section-label">TECH STACK</span>
          </div>
          <Marquee direction="right" speed="fast">
            {FIRST_ROW?.map((item, i) => (
              <div
                key={i}
                className="flex items-center text-[var(--text-secondary)] cursor-default duration-200 gap-3 transition-colors hover:text-[var(--yellow)]"
              >
                <TechIcon
                  name={item.slug}
                  className="h-[18px] w-[18px]"
                  fallback={item.text.slice(0, 2)}
                />
                <span className="text-xs font-body font-bold tracking-wider">
                  {item.text}
                </span>
              </div>
            ))}
          </Marquee>
          <Marquee direction="left" speed="slow">
            {SECOND_ROW?.map((item, i) => (
              <div
                key={i}
                className="flex items-center text-[var(--text-secondary)] cursor-default duration-200 gap-3 transition-colors hover:text-[var(--blue)]"
              >
                <TechIcon
                  name={item.slug}
                  className="h-[18px] w-[18px]"
                  fallback={item.text.slice(0, 2)}
                />
                <span className="text-xs font-body font-bold tracking-wider">
                  {item.text}
                </span>
              </div>
            ))}
          </Marquee>
          <Marquee direction="right" speed="normal">
            {THIRD_ROW?.map((item, i) => (
              <div
                key={i}
                className="flex items-center text-[var(--text-secondary)] cursor-default duration-200 gap-3 transition-colors hover:text-[var(--yellow)]"
              >
                <TechIcon
                  name={item.slug}
                  className="h-[18px] w-[18px]"
                  fallback={item.text.slice(0, 2)}
                />
                <span className="text-xs font-body font-bold tracking-wider">
                  {item.text}
                </span>
              </div>
            ))}
          </Marquee>
        </section>
      </ScrollReveal>

      <div className="section">
        <hr className="my-16 rule" />
      </div>

      <ScrollReveal>
        <section className="section">
          <div className="max-w-4xl">
            <span className="mb-10 section-label">EXPERIENCE</span>
            <div className="space-y-6">
              {CAREER.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start p-6 card gap-6 group"
                >
                  <div className="flex flex-col items-center gap-3 shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 text-[var(--text-muted)] bg-[var(--surface-high)] border-2 border-[var(--border-heavy)] overflow-hidden transition-colors group-hover:text-[var(--yellow)] group-hover:border-[var(--yellow)]">
                      {renderCareerLogo(item.logo)}
                    </div>
                    <span className="text-[var(--text-muted)] text-xs font-body font-bold">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0 card-distort">
                    <div className="flex flex-wrap items-baseline justify-between gap-4">
                      <h3 className="text-lg font-display font-extrabold transition-colors group-hover:text-[var(--yellow)]">
                        {item.company}
                      </h3>
                      <span className="text-[var(--text-muted)] text-xs font-body whitespace-nowrap">
                        {item.dateStart} — {item.dateEnd}
                      </span>
                    </div>
                    <p className="mt-1 text-[var(--text-secondary)] text-sm font-body font-bold">
                      {item.role}
                    </p>
                    {item.description && (
                      <p className="mt-3 max-w-lg text-[var(--text-secondary)] text-sm font-body leading-relaxed">
                        {item.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {readmeHtml && (
        <ScrollReveal>
          <section className="section mt-28 md:mt-36">
            <div className="max-w-4xl">
              <span className="mb-10 section-label">GITHUB</span>
              <div
                className="prose-card"
                dangerouslySetInnerHTML={{ __html: readmeHtml }}
              />
            </div>
          </section>
        </ScrollReveal>
      )}

      <div className="section">
        <hr className="my-16 rule" />
      </div>
    </div>
  );
}
