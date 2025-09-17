/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./js/**/*.js",
    "./src/**/*.{html,js}"
  ],
  theme: {
    extend: {
      colors: {
        // BEPO Brand Colors
        plum: {
          DEFAULT: '#5A1A7A',
          light: '#8B4AAB',
          dark: '#3D0F5A'
        },
        clay: {
          DEFAULT: '#B87333',
          light: '#D4944A',
          dark: '#9A5F2A'
        },
        green: {
          DEFAULT: '#1B4D1B',
          light: '#2D6B2D',
          dark: '#0F3A0F'
        },
        blue: {
          DEFAULT: '#1E6B8A',
          light: '#3A8BB3',
          dark: '#0F4A66'
        },
        cream: {
          warm: '#F8F5F0',
          deep: '#F2E8D5',
          white: '#FEFCF8'
        },
        gold: {
          heritage: '#C49B2A'
        }
      },
      fontFamily: {
        'display': ['Playfair Display', 'serif'],
        'body': ['Inter', 'sans-serif']
      },
      fontSize: {
        'xs': '0.8rem',
        'sm': '0.9rem',
        'base': '1.1rem',
        'lg': '1.25rem',
        'xl': '1.4rem',
        '2xl': '1.6rem',
        '3xl': '2rem',
        '4xl': '2.5rem',
        '5xl': '3.2rem',
        '6xl': '4rem',
        '7xl': '5rem',
        '8xl': '6.4rem'
      },
      spacing: {
        '1': '0.25rem',
        '2': '0.5rem',
        '3': '0.75rem',
        '4': '1rem',
        '5': '1.25rem',
        '6': '1.5rem',
        '8': '2rem',
        '10': '2.5rem',
        '12': '3rem',
        '16': '4rem',
        '20': '5rem',
        '24': '6rem',
        '32': '8rem',
        '40': '10rem',
        '48': '12rem',
        '56': '14rem',
        '64': '16rem'
      },
      borderRadius: {
        'none': '0',
        'sm': '0.125rem',
        'DEFAULT': '0.25rem',
        'md': '0.375rem',
        'lg': '0.5rem',
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
        'full': '9999px'
      },
      boxShadow: {
        'georgian': '0 15px 30px -8px rgba(90, 26, 122, 0.2)',
        'heritage': '0 20px 40px -12px rgba(107, 44, 145, 0.3)',
        'warm': '0 10px 25px -5px rgba(184, 115, 51, 0.2)'
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'shimmer': 'shimmer 2s linear infinite',
        'morphing': 'morphing 3s ease-in-out infinite',
        'ripple': 'ripple 0.6s ease-out',
        'glitch': 'glitch 0.3s ease-in-out',
        'holographic': 'holographic 2s ease-in-out infinite'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' }
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' }
        },
        morphing: {
          '0%, 100%': { borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' },
          '50%': { borderRadius: '30% 60% 70% 40% / 50% 60% 30% 60%' }
        },
        ripple: {
          '0%': { transform: 'scale(0)', opacity: '1' },
          '100%': { transform: 'scale(4)', opacity: '0' }
        },
        glitch: {
          '0%, 100%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' }
        },
        holographic: {
          '0%, 100%': { filter: 'hue-rotate(0deg)' },
          '50%': { filter: 'hue-rotate(180deg)' }
        }
      }
    }
  },
  plugins: [
    function({ addUtilities }) {
      const newUtilities = {
        '.georgian-pattern': {
          'background-image': 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23C49B2A" fill-opacity="0.1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
        },
        '.heritage-border': {
          'border-image': 'linear-gradient(45deg, #5A1A7A, #B87333, #1B4D1B, #1E6B8A) 1',
        }
      }
      addUtilities(newUtilities)
    }
  ]
}

