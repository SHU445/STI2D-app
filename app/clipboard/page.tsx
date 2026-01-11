/**
 * PAGE CLIPBOARD ÉPHÉMÈRE
 * 
 * Cette page permet de partager du texte et des fichiers entre appareils.
 * Fonctionnalités :
 * - Ajouter du texte ou des fichiers
 * - Générer un code de partage unique
 * - Récupérer un partage via son code
 * - Supprimer manuellement un partage
 * - Expiration automatique après 24h
 */

'use client'

import { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { 
  ArrowLeftIcon, 
  ClipboardIcon, 
  UploadIcon, 
  TrashIcon, 
  CopyIcon, 
  CheckIcon, 
  FileIcon,
  DownloadIcon
} from '@/components/Icons'

// Interface pour un élément du clipboard
interface ClipboardItem {
  id: string
  type: 'text' | 'file'
  content: string
  fileName?: string
  fileType?: string
  fileSize?: number
  createdAt?: string
}

// Interface pour un partage
interface ClipboardShare {
  code: string
  items: ClipboardItem[]
  createdAt: string
}

// Configuration des animations
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

export default function ClipboardPage() {
  // État pour les éléments à partager
  const [items, setItems] = useState<ClipboardItem[]>([])
  // État pour le texte en cours de saisie
  const [textInput, setTextInput] = useState('')
  // État pour le code généré après partage
  const [shareCode, setShareCode] = useState('')
  // État pour la recherche d'un partage
  const [searchCode, setSearchCode] = useState('')
  // État pour le partage récupéré
  const [retrievedShare, setRetrievedShare] = useState<ClipboardShare | null>(null)
  // États de chargement et d'erreur
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  // État pour le bouton de copie
  const [copied, setCopied] = useState(false)
  // Référence pour l'input file
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Ajoute du texte aux éléments
  const addText = useCallback(() => {
    if (!textInput.trim()) return
    
    const newItem: ClipboardItem = {
      id: `text-${Date.now()}`,
      type: 'text',
      content: textInput.trim(),
    }
    
    setItems(prev => [...prev, newItem])
    setTextInput('')
    setError('')
  }, [textInput])

  // Gère l'ajout de fichiers
  const handleFileUpload = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    setError('')
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      
      // Limite de taille : 2MB par fichier
      if (file.size > 2 * 1024 * 1024) {
        setError(`Le fichier "${file.name}" est trop volumineux (max 2MB par fichier)`)
        continue
      }

      // Lecture du fichier en base64
      const reader = new FileReader()
      reader.onload = (event) => {
        const base64 = event.target?.result as string
        
        const newItem: ClipboardItem = {
          id: `file-${Date.now()}-${i}`,
          type: 'file',
          content: base64,
          fileName: file.name,
          fileType: file.type,
          fileSize: file.size,
        }
        
        setItems(prev => [...prev, newItem])
      }
      reader.readAsDataURL(file)
    }

    // Reset l'input file
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }, [])

  // Supprime un élément
  const removeItem = useCallback((id: string) => {
    setItems(prev => prev.filter(item => item.id !== id))
  }, [])

  // Crée un nouveau partage
  const createShare = useCallback(async () => {
    if (items.length === 0) {
      setError('Ajoutez au moins un élément à partager')
      return
    }

    setIsLoading(true)
    setError('')
    setSuccess('')

    try {
      const response = await fetch('/api/clipboard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Erreur lors de la création du partage')
      }

      setShareCode(data.code)
      setSuccess(`Partage créé avec succès ! Code : ${data.code}`)
      setItems([]) // Vide les éléments après partage
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue')
    } finally {
      setIsLoading(false)
    }
  }, [items])

  // Récupère un partage existant
  const retrieveShare = useCallback(async () => {
    if (!searchCode.trim()) {
      setError('Entrez un code de partage')
      return
    }

    setIsLoading(true)
    setError('')
    setRetrievedShare(null)

    try {
      const response = await fetch(`/api/clipboard/${searchCode.toUpperCase()}`)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Partage non trouvé')
      }

      setRetrievedShare(data.share)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue')
    } finally {
      setIsLoading(false)
    }
  }, [searchCode])

  // Supprime un partage
  const deleteShare = useCallback(async (code: string) => {
    setIsLoading(true)
    setError('')

    try {
      const response = await fetch(`/api/clipboard/${code}`, {
        method: 'DELETE',
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Erreur lors de la suppression')
      }

      setSuccess('Partage supprimé avec succès')
      setRetrievedShare(null)
      setShareCode('')
      setSearchCode('')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue')
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Copie le code dans le presse-papier
  const copyCode = useCallback(async (code: string) => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setError('Impossible de copier le code')
    }
  }, [])

  // Copie du texte dans le presse-papier
  const copyText = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setSuccess('Texte copié !')
      setTimeout(() => setSuccess(''), 2000)
    } catch {
      setError('Impossible de copier le texte')
    }
  }, [])

  // Télécharge un fichier
  const downloadFile = useCallback((item: ClipboardItem) => {
    if (item.type !== 'file' || !item.content) return

    const link = document.createElement('a')
    link.href = item.content
    link.download = item.fileName || 'fichier'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }, [])

  // Formate la taille du fichier
  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-designSS-silver hover:text-designSS-gold transition-colors duration-300 mb-4 group"
          >
            <ArrowLeftIcon className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
            <span className="text-sm font-medium">Retour au dashboard</span>
          </Link>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold tracking-tight">
            Clipboard <span className="text-designSS-gold">Éphémère</span>
          </h1>
          <p className="text-designSS-silver text-sm sm:text-base mt-2 font-light">
            Partagez du texte et des fichiers entre appareils
          </p>
        </div>
      </motion.header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Messages d'erreur et de succès */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400"
            >
              {error}
            </motion.div>
          )}
          {success && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg text-green-400"
            >
              {success}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Section Créer un partage */}
          <motion.section
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants} className="flex items-center gap-3 mb-6">
              <UploadIcon className="w-6 h-6 sm:w-7 sm:h-7 text-designSS-gold" />
              <h2 className="text-2xl sm:text-3xl font-display font-semibold">Créer un partage</h2>
            </motion.div>

            {/* Zone d'ajout de texte */}
            <motion.div 
              variants={itemVariants}
              className="bg-gradient-to-br from-designSS-darkGray to-designSS-gray border border-designSS-lightGray/20 rounded-lg p-6 mb-4"
            >
              <label className="block text-sm font-medium text-designSS-silver mb-2">
                Ajouter du texte
              </label>
              <textarea
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                placeholder="Collez ou écrivez votre texte ici..."
                className="w-full h-32 bg-designSS-black/50 border border-designSS-lightGray/30 rounded-lg p-4 text-white placeholder-designSS-silver/50 focus:outline-none focus:border-designSS-gold/50 transition-colors resize-none"
              />
              <button
                onClick={addText}
                disabled={!textInput.trim()}
                className="mt-3 px-4 py-2 bg-designSS-gold/20 border border-designSS-gold/50 text-designSS-gold rounded-lg hover:bg-designSS-gold/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Ajouter le texte
              </button>
            </motion.div>

            {/* Zone d'ajout de fichiers */}
            <motion.div 
              variants={itemVariants}
              className="bg-gradient-to-br from-designSS-darkGray to-designSS-gray border border-designSS-lightGray/20 rounded-lg p-6 mb-4"
            >
              <label className="block text-sm font-medium text-designSS-silver mb-2">
                Ajouter des fichiers (max 2MB chacun)
              </label>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                onChange={handleFileUpload}
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full py-8 border-2 border-dashed border-designSS-lightGray/30 rounded-lg hover:border-designSS-gold/50 transition-colors flex flex-col items-center gap-2 text-designSS-silver hover:text-designSS-gold"
              >
                <UploadIcon className="w-8 h-8" />
                <span>Cliquez pour sélectionner des fichiers</span>
              </button>
            </motion.div>

            {/* Liste des éléments ajoutés */}
            <AnimatePresence>
              {items.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-3 mb-4"
                >
                  <h3 className="text-lg font-medium text-designSS-silver">
                    Éléments à partager ({items.length})
                  </h3>
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="flex items-center gap-3 bg-designSS-gray/50 border border-designSS-lightGray/20 rounded-lg p-4"
                    >
                      {item.type === 'text' ? (
                        <ClipboardIcon className="w-5 h-5 text-designSS-gold flex-shrink-0" />
                      ) : (
                        <FileIcon className="w-5 h-5 text-designSS-gold flex-shrink-0" />
                      )}
                      <div className="flex-1 min-w-0">
                        {item.type === 'text' ? (
                          <p className="text-sm text-white truncate">{item.content}</p>
                        ) : (
                          <div>
                            <p className="text-sm text-white truncate">{item.fileName}</p>
                            <p className="text-xs text-designSS-silver">
                              {item.fileSize && formatFileSize(item.fileSize)}
                            </p>
                          </div>
                        )}
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-2 text-designSS-silver hover:text-red-400 transition-colors"
                      >
                        <TrashIcon className="w-5 h-5" />
                      </button>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Bouton de création du partage */}
            <motion.button
              variants={itemVariants}
              onClick={createShare}
              disabled={items.length === 0 || isLoading}
              className="w-full py-4 bg-designSS-gold text-designSS-black font-semibold rounded-lg hover:bg-designSS-gold/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <span className="animate-pulse">Création en cours...</span>
              ) : (
                <>
                  <ClipboardIcon className="w-5 h-5" />
                  Créer le partage
                </>
              )}
            </motion.button>

            {/* Affichage du code de partage */}
            <AnimatePresence>
              {shareCode && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="mt-6 p-6 bg-gradient-to-br from-designSS-gold/20 to-designSS-gold/10 border border-designSS-gold/50 rounded-lg"
                >
                  <p className="text-sm text-designSS-silver mb-2">Votre code de partage :</p>
                  <div className="flex items-center gap-3">
                    <span className="text-3xl font-mono font-bold text-designSS-gold tracking-widest">
                      {shareCode}
                    </span>
                    <button
                      onClick={() => copyCode(shareCode)}
                      className="p-2 bg-designSS-gold/20 rounded-lg hover:bg-designSS-gold/30 transition-colors"
                    >
                      {copied ? (
                        <CheckIcon className="w-5 h-5 text-green-400" />
                      ) : (
                        <CopyIcon className="w-5 h-5 text-designSS-gold" />
                      )}
                    </button>
                  </div>
                  <p className="text-xs text-designSS-silver mt-2">
                    Ce code expire dans 24 heures
                  </p>
                  <button
                    onClick={() => deleteShare(shareCode)}
                    className="mt-4 px-4 py-2 bg-red-500/20 border border-red-500/50 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors text-sm flex items-center gap-2"
                  >
                    <TrashIcon className="w-4 h-4" />
                    Supprimer maintenant
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.section>

          {/* Section Récupérer un partage */}
          <motion.section
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants} className="flex items-center gap-3 mb-6">
              <DownloadIcon className="w-6 h-6 sm:w-7 sm:h-7 text-designSS-gold" />
              <h2 className="text-2xl sm:text-3xl font-display font-semibold">Récupérer un partage</h2>
            </motion.div>

            {/* Zone de recherche */}
            <motion.div 
              variants={itemVariants}
              className="bg-gradient-to-br from-designSS-darkGray to-designSS-gray border border-designSS-lightGray/20 rounded-lg p-6 mb-4"
            >
              <label className="block text-sm font-medium text-designSS-silver mb-2">
                Entrez le code de partage
              </label>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={searchCode}
                  onChange={(e) => setSearchCode(e.target.value.toUpperCase())}
                  placeholder="EX: ABC123"
                  maxLength={6}
                  className="flex-1 bg-designSS-black/50 border border-designSS-lightGray/30 rounded-lg px-4 py-3 text-white text-center text-xl font-mono tracking-widest uppercase placeholder-designSS-silver/50 focus:outline-none focus:border-designSS-gold/50 transition-colors"
                  onKeyDown={(e) => e.key === 'Enter' && retrieveShare()}
                />
                <button
                  onClick={retrieveShare}
                  disabled={!searchCode.trim() || isLoading}
                  className="px-6 py-3 bg-designSS-gold text-designSS-black font-semibold rounded-lg hover:bg-designSS-gold/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? '...' : 'Récupérer'}
                </button>
              </div>
            </motion.div>

            {/* Affichage du partage récupéré */}
            <AnimatePresence>
              {retrievedShare && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-designSS-silver">
                      Contenu du partage ({retrievedShare.items.length} élément{retrievedShare.items.length > 1 ? 's' : ''})
                    </h3>
                    <button
                      onClick={() => deleteShare(retrievedShare.code)}
                      className="px-3 py-1.5 bg-red-500/20 border border-red-500/50 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors text-sm flex items-center gap-2"
                    >
                      <TrashIcon className="w-4 h-4" />
                      Supprimer
                    </button>
                  </div>

                  {retrievedShare.items.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="bg-gradient-to-br from-designSS-darkGray to-designSS-gray border border-designSS-lightGray/20 rounded-lg p-5"
                    >
                      {item.type === 'text' ? (
                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <ClipboardIcon className="w-5 h-5 text-designSS-gold" />
                              <span className="text-sm text-designSS-silver">Texte</span>
                            </div>
                            <button
                              onClick={() => copyText(item.content)}
                              className="p-2 bg-designSS-gold/20 rounded-lg hover:bg-designSS-gold/30 transition-colors"
                            >
                              <CopyIcon className="w-4 h-4 text-designSS-gold" />
                            </button>
                          </div>
                          <pre className="text-white whitespace-pre-wrap break-words bg-designSS-black/30 p-4 rounded-lg text-sm max-h-60 overflow-y-auto">
                            {item.content}
                          </pre>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <FileIcon className="w-8 h-8 text-designSS-gold" />
                            <div>
                              <p className="text-white font-medium">{item.fileName}</p>
                              <p className="text-xs text-designSS-silver">
                                {item.fileSize && formatFileSize(item.fileSize)}
                              </p>
                            </div>
                          </div>
                          <button
                            onClick={() => downloadFile(item)}
                            className="px-4 py-2 bg-designSS-gold/20 border border-designSS-gold/50 text-designSS-gold rounded-lg hover:bg-designSS-gold/30 transition-colors flex items-center gap-2"
                          >
                            <DownloadIcon className="w-4 h-4" />
                            Télécharger
                          </button>
                        </div>
                      )}
                    </motion.div>
                  ))}

                  <p className="text-xs text-designSS-silver text-center">
                    Créé le {new Date(retrievedShare.createdAt).toLocaleString('fr-FR')}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Instructions */}
            <motion.div
              variants={itemVariants}
              className="mt-8 p-6 bg-designSS-gray/30 border border-designSS-lightGray/10 rounded-lg"
            >
              <h3 className="text-lg font-semibold text-designSS-gold mb-4">Comment ça marche ?</h3>
              <ul className="space-y-3 text-sm text-designSS-silver">
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-designSS-gold/20 text-designSS-gold rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold">1</span>
                  <span>Ajoutez du texte ou des fichiers dans la section de gauche</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-designSS-gold/20 text-designSS-gold rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold">2</span>
                  <span>Cliquez sur "Créer le partage" pour générer un code unique</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-designSS-gold/20 text-designSS-gold rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold">3</span>
                  <span>Utilisez ce code sur un autre appareil pour récupérer le contenu</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-designSS-gold/20 text-designSS-gold rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold">4</span>
                  <span>Les partages expirent automatiquement après 24h ou peuvent être supprimés manuellement</span>
                </li>
              </ul>
            </motion.div>
          </motion.section>
        </div>
      </div>

      {/* Footer */}
      <motion.footer 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="border-t border-designSS-gray/30 mt-16 sm:mt-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 text-center">
          <Link 
            href="/"
            className="text-designSS-gold hover:text-designSS-gold/80 transition-colors text-sm font-medium inline-flex items-center gap-2"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            Retour au dashboard
          </Link>
        </div>
      </motion.footer>
    </main>
  )
}
