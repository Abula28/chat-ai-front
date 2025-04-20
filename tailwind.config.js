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
          650: "#23283d",
          700: "#353E5C",
          800: "#19213D",
        },
        textView: {
          light: "#fff",
          neutral: "#ACB4C0",
          dark: "#EDF0F4",
        },
        navy: {
          600: "#2B3674",
          700: "#1B2559",
        },
      },
      animation: {
        "spin-three-body": "spin78236 2s linear infinite",
        wobble1: "wobble1 0.8s ease-in-out infinite",
        "wobble1-delay": "wobble1 0.8s ease-in-out -0.3s infinite",
        wobble2: "wobble2 0.8s ease-in-out infinite",
      },
      keyframes: {
        spin78236: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        wobble1: {
          "0%, 100%": {
            transform: "translateY(0%) scale(1)",
            opacity: "1",
          },
          "50%": {
            transform: "translateY(-66%) scale(0.65)",
            opacity: "0.8",
          },
        },
        wobble2: {
          "0%, 100%": {
            transform: "translateY(0%) scale(1)",
            opacity: "1",
          },
          "50%": {
            transform: "translateY(66%) scale(0.65)",
            opacity: "0.8",
          },
        },
      },
    },
  },
  plugins: [],
};
