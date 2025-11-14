import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Dashboard STI2D',
  description: 'Dashboard STI2D :ressources et projets ',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className="bg-koenigsegg-black text-white antialiased">
        {children}
      </body>
    </html>
  )
}
