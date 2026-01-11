/**
 * PAGE D'ACCUEIL - Dashboard STI2D
 */

'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ExternalLinkIcon, CodeIcon, BookOpenIcon, ClipboardIcon } from '@/components/Icons'

// Interface - définir la structure d'un lien utile
interface UsefulLink {
  title: string
  url: string
  description?: string
}

// Interface - définir la structure d'un projet
interface Project {
  title: string
  url: string
  description: string
}

// Interface - définir la structure d'une séquence pédagogique
interface Sequence {
  title: string
  url: string
  description: string
  status: 'available' | 'coming-soon' // Statut 
}

// Tableau - liens utiles affichés sur la page l
const usefulLinks: UsefulLink[] = [
  { title: 'GitHub', url: 'https://github.com/SHU445', description: 'Mes repositories' },
  { title: 'Vercel', url: 'https://vercel.com/login', description: 'Déploiement' },
  { title: 'Gmail', url: 'https://mail.google.com/mail/u/0/#inbox', description: 'Gmail' },
  { title: 'Neon DB', url: 'https://neon.com/', description: 'Base de données' },
  { title: 'MDN HTML', url: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements', description: 'Référence HTML' },
  { title: 'MDN CSS', url: 'https://developer.mozilla.org/fr/docs/Web/CSS/Reference/Properties', description: 'Référence CSS' },
  { title: 'MDN JavaScript', url: 'https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference', description: 'Référence JavaScript' },
  { title: 'Markdown', url: 'https://docs.framasoft.org/fr/grav/markdown.html', description: 'Référence Markdown' },
  { title: 'Adobe color', url: 'https://color.adobe.com/fr/create/color-wheel', description: 'Adobe color' },
  { title: 'Color Hunt', url: 'https://colorhunt.co/', description: 'Color Hunt' },
  { title: 'Color Space', url: 'https://mycolor.space/', description: 'Color Space' },
  { title: 'Pronote', url: 'https://0380089r.index-education.net/pronote/eleve.html?identifiant=t7gHE7rr8j8kpQf2', description: 'Notes et emploi du temps' },
  { title: 'ENT', url: 'https://porte-oisans.ent.auvergnerhonealpes.fr/sg.do?PROC=PAGE_ACCUEIL&ACTION=VALIDER', description: 'Espace numérique' },
  { title: 'ELEA', url: 'https://aura-38-sud.elea.apps.education.fr/local/elea_dashboard/index.php', description: 'Plateforme pédagogique' },
  { title: 'TinkerCAD', url: 'https://www.tinkercad.com/login', description: 'CAO en ligne' },
  // Lien utile orienté ajout en plus section à part à faire.
  { title: 'Temlis', url: 'http://temlis.com/', description: 'Template for web design'},
  { title: 'Kimi', url: 'http://kimi.com/', description: 'Gen a slide or a presentation'},
  //{ title: '', url: '', description: ''},
  { title: 'ZimaOS', url: 'http://zimaspace.com/', description: '[OS Linux based on Debian for simplify self-hosted with features NAS on DIY'},
  { title: 'Coolify', url: 'http://coolify.io/', description: 'Open-source and self-hostable alternative to Vercel, Heroku, Netfly and Railway for easily deploy'},
  { title: 'UIverse', url: 'http://uiverse.io/', description: 'Open-source UI for web dev/design'},
  { title: 'Animista', url:'Animista.net', description: 'On-demand CSS animation library'},
  { title: 'Gradient Hunt', url: 'http://gradienthunt.com/', description: 'Gradient for web dev/design'},
  { title: 'CodeMyUI', url: 'http://codemyui.com/', description: 'Web design and UI inspiration'},
]

// Tableau - projets personnels 
// Chaque projet a un titre, une URL (vers Vercel ou autre) et une description
const projects: Project[] = [
  {
    title: 'Calisthenie Tracker',
    url: 'https://calisthenie-tracker.vercel.app/',
    description: 'Application de suivi d\'entraînement calisthénie'
  },
  {
    title: 'IP Tool',
    url: 'https://my-iptool.vercel.app/',
    description: 'Outil pour manipulation d\'IP'
  },
  {
    title: 'Note Solve',
    url: 'https://note-solve.vercel.app/',
    description: 'Outil de gestion et calcul de notes'
  },
  {
    title: 'Ryse Portfolio',
    url: 'https://ryse-portfolio.vercel.app',
    description: 'Portfolio professionnel moderne'
  },
]

// Tableau - séquences 
const sequences: Sequence[] = [
  {
    title: 'SEQ 1 - Arduino',
    url: '/sequences/sequence-Arduino',
    description: 'Systèmes embarqués',
    status: 'available'
  },
  {
    title: 'SEQ 2 - HTML',
    url: '/sequences/sequence-HTML',
    description: 'HTML',
    status: 'coming-soon'
  },
  {
    title : 'Projet 72H',
    url : '/sequences/projet_72H',
    description : 'Idée de projet de 72H',
    status : 'coming-soon'
  },
]

// Configuration - animations Framer Motion pour les conteneurs
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // délai entre chaque enfant
      delayChildren: 0.2,   // Délai initial de 0.2s avant de commencer
    }
  }
}

