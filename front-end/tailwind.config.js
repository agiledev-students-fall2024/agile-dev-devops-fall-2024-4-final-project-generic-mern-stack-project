/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    
    "./src/**/*.{html,js,jsx,ts,tsx}"


  ],
  theme: {
    extend: {
      colors: {
        primary: '#3490dc',
        secondary: '#ffed4a',
        danger: '#e3342f',
      },
    },
  },

  important: true,

};

// AFTER ADDING NEW TAILWIND CSS CLASSES, RUN THE FOLLOWING COMMAND IN YOUR LOCAL REPO AT LEAST ONCE
// npx tailwindcss -i ./src/assets/styles/tailwind.css -o ./src/assets/styles/output.css --watch
