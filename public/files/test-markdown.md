---
title: "Documentation Markdown - Test"
date: 2025-01-12
tags: [markdown, test, documentation]
---

# 📘 Documentation Markdown - Test

## 1. Introduction à Markdown

Objectifs de Markdown :

* écrire rapidement des documents lisibles en texte brut ;
* générer du contenu HTML facilement sans connaître le HTML ;
* structurer des notes, READMEs, documentation, articles, etc.

---

## 2. Syntaxe de base

### 2.1 Titres

# Titre H1
## Titre H2
### Titre H3
#### Titre H4
##### Titre H5
###### Titre H6

### 2.2 Mise en forme du texte

* **Gras** : `**texte en gras**`
* *Italique* : `*texte en italique*`
* ***Gras + italique*** : `***texte combiné***`
* ~~Barré~~ : `~~texte barré~~`
* Code inline : `code`

### 2.3 Paragraphes et sauts de ligne

Première ligne  
Deuxième ligne (avec deux espaces à la fin)

### 2.4 Citations

> Ceci est une citation.

>> Une sous-citation.

---

## 3. Listes

### 3.1 Liste à puces

- élément
- élément
  - sous-élément
  - autre sous-élément

### 3.2 Liste numérotée

1. premier
2. deuxième
3. troisième

### 3.3 Liste de tâches (checklist)

- [ ] tâche non faite
- [x] tâche faite
- [ ] autre tâche
- [x] tâche complétée

---

## 4. Liens et images

### 4.1 Liens

[Lien vers Google](https://www.google.com)

[Lien avec infobulle](https://www.google.com "Description du lien")

### 4.2 Images

![Texte alternatif](https://via.placeholder.com/400x200 "Titre de l'image")

---

## 5. Code

### 5.1 Code inline

Voici du `code inline` dans une phrase.

### 5.2 Bloc de code

```
du code ici
sans coloration
```

### 5.3 Bloc de code avec coloration syntaxique

```python
def hello():
    print("Hello, World!")
    return True
```

```javascript
function greet(name) {
    console.log(`Hello, ${name}!`);
    return `Hello, ${name}!`;
}
```

```typescript
interface User {
    name: string;
    age: number;
}

const user: User = {
    name: "John",
    age: 30
};
```

---

## 6. Tableaux

| Colonne 1 | Colonne 2 | Colonne 3 |
| --------- | --------- | --------- |
| Valeur 1  | Valeur 2  | Valeur 3  |
| Valeur 4  | Valeur 5  | Valeur 6  |

### Alignement

| Gauche | Centre | Droite |
| :----- | :----: | -----: |
| a      |    b   |      c |
| texte  |  texte |  texte |

---

## 7. Séparateurs (lignes horizontales)

---

## 8. Éléments avancés

### 8.1 Paragraphes cités (blockquotes complexes)

> # Titre cité
>
> Liste :
>
> * item 1
> * item 2

### 8.2 Liens internes (ancre vers un titre)

[Aller à Introduction](#1-introduction-à-markdown)

[Aller à Code](#5-code)

### 8.3 Footnotes (notes de bas de page)

Voici une phrase avec une note.[^1]

Et une autre note.[^2]

[^1]: Ceci est la première note.
[^2]: Ceci est la deuxième note avec plus de détails.

---

## 9. Échapper des caractères réservés

Pour afficher un caractère spécial : \* \# \` \_ etc.

---

## 10. Combinaisons

Voici un paragraphe avec **gras**, *italique*, `code`, et un [lien](https://example.com).

### Liste avec code

- Élément avec `code inline`
- Élément avec **gras** et *italique*
- Élément avec [lien](https://example.com)

