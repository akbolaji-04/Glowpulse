module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx,html}'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif']
      },
      colors: {
        cyanGlow: '#00f0ff',
        violetDeep: '#5b21b6'
      }
    }
  },
  plugins: [],
}
