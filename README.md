# README — Application Web Nonogramme

---

# Présentation

**Nonogramme** est une application web de jeu de logique développée en JavaScript selon une architecture **MVC** (*Modèle – Vue – Contrôleur*).

Le projet permet de générer et d’afficher une grille de nonogramme interactive dans laquelle le joueur peut remplir les cases afin de reconstituer une image cachée à partir des indices affichés sur les lignes et colonnes.

L’interface est entièrement réalisée côté client en :

- HTML5
- CSS3
- JavaScript ES6 Modules

---

# Fonctionnalités

- Génération aléatoire d’une grille de solution

- Affichage dynamique :
  - de la grille
  - des indices de lignes
  - des indices de colonnes

- Gestion des états des cellules :
  - inconnue
  - remplie
  - vide

- Interaction utilisateur par clic

- Architecture MVC modulaire

- Utilisation des modules ES6 (`import/export`)

---

# Technologies utilisées

## Frontend

- HTML5
- CSS3
- JavaScript ES6 Modules

## Architecture

- MVC (*Model / View / Controller*)

---

## Structure du projet

```text
project/
├── index.html
├── style.css
└── js/
    ├── main.js
    ├── model/
    │   ├── GridModel.js
    │   ├── PuzzleModel.js
    │   └── CellState.js
    ├── view/
    │   └── GameView.js
    └── controller/
        └── GameController.js
```

# Architecture MVC

## Model

Le modèle contient les données et la logique métier du jeu :

- état des cellules
- grille du joueur
- solution du puzzle
- calcul des indices

### Exemple

```javascript
const grid = new GridModel(ROWS, COLS);

const solution = generateRandomSolution(ROWS, COLS);

const puzzle = new PuzzleModel(grid, solution);

```

## View

La vue gère l’affichage :

- rendu de la grille
- rendu des indices
- affichage des cellules

### Éléments HTML principaux

```html
<div id="clues-col"></div>

<div id="clues-row"></div>

<div id="grid"></div>
```

## Controller

Le contrôleur fait le lien entre le modèle et la vue :

- réception des clics utilisateur
- mise à jour du modèle
- rafraîchissement de l’affichage

### Exemple

```javascript
handleCellClick(r,c){

  const current = this.puzzle.grid.getCell(r,c);

  // Cycle des états
  const next = (current + 1) % 3;

  this.puzzle.grid.setCell(r,c,next);

  // Rafraîchissement de la vue
  this.view.render(this.puzzle);
}
```

# Fonctionnement du jeu

## États des cellules

Chaque cellule possède trois états :

| État | Description |

| UNKNOWN | Case inconnue |
| FILLED | Case remplie |
| EMPTY | Case vide |

### Cycle des clics
UNKNOWN → FILLED → EMPTY

# Génération de la solution

Une solution aléatoire est générée au lancement :

```javascript
function generateRandomSolution(rows, cols){

  const solution = [];

  for(let r = 0; r < rows; r++){

    const row = [];

    for(let c = 0; c < cols; c++){

      // 50% de chance d'obtenir une case noire
      row.push(Math.random() < 0.5 ? 1 : 0);
    }

    solution.push(row);
  }

  return solution;
}
```

# Interface graphique

Le style CSS gère :

- l’alignement de la grille
- les indices
- les couleurs des cellules
- la disposition générale

### Exemple CSS

```css
.cell.filled {
  background-color: black;
}

.cell.empty {
  background-color: white;
}

.cell.unknown {
  background-color: #811212;
}
```

# Lancement du projet

## Prérequis

- Navigateur web moderne

- Serveur local recommandé :
  - MAMP
  - XAMPP
  - WAMP
  - Live Server VSCode

---

# Installation

## 1. Cloner le dépôt

```bash
git clone <url-du-repo>
git clone <url-du-repo>
```

## 2. Ouvrir le projet

## 3. Lancer un serveur local

### Exemple avec Live Server

- clic droit sur `index.html`
- `Open with Live Server`

---

# Perspectives d’évolution

Le projet est conçu pour évoluer vers :

- chargement de puzzles depuis une base de données
- génération d’images réelles en nonogrammes
- refactorisation orientée objet plus poussée
- responsive design
- animations et feedback visuel

---

# Auteur

Projet réalisé dans le cadre d’un projet de formation réalisé en trinôme **BTS SIO SLAM**.

Développement en équipe autour :

- d’une architecture MVC
- du JavaScript modulaire
- de la gestion collaborative du versionning Git/GitHub