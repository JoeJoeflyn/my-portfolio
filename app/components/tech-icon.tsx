import {
  siBun, siNextdotjs, siPostgresql, siNodedotjs, siTypescript,
  siJavascript, siReact, siPostman, siAntdesign, siTailwindcss,
  siRedux, siBootstrap, siDiscord, siLinux, siExpress, siTanstack,
  siSass, siMysql, siHtml5, siCss, siNestjs, siVite, siLaravel,
  siAngular, siSwagger, siGit, siPhp, siComposer, siVuedotjs,
  siVuetify, siDocker, siMongodb, siMongoose, siPrisma, siX,
  siGithub, siStrapi,
} from "simple-icons";

type SimpleIcon = { readonly title: string; readonly slug: string; readonly hex: string; readonly path: string };

const ICON_MAP: Record<string, SimpleIcon> = {
  bun: siBun, nextdotjs: siNextdotjs, postgresql: siPostgresql,
  nodedotjs: siNodedotjs, typescript: siTypescript, javascript: siJavascript,
  react: siReact, postman: siPostman, antdesign: siAntdesign,
  tailwindcss: siTailwindcss, redux: siRedux, bootstrap: siBootstrap,
  discord: siDiscord, linux: siLinux, express: siExpress,
  tanstack: siTanstack, sass: siSass, mysql: siMysql,
  html5: siHtml5, css: siCss, nestjs: siNestjs, vite: siVite,
  laravel: siLaravel, angular: siAngular, swagger: siSwagger,
  git: siGit, php: siPhp, composer: siComposer, vuedotjs: siVuedotjs,
  vuetify: siVuetify, docker: siDocker, mongodb: siMongodb,
  mongoose: siMongoose, prisma: siPrisma, x: siX, github: siGithub,
  strapi: siStrapi,
};

const NEEDS_INVERT = new Set([
  "nextdotjs", "bun", "x", "github", "express",
  "angular", "mongoose", "prisma",
]);

const FALLBACK_SVGS: Record<string, string> = {
  linkedin: `<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.06 2.06 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065m1.782 13.019H3.555V9h3.564zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0z"/></svg>`,
  visualstudiocode: `<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M23.15 2.587 18.21.21a1.49 1.49 0 0 0-1.705.29l-9.46 8.63-4.12-3.128a.999.999 0 0 0-1.144.02L.485 7.23a1 1 0 0 0 .005 1.532L4.158 12 .49 15.238a1 1 0 0 0-.005 1.532l1.296 1.208a1 1 0 0 0 1.144.02l4.12-3.128 9.46 8.63a1.49 1.49 0 0 0 1.704.29l4.942-2.377A1.5 1.5 0 0 0 24 20.06V3.939a1.5 1.5 0 0 0-.85-1.352m-5.146 14.861L10.826 12l7.178-5.448v10.896z"/></svg>`,
};

function buildSvgHtml(slug: string): string {
  if (FALLBACK_SVGS[slug]) return FALLBACK_SVGS[slug];
  const icon = ICON_MAP[slug];
  if (!icon) return "";
  return `<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#${icon.hex}"><path d="${icon.path}"/></svg>`;
}

function normalize(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "");
}

const ALIASES: Record<string, string> = {
  postgres: "postgresql",
  node: "nodedotjs",
  nodejs: "nodedotjs",
  tailwind: "tailwindcss",
  html: "html5",
  angularjs: "angular",
  angular: "angular",
  vue: "vuedotjs",
  ant: "antdesign",
  vscode: "visualstudiocode",
  visualstudiocode: "visualstudiocode",
  js: "javascript",
  ts: "typescript",
  nextjs: "nextdotjs",
  nest: "nestjs",
  vuejs: "vuedotjs",
};

type Props = {
  name: string;
  className?: string;
  fallback?: React.ReactNode;
};

export default async function TechIcon({ name, className = "h-9 w-9", fallback }: Props) {
  const raw = normalize(name);
  const slug = ALIASES[raw] || raw;
  const svgHtml = buildSvgHtml(slug);

  if (!svgHtml) {
    const wrapperClass = ["inline-flex items-center justify-center shrink-0", className].filter(Boolean).join(" ");
    return fallback ? <span className={wrapperClass}>{fallback}</span> : null;
  }

  return (
    <span
      className={`inline-flex items-center justify-center shrink-0 overflow-hidden ${NEEDS_INVERT.has(slug) ? "icon-invert-dark" : ""} ${className}`}
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: svgHtml }}
    />
  );
}
