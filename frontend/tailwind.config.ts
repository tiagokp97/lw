import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      primary: {
          light: '#A990D2',
          DEFAULT: '#6D28D9',
          dark: '#4C1D95', 
        },
        secondary: {
          light: '#202021',
          DEFAULT: '#6B7280', 
          dark: '#374151', 
        },
        accent: {
          light: '#A7F3D0', 
          DEFAULT: '#10B981', 
          dark: '#151716', 
        },
           font: {
          white: '#C5CFC2', 
 
        },
        black: '#111827',
        white: '#FFFFFF',
      },
    },
  },
  plugins: [],
} satisfies Config;
