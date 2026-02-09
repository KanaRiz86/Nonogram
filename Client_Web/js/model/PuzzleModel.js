//PuzzleModel est le modèle “logique” du Nonogram
//Il connaît la solution (la grille correcte).
//Il ne connaît pas l’affichage, mais fournit des méthodes pour vérifier si une case ou le puzzle entier est correct.
//Il calcule les indices pour chaque ligne et chaque colonne, nécessaires pour le jeu.

import { CellState } from "./CellState.js"; //import de l'état des cellules

export default class PuzzleModel { // export de la classe pour qu'elle puisse être réutilisé dans d'autres scripts
  constructor(grid, solution){
    //constructor est la fonction à l'intérieur de la classe qui s’exécute automatiquement 
    // lorsqu'on créé une nouvelle instance de la classe avec new.
    this.grid = grid;           // Grille du joueur (ce que le joueur voit / modifie)
    this.solution = solution;   // Grille solution (1 = rempli, 0 = vide)
  }

  isCellCorrect(r,c){ // Méthode qui vérifie qi le joueur à bon ou faux
    const val = this.grid.getCell(r,c); //vérifie si la valeur que le joueur a mise correspond à la solution
    if(val === CellState.UNKNOWN) return true; // CellState.UNKNOWN → la case n’est pas encore jouée, donc on ne la considère pas incorrecte.
    return val === this.solution[r][c]; //Retourne true si la case est correcte ou inconnue, false sinon (compare la grille joueur et la grille solution)
  }

  // Méthode qui vérifie si le puzzle entier est résolu
  isSolved(){ 
    for(let r=0; r<this.grid.rows; r++){ //Parcourt toutes les lignes et toutes les colonnes.
      for(let c=0; c<this.grid.cols; c++){
        if(!this.isCellCorrect(r,c)) return false; //Si une seule case est incorrecte, le puzzle n’est pas résolu → false.
      }
    }
    return true;//Si toutes les cases sont correctes ou inconnues, retourne true.
  }

  // Calcul des indices pour une ligne ou colonne
//Une méthode statique est une fonction attachée à la classe elle-même, et non pas à une instance de la classe.
//Elle ne peut pas accéder à this d’une instance (donc pas aux propriétés comme this.grid ou this.rows).
//Elle est utile pour des calculs ou utilitaires liés à la classe, mais qui n’ont pas besoin d’un objet concret.
  static computeClues(line){
    let clues=[], //tableau qui contiendra les indices calculés
    count=0; //compteur temporaire pour suivre combien de cases noires consécutives on a rencontrées
    for(let cell of line){ //Parcourt chaque case du tableau line
      if(cell === 1) count++;// Si la case est remplie (1) → on incrémente count
      else if(count > 0){// Si la case est vide (0) et qu’on avait commencé à compter un bloc (count > 0)
        clues.push(count); //On ajoute count à clues
        count = 0;//On réinitialise count à 0
      }
    }
    if(count > 0) clues.push(count);  // si le dernier bloc arrive en fin de ligne, on l'ajoute à clues
    return clues.length ? clues : [0]; // Si clues contient au moins un bloc → on le renvoie tel quel.
  } //Si la ligne ne contient aucun bloc rempli (clues.length === 0) → on retourne [0].

  // Méthode qui retourne un tableau avec les indices pour chaque ligne.
  getRowClues(){ return this.solution.map(row => PuzzleModel.computeClues(row)); } //map applique computeClues à chaque ligne de la solution.

  //Méthode qui renvoie un tableau de tableaux, où chaque sous-tableau contient les indices pour une colonne
  getColClues(){
    const clues=[]; //tableau qui va contenir les indices de toutes les colonnes.
    for(let c=0;c<this.grid.cols;c++){ //c → index de la colonne actuelle (0, 1, 2, …). Calcule des indices pour chaque colonne
      const col=[]; //tableau temporaire qui va contenir toutes les valeurs de la colonne actuelle.
      for(let r=0;r<this.grid.rows;r++) col.push(this.solution[r][c]); //On parcourt toutes les lignes r pour la colonne c.
      //this.solution[r][c] : valeur de la case à la ligne r et colonne c dans la solution. On ajoute ensuite chaque valeur dans col.
      clues.push(PuzzleModel.computeClues(col)); //computeClues(col) → calcule les blocs de cases remplies dans cette colonne et on ajoute ce résultat dans clues.
    }
    return clues;
  }
}
