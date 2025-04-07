/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Roboto", "sans-serif"], // Roboto sebagai default sans-serif
        norwester: ["Norwester", "sans-serif"], // Norwester sebagai opsi tambahan
      },
      colors: {
        primary: "#00975c",
        backgorundFirst: "#314a5f",
        backgorundSecond: "#517ea3",
        backgorundThird: "#92c6f1",
        baseBackground: "#223849",
        textColor: "#efefef",
        dropDownArrow: "#a5a7a8",
      },
      container: {
        center: true,
      },
    },
  },
  // eslint-disable-next-line no-undef
  plugins: [require("tailwind-scrollbar")],
};
