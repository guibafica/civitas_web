/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Lato", "sans-serif"],
      },
      boxShadow: {
        "custom-shadow": "0 4px 24px -1px rgba(0, 0, 0, 0.11)",
      },
    },
  },
  plugins: [],
};
