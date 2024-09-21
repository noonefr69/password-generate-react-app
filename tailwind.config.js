/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        green: "hsl(127, 100%, 82%)",
        black: "hsl(0, 0%, 0%)",
        gray: "hsl(251, 9%, 53%)",
        tosi: "hsl(248, 10%, 15%)",
        red: "hsl(0, 100%, 50%)",
        orange: "hsl(39, 100%, 50%)",
        yellow: "hsl(60, 100%, 50%)",
      }
    },
  },
  plugins: [],
}

