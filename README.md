# Dashboard STI2D

Dashboard personnel moderne pour gérer vos ressources, projets et séquences STI2D.

## 📋 Vue d'ensemble

Ce projet est un **dashboard web** développé avec Next.js 14 qui permet de :
- Organiser et accéder rapidement à des liens utiles (GitHub, MDN, outils pédagogiques, etc.)
- Présenter vos projets personnels avec des liens vers leurs déploiements
- Gérer des séquences pédagogiques avec leurs ressources (cours, exercices, vidéos, etc.)
- Afficher des fichiers Markdown avec coloration syntaxique et support du front matter

## 🎯 Fonctionnalités principales

### 1. Page d'accueil (`app/page.tsx`)
- **Liens utiles** : Accès rapide à GitHub, Vercel, Neon DB, MDN, Pronote, ENT, ELEA, TinkerCAD, etc.
- **Projets** : Affichage de vos projets personnels avec liens vers leurs déploiements
- **Séquences** : Navigation vers les différentes séquences pédagogiques (Arduino, HTML, Projet 72H)
- **Animations** : Transitions fluides avec Framer Motion

### 2. Lecteur de fichiers Markdown (`app/files/[slug]/page.tsx`)
- **Affichage dynamique** : Charge et affiche des fichiers `.md` depuis `public/files/`
- **Front matter** : Support des métadonnées YAML en haut des fichiers
- **Coloration syntaxique** : Coloration automatique du code avec highlight.js
- **GitHub Flavored Markdown** : Support des tableaux, checklists, footnotes, etc.
- **Sécurité** : Protection contre les attaques de path traversal

### 3. Pages de séquences (`app/sequences/*/page.tsx`)
- **Organisation** : Chaque séquence a sa propre page avec ses ressources
- **Types de ressources** : Cours, exercices, vidéos, liens, ressources Markdown, images
- **Navigation** : Liens internes vers les fichiers Markdown ou externes vers des sites web

## 🏗️ Architecture du projet

```
SITE_STI2D/
├── app/                          # Dossier App Router de Next.js
│   ├── files/
│   │   └── [slug]/
│   │       └── page.tsx         # Page dynamique pour afficher les fichiers Markdown
│   ├── sequences/               # Pages des séquences pédagogiques
│   │   ├── sequence-Arduino/
│   │   ├── sequence-HTML/
│   │   └── projet_72H/
│   ├── globals.css              # Styles CSS globaux
│   ├── layout.tsx               # Layout principal (enveloppe toutes les pages)
│   └── page.tsx                 # Page d'accueil
├── components/
│   └── Icons.tsx                # Composants d'icônes SVG réutilisables
├── public/
│   └── files/                   # Fichiers Markdown accessibles publiquement
│       ├── test-markdown.md
│       ├── cours.md
│       ├── html.md
│       └── kit_LoRa.md
├── next.config.js               # Configuration Next.js
├── tailwind.config.ts           # Configuration Tailwind CSS
├── tsconfig.json                # Configuration TypeScript
└── package.json                 # Dépendances du projet
```

## 🔄 Comment ça fonctionne ?

### 1. Routage Next.js
- **Routes statiques** : `/` → `app/page.tsx`
- **Routes dynamiques** : `/files/[slug]` → `app/files/[slug]/page.tsx`
  - Exemple : `/files/test-markdown` charge `public/files/test-markdown.md`
- **Routes de séquences** : `/sequences/sequence-Arduino` → `app/sequences/sequence-Arduino/page.tsx`

### 2. Affichage des fichiers Markdown
1. L'utilisateur visite `/files/nom-du-fichier`
2. Next.js extrait `nom-du-fichier` comme paramètre `slug`
3. Le composant charge `/files/nom-du-fichier.md` depuis `public/files/`
4. Le fichier est parsé avec `gray-matter` pour extraire le front matter
5. Le contenu Markdown est converti en HTML avec `react-markdown`
6. Les plugins ajoutent la coloration syntaxique et le support GFM
7. Le HTML est rendu avec des styles Tailwind personnalisés

### 3. Système de thème
- **Palette de couleurs "koenigsegg"** : Thème sombre avec accents dorés
- **Polices** : Inter (texte) et Montserrat (titres)
- **Animations** : Framer Motion pour les transitions
- **Responsive** : Design adaptatif mobile/tablette/desktop

