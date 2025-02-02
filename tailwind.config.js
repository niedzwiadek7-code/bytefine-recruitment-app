/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#7209b7',
        primary50: 'rgba(114, 9, 183, 0.5)',
        primary700: '#550788',
        black: '#000',
        black100: '#353535',
        black75: '#676767',
        black50: '#9B9B9B',
        black25: '#CDCDCD',
        white: '#FFF',
        white98: '#FAFAFA',
        white97: '#F7F7F8',
        red: '#CB0000',
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      fontSize: {
        button: '15px',
        body: '18px',
        display: '32px',
      },
    },
  },
  plugins: [],
}
