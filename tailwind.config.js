/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "path-to-your-node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "path-to-your-node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      colors: {
        customColor: '#yourHexColorCode',
        purple: {
          10: '#190A29',
          20: '#321452',
          30: '#4B1E7A',
          40: '#6528A4',
          50: '#7E32CD',
          60 : '#985BD7',
          70 : '#B184E1',
          80 : '#CBADEB',
          90 : '#E5D6F5'
        },
        yellow: {
          10: '#302B03',
          20: '#615605',
          30: '#918008',
          40: '#C2AB0A',
          50: '#F2D60D',
          60 : '#F5DE3D',
          70 : '#F7E66E',
          80 : '#FAEF9E',
          90 : '#FCF7CF'
        },
        red: {
          10: '#330000',
          20: '#660000',
          30: '#990100',
          40: '#CC0100',
          50: '#FF0100',
          60 : '#FF3433',
          70 : '#FF6766',
          80 : '#FF9999',
          90 : '#FFCCCC'
        },
        green: {
          10: '#0E250E',
          20: '#1B4B1B',
          30: '#297029',
          40: '#379537',
          50: '#45BA45',
          60 : '#6AC86A',
          70 : '#8FD68F',
          80 : '#B4E4B4',
          90 : '#DAF1DA'
        },
        gray: {
          10: '#1A1A1A',
          20: '#333333',
          30: '#4D4D4D',
          40: '#666666',
          50: '#808080',
          60 : '#999999',
          70 : '#B3B3B3',
          80 : '#CCCCCC',
          90 : '#E6E6E6'
        },
        blue: {
          10: '#021131',
          20: '#052361',
          30: '#073492',
          40: '#0945C3',
          50: '#0C57F3',
          60 : '#3C78F6',
          70 : '#6D9AF8',
          80 : '#9EBCFA',
          90 : '#CEDDFD'
        },
      }
    },
  },
  plugins: [],
})