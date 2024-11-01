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
      boxShadow: {
        shadow2: "1px 1px 0px 0px rgba(0,0,0,1)",
        shadow4:
          "0px 0px 0px 0px rgba(255,255,255,1), 1.5px 1.5px 0px 0px rgba(0,0,0,1)",
        shadow8:
          "0px 0px 0px 0px rgba(255,255,255,1), 1.5px 1.5px 0px 0px rgba(0,0,0,1), 2px 2px 0px 0px rgba(255,255,255,1), 3.5px 3.5px 0px 0px rgba(0,0,0,1)",
        shadow16:
          "0px 0px 0px 0px rgba(255,255,255,1), 1.5px 1.5px 0px 0px rgba(0,0,0,1), 2px 2px 0px 0px rgba(255,255,255,1), 3.5px 3.5px 0px 0px rgba(0,0,0,1), 4px 4px 0px 0px rgba(255,255,255,1), 5.5px 5.5px 0px 0px rgba(0,0,0,1)",
        shadow32:
          "0px 0px 0px 0px rgba(255,255,255,1), 1.5px 1.5px 0px 0px rgba(0,0,0,1), 2px 2px 0px 0px rgba(255,255,255,1), 3.5px 3.5px 0px 0px rgba(0,0,0,1), 4px 4px 0px 0px rgba(255,255,255,1), 5.5px 5.5px 0px 0px rgba(0,0,0,1), 6px 6px 0px 0px rgba(255,255,255,1), 7.5px 7.5px 0px 0px rgba(0,0,0,1)",
        shadow64:
          "0px 0px 0px 0px rgba(255,255,255,1), 1.5px 1.5px 0px 0px rgba(0,0,0,1), 2px 2px 0px 0px rgba(255,255,255,1), 3.5px 3.5px 0px 0px rgba(0,0,0,1), 4px 4px 0px 0px rgba(255,255,255,1), 5.5px 5.5px 0px 0px rgba(0,0,0,1), 6px 6px 0px 0px rgba(255,255,255,1), 7.5px 7.5px 0px 0px rgba(0,0,0,1), 8px 8px 0px 0px rgba(255,255,255,1), 9.5px 9.5px 0px 0px rgba(0,0,0,1)",
        shadow128:
          "0px 0px 0px 0px rgba(255,255,255,1), 1.5px 1.5px 0px 0px rgba(0,0,0,1), 2px 2px 0px 0px rgba(255,255,255,1), 3.5px 3.5px 0px 0px rgba(0,0,0,1), 4px 4px 0px 0px rgba(255,255,255,1), 5.5px 5.5px 0px 0px rgba(0,0,0,1), 6px 6px 0px 0px rgba(255,255,255,1), 7.5px 7.5px 0px 0px rgba(0,0,0,1),8px 8px 0px 0px rgba(255,255,255,1), 9.5px 9.5px 0px 0px rgba(0,0,0,1), 10px 10px 0px 0px rgba(255,255,255,1), 10.5px 10.5px 0px 0px rgba(0,0,0,1)",
        shadow256:
          "0px 0px 0px 0px rgba(255,255,255,1), 1.5px 1.5px 0px 0px rgba(0,0,0,1), 2px 2px 0px 0px rgba(255,255,255,1), 3.5px 3.5px 0px 0px rgba(0,0,0,1), 4px 4px 0px 0px rgba(255,255,255,1), 5.5px 5.5px 0px 0px rgba(0,0,0,1), 6px 6px 0px 0px rgba(255,255,255,1), 7.5px 7.5px 0px 0px rgba(0,0,0,1),8px 8px 0px 0px rgba(255,255,255,1), 9.5px 9.5px 0px 0px rgba(0,0,0,1), 10px 10px 0px 0px rgba(255,255,255,1), 10.5px 10.5px 0px 0px rgba(0,0,0,1), 11px 11px 0px 0px rgba(255,255,255,1), 11.5px 11.5px 0px 0px rgba(0,0,0,1)",
        shadow512:
          "0px 0px 0px 0px rgba(255,255,255,1), 1.5px 1.5px 0px 0px rgba(0,0,0,1), 2px 2px 0px 0px rgba(255,255,255,1), 3.5px 3.5px 0px 0px rgba(0,0,0,1), 4px 4px 0px 0px rgba(255,255,255,1), 5.5px 5.5px 0px 0px rgba(0,0,0,1), 6px 6px 0px 0px rgba(255,255,255,1), 7.5px 7.5px 0px 0px rgba(0,0,0,1),8px 8px 0px 0px rgba(255,255,255,1), 9.5px 9.5px 0px 0px rgba(0,0,0,1), 10px 10px 0px 0px rgba(255,255,255,1), 10.5px 10.5px 0px 0px rgba(0,0,0,1), 11px 11px 0px 0px rgba(255,255,255,1), 11.5px 11.5px 0px 0px rgba(0,0,0,1), 12px 12px 0px 0px rgba(255,255,255,1), 12.5px 12.5px 0px 0px rgba(0,0,0,1)",
        shadow1024:
          "0px 0px 0px 0px rgba(255,255,255,1), 1.5px 1.5px 0px 0px rgba(0,0,0,1), 2px 2px 0px 0px rgba(255,255,255,1), 3.5px 3.5px 0px 0px rgba(0,0,0,1), 4px 4px 0px 0px rgba(255,255,255,1), 5.5px 5.5px 0px 0px rgba(0,0,0,1), 6px 6px 0px 0px rgba(255,255,255,1), 7.5px 7.5px 0px 0px rgba(0,0,0,1),8px 8px 0px 0px rgba(255,255,255,1), 9.5px 9.5px 0px 0px rgba(0,0,0,1), 10px 10px 0px 0px rgba(255,255,255,1), 10.5px 10.5px 0px 0px rgba(0,0,0,1), 11px 11px 0px 0px rgba(255,255,255,1), 11.5px 11.5px 0px 0px rgba(0,0,0,1), 12px 12px 0px 0px rgba(255,255,255,1), 12.5px 12.5px 0px 0px rgba(0,0,0,1), 13px 13px 0px 0px rgba(255,255,255,1), 13.5px 13.5px 0px 0px rgba(0,0,0,1)",
        shadow2048:
          "1px 1px 0px 0px rgba(255,255,255,1), 1.5px 1.5px 0px 0px rgba(0,0,0,1), 2px 2px 0px 0px rgba(255,255,255,1), 3.5px 3.5px 0px 0px rgba(0,0,0,1), 4px 4px 0px 0px rgba(255,255,255,1), 5.5px 5.5px 0px 0px rgba(0,0,0,1), 6px 6px 0px 0px rgba(255,255,255,1), 7.5px 7.5px 0px 0px rgba(0,0,0,1),8px 8px 0px 0px rgba(255,255,255,1), 9.5px 9.5px 0px 0px rgba(0,0,0,1), 10px 10px 0px 0px rgba(255,255,255,1), 10.5px 10.5px 0px 0px rgba(0,0,0,1), 11px 11px 0px 0px rgba(255,255,255,1), 11.5px 11.5px 0px 0px rgba(0,0,0,1), 12px 12px 0px 0px rgba(255,255,255,1), 12.5px 12.5px 0px 0px rgba(0,0,0,1), 13px 13px 0px 0px rgba(255,255,255,1), 13.5px 13.5px 0px 0px rgba(0,0,0,1), 14px 14px 0px 0px rgba(255,255,255,1), 14.5px 14.5px 0px 0px rgba(0,0,0,1)",
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
