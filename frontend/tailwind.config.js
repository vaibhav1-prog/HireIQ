/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        hireiq: {
          dark: "#0b2540",
          green: "#174b3f",
          teal: "#12ab8b",
          mist: "#eef8f6",
        },
      },
    },
  },
  plugins: [],
};
