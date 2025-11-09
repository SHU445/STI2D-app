# Dashboard STI2D

Dashboard personnel moderne pour gérer vos ressources, projets et séquences STI2D.

## Fonctionnalités

- **Responsive**
- **Liens utiles** : Accès rapide à GitHub, Vercel, Neon DB, MDN, Pronote, ENT, ELEA, TinkerCAD
- **Projets** : projets personnels
- **Séquences** : Section pour ajouter des ressources de cours

### Installation

```bash
npm install
```

### Développement

```bash
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

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

1. Ajouter une séquence dans le tableau `sequences` dans `app/page.tsx` :

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

3. Ajouter une ressources dans le tableau `resources` de la page de la séquence :

```typescript
const resources: Resource[] = [
  {
    title: 'Titre de la ressource',
    type: 'cours', // 'cours', 'exercice', 'video', ou 'lien'
    url: 'https://...', // optionnel
    description: 'Description de la ressource'
  },
]
```