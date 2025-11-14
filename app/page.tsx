'use client'

import { motion } from 'framer-motion'
import { ExternalLinkIcon, CodeIcon, BookOpenIcon } from '@/components/Icons'

interface Link {
  title: string
  url: string
  description?: string
}

interface Project {
  title: string
  url: string
  description: string
}

interface Sequence {
  title: string
  url: string
  description: string
  status: 'available' | 'coming-soon'
}

const usefulLinks: Link[] = [
  { title: 'GitHub', url: 'https://github.com/SHU445', description: 'Mes repositories' },
  { title: 'Vercel', url: 'https://vercel.com/login', description: 'Déploiement' },
  { title: 'Gmail', url: 'https://mail.google.com/mail/u/0/#inbox', description: 'Gmail' },
  { title: 'Neon DB', url: 'https://neon.com/', description: 'Base de données' },
  { title: 'MDN HTML', url: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements', description: 'Référence HTML' },
  { title: 'MDN CSS', url: 'https://developer.mozilla.org/fr/docs/Web/CSS/Reference/Properties', description: 'Référence CSS' },
  { title: 'MDN JavaScript', url: 'https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference', description: 'Référence JavaScript' },
  { title: 'Adobe color', url: 'https://color.adobe.com/fr/create/color-wheel', description: 'Adobe color' },
  { title: 'Color Hunt', url: 'https://colorhunt.co/', description: 'Color Hunt' },
  { title: 'Color Space', url: 'https://mycolor.space/', description: 'Color Space' },
  { title: 'Pronote', url: 'https://0380089r.index-education.net/pronote/eleve.html?identifiant=t7gHE7rr8j8kpQf2', description: 'Notes et emploi du temps' },
  { title: 'ENT', url: 'https://porte-oisans.ent.auvergnerhonealpes.fr/sg.do?PROC=PAGE_ACCUEIL&ACTION=VALIDER', description: 'Espace numérique' },
  { title: 'ELEA', url: 'https://aura-38-sud.elea.apps.education.fr/local/elea_dashboard/index.php', description: 'Plateforme pédagogique' },
  { title: 'TinkerCAD', url: 'https://www.tinkercad.com/login', description: 'CAO en ligne' },
  { title: 'Markdown', url: 'https://docs.framasoft.org/fr/grav/markdown.html', description: 'Référence Markdown' },
]

const projects: Project[] = [
  {
    title: 'Calisthenie Tracker',
    url: 'https://calisthenie-tracker.vercel.app/',
    description: 'Application de suivi d\'entraînement calisthénie'
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
  {
    title : "Maxence bo gosse",
    url : 'https://www.google.com/search?client=firefox-b-d&sca_esv=3305bec65bd7fec6&channel=entpr&sxsrf=AE3TifPGUhrz93ppWSt83xqxyMW7bmdVfA:1763134331106&udm=2&fbs=AIIjpHx4nJjfGojPVHhEACUHPiMQ_pbg5bWizQs3A_kIenjtcpTTqBUdyVgzq0c3_k8z34GUa4Q_jiUQNh5K5XfwsFj1JlsgDwnS6F9uJOn6Vp7K2HZtT5LULhH94JKrGo2j1UkJ_2N5qinJWzS-26CJdpT-aJY9xBc1tMfHZ-nHWKProRdA6bPR3umSWBHs4qx9u4tAGm08&q=ben+laden&sa=X&ved=2ahUKEwiDt_yb-_GQAxX__7sIHf30DxcQtKgLegQIDxAB&biw=1920&bih=901&dpr=1#vhid=e72aFu1c1WLYlM&vssid=mosaic',
    description : 'maxence bo gosse'
  }
]

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
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    }
  }
}

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

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="border-b border--gray/30 backdrop-blur-sm bg--black/50 sticky top-0 z-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold tracking-tight">
            Dashboard <span className="text--gold">STI2D</span>
          </h1>
          <p className="text--silver text-sm sm:text-base mt-2 font-light">
            Ressources, projets et séquences
          </p>
        </div>
      </motion.header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Useful Links Section */}
        <motion.section 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-12 sm:mb-16"
        >
          <motion.div variants={itemVariants} className="flex items-center gap-3 mb-6">
            <ExternalLinkIcon className="w-6 h-6 sm:w-7 sm:h-7 text--gold" />
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
                className="group relative bg-gradient-to-br from--darkGray to--gray border border--lightGray/20 rounded-lg p-5 sm:p-6 hover:border--gold/50 transition-all duration-300 hover:shadow-xl hover:shadow--gold/10 hover:-translate-y-1"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg sm:text-xl font-semibold text-white group-hover:text--gold transition-colors duration-300">
                      {link.title}
                    </h3>
                    {link.description && (
                      <p className="text-sm text--silver mt-2 font-light">
                        {link.description}
                      </p>
                    )}
                  </div>
                  <ExternalLinkIcon className="w-5 h-5 text--silver group-hover:text--gold transition-colors duration-300 flex-shrink-0 ml-2" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from--gold/0 via--gold/5 to--gold/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg pointer-events-none"></div>
              </motion.a>
            ))}
          </div>
        </motion.section>

        {/* Projects Section */}
        <motion.section 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-12 sm:mb-16"
        >
          <motion.div variants={itemVariants} className="flex items-center gap-3 mb-6">
            <CodeIcon className="w-6 h-6 sm:w-7 sm:h-7 text--gold" />
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
                className="group relative bg-gradient-to-br from--darkGray via--gray to--darkGray border border--lightGray/30 rounded-lg p-6 sm:p-7 hover:border--gold transition-all duration-300 hover:shadow-2xl hover:shadow--gold/20 overflow-hidden"
              >
                <div className="relative z-10">
                  <h3 className="text-xl sm:text-2xl font-display font-bold text-white group-hover:text--gold transition-colors duration-300 mb-3">
                    {project.title}
                  </h3>
                  <p className="text-sm sm:text-base text--silver font-light leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex items-center gap-2 mt-4 text--gold group-hover:gap-3 transition-all duration-300">
                    <span className="text-sm font-medium">Voir le projet</span>
                    <ExternalLinkIcon className="w-4 h-4" />
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from--gold/0 via--gold/10 to--gold/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </motion.a>
            ))}
          </div>
        </motion.section>

        {/* Sequences Section */}
        <motion.section 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="flex items-center gap-3 mb-6">
            <BookOpenIcon className="w-6 h-6 sm:w-7 sm:h-7 text--gold" />
            <h2 className="text-2xl sm:text-3xl font-display font-semibold">Séquences</h2>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {sequences.map((sequence, index) => (
              <motion.a
                key={index}
                variants={itemVariants}
                href={sequence.url}
                className="group relative bg-gradient-to-br from--darkGray to--gray border border--lightGray/20 rounded-lg p-6 sm:p-7 hover:border--gold/50 transition-all duration-300 hover:shadow-xl hover:shadow--gold/10 hover:-translate-y-1"
              >
                <div className="flex items-start gap-4">
                  <BookOpenIcon className="w-10 h-10 sm:w-12 sm:h-12 text--gold flex-shrink-0" />
                  <div className="flex-1">
                    <h3 className="text-xl sm:text-2xl font-display font-bold text-white group-hover:text--gold transition-colors duration-300 mb-2">
                      {sequence.title}
                    </h3>
                    <p className="text-sm text--silver font-light leading-relaxed">
                      {sequence.description}
                    </p>
                    {sequence.status === 'available' && (
                      <div className="flex items-center gap-2 mt-3 text--gold">
                        <span className="text-xs font-medium">Disponible</span>
                      </div>
                    )}
                    {sequence.status === 'coming-soon' && (
                      <div className="flex items-center gap-2 mt-3 text--gold">
                        <span className="text-xs font-medium">À venir</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from--gold/0 via--gold/5 to--gold/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg pointer-events-none"></div>
              </motion.a>
            ))}
          </div>
        </motion.section>
      </div>

      {/* Footer */}
      <motion.footer 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="border-t border--gray/30 mt-16 sm:mt-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 text-center">
          <p className="text--silver text-sm font-light">
            Dashboard STI2D - By SHU445 - Next.js & TypeScript
          </p>
        </div>
      </motion.footer>
    </main>
  )
}

