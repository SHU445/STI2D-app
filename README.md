# Dashboard STI2D

Dashboard personnel moderne pour gérer vos ressources, projets et séquences STI2D.

## ✨ Fonctionnalités

- **Design Koenigsegg** : Interface sombre et élégante inspirée du luxe automobile
- **Responsive** : Optimisé pour tous les écrans (mobile, tablette, desktop)
- **Animations fluides** : Transitions et fade-in soignés avec Framer Motion
- **Liens utiles** : Accès rapide à GitHub, Vercel, Neon DB, MDN, Pronote, ENT, ELEA, TinkerCAD
- **Projets** : Showcase de vos projets personnels
- **Séquences** : Section évolutive pour ajouter des ressources de cours

## 🚀 Démarrage

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

## 🛠️ Technologies

- **Next.js 14** : Framework React avec App Router
- **TypeScript** : Typage statique pour plus de robustesse
- **Tailwind CSS** : Styling utility-first
- **Framer Motion** : Animations fluides et performantes

## 📦 Structure du projet

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

## 🎨 Personnalisation

### Ajouter un lien utile

Éditez le tableau `usefulLinks` dans `app/page.tsx` :

```typescript
const usefulLinks: Link[] = [
  { title: 'Titre', url: 'https://...', description: 'Description' },
  // ...
]
```

### Ajouter un projet

Éditez le tableau `projects` dans `app/page.tsx` :

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

1. Ajoutez la séquence dans le tableau `sequences` dans `app/page.tsx` :

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

2. Créez une nouvelle page dans `app/sequences/sequence-2/page.tsx` (utilisez `sequence-1` comme modèle)

3. Ajoutez les ressources dans le tableau `resources` de la page de la séquence :

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

## 📱 Responsive Design

- **Mobile** : 1 colonne
- **Tablet** : 2 colonnes
- **Desktop** : 3 colonnes pour les liens, 2-3 pour les projets

## 🎭 Thème Koenigsegg

Couleurs personnalisées définies dans `tailwind.config.ts` :
- Noir profond : `#0a0a0a`
- Gris foncé : `#1a1a1a`
- Or : `#d4af37`
- Argent : `#c0c0c0`

## 📄 Licence

Projet personnel - STI2D

