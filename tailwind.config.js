// Importing NextUI Tailwind plugin
import { nextui } from "@nextui-org/theme";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}", // Scans component files
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}", // Scans app files
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}", // Scans NextUI theme package
  ],
  theme: {
    extend: {
      fontFamily: {
        // Define CSS variables for fonts to be used in Tailwind
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
    },
  },
  darkMode: "class", // Enables class-based dark mode
  plugins: [nextui()], // Use NextUI plugin for Tailwind CSS
};
