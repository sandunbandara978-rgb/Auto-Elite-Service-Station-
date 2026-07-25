/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0F172A',
          dark: '#0B0F19',
          light: '#1E293B',
        },
        charcoal: {
          DEFAULT: '#111827',
          dark: '#0B0F17',
          card: '#182235',
        },
        gold: {
          DEFAULT: '#D4AF37',
          hover: '#FBBF24',
          light: '#FEF08A',
          dark: '#B49229',
          glow: 'rgba(212, 175, 55, 0.25)',
        },
        accent: '#D4AF37',
      },
      fontFamily: {
        sans: ['Poppins', 'Inter', 'sans-serif'],
        display: ['Poppins', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        gold: '0 10px 40px -10px rgba(212, 175, 55, 0.3)',
        'gold-lg': '0 20px 60px -15px rgba(212, 175, 55, 0.45)',
        glass: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        card: '0 20px 50px rgba(0, 0, 0, 0.5)',
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #FEF08A 0%, #D4AF37 50%, #B49229 100%)',
        'dark-gradient': 'linear-gradient(180deg, #0B0F19 0%, #0F172A 50%, #111827 100%)',
        'radial-glow': 'radial-gradient(circle at 50% 0%, rgba(212, 175, 55, 0.15) 0%, transparent 75%)',
        'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%)',
      },
      animation: {
        'spin-slow': 'spin 12s linear infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { opacity: '0.4', filter: 'drop-shadow(0 0 10px rgba(212, 175, 55, 0.4))' },
          '100%': { opacity: '1', filter: 'drop-shadow(0 0 25px rgba(212, 175, 55, 0.8))' },
        },
      },
    },
  },
  plugins: [],
};
