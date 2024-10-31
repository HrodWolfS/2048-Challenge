/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        playwrite: ['"Playwrite GB S"', "sans-serif"],
        rubik: ['"Rubik Wet Paint"', "sans-serif"],
        bebas: ["'Bebas Neue'", "sans-serif"],
      },
      animation: {
        "scale-pulse": "scalePulse 2s ease-in-out infinite",
      },
      keyframes: {
        scalePulse: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.1)" },
        },
      },
    },
  },
  plugins: [],
};
