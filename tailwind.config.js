
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      colors: {
        // New cinematic palette — old names remapped for backward compat
        obsidian: '#06060A',
        graphite: '#0E0E14',
        panel: '#14141C',
        hairline: '#1E1E28',
        edge: '#2E2E3C',
        bone: '#F2EFE8',
        muted: '#8A8A96',
        ember: '#FF3B2F',
        'ember-glow': '#FF6B5F',
        // Legacy aliases → new palette
        abyss: '#06060A',
        deep: '#0E0E14',
        forest: '#1E1E28',
        moss: '#2E2E3C',
        cream: '#F2EFE8',
        'cream-dim': '#8A8A96',
        amber: '#FF3B2F',
        'amber-bright': '#FF6B5F',
      },
      fontFamily: {
        serif: ['"Instrument Serif"', 'Fraunces', 'serif'],
        display: ['"Instrument Serif"', 'Fraunces', 'serif'],
        sans: ['Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      animation: {
        marquee: 'marquee 40s linear infinite',
        'marquee-slow': 'marquee 80s linear infinite',
        grain: 'grain 8s steps(10) infinite',
        'draw-line': 'draw-line 1.2s cubic-bezier(0.65,0,0.35,1) forwards',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        grain: {
          '0%,100%': { transform: 'translate(0,0)' },
          '10%': { transform: 'translate(-5%,-10%)' },
          '30%': { transform: 'translate(3%,-15%)' },
          '50%': { transform: 'translate(12%,9%)' },
          '70%': { transform: 'translate(9%,4%)' },
          '90%': { transform: 'translate(-1%,7%)' },
        },
        'draw-line': {
          '0%': { transform: 'scaleX(0)' },
          '100%': { transform: 'scaleX(1)' },
        },
      },
    },
  },
  plugins: [],
};
