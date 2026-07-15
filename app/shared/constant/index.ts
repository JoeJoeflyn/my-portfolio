import type { CareerEntry, SocialLink } from "../interface";

export const INTRO = `Full-stack web developer with hands-on experience shipping production apps across AI platforms, marketing tools, healthcare portals, and financial services. Active in open source and focused on AI-assisted tooling based in Ho Chi Minh City.`;

export const ICON_URL: readonly SocialLink[] = [
  { href: "/resume.pdf", kind: "resume", label: "Resume" },
  { href: "#", kind: "icon", icon: "x", label: "X" },
  {
    href: "https://github.com/JoeJoeflyn",
    kind: "icon",
    icon: "github",
    label: "GitHub",
  },
  {
    href: "https://www.linkedin.com/in/tai-nguyen-106a1624b",
    kind: "icon",
    icon: "linkedin",
    label: "LinkedIn",
  },
  {
    href: "https://discord.com/channels/@thaitai_03",
    kind: "icon",
    icon: "discord",
    label: "Discord",
  },
];

export const FIRST_ROW = [
  { text: "Bun", slug: "bun" },
  { text: "Next.js", slug: "nextdotjs" },
  { text: "PostgreSQL", slug: "postgresql" },
  { text: "Node.js", slug: "nodedotjs" },
  { text: "TypeScript", slug: "typescript" },
  { text: "JavaScript", slug: "javascript" },
  { text: "React", slug: "react" },
  { text: "Postman", slug: "postman" },
  { text: "Ant Design", slug: "antdesign" },
  { text: "VS Code", slug: "visualstudiocode" },
  { text: "Tailwind", slug: "tailwindcss" },
  { text: "Redux", slug: "redux" },
  { text: "Bootstrap", slug: "bootstrap" },
  { text: "Discord.js", slug: "discord" },
  { text: "Linux", slug: "linux" },
];

export const SECOND_ROW = [
  { text: "Express", slug: "express" },
  { text: "Tanstack", slug: "tanstack" },
  { text: "Sass", slug: "sass" },
  { text: "MySQL", slug: "mysql" },
  { text: "HTML", slug: "html5" },
  { text: "CSS", slug: "css" },
  { text: "NestJS", slug: "nestjs" },
  { text: "Vite", slug: "vite" },
  { text: "Laravel", slug: "laravel" },
  { text: "AngularJS", slug: "angular" },
  { text: "Swagger", slug: "swagger" },
  { text: "Git", slug: "git" },
];

export const THIRD_ROW = [
  { text: "PHP", slug: "php" },
  { text: "Composer", slug: "composer" },
  { text: "Vue.js", slug: "vuedotjs" },
  { text: "Vuetify", slug: "vuetify" },
  { text: "Docker", slug: "docker" },
  { text: "MongoDB", slug: "mongodb" },
  { text: "Mongoose", slug: "mongoose" },
  { text: "Prisma", slug: "prisma" },
];

export const LINKS = [
  { href: "/", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/waka-time", label: "WakaTime" },
];

export const CAREER: readonly CareerEntry[] = [
  {
    company: "Consortia Group",
    role: "Full-Stack Developer Intern",
    dateStart: "Mar 2026",
    dateEnd: "Jun 2026",
    logo: {
      kind: "image",
      src: "/images/consortia-group.webp",
      alt: "Consortia Group logo",
    },
    description:
      "Developed and maintained full-stack features across multiple client projects using modern web technologies.",
  },
  {
    company: "Sur Consulting, LLC",
    role: "Front-End Developer",
    dateStart: "2024",
    dateEnd: "2025",
    logo: {
      kind: "image",
      src: "/images/sur.webp",
      alt: "Sur Consulting logo",
    },
    description:
      "Enhanced UI/UX across client-facing web applications and contributed to backend improvements.",
  },
  {
    company: "FPT Can Tho",
    role: "Website Development Student",
    dateStart: "2021",
    dateEnd: "2024",
    logo: {
      kind: "image",
      src: "/images/logo-FPT-Polytechnic-.png",
      alt: "FPT school logo",
    },
    description: "Studied web development in Can Tho.",
  },
];
