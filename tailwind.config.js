/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Outfit"', 'ui-sans-serif', 'system-ui', 'sans-serif']
      },
      backgroundImage: {
        'radial-glow':
          'radial-gradient(ellipse 80% 50% at 50% -10%, rgba(99, 102, 241, 0.25), transparent)'
      }
    }
  },
  plugins: []
}
