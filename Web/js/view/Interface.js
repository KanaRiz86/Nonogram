// Interface est responsable UNIQUEMENT de l’affichage.

import { ValeurCell } from "../model/ValeurCell.js";

export class Interface {
  //Initialise l’interface en mémorisant le conteneur HTML où afficher la grille et le puzzle à afficher.
  constructor(container, puzzle) {
    this.container = container; //container est le DOM instancié dans "main.js"
    this.puzzle = puzzle; //instance de grille solution (cf "main.js")
    this.chronometreContainer = document.getElementById("chronometre-container");
  }

  // ==============================================Affichage======================================================

  //Efface l’affichage actuel, prépare la grille, puis crée et affiche toutes les cellules une par une.
  rendu() {
    this.clear();
    this.prepareGrille();
    for (let ligne = 0; ligne < this.totalLignes; ligne++) {
      for (let colonne = 0; colonne < this.totalColonnes; colonne++) {
        const cellule = this.creationCellule(ligne, colonne);
        this.container.appendChild(cellule);
      }
    }
  }
  // =======================================Préparation à l'affichage======================================================

  //Vide complètement le conteneur HTML avant de redessiner la grille.
  clear() {
    this.container.innerHTML = "";
  }

  // Calcule toutes les tailles nécessaires (indices, lignes, colonnes) et configure la grille CSS.
  prepareGrille() {
    const grille = this.puzzle.grille;

    // Récupération des indices depuis le modèle
    this.ligneIndices = this.puzzle.getLigneIndices();
    this.colonneIndices = this.puzzle.getColonneIndices();

    // Longueur maximale des indices (pour l’alignement)
    this.maxLigneIndices = 0;
    for (let indices of this.ligneIndices) {
      if (indices.length > this.maxLigneIndices) {
        this.maxLigneIndices = indices.length;
      }
    }

    this.maxColonneIndices = 0;
    for (let indices of this.colonneIndices) {
      if (indices.length > this.maxColonneIndices) {
        this.maxColonneIndices = indices.length;
      }
    }

    // Taille totale de la grille HTML
    this.totalLignes = this.maxColonneIndices + this.puzzle.grille.lignes;
    this.totalColonnes = this.maxLigneIndices + this.puzzle.grille.colonnes;

    //console.log("totalLignes", this.totalLignes, "totalColonnes", this.totalColonnes);

    // Définition de la grille CSS
    const tailleCellule = 30;

    this.container.style.gridTemplateColumns =
      "repeat(" + this.totalColonnes + ", " + tailleCellule + "px)";

    this.container.style.gridTemplateRows =
      "repeat(" + this.totalLignes + ", " + tailleCellule + "px)";
  }

  // =======================================Cellules à créer======================================================

  // Détermine quel type de cellule doit être créée selon sa position dans la grille.
  creationCellule(ligne, colonne) {
    if (this.estCoin(ligne, colonne))
      return this.creationCelluleCoin();
    if (this.estColonneIndice(ligne, colonne))
      return this.creationCelluleColonneIndice(ligne, colonne);
    if (this.estLigneIndice(ligne, colonne))
      return this.creationCelluleLigneIndice(ligne, colonne);
    return this.creationCelluleJoueur(ligne, colonne);
  }

  // =======================================Règles de position======================================================

  // Indique si la cellule se trouve dans le coin supérieur gauche réservé aux indices.
  estCoin(ligne, colonne) {
    return ligne < this.maxColonneIndices && colonne < this.maxLigneIndices;
  }

  //Indique si la cellule appartient à la zone des indices de colonnes
  estColonneIndice(ligne, colonne) {
    return ligne < this.maxColonneIndices && colonne >= this.maxLigneIndices;
  }

  //Indique si la cellule appartient à la zone des indices de lignes.
  estLigneIndice(ligne, colonne) {
    return ligne >= this.maxColonneIndices && colonne < this.maxLigneIndices;
  }

  // =======================================Création des différents types de cellules======================================================

