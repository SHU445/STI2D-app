/**
 * PAGE DYNAMIQUE - Lecteur de fichiers Markdown
 * 
 * Ce fichier permet d'afficher dynamiquement des fichiers Markdown depuis le dossier public/files/
 * 
 * Fonctionnement :
 * 1. Récupère le slug depuis l'URL (ex: /files/test-markdown → slug = "test-markdown")
 * 2. Charge le fichier correspondant depuis /public/files/[slug].md
 * 3. Parse le front matter (métadonnées YAML en haut du fichier) si présent
 * 4. Convertit le Markdown en HTML avec coloration syntaxique
 * 5. Affiche le contenu avec un style personnalisé
 * 
 * Technologies utilisées :
 * - react-markdown : conversion Markdown → HTML
 * - gray-matter : parsing du front matter YAML
 * - rehype-highlight : coloration syntaxique du code
 * - remark-gfm : support des fonctionnalités GitHub Flavored Markdown
 */

'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm' // Support GitHub Flavored Markdown (tableaux, checklists, etc.)
import remarkFrontmatter from 'remark-frontmatter' // Support du front matter YAML
import rehypeHighlight from 'rehype-highlight' // Coloration syntaxique du code
import rehypeRaw from 'rehype-raw' // Permet d'inclure du HTML brut dans le Markdown
import rehypeSlug from 'rehype-slug' // Génère des IDs pour les titres (ancres)
import matter from 'gray-matter' // Parse le front matter YAML
import { ArrowLeftIcon } from '@/components/Icons'

/**
 * Composant qui affiche un fichier Markdown dynamiquement
 * Le slug est extrait de l'URL via le routing dynamique de Next.js [slug]
 */
