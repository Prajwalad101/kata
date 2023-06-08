/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/features/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    screens: {
      xs: '475px',
      ...defaultTheme.screens,
    },
    extend: {
      fontFamily: {
        rubik: ['Rubik', 'sans-serif'],
        merriweather: ['Merriweather', 'serif'],
      },
      colors: {
        primaryred: '#F55A5A',
        secondarytext: '#4E4E4E',
      },
      backgroundImage: {
        'main-img': "url('/images/landingpage/bike-shop.jpg')",
        'for-business-main': "url('/images/for-business/main-img.jpg')",
        'review-landing-img': "url('/images/landingpage/home-service.jpg')",
      },
    },
  },
  plugins: [
    require('tailwindcss-debug-screens'),
    function ({ addVariant }) {
      addVariant('child', '& > *');
      addVariant('child-notlast', '&>*:not(:last-child)');
    },
  ],
};
