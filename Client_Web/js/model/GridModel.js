
// Stocke la grille du joueur, sans connaître la solution ni les indices

import { CellState } from "./CellState.js"; //import de l'état des cellules

export default class GridModel { // export de la classe pour qu'elle puisse être réutilisé dans d'autres scripts
  constructor(rows, cols){ 
    //constructor est la fonction à l'intérieur de la classe qui s’exécute automatiquement 
    // lorsqu'on créé une nouvelle instance de la classe avec new.
    this.rows = rows; 
    this.cols = cols;
    //rows et cols sont les dimensions de la grille.
    //this.rows et this.cols stockent ces valeurs dans l’objet, pour pouvoir les utiliser plus tard

    this.cells = Array.from({length: rows}, ()=>Array(cols).fill(CellState.EMPTY));
}//this.cells est un tableau 2D (rows x cols) où toutes les cases sont initialisées à EMPTY.

//Array.from() est une fonction qui crée un nouveau tableau à partir de quelque chose qui ressemble à un tableau.
//{ length: rows } est un objet avec une propriété length, qui indique combien d’éléments doit avoir le tableau final.
//() => Array(cols).fill(CellState.EMPTY) : fonction exécutée pour chaque élément du tableau que l’on crée.
//Pour chaque ligne, on crée un nouveau tableau de cols colonnes.
//.fill(CellState.EMPTY) remplit tous les éléments de ce tableau avec CellState.EMPTY.
  
  getCell(r,c){ // Méthode qui permet de retourner la valeur d'une case
    return this.cells[r][c]; //"r" est le numéro de la ligne et "c" le numéro de la colonne
  } 
  

  setCell(r,c,state){ // Méthode qui permet de changer l'état d'une case d'une case
    this.cells[r][c] = state; 
  } 
}
