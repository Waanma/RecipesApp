/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      white: "#ffffff",
      newYellow: "#FFD300",
      orangeSoft: "#F18F01",
      graySoft: "#B5B2B2",
      graySoft3: "#f5f5f5 ",
      secondary: "#443562",
      newButton: "#15A0E9",
    },
    extend: {
      fontFamily: {
        customFont: ["Roboto", "RobotoSerif"],
      },
    },
  },
  plugins: [],
};
