import Link from "next/link";
import { IconLink } from "./icons/icons";
import { ICON_URL } from "@/app/shared/constant";

export default function ContactCTA() {
  const socialLinks = ICON_URL.filter((item) => item.kind === "icon");

  return (
    <section className="section mt-28 md:mt-36">
      <div className="max-w-4xl">
        <div className="flex items-center gap-4">
          <div className="section-label">CONTACT</div>
          <div className="inline-flex items-center gap-2.5 border-2 border-[#22c55e] px-4 py-2 text-xs font-bold uppercase tracking-widest text-[#22c55e]">
            <span className="h-2.5 w-2.5 animate-pulse bg-[#22c55e]" />
            OPEN TO WORK
          </div>
        </div>

        <h2 className="mt-6 font-display text-6xl font-black leading-[0.82] tracking-tighter sm:text-7xl lg:text-8xl">
          LET&apos;S
          <br />
          <span className="text-gradient">BUILD.</span>
        </h2>

        <p className="mt-8 max-w-lg text-sm font-body leading-relaxed text-[var(--text-secondary)] sm:text-base">
          Full-stack web developer in Ho Chi Minh City. I build local-first tools,
          data GUIs, and AI interfaces. If that&apos;s the edge you need sharpened,
          send a line.
        </p>

        <Link
          href="mailto:thaitainguyen336@gmail.com"
          className="mt-8 inline-flex items-center gap-3 border-2 border-[var(--yellow)] px-7 py-4 font-body text-base font-bold text-[var(--yellow)] transition-all duration-100 step-end hover:bg-[var(--yellow)] hover:text-black hover:shadow-[8px_8px_0_var(--border-heavy)] hover:-translate-x-0.5 hover:-translate-y-0.5"
        >
          <svg
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="square"
          >
            <rect x="2" y="4" width="20" height="16" />
            <polyline points="2,4 12,13 22,4" />
          </svg>
          thaitainguyen336@gmail.com
        </Link>

        <div className="mt-10 flex gap-3">
          {socialLinks.map((item) => (
            <IconLink key={item.href} {...item} />
          ))}
        </div>

        <div className="mt-12 flex flex-wrap gap-8 text-xs font-body text-[var(--text-muted)]">
          <span>
            availability:{" "}
            <b className="text-[var(--text-primary)]">full-time / contract</b>
          </span>
        </div>
      </div>
    </section>
  );
}
