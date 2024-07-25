/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",

  theme: {
    colors: {
      text: "#e4f5fd",
      background: "#02121d",
      primary: "#74c1f7",
      secondary: "#09099b",
      accent: "#3515f2",
      black: "#000000",
      white: "#FFFFFF",
      soft: " #232b2b",
      softWhite: " 	#EEEEEE",
      lime: "#5aff91",
      greenLight: "#c7f284",
      lightSoft: "#353839",
      transparent: "#00000000",
      swapBackground: "#222831",
      swapSecondary: "#212121",
      error: "#FF9494",
      cardBg: "#010f18",
    },
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },

    extend: {
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

// #021118
