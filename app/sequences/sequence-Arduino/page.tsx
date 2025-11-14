'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { BookOpenIcon, DocumentIcon, VideoIcon, LinkIcon, ArrowLeftIcon, ImageIcon } from '@/components/Icons'

interface Resource {
  title: string
  type: 'cours' | 'exercice' | 'video' | 'lien' | 'ressource' | 'image'
  url?: string
  description?: string
}

const resources: Resource[] = [
  {
    title: 'Lien : Arduino documentation',
    type: 'lien',
    url: 'https://www.arduino.cc/reference/fr/',
    description: 'Documentation Arduino'
  },
  {
    title: 'Ressource : Arduino ressource',
    type: 'ressource',
    url: '/files/cours',
    description: 'Ressource de cours sur Arduino en .md'
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

const getIcon = (type: Resource['type']) => {
  const className = "w-6 h-6 text--gold"
  switch (type) {
    case 'cours':
      return <BookOpenIcon className={className} />
    case 'exercice':
      return <DocumentIcon className={className} />
    case 'video':
      return <VideoIcon className={className} />
    case 'lien':
      return <LinkIcon className={className} />
    case 'ressource':
      return <DocumentIcon className={className} />
    case 'image':
      return <ImageIcon className={className} />
  }
}

const getTypeLabel = (type: Resource['type']) => {
  switch (type) {
    case 'cours':
      return 'Cours'
    case 'exercice':
      return 'Exercice'
    case 'video':
      return 'Vidéo'
    case 'lien':
      return 'Lien'
    case 'ressource':
      return 'Ressource'
    case 'image':
      return 'Image'
  }
}

export default function SequenceArduino() {
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
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text--silver hover:text--gold transition-colors duration-300 mb-4 group"
          >
            <ArrowLeftIcon className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
            <span className="text-sm font-medium">Retour au dashboard</span>
          </Link>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold tracking-tight">
            Séquence <span className="text--gold">Arduino</span>
          </h1>
          <p className="text--silver text-sm sm:text-base mt-2 font-light">
            Systèmes embarqués
          </p>
        </div>
      </motion.header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Description */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <div className="bg-gradient-to-br from--darkGray to--gray border border--lightGray/20 rounded-lg p-6 sm:p-8">
            <h2 className="text-2xl font-display font-semibold text--gold mb-4">
              À propos SEQ
            </h2>
            <p className="text--silver leading-relaxed">
              DESCRIPTION SEQ - ARDUINO
            </p>
          </div>
        </motion.section>

        {/* Resources */}
        <motion.section 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="flex items-center gap-3 mb-6">
            <DocumentIcon className="w-6 h-6 sm:w-7 sm:h-7 text--gold" />
            <h2 className="text-2xl sm:text-3xl font-display font-semibold">Ressources</h2>
          </motion.div>

          <div className="grid grid-cols-1 gap-4 sm:gap-5">
            {resources.map((resource, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group relative bg-gradient-to-br from--darkGray to--gray border border--lightGray/20 rounded-lg p-5 sm:p-6 hover:border--gold/50 transition-all duration-300 hover:shadow-lg hover:shadow--gold/10"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg--gray/50 rounded-lg flex items-center justify-center border border--lightGray/30">
                    {getIcon(resource.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xs font-medium text--gold bg--gold/10 px-3 py-1 rounded-full border border--gold/20">
                        {getTypeLabel(resource.type)}
                      </span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">
                      {resource.title}
                    </h3>
                    {resource.description && (
                      <p className="text-sm text--silver font-light leading-relaxed">
                        {resource.description}
                      </p>
                    )}
                    {resource.url && (
                      resource.url.startsWith('http') ? (
                        <a 
                          href={resource.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 mt-3 text-sm text--gold hover:text--gold/80 transition-colors"
                        >
                          <span>Accéder</span>
                          <LinkIcon className="w-4 h-4" />
                        </a>
                      ) : (
                        <Link 
                          href={resource.url}
                          className="inline-flex items-center gap-2 mt-3 text-sm text--gold hover:text--gold/80 transition-colors"
                        >
                          <span>Accéder</span>
                          <LinkIcon className="w-4 h-4" />
                        </Link>
                      )
                    )}
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Add more button */}
            <motion.div
              variants={itemVariants}
              className="bg-gradient-to-br from--darkGray/50 to--gray/50 border border--lightGray/10 border-dashed rounded-lg p-8 text-center"
            >
              <DocumentIcon className="w-12 h-12 text--gold/30 mx-auto mb-3" />
              <p className="text--silver text-sm font-light">
                autre ressource
              </p>
            </motion.div>
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
          <Link 
            href="/"
            className="text--gold hover:text--gold/80 transition-colors text-sm font-medium inline-flex items-center gap-2"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            Retour au dashboard
          </Link>
        </div>
      </motion.footer>
    </main>
  )
}

