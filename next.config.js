/**
 * CONFIGURATION NEXT.JS
 * 
 * Ce fichier contient la configuration de Next.js pour le projet.
 * 
 * Configuration actuelle :
 * - reactStrictMode: true - Active le mode strict de React pour détecter les problèmes
 * 
 * Pour ajouter d'autres configurations (images, redirects, etc.), modifiez l'objet nextConfig
 */

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Mode strict React : active des vérifications supplémentaires en développement
  // Aide à détecter les problèmes potentiels et prépare pour les futures versions de React
  reactStrictMode: true,
}

module.exports = nextConfig

