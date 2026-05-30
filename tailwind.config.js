module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#17251F', // Deep Pine Ink
        base: '#F4EFE4',    // Warm Mountain Milk
        surface: '#FFFCF6', // Cabin Paper
        accent: {
          DEFAULT: '#C9782D', // Trail Ember
          slate: '#4A6472',  // Mountain Slate Blue
        },
        text: {
          DEFAULT: '#1D211F', // Soft Charcoal
          muted: '#6D716B',   // Dust Grey
        },
        border: '#D8D0C3',    // Aged Stone
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'sans-serif'],
        serif: ['var(--font-newsreader)', 'serif'],
      },
      borderRadius: {
        sm: '12px',
        lg: '28px',
      },
      spacing: {
        '12': '12px',
        '28': '28px',
      },
    },
  },
  plugins: [],
}
