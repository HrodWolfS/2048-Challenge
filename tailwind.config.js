/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        playwrite: ['"Playwrite GB S"', "sans-serif"], // Ajoute la police Playwrite GB S
        rubik: ['"Rubik Wet Paint"', "sans-serif"], // Ajoute la police Rubik Wet Paint
      },
    },
  },
  plugins: [],
};
