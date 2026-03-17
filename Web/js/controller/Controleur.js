
// Le controller fait le lien entre le modèle et la vue : Il reçoit les clics et met à jour le modèle.

export class Controleur {
  constructor(puzzle, vue) {
    this.puzzle = puzzle;
    this.vue = vue;

    // On relie le clic sur une cellule à la fonction handleCellClick - bind(this) permet de garder le contexte du contrôleur
    this.vue.gererClicCellule(this.handleCellClick.bind(this));

     this.finDePartieCallback = null;

    // Premier rendu
    this.vue.rendu();
  }

    definirFinDePartie(callback) {
    this.finDePartieCallback = callback;
  }

  // Quand l'utilisateur clique sur une case
  handleCellClick(ligne, colonne) {
    // Vérification stricte des limites
    if (
      ligne < 0 || ligne >= this.puzzle.grille.lignes ||
      colonne < 0 || colonne >= this.puzzle.grille.colonnes
    ) {
      
      return;
    }

    const etatActuel = this.puzzle.grille.getCellule(ligne, colonne);
    // Cycle vide puis remplie puis inconnue
    const etatSuivant = (etatActuel + 1) % 3;
    this.puzzle.grille.setCellule(ligne, colonne, etatSuivant);
    
    console.log(this.puzzle.grille.cellules);

    this.vue.rendu();

    // Vérifie si le puzzle est résolu
if (this.puzzle.estResolu() && this.finDePartieCallback) {
  this.finDePartieCallback();
}
  }
}