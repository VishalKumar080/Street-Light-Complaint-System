/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        backGround: "url('./assets/dark-street-light.jpg')",
      },
    },
  },
  plugins: [],
};

