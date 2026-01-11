/**
 * API ROUTE - CLIPBOARD ÉPHÉMÈRE (Actions sur un partage)
 * 
 * GET /api/clipboard/[code] - Récupère un partage existant
 * DELETE /api/clipboard/[code] - Supprime un partage
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
  content: string
  fileName?: string
  fileType?: string
  fileSize?: number
  createdAt: string
}

interface ClipboardShare {
  code: string
  items: ClipboardItem[]
  createdAt: string
}

// GET - Récupère un partage par son code
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ code: string }> }
) {
  try {
    const { code } = await params

    if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
      return NextResponse.json(
        { error: 'Configuration Redis manquante' },
        { status: 500 }
      )
    }

    const redis = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    })

    const data = await redis.get(`clipboard:${code.toUpperCase()}`)

    if (!data) {
      return NextResponse.json(
        { error: 'Partage non trouvé ou expiré' },
        { status: 404 }
      )
    }

    // Le data peut être un string JSON ou déjà un objet
    const share: ClipboardShare = typeof data === 'string' ? JSON.parse(data) : data

    return NextResponse.json({
      success: true,
      share,
    })
  } catch (error) {
    console.error('Erreur lors de la récupération du partage:', error)
    return NextResponse.json(
      { error: 'Erreur serveur lors de la récupération du partage' },
      { status: 500 }
    )
  }
}

// DELETE - Supprime un partage
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ code: string }> }
) {
  try {
    const { code } = await params

    if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
      return NextResponse.json(
        { error: 'Configuration Redis manquante' },
        { status: 500 }
      )
    }

    const redis = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    })

    const exists = await redis.exists(`clipboard:${code.toUpperCase()}`)

    if (!exists) {
      return NextResponse.json(
        { error: 'Partage non trouvé ou déjà supprimé' },
        { status: 404 }
      )
    }

    await redis.del(`clipboard:${code.toUpperCase()}`)

    return NextResponse.json({
      success: true,
      message: 'Partage supprimé avec succès',
    })
  } catch (error) {
    console.error('Erreur lors de la suppression du partage:', error)
    return NextResponse.json(
      { error: 'Erreur serveur lors de la suppression du partage' },
      { status: 500 }
    )
  }
}
