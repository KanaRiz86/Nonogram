
// Le controller fait le lien entre le modèle et la vue :
//Il ne sait pas comment dessiner (c’est la vue qui fait ça)
//Il ne connaît pas la logique de calcul des indices (c’est le modèle qui fait ça)
//Il reçoit les clics et met à jour le modèle.

export default class GameController {
  constructor(puzzle, view){
    this.puzzle = puzzle;
    this.view = view;

    // Abonne la fonction handleCellClick aux clics
    this.view.bindCellClick(this.handleCellClick.bind(this));

    // Premier rendu
    this.view.render(this.puzzle);
  }

  // Quand l'utilisateur clique sur une case
  handleCellClick(r,c){
    const current = this.puzzle.grid.getCell(r,c);
    
    // Cycle : EMPTY-> FILLED -> UNKNOW
    const next = (current + 1) % 3;
    this.puzzle.grid.setCell(r,c,next);

    // Met à jour l'affichage
    this.view.render(this.puzzle);

    //Voir la grille évoluer directement dans la console
    console.log(this.puzzle.grid.cells);
  }
}
