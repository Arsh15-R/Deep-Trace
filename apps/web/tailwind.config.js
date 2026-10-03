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
          "-apple-system",
          "BlinkMacSystemFont",
          '"SF Pro Text"',
          '"SF Pro Display"',
          '"SF Pro"',
          "Inter",
          "sans-serif",
        ],
        display: [
          "-apple-system",
          "BlinkMacSystemFont",
          '"SF Pro Display"',
          '"SF Pro Text"',
          "Inter",
          "sans-serif",
        ],
        mono: [
          '"SF Mono"',
          '"JetBrains Mono"',
          "Menlo",
          "Consolas",
          "ui-monospace",
          "monospace",
        ],
      },
      colors: {
        // Apple Core Design System
        apple: {
          bg: "var(--apple-bg)",
          surface: "var(--apple-surface)",
          "surface-secondary": "var(--apple-surface-secondary)",
          "surface-tertiary": "var(--apple-surface-tertiary)",
          text: "var(--apple-text)",
          "text-secondary": "var(--apple-text-secondary)",
          "text-tertiary": "var(--apple-text-tertiary)",
          hairline: "var(--apple-hairline)",
          "hairline-strong": "var(--apple-hairline-strong)",
          blue: "var(--apple-blue)",
          "blue-hover": "var(--apple-blue-hover)",
          red: "var(--apple-red)",
          orange: "var(--apple-orange)",
          green: "var(--apple-green)",
          card: "var(--apple-card)",
          "card-hover": "var(--apple-card-hover)",
        },
        bg: "var(--bg)",
        fg: "var(--fg)",
        muted: "var(--muted)",
        subtle: "var(--subtle)",
        line: "var(--line)",
        surface: "var(--surface)",
        hover: "var(--hover)",
        background: "var(--background)",
        foreground: "var(--foreground)",
        border: "var(--border)",
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
      },
      borderRadius: {
        pill: "980px",
        "apple-sm": "10px",
        "apple-md": "16px",
        "apple-lg": "22px",
        "apple-xl": "28px",
      },
      boxShadow: {
        "apple-subtle": "0 2px 12px rgba(0, 0, 0, 0.04)",
        "apple-card": "0 4px 24px rgba(0, 0, 0, 0.06)",
        "apple-card-hover": "0 12px 36px rgba(0, 0, 0, 0.09)",
        "apple-modal": "0 24px 60px rgba(0, 0, 0, 0.18)",
      },
      spacing: {
        section: "140px",
      },
      letterSpacing: {
        apple: "-0.02em",
        "apple-tight": "-0.03em",
      },
      transitionTimingFunction: {
        "apple-spring": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};
