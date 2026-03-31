//Puzzle fournit des méthodes pour vérifier si une cellule ou le puzzle entier est correct.
//Il calcule les indices pour chaque ligne et chaque colonne, nécessaires pour le jeu.

import { ValeurCell } from "./ValeurCell.js";

export class Puzzle {
  constructor(grille, solution){
    this.grille = grille;       // Grille du joueur (ce que le joueur voit / modifie)
    this.solution = solution;   // Grille solution (1 = rempli, 0 = vide)
  }

//===========================================Solution=================================================

  // Méthode qui vérifie si le joueur à bon ou faux lorsqu'il coche une cellule
  verifCellule(ligne, colonne) {
  const valeur = this.grille.getCellule(ligne, colonne);
  
  // Case hors solution
  if (!this.solution[ligne] || this.solution[ligne][colonne] === undefined) return false; //Si la ligne n’existe pas ou si la colonne n’existe pas dans cette ligne : la cellule n’est pas correcte, retourne false.

  const valeurSolution = this.solution[ligne][colonne] ? ValeurCell.REMPLIE : ValeurCell.VIDE;
  return valeur === valeurSolution;
}

  // Méthode qui vérifie si le puzzle entier est résolu
  estResolu(){ 
    for(let ligne=0; ligne<this.grille.lignes; ligne++){ 
      for(let colonne=0; colonne<this.grille.colonnes; colonne++){
        if(!this.verifCellule(ligne,colonne)) 
          return false; //Si une seule cellule est incorrecte, le puzzle n’est pas résolu
      }
    }
    return true;//Si toutes les cellules sont correctes ou inconnues, retourne true.
  }

//=====================================Calcul des indices==============================================

//Une méthode statique est une fonction attachée à la classe elle-même, et non pas à une instance de la classe.
  static calculIndices(serie){
    let indices=[], // Tableau qui va contenir la taille de chaque blocs de cellules remplies
    tailleBloc=0; //compteur pour suivre combien de cellules consécutives on étés remplies
    for(let cellule of serie){ // on parcourt chaque cellule de la série (ligne ou colonne)
      if(cellule === 1) 
        tailleBloc++; // Si la case est remplie, on augmente le compteur 
      else if(tailleBloc > 0){ // Si la case est vide (0) ET qu'on avait commencé un bloc
        indices.push(tailleBloc); // le bloc est terminé, on l'ajoute à indices
        tailleBloc = 0; //On réinitialise le compteur pour le prochain bloc
      }
    }
    if(tailleBloc > 0) 
      indices.push(tailleBloc);  // si le dernier bloc arrive en fin de ligne, on l'ajoute à indices
    return indices.length ? indices : [0]; // Si au moins un bloc a été trouvé, on renvoie indices. Sinon, si la ligne est totalement vide, on renvoie [0]
  }

// Méthode qui retourne un tableau avec les indices pour chaque ligne.
  getLigneIndices() {
  let indicesParLigne = [];
  for (let ligneActuelle of this.solution) { //pour chaque élément du tableau, appelle-le x dans ce bloc
    let indicesLigne = Puzzle.calculIndices(ligneActuelle);
    indicesParLigne.push(indicesLigne);
  }
  return indicesParLigne;
}

//Méthode qui renvoie un tableau de tableaux, où chaque sous-tableau contient les indices pour une colonne
  getColonneIndices(){
    let indicesParColonnes=[];
    for(let indexColonne=0;indexColonne<this.grille.colonnes;indexColonne++){ //index de la colonne actuelle (0, 1, 2, …)
      let colonneActuelle=[]; //tableau temporaire qui va contenir toutes les valeurs de la colonne actuelle.
      for(let indexLigne=0;indexLigne<this.grille.lignes;indexLigne++) 
        colonneActuelle.push(this.solution[indexLigne][indexColonne]); 
      indicesParColonnes.push(Puzzle.calculIndices(colonneActuelle));
    }
    return indicesParColonnes;
  }
}