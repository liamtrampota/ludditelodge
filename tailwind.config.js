/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        parchment: '#F4EFE6',
        parchment2: '#EDE5D6',
        ink: '#2A2620',
        ink2: '#4A4138',
        pine: '#5A6B52',
        pine2: '#3F4D38',
        clay: '#B8845F',
        slate: '#A8B5BD',
      },
      fontFamily: {
        display: ['var(--tw-display)'],
        body: ['var(--tw-body)'],
        hand: ['var(--tw-hand)'],
      },
    },
  },
  plugins: [],
};
