/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Quicksand: ["Quicksand", "cursive"],
        Mukta: ["Mukta"]
      },
      colors:{
        customize:{
          redbackground: "#b50404",
          blackbackground: "#080808",
        }
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        }
      }
    },

  },
  plugins: [],
};

