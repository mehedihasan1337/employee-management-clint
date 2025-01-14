/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        roboto: ["Roboto", 'serif'],
      },
      backgroundImage: {
        'regBG': "url('/src/assets/regabackgraund.png')",
        'loginBG': "url('/src/assets/loginBackground.jpg')",
      },
    },
  },
  plugins: [
    require('daisyui'),

  ],
}

