import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  prefix: "",
  theme: {
    extend: {
      colors: {
        border: "var(--border)",
        background: "var(--background)",
        foreground: "var(--foreground)",

        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        informative: {
          DEFAULT: "var(--informative)",
          foreground: "var(--informative-foreground)",
        },
        warning: {
          DEFAULT: "var(--warning)",
          foreground: "var(--warning-foreground)",
        },
      },
      typography: {
        DEFAULT: {
          css: {
            "h2, h3, h4": {
              scrollMarginTop: "5rem",
            },
            p: {
              marginTop: "2rem",
              marginBottom: "2rem",
            },
            ".callout-contents > p": {
              margin: 0,
            },

            code: {
              counterReset: "line",
            },

            // Inline code only
            ":not(pre) > code": {
              fontWeight: "inherit",
              position: "relative",
              bottom: 1,
              margin: "0 3px",
              color: "#eb5757",
              backgroundColor: "rgba(135,131,120,0.15)",
              fontFamily: '"SFMono-Regular", Menlo, Consolas, "PT Mono", "Liberation Mono", Courier, monospace',
              borderRadius: 3,
              padding: "0.2em 0.4em",
              overflowWrap: "break-word",
            },

            "code::before": {
              content: "none",
            },
            "code::after": {
              content: "none",
            },

            "code[data-line-numbers] > [data-line]::before": {
              counterIncrement: "line",
              content: "counter(line)",

              /* Other styling */
              display: "inline-block",
              width: "1rem",
              marginRight: "1.4rem",
              textAlign: "right",
              color: "lightgrey",
              fontSize: "0.75rem",
            },

            'code[data-line-numbers-max-digits="2"] > [data-line]::before': {
              width: "1rem",
            },

            'code[data-line-numbers-max-digits="3"] > [data-line]::before': {
              width: "2rem",
            },

            pre: {
              paddingRight: 0,
              paddingLeft: 0,
              color: "var(--shiki-light)",
              backgroundColor: "var(--shiki-light-bg)",
              border: "1px solid #e5e7eb",
            },

            ".dark pre": {
              backgroundColor: "var(--shiki-dark-bg)",
              color: "var(--shiki-dark)",
              border: "1px solid #374151",
            },

            "pre > code > span": {
              paddingLeft: "1.1rem",
              paddingRight: "1rem",
            },

            "pre code span": {
              color: "var(--shiki-light)",
            },
            ".dark pre code span": {
              color: "var(--shiki-dark)",
            },

            "[data-highlighted-line]": {
              backgroundColor: "rgba(253, 224, 71, 0.2)",
            },

            ".project img": {
              marginTop: "0px !important",
            },

            ".project p,ul,li": {
              fontSize: 15,
            },

            u: {
              textUnderlineOffset: "4px",
              textDecorationThickness: 1,
              fontWeight: 600,
            },
          },
        },
      },
      screens: {
        mobile: "320px",
        "2sm": "440px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
export default config;
