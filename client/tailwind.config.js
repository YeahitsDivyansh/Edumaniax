module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sigmar: ['"Sigmar One"', "cursive"],
        lilita: ['"Lilita One"', "sans-serif"],
      },
      animation: {
        aurora: "aurora 10s ease-in-out infinite",
        shake: "shake 0.4s ease-in-out",
        growShrink: "grow-shrink 2.6s linear",
        loadBar: "load-bar 3s linear forwards", // 👈 ADDED
      },
      keyframes: {
        aurora: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        shake: {
          "0%, 100%": { transform: "translateX(0)" },
          "25%": { transform: "translateX(-6px)" },
          "75%": { transform: "translateX(6px)" },
        },
        growShrink: {
          "0%": { transform: "scale(1)" },
          "3.8%": { transform: "scale(1.2)" },
          "80.8%": { transform: "scale(1.2)" },
          "100%": { transform: "scale(1)" },
        },
        loadBar: {
          // 👈 ADDED
          "0%": { width: "0%" },
          "100%": { width: "100%" },
        },
      },
      boxShadow: {
        text: "0 0 10px rgba(0, 0, 0, 0.4)",
      },
    },
  },
  plugins: [],
};