  //Crée une cellule vide servant uniquement de coin entre les indices.
  creationCelluleCoin() {
    return this.creationCelluleHTML("index");
  }
  //Crée une cellule affichant un indice de colonne à la bonne position.
  creationCelluleColonneIndice(ligne, colonne) {
    const cellule = this.creationCelluleHTML("index");
    const indices = this.colonneIndices[colonne - this.maxLigneIndices];
    const i = indices.length - (this.maxColonneIndices - ligne);
    cellule.textContent = indices[i] ?? "";
    return cellule;
  }
  //Crée une cellule affichant un indice de ligne à la bonne position.
  creationCelluleLigneIndice(ligne, colonne) {
    const cellule = this.creationCelluleHTML("index");
    const indices = this.ligneIndices[ligne - this.maxColonneIndices];
    const i = indices.length - (this.maxLigneIndices - colonne);
    cellule.textContent = indices[i] ?? "";
    return cellule;
  }
  //Crée une cellule jouable correspondant à une case de la grille du puzzle.
  creationCelluleJoueur(ligne, colonne) { //Attention : ne pas confondre ligne et colonne (correspond à la grille HTML ou supergrille) et ligne/colonneGrilleJouable qui correspond à la zone jouable

    const ligneGrilleJouable = ligne - this.maxColonneIndices;
    const colonneGrilleJouable = colonne - this.maxLigneIndices;

    // Si négatif, c’est une cellule d’indice, ne pas envoyer au contrôleur
    if (
      ligneGrilleJouable < 0 || colonneGrilleJouable < 0
    ) {
      return this.creationCelluleHTML("index");
    }

    // Si supérieur aux dimensions de la grille logique
    if (
      ligneGrilleJouable >= this.puzzle.grille.lignes ||
      colonneGrilleJouable >= this.puzzle.grille.colonnes
    ) {
      return this.creationCelluleHTML("index");
    }

    const cellule = this.creationCelluleHTML("joueur");
    cellule.dataset.ligne = ligneGrilleJouable;
    cellule.dataset.colonne = colonneGrilleJouable;

    const etat = this.puzzle.grille.getCellule(ligneGrilleJouable, colonneGrilleJouable);
    cellule.classList.add(this.conversionEtatVersClasseCSS(etat));

    return cellule;
  }

  // =======================================Méthodes Utilitaires======================================================

  //Crée une cellule HTML de base avec les classes CSS appropriées.
  creationCelluleHTML(type) {
    const cellule = document.createElement("div");
    cellule.classList.add("cell", type);
    return cellule;
  }

  //Convertit l’état logique d’une case du puzzle en une classe CSS d’affichage.
  conversionEtatVersClasseCSS(etat) {
    return etat === ValeurCell.REMPLIE ? "remplie"
      : etat === ValeurCell.VIDE ? "vide"
        : "inconnue";
  }

  // =======================================Gestion des clics======================================================

  //Écoute les clics sur les cellules du joueur et appelle une fonction avec leurs coordonnées.
  gererClicCellule(handler) {
    this.container.addEventListener("click", function (event) {

      // On vérifie que l'élément cliqué est bien une cellule du joueur
      if (!event.target.classList.contains("joueur")) {
        return;
      }

      // On récupère les coordonnées stockées dans le HTML
      let ligne = event.target.dataset.ligne;
      let colonne = event.target.dataset.colonne;

      // Les valeurs du dataset sont des chaînes de caractères, von les convertit en nombres
      ligne = Number(ligne);
      colonne = Number(colonne);

      handler(ligne, colonne);
    });
  }
  // =======================================Affichage du chronomètre======================================================

  afficherChrono(tempsEnMillisecondes) {
    const secondesTotales = Math.floor(tempsEnMillisecondes / 1000); //Math.floor sert à arrondir à l’entier inférieur
    const minutes = Math.floor(secondesTotales / 60);
    const secondes = secondesTotales % 60;

    this.chronometreContainer.textContent =
      minutes + ":" + (secondes < 10 ? "0" : "") + secondes;
  }
}