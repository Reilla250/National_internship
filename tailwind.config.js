/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50:  "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
        },
        success:  { DEFAULT: "#10b981", light: "#d1fae5" },
        warning:  { DEFAULT: "#f59e0b", light: "#fef3c7" },
        danger:   { DEFAULT: "#ef4444", light: "#fee2e2" },
        info:     { DEFAULT: "#3b82f6", light: "#dbeafe" },
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
      },
      keyframes: {
        "slide-up": {
          "0%": { opacity: 0, transform: "translateY(10px)" },
          "10%": { opacity: 1, transform: "translateY(0)" },
          "90%": { opacity: 1, transform: "translateY(0)" },
          "100%": { opacity: 0, transform: "translateY(-10px)" },
        },
        "fade-in": {
          "0%": { opacity: 0, transform: "scale(0.95)" },
          "100%": { opacity: 1, transform: "scale(1)" },
        }
      },
      animation: {
        "slide-up": "slide-up 4s ease-in-out infinite",
        "fade-in": "fade-in 0.2s ease-out forwards",
      }
    },
  },
  plugins: [],
};
