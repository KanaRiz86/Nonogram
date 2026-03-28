// Création de la grille du joueur
import { ValeurCell } from "./ValeurCell.js";

//Création de la class "Grille Joueur"
export class GrilleJoueur {
  //Création du constructor et de ses propriétés
  constructor(lignes, colonnes) {
    this.lignes = lignes;
    this.colonnes = colonnes;
    this.cellules = [];
    //Création du tableau de tableaux(un tableau de ligne dans lequel on ajoute un tableau de colonne)
    for (let ligne = 0; ligne < lignes; ligne++) {
      this.cellules[ligne] = [];
      for (let colonne = 0; colonne < colonnes; colonne++) {
        this.cellules[ligne][colonne] = ValeurCell.VIDE;
      }
    }
  }
  //Méthode qui permet de lire la valeur d'une cellule
  getCellule(ligne, colonne) {
    if (!this.cellules[ligne]) {
      console.error("Ligne inexistante !", ligne, colonne);
    }
    return this.cellules[ligne]?.[colonne];
  }

  //Méthode qui permet de modifier la valeur d'une cellule
  setCellule(ligne, colonne, valeur) {
    this.cellules[ligne][colonne] = valeur;
  }
}