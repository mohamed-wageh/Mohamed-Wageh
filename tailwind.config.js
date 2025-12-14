/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        background: "#0A0A0A",
        text: "#E5E7EB",
        subtle: "#A1A1AA",
        accent: "#34D399",
        "accent-hover": "#2FBB8A",
        card: "#18181B",
        border: "#27272A",
      },
      fontFamily: {
        sans: ["Inter", "Manrope", "sans-serif"],
      },
      animation: {
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
      },
    },
  },
  plugins: [],
};
