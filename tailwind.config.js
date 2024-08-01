/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        sm: '100%',
        md: '1280px',
        lg: '1280px',
        xl: '1280px',
      },
    },
  },
  plugins: [],
}
