/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "monospace"],
      },
      colors: {
        surface: "var(--surface)",
        "surface-elevated": "var(--surface-elevated)",
        "surface-high": "var(--surface-high)",
        border: "var(--border)",
        "border-heavy": "var(--border-heavy)",
        yellow: "var(--yellow)",
        blue: "var(--blue)",
        "yellow-dim": "var(--yellow-dim)",
        "blue-dim": "var(--blue-dim)",
        accent: "var(--accent)",
        "accent-dim": "var(--accent-dim)",
      },
      keyframes: {
        scroll: { to: { transform: "translate(calc(-50% - 0.5rem))" } },
        snapIn: { from: { opacity: "0", transform: "translateX(-8px)" }, to: { opacity: "1", transform: "translateX(0)" } },
        thudIn: { from: { opacity: "0", transform: "translateY(8px)" }, to: { opacity: "1", transform: "translateY(0)" } },
        fadeIn: { from: { opacity: "0" }, to: { opacity: "1" } },
      },
      animation: {
        scroll: "scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite",
        "snap-in": "snapIn 0.2s step-end forwards",
        "thud-in": "thudIn 0.15s step-end forwards",
        "fade-in": "fadeIn 0.2s step-end forwards",
      },
    },
  },
  plugins: [],
};
