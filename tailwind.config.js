/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        primary: {
          100: "#2388FF",
          200: "#FF2D46",
          300: "#FFC700",
          400: "#63DE77",
        },
        secondary: {
          100: "#1777E7",
          200: "#EAF4FF",
          300: "#DE1F35",
          400: "#FFE8EA",
          500: "#E79800",
          600: "#FFF9E5",
          700: "#37C972",
          800: "#E5F8E8",
        },
        neutral: {
          100: "#FFFFFF",
          200: "#F8FAFF",
          300: "#F1F3F7",
          400: "#E1E4ED",
          500: "#B4B9C9",
          600: "#6D758F",
          700: "#353E5C",
          800: "#19213D",
        },
      },
    },
  },
  plugins: [],
};
