const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      muzashi: ["EDMuzazhi", "IBM Plex Sans Thai"],
      sans: ["IBM Plex Sans Thai", ...defaultTheme.fontFamily.sans],
    },
    colors: {
      primary: "#D03F51",
      dark: "#4B4850",
    },
    extend: {},
  },
  plugins: [],
};
