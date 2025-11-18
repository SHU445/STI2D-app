'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { ArrowLeftIcon } from '@/components/Icons'

export default function MarkdownPage() {
  const params = useParams()
  const router = useRouter()
  const slug = params?.slug as string
  const [content, setContent] = useState<string>('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!slug) return

    // Sécuriser le slug pour éviter les attaques de path traversal
    const safeSlug = slug.replace(/[^a-zA-Z0-9-_]/g, '')
    
    fetch(`/files/${safeSlug}.md`)
      .then(res => {
        if (!res.ok) {
          throw new Error('Fichier non trouvé')
        }
        return res.text()
      })
      .then(text => {
        setContent(text)
        setLoading(false)
        setError(null)
      })
      .catch(err => {
        console.error('Erreur lors du chargement du fichier:', err)
        setError('Fichier non trouvé')
        setLoading(false)
      })
  }, [slug])

  // Fonction pour formater le titre depuis le slug
  const formatTitle = (slug: string) => {
    return slug
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }

  return (
    <main className="min-h-screen">
      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="border-b border-koenigsegg-gray/30 backdrop-blur-sm bg-koenigsegg-black/50 sticky top-0 z-50"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 text-koenigsegg-silver hover:text-koenigsegg-gold transition-colors duration-300 mb-4 group"
          >
            <ArrowLeftIcon className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
            <span className="text-sm font-medium">Retour</span>
          </button>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold tracking-tight">
            <span className="text-koenigsegg-gold">{formatTitle(slug || 'Document')}</span>
          </h1>
        </div>
      </motion.header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {loading ? (
          <div className="text-center py-12">
            <p className="text-koenigsegg-silver">Chargement...</p>
          </div>
        ) : error ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <p className="text-koenigsegg-gold text-xl mb-4">Erreur</p>
            <p className="text-koenigsegg-silver">{error}</p>
            <p className="text-koenigsegg-silver text-sm mt-2">
              Le fichier <code className="bg-koenigsegg-gray/50 px-2 py-1 rounded">{slug}.md</code> n&apos;existe pas dans le dossier <code className="bg-koenigsegg-gray/50 px-2 py-1 rounded">public/files/</code>
            </p>
          </motion.div>
        ) : (
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="prose prose-invert prose-headings:text-koenigsegg-gold prose-p:text-koenigsegg-silver prose-strong:text-white prose-code:text-koenigsegg-gold prose-pre:bg-koenigsegg-darkGray prose-pre:border prose-pre:border-koenigsegg-lightGray/20 prose-a:text-koenigsegg-gold prose-a:hover:text-koenigsegg-gold/80 max-w-none"
          >
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({node, ...props}) => <h1 className="text-3xl font-display font-bold text-koenigsegg-gold mb-4 mt-8" {...props} />,
                h2: ({node, ...props}) => <h2 className="text-2xl font-display font-semibold text-koenigsegg-gold mb-3 mt-6" {...props} />,
                h3: ({node, ...props}) => <h3 className="text-xl font-display font-semibold text-koenigsegg-gold mb-2 mt-4" {...props} />,
                h4: ({node, ...props}) => <h4 className="text-lg font-display font-semibold text-koenigsegg-gold mb-2 mt-4" {...props} />,
                p: ({node, ...props}) => <p className="text-koenigsegg-silver leading-relaxed mb-4" {...props} />,
                code: ({node, inline, ...props}: any) => {
                  if (inline) {
                    return <code className="bg-koenigsegg-gray/50 text-koenigsegg-gold px-1.5 py-0.5 rounded text-sm font-mono" {...props} />
                  }
                  return <code className="block bg-koenigsegg-darkGray text-koenigsegg-silver p-4 rounded-lg overflow-x-auto border border-koenigsegg-lightGray/20" {...props} />
                },
                pre: ({node, ...props}: any) => <pre className="bg-koenigsegg-darkGray border border-koenigsegg-lightGray/20 rounded-lg p-4 overflow-x-auto mb-4" {...props} />,
                a: ({node, ...props}) => <a className="text-koenigsegg-gold hover:text-koenigsegg-gold/80 underline" {...props} />,
                ul: ({node, ...props}) => <ul className="list-disc list-inside text-koenigsegg-silver mb-4 space-y-2" {...props} />,
                ol: ({node, ...props}) => <ol className="list-decimal list-inside text-koenigsegg-silver mb-4 space-y-2" {...props} />,
                li: ({node, ...props}) => <li className="text-koenigsegg-silver" {...props} />,
                blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-koenigsegg-gold pl-4 italic text-koenigsegg-silver my-4" {...props} />,
                table: ({node, ...props}) => <table className="w-full border-collapse border border-koenigsegg-lightGray/20 my-4" {...props} />,
                th: ({node, ...props}) => <th className="border border-koenigsegg-lightGray/20 px-4 py-2 bg-koenigsegg-gray/50 text-koenigsegg-gold font-semibold" {...props} />,
                td: ({node, ...props}) => <td className="border border-koenigsegg-lightGray/20 px-4 py-2 text-koenigsegg-silver" {...props} />,
                hr: ({node, ...props}) => <hr className="border-koenigsegg-lightGray/50 my-8" {...props} />,
                img: ({node, ...props}: any) => <Image className="rounded-lg my-4 max-w-full" alt={props.alt || ''} width={800} height={600} {...props} />,
              }}
            >
              {content}
            </ReactMarkdown>
          </motion.article>
        )}
      </div>

      {/* Footer */}
      <motion.footer 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="border-t border-koenigsegg-gray/30 mt-16 sm:mt-20"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 text-center">
          <button
            onClick={() => router.back()}
            className="text-koenigsegg-gold hover:text-koenigsegg-gold/80 transition-colors text-sm font-medium inline-flex items-center gap-2"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            Retour
          </button>
        </div>
      </motion.footer>
    </main>
  )
}