export default function MarkdownPage() {
  // Hook Next.js pour récupérer les paramètres de l'URL
  const params = useParams()
  const router = useRouter()
  const slug = params?.slug as string // Ex: "test-markdown" depuis /files/test-markdown
  
  // États pour gérer le chargement et l'affichage du contenu
  const [content, setContent] = useState<string>('') // Contenu Markdown après parsing
  const [loading, setLoading] = useState(true) // État de chargement
  const [error, setError] = useState<string | null>(null) // Gestion des erreurs
  const [frontMatter, setFrontMatter] = useState<any>(null) // Métadonnées YAML du fichier
  const [mounted, setMounted] = useState(false) // Évite les problèmes d'hydratation SSR

  // Effet pour marquer le composant comme monté (évite les problèmes SSR)
  useEffect(() => {
    setMounted(true)
  }, [])

  // Effet principal : charge le fichier Markdown quand le slug change
  useEffect(() => {
    if (!slug || !mounted) return

    // Sécurisation du slug : supprime tous les caractères non alphanumériques
    // Cela empêche les attaques de path traversal (ex: "../../etc/passwd")
    const safeSlug = slug.replace(/[^a-zA-Z0-9-_]/g, '')
    
    // Chargement du fichier depuis le dossier public/files/
    fetch(`/files/${safeSlug}.md`)
      .then(res => {
        if (!res.ok) {
          throw new Error('Fichier non trouvé')
        }
        return res.text()
      })
      .then(text => {
        // Parsing du front matter YAML (métadonnées en haut du fichier)
        // Exemple de front matter :
        // ---
        // title: "Mon titre"
        // date: 2025-01-12
        // ---
        try {
          const parsed = matter(text)
          if (parsed.data && Object.keys(parsed.data).length > 0) {
            // Si du front matter est présent, on le sauvegarde séparément
            setFrontMatter(parsed.data)
            setContent(parsed.content) // Contenu sans le front matter
          } else {
            // Pas de front matter, utiliser tout le texte
            setContent(text)
          }
        } catch {
          // Si le parsing échoue, utiliser le texte tel quel
          setContent(text)
        }
        setLoading(false)
        setError(null)
      })
      .catch(err => {
        console.error('Erreur lors du chargement du fichier:', err)
        setError('Fichier non trouvé')
        setLoading(false)
      })
  }, [slug, mounted])

  /**
   * Formate le slug en titre lisible
   * Exemple: "test-markdown" → "Test Markdown"
   */
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
        className="border-b border-designSS-gray/30 backdrop-blur-sm bg-designSS-black/50 sticky top-0 z-50"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 text-designSS-silver hover:text-designSS-gold transition-colors duration-300 mb-4 group"
          >
            <ArrowLeftIcon className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
            <span className="text-sm font-medium">Retour</span>
          </button>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold tracking-tight">
            <span className="text-designSS-gold">{formatTitle(slug || 'Document')}</span>
          </h1>
        </div>
      </motion.header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {loading ? (
          <div className="text-center py-12">
            <p className="text-designSS-silver">Chargement...</p>
          </div>
        ) : error ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <p className="text-designSS-gold text-xl mb-4">Erreur</p>
            <p className="text-designSS-silver">{error}</p>
            <p className="text-designSS-silver text-sm mt-2">
              Le fichier <code className="bg-designSS-gray/50 px-2 py-1 rounded">{slug}.md</code> n&apos;existe pas dans le dossier <code className="bg-designSS-gray/50 px-2 py-1 rounded">public/files/</code>
            </p>
          </motion.div>
        ) : !mounted ? (
          <div className="text-center py-12">
            <p className="text-designSS-silver">Chargement...</p>
          </div>
        ) : (
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="prose prose-invert prose-headings:text-designSS-gold prose-p:text-designSS-silver prose-strong:text-white prose-code:text-designSS-gold prose-pre:bg-designSS-darkGray prose-pre:border prose-pre:border-designSS-lightGray/20 prose-a:text-designSS-gold prose-a:hover:text-designSS-gold/80 max-w-none"
          >
            {frontMatter && (
              <div className="mb-6 p-4 bg-designSS-gray/30 rounded-lg border border-designSS-lightGray/20">
                <h3 className="text-designSS-gold font-semibold mb-2">Métadonnées</h3>
                <dl className="space-y-1 text-sm text-designSS-silver">
                  {Object.entries(frontMatter).map(([key, value]) => (
                    <div key={key} className="flex">
                      <dt className="font-medium text-designSS-gold mr-2">{key}:</dt>
                      <dd>{String(value)}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}
            {/* Composant ReactMarkdown qui convertit le Markdown en HTML */}
            <ReactMarkdown
              // Plugins Remark (traitement du Markdown avant conversion)
              remarkPlugins={[remarkGfm, remarkFrontmatter]}
              // Plugins Rehype (traitement du HTML après conversion)
              rehypePlugins={[
                rehypeHighlight, // Coloration syntaxique du code
                rehypeRaw         // Permet le HTML brut dans le Markdown
              ]}
              // Personnalisation des composants HTML générés
              // Permet d'appliquer des classes Tailwind personnalisées
              components={{
                h1: ({node, ...props}: any) => <h1 className="text-3xl font-display font-bold text-designSS-gold mb-4 mt-8 scroll-mt-20" {...props} />,
                h2: ({node, ...props}: any) => <h2 className="text-2xl font-display font-semibold text-designSS-gold mb-3 mt-6 scroll-mt-20" {...props} />,
                h3: ({node, ...props}: any) => <h3 className="text-xl font-display font-semibold text-designSS-gold mb-2 mt-4 scroll-mt-20" {...props} />,
                h4: ({node, ...props}: any) => <h4 className="text-lg font-display font-semibold text-designSS-gold mb-2 mt-4 scroll-mt-20" {...props} />,
                h5: ({node, ...props}: any) => <h5 className="text-base font-display font-semibold text-designSS-gold mb-2 mt-4 scroll-mt-20" {...props} />,
                h6: ({node, ...props}: any) => <h6 className="text-sm font-display font-semibold text-designSS-gold mb-2 mt-4 scroll-mt-20" {...props} />,
                p: ({node, ...props}) => <p className="text-designSS-silver leading-relaxed mb-4" {...props} />,
                strong: ({node, ...props}) => <strong className="font-bold text-white" {...props} />,
                em: ({node, ...props}) => <em className="italic text-designSS-silver" {...props} />,
                del: ({node, ...props}) => <del className="line-through text-designSS-silver/60" {...props} />,
                // Gestion du code : différencie le code inline (`code`) et les blocs de code (```code```)
                code: ({node, inline, className, children, ...props}: any) => {
                  if (inline) {
                    // Code inline : style simple avec fond gris
                    return <code className="bg-designSS-gray/50 text-designSS-gold px-1.5 py-0.5 rounded text-sm font-mono" {...props}>{children}</code>
                  }
                  // Bloc de code : style plus élaboré avec bordure et padding
                  return (
                    <code className={`block bg-designSS-darkGray text-designSS-silver p-4 rounded-lg overflow-x-auto border border-designSS-lightGray/20 ${className || ''}`} {...props}>
                      {children}
                    </code>
                  )
                },
                pre: ({node, ...props}: any) => <pre className="bg-designSS-darkGray border border-designSS-lightGray/20 rounded-lg p-4 overflow-x-auto mb-4" {...props} />,
                // Gestion des liens : différencie les liens internes (ancres #) et externes
                a: ({node, href, children, ...props}: any) => {
                  // Liens internes (ancres vers des sections de la page)
                  if (href?.startsWith('#')) {
                    return <a href={href} className="text-designSS-gold hover:text-designSS-gold/80 underline" {...props}>{children}</a>
                  }
                  // Liens externes : ouverture dans un nouvel onglet avec sécurité
                  return <a href={href} target="_blank" rel="noopener noreferrer" className="text-designSS-gold hover:text-designSS-gold/80 underline" {...props}>{children}</a>
                },
                ul: ({node, ...props}) => <ul className="list-disc list-outside text-designSS-silver mb-4 space-y-2 ml-6" {...props} />,
                ol: ({node, ...props}) => <ol className="list-decimal list-outside text-designSS-silver mb-4 space-y-2 ml-6" {...props} />,
                // Gestion des listes : support des checklists GitHub Flavored Markdown
                // Exemple: - [ ] Tâche non faite, - [x] Tâche faite
                li: ({node, checked, ...props}: any) => {
                  // Si c'est une checklist (checked est défini)
                  if (checked !== null && checked !== undefined) {
                    return (
                      <li className="text-designSS-silver list-none flex items-start gap-2">
                        <input type="checkbox" checked={checked} readOnly className="mt-1 w-4 h-4 text-designSS-gold bg-designSS-gray border-designSS-lightGray rounded focus:ring-designSS-gold" />
                        <span {...props} />
                      </li>
                    )
                  }
                  // Liste normale
                  return <li className="text-designSS-silver" {...props} />
                },
                blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-designSS-gold pl-4 italic text-designSS-silver my-4" {...props} />,
                table: ({node, ...props}) => <div className="overflow-x-auto my-4"><table className="w-full border-collapse border border-designSS-lightGray/20" {...props} /></div>,
                thead: ({node, ...props}) => <thead className="bg-designSS-gray/50" {...props} />,
                tbody: ({node, ...props}) => <tbody {...props} />,
                tr: ({node, ...props}) => <tr className="border-b border-designSS-lightGray/20" {...props} />,
                th: ({node, style, ...props}: any) => {
                  const alignClass = style?.textAlign === 'center' ? 'text-center' : style?.textAlign === 'right' ? 'text-right' : 'text-left'
                  return <th className={`border border-designSS-lightGray/20 px-4 py-2 text-designSS-gold font-semibold ${alignClass}`} {...props} />
                },
                td: ({node, style, ...props}: any) => {
                  const alignClass = style?.textAlign === 'center' ? 'text-center' : style?.textAlign === 'right' ? 'text-right' : 'text-left'
                  return <td className={`border border-designSS-lightGray/20 px-4 py-2 text-designSS-silver ${alignClass}`} {...props} />
                },
                hr: ({node, ...props}) => <hr className="border-designSS-lightGray/50 my-8" {...props} />,
                // Gestion des images : différencie les images externes (URL) et locales (Next.js Image)
                img: ({node, src, alt, ...props}: any) => {
                  // Image externe (commence par http/https)
                  if (src?.startsWith('http')) {
                    return <img src={src} alt={alt || ''} className="rounded-lg my-4 max-w-full" {...props} />
                  }
                  // Image locale : utilise le composant Next.js Image pour l'optimisation
                  return <Image src={src || ''} alt={alt || ''} width={800} height={600} className="rounded-lg my-4 max-w-full" {...props} />
                },
                // Support des notes de bas de page (footnotes)
                // Exemple: Texte[^1] puis [^1]: Note explicative
                sup: ({node, ...props}: any) => <sup className="text-designSS-gold text-xs" {...props} />,
                section: ({node, ...props}: any) => {
                  // Section spéciale pour afficher les notes de bas de page
                  if (props.className?.includes('footnotes')) {
                    return <section className="mt-8 pt-4 border-t border-designSS-lightGray/20" {...props} />
                  }
                  return <section {...props} />
                },
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
        className="border-t border-designSS-gray/30 mt-16 sm:mt-20"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 text-center">
          <button
            onClick={() => router.back()}
            className="text-designSS-gold hover:text-designSS-gold/80 transition-colors text-sm font-medium inline-flex items-center gap-2"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            Retour
          </button>
        </div>
      </motion.footer>
    </main>
  )
}

