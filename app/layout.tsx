/**
 * LAYOUT PRINCIPAL - Root Layout
 * 
 * Ce fichier définit la structure HTML de base de l'application Next.js.
 * C'est le composant qui enveloppe toutes les pages de l'application.
 * 
 * Fonctionnalités :
 * - Définit les métadonnées de la page (titre, description, favicon)
 * - Configure la langue de la page (français)
 * - Applique les styles globaux (globals.css)
 * - Définit le thème de couleur de base (fond noir, texte blanc)
 */

import type { Metadata } from 'next'
import './globals.css'

// Métadonnées de l'application utilisées pour le SEO et l'affichage dans les navigateurs
export const metadata: Metadata = {
  title: 'Dashboard STI2D',
  description: 'Dashboard STI2D :ressources et projets ',
  icons: {
    icon: '/favicon.ico', // Icône affichée dans l'onglet du navigateur
  },
}

/**
 * Composant RootLayout qui enveloppe toutes les pages
 * @param children - Le contenu de la page actuelle (injecté automatiquement par Next.js)
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      {/* Le body utilise les classes Tailwind pour le thème sombre */}
      <body className="bg-koenigsegg-black text-white antialiased">
        {children}
      </body>
    </html>
  )
}
