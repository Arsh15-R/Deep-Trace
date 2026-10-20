/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Inter",
          "Geist",
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Roboto",
          "sans-serif",
        ],
        mono: [
          '"JetBrains Mono"',
          '"SF Mono"',
          "Menlo",
          "Consolas",
          "ui-monospace",
          "monospace",
        ],
        serif: [
          "Georgia",
          "Cambria",
          '"Times New Roman"',
          "Times",
          "serif",
        ],
      },
      colors: {
        canvas: "var(--bg-canvas)",
        surface: {
          DEFAULT: "var(--bg-surface)",
          elevated: "var(--bg-surface-elevated)",
          hover: "var(--bg-surface-hover)",
          active: "var(--bg-surface-active)",
        },
        border: {
          subtle: "var(--border-subtle)",
          DEFAULT: "var(--border-default)",
          strong: "var(--border-strong)",
        },
        text: {
          primary: "var(--text-primary)",
          secondary: "var(--text-secondary)",
          tertiary: "var(--text-tertiary)",
          disabled: "var(--text-disabled)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          hover: "var(--accent-hover)",
          light: "var(--accent-light)",
          subtle: "var(--accent-subtle)",
          border: "var(--accent-border)",
        },
        status: {
          critical: "var(--status-critical)",
          "critical-bg": "var(--status-critical-bg)",
          "critical-border": "var(--status-critical-border)",
          warning: "var(--status-warning)",
          "warning-bg": "var(--status-warning-bg)",
          "warning-border": "var(--status-warning-border)",
          verified: "var(--status-verified)",
          "verified-bg": "var(--status-verified-bg)",
          "verified-border": "var(--status-verified-border)",
        },
        paper: {
          bg: "var(--paper-bg)",
          text: "var(--paper-text)",
          muted: "var(--paper-text-muted)",
          border: "var(--paper-border)",
        },
      },
      borderRadius: {
        xs: "var(--radius-xs)", // 4px
        sm: "var(--radius-sm)", // 6px
        md: "var(--radius-md)", // 8px
        DEFAULT: "var(--radius-sm)", // 6px
      },
      maxWidth: {
        content: "var(--max-content-width)", // 1100px
      },
      transitionDuration: {
        DEFAULT: "150ms",
        150: "150ms",
      },
      letterSpacing: {
        tight: "-0.025em",
        tighter: "-0.035em",
      },
    },
  },
  plugins: [],
};
