// GameView est responsable UNIQUEMENT de l’affichage.
// Il ne modifie jamais le modèle et ne calcule aucun indice (MVC).

import { CellState } from "../model/CellState.js";

export default class GameView {
  constructor(container, puzzle) {
    this.container = container;
    this.puzzle = puzzle;
  }

    // ===========Méthode en charge du rendu - Elle reconstruit entièrement la grille à partir de l’état du modèle =============

  render() {
    this.clear();
    this.prepareGrid();

    // Création de chaque cellule de la grille (indices + grille joueur)
    for (let r = 0; r < this.totalRows; r++) {
      for (let c = 0; c < this.totalCols; c++) {
        this.container.appendChild(this.createCell(r, c));
      }
    }
  }

  // =======================================Structure======================================================

  clear() {
    this.container.innerHTML = ""; // Vide le conteneur HTML avant un nouveau rendu (évite d’empiler plusieurs grilles)
  }

  //Calcule toutes les dimensions nécessaires pour afficher correctement les indices et la grille joueur
  prepareGrid() {
    const { grid } = this.puzzle;

    // Récupération des indices depuis le modèle
    this.rowClues = this.puzzle.getRowClues();
    this.colClues = this.puzzle.getColClues();

    // Longueur maximale des indices (pour l’alignement)
    this.maxRowClues = Math.max(...this.rowClues.map(r => r.length));
    this.maxColClues = Math.max(...this.colClues.map(c => c.length));

    // Taille totale de la grille HTML
    this.totalRows = this.maxColClues + grid.rows;
    this.totalCols = this.maxRowClues + grid.cols;

    // Définition de la grille CSS
    this.container.style.gridTemplateColumns =
      `repeat(${this.totalCols}, 30px)`;
    this.container.style.gridTemplateRows =
      `repeat(${this.totalRows}, 30px)`;
  }

   // =======================================Création du type de cellule qui doit être créée en fonction de sa position dans la grille======================================================

  createCell(r, c) {
    if (this.isCorner(r, c)) return this.createCornerCell();
    if (this.isColumnClue(r, c)) return this.createColumnClueCell(r, c);
    if (this.isRowClue(r, c)) return this.createRowClueCell(r, c);
    return this.createPlayerCell(r, c);
  }

    // =======================================Tests de position======================================================

  isCorner(r, c) {
    return r < this.maxColClues && c < this.maxRowClues;
  }

  isColumnClue(r, c) {
    return r < this.maxColClues && c >= this.maxRowClues;
  }

  isRowClue(r, c) {
    return r >= this.maxColClues && c < this.maxRowClues;
  }

   // =======================================Création des différents types de cellules======================================================

  createCornerCell() {
    return this.baseCell("index");
  }

  createColumnClueCell(r, c) {
    const cell = this.baseCell("index");
    const clues = this.colClues[c - this.maxRowClues];
    const i = clues.length - (this.maxColClues - r);
    cell.textContent = clues[i] ?? "";
    return cell;
  }

  createRowClueCell(r, c) {
    const cell = this.baseCell("index");
    const clues = this.rowClues[r - this.maxColClues];
    const i = clues.length - (this.maxRowClues - c);
    cell.textContent = clues[i] ?? "";
    return cell;
  }

  createPlayerCell(r, c) {
    const cell = this.baseCell("player");

    const row = r - this.maxColClues;
    const col = c - this.maxRowClues;
    const state = this.puzzle.grid.getCell(row, col);

    cell.classList.add(this.stateToClass(state));
    cell.dataset.row = row;
    cell.dataset.col = col;

    return cell;
  }
  
  // =======================================Méthodes Utilitaires======================================================

  //Crée une cellule HTML de base avec les classes communes
  baseCell(type) {
    const cell = document.createElement("div");
    cell.classList.add("cell", type);
    return cell;
  }

  //Convertit l’état du modèle en classe CSS
  stateToClass(state) {
    return state === CellState.FILLED ? "filled"
         : state === CellState.EMPTY  ? "empty"
         : "unknown";
  }

 // =======================================Gestion des évènements======================================================

 //Relie les clics utilisateur à la logique du jeu via le contrôleur.
  bindCellClick(handler) {
    this.container.addEventListener("click", e => {
      if (!e.target.classList.contains("player")) return;
      handler(+e.target.dataset.row, +e.target.dataset.col);
    });
  }
}
