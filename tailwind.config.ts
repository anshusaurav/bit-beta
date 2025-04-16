import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        primary: ['Inter', ...defaultTheme.fontFamily.sans],
        hero: ['Roboto', ...defaultTheme.fontFamily.sans],
        content: ['Public Sans', ...defaultTheme.fontFamily.sans],
        decor: ['Recife', ...defaultTheme.fontFamily.sans],
        polysans:['Polysans', ...defaultTheme.fontFamily.sans],
        trakya: ['Trakya', ...defaultTheme.fontFamily.sans],
      },
      height: {
        '20': '80px',
      },
      width: {
        '20': '80px',
      },
      colors: {
        primary: {
          // Customize it on globals.css :root
          50: 'rgb(var(--tw-color-primary-50) / <alpha-value>)',
          100: 'rgb(var(--tw-color-primary-100) / <alpha-value>)',
          200: 'rgb(var(--tw-color-primary-200) / <alpha-value>)',
          300: 'rgb(var(--tw-color-primary-300) / <alpha-value>)',
          400: 'rgb(var(--tw-color-primary-400) / <alpha-value>)',
          500: 'rgb(var(--tw-color-primary-500) / <alpha-value>)',
          600: 'rgb(var(--tw-color-primary-600) / <alpha-value>)',
          700: 'rgb(var(--tw-color-primary-700) / <alpha-value>)',
          800: 'rgb(var(--tw-color-primary-800) / <alpha-value>)',
          900: 'rgb(var(--tw-color-primary-900) / <alpha-value>)',
          950: 'rgb(var(--tw-color-primary-950) / <alpha-value>)',
        },
        dark: '#222222',
        kobicha: '#66381F',
        kobichaLight:'#85604C',
        bone: '#E5D8C5',
        jet: '#2C2C2C',
        pumpkin: '#EF7828',
        eerieBlack: '#191817',
        platinum: '#E6E6E6',
        grabniteGrey: '#666666',
        darkBg:'#0F0F0F',
        greyBg: '#2C2D31',
        increase: '#65C467',
        decrease: '#D24B34',
        mentorCardBgStart: '#e9e8e0', 
        mentorCardBgEnd: '#f8f7f2',
        gold: ' #F89C1B',    
      },
      backgroundColor: {
        bone: '#E5D8C5',
      },
      backgroundSize: {
        '50%': '50%',
        '88%': '88%',
      },
      borderWidth: {
        DEFAULT: '1px',
        '0': '0',
        '2': '2px',
        '3': '3px',
        '4': '4px',
        '6': '6px',
        '8': '8px',
      },
      keyframes: {
        flicker: {
          '0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100%': {
            opacity: '0.99',
            filter:
              'drop-shadow(0 0 1px rgba(252, 211, 77)) drop-shadow(0 0 15px rgba(245, 158, 11)) drop-shadow(0 0 1px rgba(252, 211, 77))',
          },
          '20%, 21.999%, 63%, 63.999%, 65%, 69.999%': {
            opacity: '0.4',
            filter: 'none',
          },
        },
        shimmer: {
          '0%': {
            backgroundPosition: '-700px 0',
          },
          '100%': {
            backgroundPosition: '700px 0',
          },
        },
      },
      animation: {
        flicker: 'flicker 3s linear infinite',
        shimmer: 'shimmer 1.3s linear infinite',
      },
      screens: {

        'mlg': '840px',
        // => @media (min-width: 768px) { ... }
        'mgl': '902px',
        'lxl': '1120px',
        '3xl': '1700px',
        // => @media (min-width: 1280px) { ... }
      },
      gridAutoRows: {
        '1fr': '1fr',
      }
    }
  },
  plugins: [require('@tailwindcss/forms')],
} satisfies Config;
