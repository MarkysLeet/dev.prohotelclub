import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'soft-sand': '#F6EEE1', // base from design.md, matching #F6EFE8 conceptually
        'primary-text': '#1A231E',
        'secondary-text': '#5A6B5D',
        'evergreen-forest': '#2E4B2F', // Header and primary accents
        'evergreen-hover': '#1F3520',
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        moniqa: ['var(--font-moniqa)', 'sans-serif'],
        'century-gothic': ['var(--font-century-gothic)', 'sans-serif'],
      },
      transitionTimingFunction: {
        'cinematic': 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
} satisfies Config;
