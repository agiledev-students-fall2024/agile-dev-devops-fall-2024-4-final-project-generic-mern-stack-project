/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      height: {
        6: '6vh',
        94: '94vh',
      },
      minHeight: {
        94: '94vh',
      },
      margin: {
        6: '6vh',
      },
    },
  },
  plugins: [],
};
