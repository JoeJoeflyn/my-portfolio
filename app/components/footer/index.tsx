import Link from "next/link";
import { LINKS } from "@/app/shared/constant";

export default function Footer() {
  return (
    <footer className="mt-24 border-[var(--border-heavy)] border-t-2">
      <div className="py-10 section">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-6">
            {LINKS.map(({ href, label }) => (
              <Link key={href} href={href} className="text-[var(--text-muted)] text-sm font-body font-bold tracking-wider transition-colors uppercase hover:text-[var(--yellow)]">
                {label}
              </Link>
            ))}
          </div>
          <p className="text-[var(--text-muted)] text-sm font-body font-bold">
            &copy; {new Date().getFullYear()} NGUYEN THAI TAI
          </p>
        </div>
      </div>
    </footer>
  );
}
