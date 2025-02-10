/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#15202f",
        secondary: "#ffffff",
        third: "#2a2d3e",
        fourth: "#1e1e2c",
        dark: "#111111",
      },
      container: {
        center: true,
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
