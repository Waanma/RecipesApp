/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      white: "#ffffff",
      black: "#000000",
      newBlack: "#0f0f0f",
      newYellow: "#FFD300",
      newSkyBlue: "#00aae4",
      orangeSoft: "#F18F01",
      graySoft: "#B5B2B2",
      graySoft3: "#f5f5f5 ",
      secondary: "#443562",
      moonLight: "#F6F1D5",
    },
    extend: {
      fontFamily: {
        customFont: ["Roboto", "RobotoSerif"],
      },
    },
    darkMode: "class",
  },
  plugins: [],
};
