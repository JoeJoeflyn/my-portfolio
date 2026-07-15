# Sketch Manifest

## Design Direction
Brutalist/terminal portfolio for Nguyen Thai Tai. Dark canvas (`#111`), sharp corners
(`border-radius: 0`), hard offset shadows (`6px 6px 0`), step-end snappy motion (no easing),
yellow `#ffd700` + blue `#2563eb` accents on near-black surfaces. Terminal.txt framing,
grid background, cursor trail. Type is heavy display sans + monospace body. The feel is
"developer workstation, not marketing site" — honest, dense, no soft gradients.

## Reference Points
- Existing site (app/globals.css, app/page.tsx, app/projects/page.tsx)
- Terminal/IDE aesthetics, hard-edge brutalist web design
- GitHub profile README rendered as prose

## Sketches

| # | Name | Design Question | Winner | Tags |
|---|------|----------------|--------|------|
| 001 | project-case-study | How should a project detail/case-study page feel? | A: IDE Split | [layout, projects, detail] |
| 002 | hero-rethink | Does the current hero land, or is there a stronger intro? | B: Interactive Terminal | [hero, intro, layout] |
| 003 | now-dashboard | How should heatmaps + stats compose into one "now" section? | C: Command Bento | [stats, heatmap, composition] |
| 004 | contact-cta | What should the closing contact/CTA section feel like? | B: Big CTA | [contact, cta, closing] |

## User Decisions (for build phase)
- **Contact email:** `thaitainguyen336@gmail.com` (used in sketch 004 winner)
- **Logos:** Use real logo assets for tech/company logos (not text fallbacks). The existing
  `TechIcon` component + `simple-icons` + `/images/*-logo.png` assets should be used in the
  real implementation. Do not ship text-initial fallbacks where a logo exists.
