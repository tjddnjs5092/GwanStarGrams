const colors = require('./src/lib/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    fontFamily: {
      100: ['Pretendard-Thin'],
      200: ['Pretendard-ExtraLight'],
      300: ['Pretendard-Light'],
      400: ['Pretendard-Regular'],
      500: ['Pretendard-Medium'],
      600: ['Pretendard-SemiBold'],
      700: ['Pretendard-Bold'],
      800: ['Pretendard-ExtraBold'],
      900: ['Pretendard-Black'],
    },

    extend: {
      borderWidth: {
        0.5: '0.5px',
      },
      flex: {
        2: '2 2 0%',
      },
      colors,
      fontSize: {
        '3xs': ['8px', '10px'],
        '2xs': ['10px', '12px'],
        // sm: ['11px', '18px'],
        md: ['15px', '18px'],
        base: ['16px', '20px'],
      },
    },
  },
  plugins: [],
};
