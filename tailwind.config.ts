/**
 * CONFIGURATION TAILWIND CSS
 * 
 * Ce fichier configure Tailwind CSS pour le projet.
 * 
 * Personnalisations :
 * - Palette de couleurs "koenigsegg" (thème sombre avec or)
 * - Polices Inter (sans-serif) et Montserrat (display)
 * - Animations personnalisées (fade-in, slide-up)
 * 
 * Les couleurs sont utilisées dans tout le projet via les classes Tailwind
 * Exemple: bg-koenigsegg-black, text-koenigsegg-gold
 */

import type { Config } from 'tailwindcss'

const config: Config = {
  // Fichiers à scanner pour les classes Tailwind
  // Tailwind supprime les classes non utilisées lors du build (purge)
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Palette de couleurs personnalisée inspirée de Koenigsegg (voiture de luxe)
      // Utilisation: bg-koenigsegg-black, text-koenigsegg-gold, etc.
      colors: {
        designSS: {
          black: '#0a0a0a',        // Fond principal très sombre
          darkGray: '#1a1a1a',     // Fond secondaire
          gray: '#2a2a2a',         // Fond des cartes
          lightGray: '#404040',    // Bordures et éléments secondaires
          gold: '#d4af37',         // Couleur d'accent principale (or)
          silver: '#c0c0c0',       // Texte secondaire
          accent: '#8b7355',       // Couleur d'accent secondaire
        },
      },
      // Polices personnalisées chargées depuis Google Fonts (voir globals.css)
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],           // Police principale
        display: ['var(--font-montserrat)', 'system-ui', 'sans-serif'],   // Police pour les titres
      },
      // Animations personnalisées (actuellement non utilisées, mais disponibles)
      animation: {
        'fade-in': 'fadeIn 0.8s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
      },
      // Définitions des keyframes pour les animations
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}

export default config

