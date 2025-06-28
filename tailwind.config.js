// client/tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        flip: 'flip 0.6s ease-in-out',
      },
      keyframes: {
        flip: {
          "0%": { transform: "rotateX(0deg)" },
          "50%": { transform: "rotateX(90deg)" },
          "100%": { transform: "rotateX(0deg)" },
        },
      },
      animation: {
        flip: "flip 0.6s ease-in-out",
      },
    },
  },
  plugins: [],
};
