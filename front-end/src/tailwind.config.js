/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [],
  theme: {
    extend: {
      colors: {
        primary: '#3490dc',
        secondary: '#ffed4a',
        danger: '#e3342f',
      },
    },
  },

  "scripts": {
    "build:css": "tailwindcss -i ./src/styles/tailwind.css -o ./dist/output.css --watch"
  }

};


