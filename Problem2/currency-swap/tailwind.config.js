// tailwind.config.js
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      colors: {
        blue1 : '#93c5fd',
        blue2 : '#60a5fa',
        blue3 : '#3b82f6',
        blue4 : '#2563eb',
        blue5 : '#1d4ed8',
        blue6: '#1e3a8a',

        bluepurple : '#6366f1',
        babypurple : '#8b5cf6',
        purple : '#9069ba',
        pinkpurple: '#6d28d9',

        grey: '#494d5f',
        offwhite : '#e5eaf5',
      },

    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}