/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      white: "#ffffff",
      newYellow: "#FFD300",
      newOrange: "#E98A15",
      secondary: "#443562",
    },
    extend: {
      fontFamily: {
        customFont: ["Roboto", "RobotoSerif"],
      },
    },
  },
  plugins: [],
};
