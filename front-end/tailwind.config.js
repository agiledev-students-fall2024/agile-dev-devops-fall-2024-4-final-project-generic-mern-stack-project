/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      height: {
        '6': '6vh',
        '94': 'calc(94vh - 36px)',
      },
    },
  },
  plugins: [],
};
