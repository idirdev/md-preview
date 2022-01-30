import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        surface: "#0a0a0f",
        panel: "#12121a",
        border: "#1e1e2e",
        accent: "#6366f1",
        "accent-hover": "#818cf8",
      },
      typography: {
        invert: {
          css: {
            "--tw-prose-body": "#cbd5e1",
            "--tw-prose-headings": "#e2e8f0",
            "--tw-prose-links": "#818cf8",
            "--tw-prose-bold": "#e2e8f0",
            "--tw-prose-code": "#22d3ee",
            "--tw-prose-pre-bg": "#12121a",
            "--tw-prose-pre-code": "#e2e8f0",
            "--tw-prose-quotes": "#94a3b8",
            "--tw-prose-quote-borders": "#334155",
            "--tw-prose-counters": "#64748b",
            "--tw-prose-bullets": "#64748b",
            "--tw-prose-hr": "#1e293b",
            "--tw-prose-th-borders": "#334155",
            "--tw-prose-td-borders": "#1e293b",
          },
        },
      },
    },
  },
  plugins: [],
};
export default config;
