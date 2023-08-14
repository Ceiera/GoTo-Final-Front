/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      height: {
        'content': '35rem',
        'anotherContent': '30rem'
      },
      gridTemplateColumns: {
        'content': '250px 1fr 250px',
      }
    },
  },
  plugins: [],
}

