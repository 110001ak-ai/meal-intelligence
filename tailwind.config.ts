import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'sans-serif'],
        serif: ['Cormorant', 'serif'],
      },
      colors: {
        bg:     '#f7f5f1',
        card:   '#ffffff',
        ink:    '#131110',
        ink2:   '#6b6560',
        ink3:   '#aea9a2',
        bd:     '#e8e4dd',
        bd2:    '#f1ede8',
        accent: '#c24e16',
        al:     '#fef2eb',
        green:  '#1a6b49',
        gl:     '#e6f3ed',
      },
      borderRadius: { r: '11px' },
      boxShadow: {
        tile: '0 1px 12px rgba(194,78,22,.12)',
        pill: '0 2px 10px rgba(19,17,16,.16)',
      },
    },
  },
  plugins: [],
}
export default config
