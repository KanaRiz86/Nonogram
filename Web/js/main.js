//main.js est reponsable de la création du modèle, de la vue et du contrôleur. Il est aussi en charge de lancer et relancer une partie.


import { GrilleJoueur } from "./model/GrilleJoueur.js"; //Import de la grille joueur
import { Puzzle } from "./model/Puzzle.js"; //Import du puzzle(solution + indices)
import { Interface } from "./view/Interface.js"; //Import de la vue
import { Controleur } from "./controller/Controleur.js"; //Import du contrôleur
import { Temps } from "./model/Temps.js";


// ===================== Génération aléatoire de la solution // =====================

function generationSolutionAleatoire(lignes, colonnes) {
  const solution = [];
  for (let i = 0; i < lignes; i++) {
    const ligneSolution = [];
    for (let j = 0; j < colonnes; j++) {
      ligneSolution.push(Math.random() < 0.5 ? 1 : 0); //Génère un nombre décimal aléatoire entre 0 (inclus) et 1 (exclu), 50% de chance d'être true ou false
    } //Si le nombre est inférieur à 0.5, le résultat est 1, sinon le résultat est 0
    solution.push(ligneSolution);
  }
  return solution;
}

// ===================== Fonction qui lance une partie // =====================

let intervalID = null; // pour suivre le setInterval du chrono

function demarrerJeu(lignes, colonnes) {

  // Si un ancien intervalle existe, on l'arrête
  if (intervalID !== null) {
    clearInterval(intervalID);
  }

  // Création de la grille du joueur
  const grilleJoueur = new GrilleJoueur(lignes, colonnes);
  console.log("Grille joueur :");
  console.log(grilleJoueur.cellules);

  // Génération de la solution aléatoire
  const solution = generationSolutionAleatoire(lignes, colonnes);
  console.log("Solution du puzzle :");
  console.log(solution);

  // Création du puzzle (grille du joueur + solution)
  const puzzle = new Puzzle(grilleJoueur, solution);

  // Création de la vue
  const container = document.getElementById("game-container");
  const interfaceJeu = new Interface(container, puzzle);

  // Création du contrôleur qui gère les interactions entre le modèle et la vue"
  const controleur = new Controleur(puzzle, interfaceJeu);

  // Création du chronomètre
  const chrono = new Temps(puzzle);
   chrono.demarrer();

  //Affiche le chrono à 00:00
  interfaceJeu.afficherChrono(chrono.obtenirTempsEcoule());

  // Mise à jour du chrono toutes les secondes
  intervalID = setInterval(() => {
    interfaceJeu.afficherChrono(chrono.obtenirTempsEcoule());
  }, 1000);

  // Arrêter le chrono quand la partie est terminée
  controleur.definirFinDePartie(() => {
    chrono.terminer();
    clearInterval(intervalID); // stoppe le chrono
    intervalID = null;         // réinitialisation pour la prochaine partie

    alert("Félicitations !");

   });
}

//Lancement initial
demarrerJeu(5, 5);

// Bouton "Nouvelle partie"
document.getElementById("nouvelle-partie").addEventListener("click", function () {
  demarrerJeu(5, 5);
});

// ===================== Boutons // =====================

const boutons = document.querySelectorAll("#controls-container button[data-size]");
boutons.forEach(bouton => {
  bouton.addEventListener("click", () => {
    const taille = Number(bouton.dataset.size);
    demarrerJeu(taille, taille);
  });
});



