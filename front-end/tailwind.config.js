/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    
    "./src/**/*.{html,js,jsx,ts,tsx}"


  ],
  theme: {
    extend: {
      colors: {
        purpleGrey: '#b39ddb',
        purpleLighter: '#ede7f6',
        purpleLight: '#f3e5f5',  
        purpleMain: '#6a1b9a',
        purpleMedium: '#7e57c2',
        purpleDark: '#5e35b1',
        purpleDarker: '#512da8',
      },
    },
  },



  important: true,

};

// AFTER ADDING NEW TAILWIND CSS CLASSES, RUN THE FOLLOWING COMMAND IN YOUR LOCAL REPO AT LEAST ONCE
// npx tailwindcss -i ./src/assets/styles/tailwind.css -o ./src/assets/styles/output.css --watch