## 📝 Fonctionnalités

### Installation

```bash
npm install
```

### Développement

```bash
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000)

### Build Production

```bash
npm run build
npm start
```

## Technologies

- **Next.js 14** : Framework React avec App Router
- **TypeScript** : Typage statique pour plus de robustesse
- **Tailwind CSS** : Styling utility-first
- **Framer Motion** : Animations fluides et performantes

## Structure du projet

```
├── app/
│   ├── globals.css      # Styles globaux
│   ├── layout.tsx       # Layout principal
│   └── page.tsx         # Page d'accueil
├── components/
│   └── Icons.tsx        # Composants d'icônes SVG
├── public/              # Fichiers statiques
└── ...config files
```

## Personnalisation

### Ajouter un lien

Éditer dans le tableau `usefulLinks` dans `app/page.tsx` :

```typescript
const usefulLinks: Link[] = [
  { title: 'Titre', url: 'https://...', description: 'Description' },
  // ...
]
```

### Ajouter un projet

Éditer dans le tableau `projects` dans `app/page.tsx` :

```typescript
const projects: Project[] = [
  {
    title: 'Nom du projet',
    url: 'https://...',
    description: 'Description du projet'
  },
  // ...
]
```

### Ajouter une séquence

1. **Créer la page de séquence** : Créer un nouveau dossier dans `app/sequences/` (ex: `sequence-2/`) avec un fichier `page.tsx`

2. **Ajouter la séquence dans le tableau** `sequences` dans `app/page.tsx` :

```typescript
const sequences: Sequence[] = [
  {
    title: 'Séquence 2',
    url: '/sequences/sequence-2',
    description: 'Description de la séquence',
    status: 'available' // ou 'coming-soon'
  },
]
```

3. **Ajouter des ressources** dans le tableau `resources` de la page de la séquence :

```typescript
const resources: Resource[] = [
  {
    title: 'Titre de la ressource',
    type: 'cours', // 'cours', 'exercice', 'video', 'lien', 'ressource', 'image'
    url: '/files/nom-fichier', // Lien interne vers un fichier Markdown
    // ou url: 'https://...', // Lien externe
    description: 'Description de la ressource'
  },
]
```

### Ajouter un fichier Markdown

1. **Créer le fichier** : Ajouter un fichier `.md` dans `public/files/` (ex: `mon-fichier.md`)

2. **Optionnel : Ajouter du front matter** en haut du fichier :

```markdown
---
title: "Mon titre"
date: 2025-01-12
tags: [tag1, tag2]
---

# Contenu du fichier
...
```

3. **Accéder au fichier** : Visiter `/files/mon-fichier` dans le navigateur

## 🔍 Comprendre le code

Tous les fichiers principaux contiennent des **commentaires détaillés** expliquant :
- Le rôle de chaque fichier
- Le fonctionnement des fonctions importantes
- Les technologies utilisées
- Les concepts Next.js/React utilisés

**Fichiers commentés** :
- ✅ `app/page.tsx` - Page d'accueil
- ✅ `app/layout.tsx` - Layout principal
- ✅ `app/files/[slug]/page.tsx` - Lecteur Markdown
- ✅ `components/Icons.tsx` - Composants d'icônes
- ✅ `app/sequences/sequence-Arduino/page.tsx` - Exemple de séquence
- ✅ `next.config.js` - Configuration Next.js
- ✅ `tailwind.config.ts` - Configuration Tailwind
- ✅ `app/globals.css` - Styles globaux

## 🎨 Personnalisation du thème

Les couleurs sont définies dans `tailwind.config.ts` :

```typescript
colors: {
  koenigsegg: {
    black: '#0a0a0a',      // Fond principal
    darkGray: '#1a1a1a',   // Fond secondaire
    gray: '#2a2a2a',       // Fond des cartes
    lightGray: '#404040',  // Bordures
    gold: '#d4af37',       // Couleur d'accent principale
    silver: '#c0c0c0',     // Texte secondaire
  }
}
```

Pour changer les couleurs, modifiez ces valeurs et les classes Tailwind s'adapteront automatiquement.


