/**
 * API ROUTE - CLIPBOARD ÉPHÉMÈRE
 * 
 * POST /api/clipboard - Crée un nouveau partage avec un code unique
 * 
 * Le partage peut contenir :
 * - Du texte simple
 * - Un ou plusieurs fichiers (encodés en base64)
 * 
 * Nécessite la configuration des variables d'environnement :
 * - UPSTASH_REDIS_REST_URL
 * - UPSTASH_REDIS_REST_TOKEN
 */

import { NextRequest, NextResponse } from 'next/server'
import { Redis } from '@upstash/redis'

// Interface pour définir la structure d'un partage
interface ClipboardItem {
  id: string
  type: 'text' | 'file'
  content: string // Texte ou contenu base64 pour les fichiers
  fileName?: string // Nom du fichier (si type === 'file')
  fileType?: string // Type MIME du fichier
  fileSize?: number // Taille en bytes
  createdAt: string
}

interface ClipboardShare {
  code: string
  items: ClipboardItem[]
  createdAt: string
}

// Génère un code de partage unique (6 caractères alphanumériques)
function generateCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789' // Évite les caractères ambigus (0, O, 1, I)
  let code = ''
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return code
}

export async function POST(request: NextRequest) {
  try {
    // Vérification des variables d'environnement
    if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
      return NextResponse.json(
        { error: 'Configuration Redis manquante. Veuillez configurer UPSTASH_REDIS_REST_URL et UPSTASH_REDIS_REST_TOKEN.' },
        { status: 500 }
      )
    }

    const redis = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    })

    const body = await request.json()
    const { items } = body as { items: ClipboardItem[] }

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: 'Aucun contenu à partager' },
        { status: 400 }
      )
    }

    // Vérification de la taille totale (max 4MB pour Upstash free tier)
    const totalSize = items.reduce((acc, item) => {
      if (item.type === 'file' && item.fileSize) {
        return acc + item.fileSize
      }
      return acc + (item.content?.length || 0)
    }, 0)

    if (totalSize > 4 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'Taille totale trop importante (max 4MB)' },
        { status: 400 }
      )
    }

    // Génère un code unique et vérifie qu'il n'existe pas déjà
    let code = generateCode()
    let attempts = 0
    while (await redis.exists(`clipboard:${code}`) && attempts < 10) {
      code = generateCode()
      attempts++
    }

    const share: ClipboardShare = {
      code,
      items: items.map((item, index) => ({
        ...item,
        id: `${code}-${index}`,
        createdAt: new Date().toISOString(),
      })),
      createdAt: new Date().toISOString(),
    }

    // Stocke le partage dans Redis (expire après 24h par défaut)
    await redis.set(`clipboard:${code}`, JSON.stringify(share), {
      ex: 86400, // 24 heures en secondes
    })

    return NextResponse.json({
      success: true,
      code,
      expiresIn: '24 heures',
    })
  } catch (error) {
    console.error('Erreur lors de la création du partage:', error)
    return NextResponse.json(
      { error: 'Erreur serveur lors de la création du partage' },
      { status: 500 }
    )
  }
}