// Configuration des animations pour les éléments individuels
// Chaque élément apparaît avec un effet de translation depuis le bas (y: 20)
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut'
    }
  }
}

/**
 * Composant principal de la page d'accueil
 * Affiche le header, les sections de liens, projets et séquences
 */
export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Header fixe en haut de la page avec le titre du dashboard */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="border-b border-designSS-gray/30 backdrop-blur-sm bg-designSS-black/50 sticky top-0 z-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold tracking-tight">
            Dashboard <span className="text-designSS-gold">STI2D</span>
          </h1>
          <p className="text-designSS-silver text-sm sm:text-base mt-2 font-light">
            Ressources, projets et séquences
          </p>
        </div>
      </motion.header>

      {/* Conteneur principal avec largeur maximale et padding responsive */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Section des liens utiles - Affiche tous les liens dans une grille responsive */}
        <motion.section 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-12 sm:mb-16"
        >
          <motion.div variants={itemVariants} className="flex items-center gap-3 mb-6">
            <ExternalLinkIcon className="w-6 h-6 sm:w-7 sm:h-7 text-designSS-gold" />
            <h2 className="text-2xl sm:text-3xl font-display font-semibold">Liens</h2>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {usefulLinks.map((link, index) => (
              <motion.a
                key={index}
                variants={itemVariants}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative bg-gradient-to-br from-designSS-darkGray to-designSS-gray border border-designSS-lightGray/20 rounded-lg p-5 sm:p-6 hover:border-designSS-gold/50 transition-all duration-300 hover:shadow-xl hover:shadow-designSS-gold/10 hover:-translate-y-1"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg sm:text-xl font-semibold text-white group-hover:text-designSS-gold transition-colors duration-300">
                      {link.title}
                    </h3>
                    {link.description && (
                      <p className="text-sm text-designSS-silver mt-2 font-light">
                        {link.description}
                      </p>
                    )}
                  </div>
                  <ExternalLinkIcon className="w-5 h-5 text-designSS-silver group-hover:text-designSS-gold transition-colors duration-300 flex-shrink-0 ml-2" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-designSS-gold/0 via-designSS-gold/5 to-designSS-gold/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg pointer-events-none"></div>
              </motion.a>
            ))}
          </div>
        </motion.section>

        {/* Section Outils - Clipboard éphémère et autres outils */}
        <motion.section 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-12 sm:mb-16"
        >
          <motion.div variants={itemVariants} className="flex items-center gap-3 mb-6">
            <ClipboardIcon className="w-6 h-6 sm:w-7 sm:h-7 text-designSS-gold" />
            <h2 className="text-2xl sm:text-3xl font-display font-semibold">Outils</h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            <motion.div variants={itemVariants}>
              <Link
                href="/clipboard"
                className="group relative block bg-gradient-to-br from-designSS-darkGray via-designSS-gray to-designSS-darkGray border border-designSS-lightGray/30 rounded-lg p-6 sm:p-7 hover:border-designSS-gold transition-all duration-300 hover:shadow-2xl hover:shadow-designSS-gold/20 overflow-hidden"
              >
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-3">
                    <ClipboardIcon className="w-10 h-10 text-designSS-gold" />
                    <h3 className="text-xl sm:text-2xl font-display font-bold text-white group-hover:text-designSS-gold transition-colors duration-300">
                      Clipboard Éphémère
                    </h3>
                  </div>
                  <p className="text-sm sm:text-base text-designSS-silver font-light leading-relaxed">
                    Partagez du texte et des fichiers entre appareils avec un code unique. Suppression manuelle ou automatique après 24h.
                  </p>
                  <div className="flex items-center gap-2 mt-4 text-designSS-gold group-hover:gap-3 transition-all duration-300">
                    <span className="text-sm font-medium">Accéder</span>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-designSS-gold/0 via-designSS-gold/10 to-designSS-gold/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </Link>
            </motion.div>
          </div>
        </motion.section>

        {/* Section des projets personnels - Affiche les projets dans une grille avec effets hover */}
        <motion.section 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-12 sm:mb-16"
        >
          <motion.div variants={itemVariants} className="flex items-center gap-3 mb-6">
            <CodeIcon className="w-6 h-6 sm:w-7 sm:h-7 text-designSS-gold" />
            <h2 className="text-2xl sm:text-3xl font-display font-semibold">Projets</h2>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {projects.map((project, index) => (
              <motion.a
                key={index}
                variants={itemVariants}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative bg-gradient-to-br from-designSS-darkGray via-designSS-gray to-designSS-darkGray border border-designSS-lightGray/30 rounded-lg p-6 sm:p-7 hover:border-designSS-gold transition-all duration-300 hover:shadow-2xl hover:shadow-designSS-gold/20 overflow-hidden"
              >
                <div className="relative z-10">
                  <h3 className="text-xl sm:text-2xl font-display font-bold text-white group-hover:text-designSS-gold transition-colors duration-300 mb-3">
                    {project.title}
                  </h3>
                  <p className="text-sm sm:text-base text-designSS-silver font-light leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex items-center gap-2 mt-4 text-designSS-gold group-hover:gap-3 transition-all duration-300">
                    <span className="text-sm font-medium">Voir le projet</span>
                    <ExternalLinkIcon className="w-4 h-4" />
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-designSS-gold/0 via-designSS-gold/10 to-designSS-gold/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </motion.a>
            ))}
          </div>
        </motion.section>

        {/* Section des séquences pédagogiques - Affiche les séquences avec leur statut (disponible/à venir) */}
        <motion.section 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="flex items-center gap-3 mb-6">
            <BookOpenIcon className="w-6 h-6 sm:w-7 sm:h-7 text-designSS-gold" />
            <h2 className="text-2xl sm:text-3xl font-display font-semibold">Séquences</h2>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {sequences.map((sequence, index) => (
              <motion.a
                key={index}
                variants={itemVariants}
                href={sequence.url}
                className="group relative bg-gradient-to-br from-designSS-darkGray to-designSS-gray border border-designSS-lightGray/20 rounded-lg p-6 sm:p-7 hover:border-designSS-gold/50 transition-all duration-300 hover:shadow-xl hover:shadow-designSS-gold/10 hover:-translate-y-1"
              >
                <div className="flex items-start gap-4">
                  <BookOpenIcon className="w-10 h-10 sm:w-12 sm:h-12 text-designSS-gold flex-shrink-0" />
                  <div className="flex-1">
                    <h3 className="text-xl sm:text-2xl font-display font-bold text-white group-hover:text-designSS-gold transition-colors duration-300 mb-2">
                      {sequence.title}
                    </h3>
                    <p className="text-sm text-designSS-silver font-light leading-relaxed">
                      {sequence.description}
                    </p>
                    {sequence.status === 'available' && (
                      <div className="flex items-center gap-2 mt-3 text-designSS-gold">
                        <span className="text-xs font-medium">Disponible</span>
                      </div>
                    )}
                    {sequence.status === 'coming-soon' && (
                      <div className="flex items-center gap-2 mt-3 text-designSS-gold">
                        <span className="text-xs font-medium">À venir</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-designSS-gold/0 via-designSS-gold/5 to-designSS-gold/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg pointer-events-none"></div>
              </motion.a>
            ))}
          </div>
        </motion.section>
      </div>

      {/* Footer avec informations sur le projet et les technologies utilisées */}
      <motion.footer 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="border-t border-designSS-gray/30 mt-16 sm:mt-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 text-center">
          <p className="text-designSS-silver text-sm font-light">
            Dashboard STI2D - By SHU445 - Next.js & TypeScript
          </p>
        </div>
      </motion.footer>
    </main>
  )
}
