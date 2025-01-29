/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1E40AF', // Example blue color
        secondary: '#9333EA',
        accent: '#FACC15',
      }
    },
  },
  plugins: [],
}
