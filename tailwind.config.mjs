/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#415A80", // Deep Azure (light mode)
          dark: "#007BFF", // Bright Azure Blue (dark mode)
        },
        secondary: {
          light: "#A5D4DC", // Midwinter Mist
          dark: "#A5D4DC", // Same for both modes
        },
        background: {
          light: "#F2F4F8", // Snowbelt (light mode)
          dark: "#121212", // Charcoal Black (dark mode)
        },
        accent: {
          light: "#D7E2E9", // Early Frost
          dark: "#9B51E0", // Vibrant Purple
        },
        text: {
          light: "#1E1E1E", // Dark Gray (light mode)
          dark: "#F2F4F8", // Snowbelt (dark mode)
        },
      },
    },
  },
  plugins: [],
};
