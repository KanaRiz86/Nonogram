//main.js est reponsable de la création du modèle, de la vue et du contrôleur. Il est aussi en charge de lancer et relancer une partie.


import GridModel from "./model/GridModel.js"; //Import de la grille joueur
import PuzzleModel from "./model/PuzzleModel.js"; //Import du puzzle(solution + indices)
import GameView from "./view/GameView.js"; //Import de la vue
import GameController from "./controller/GameController.js"; //Import du contrôleur


// ===================== Taille fixe (provisoire) de la grille // =====================

const ROWS = 5;
const COLS = 5;

// ===================== Génération aléatoire de la solution // =====================

function generateRandomSolution(rows, cols) {
  const solution = [];
  for (let r = 0; r < rows; r++) {
    const row = [];
    for (let c = 0; c < cols; c++) {
      row.push(Math.random() < 0.5 ? 1 : 0); //Génère un nombre décimal aléatoire entre 0 (inclus) et 1 (exclu), 50% de chance d'être true ou false
    } //Si le nombre est inférieur à 0.5, le résultat est 1, sinon le résultat est 0
    solution.push(row);
  }
  return solution;
}

// ===================== Fonction qui lance une partie // =====================

function startGame() {
  const grid = new GridModel(ROWS, COLS);
  console.log("Grille joueur (GridModel) :");
  console.log(grid.cells);

  const solution = generateRandomSolution(ROWS, COLS);
  const puzzle = new PuzzleModel(grid, solution);

  console.log("Solution du puzzle :");
  console.log(solution);

  const container = document.getElementById("game-container");
  const view = new GameView(container, puzzle);

  new GameController(puzzle, view);
}

startGame();

document.getElementById("new-game").addEventListener("click", startGame);


