// Initialise un chronomètre pour une partie

export class Temps {
  
  constructor(puzzle) {
    this.puzzle = puzzle;      // Le puzzle associé à cette partie
    this.tempsDebut = null;    
    this.tempsFin = null;     
  }

  // Démarre le chronomètre
  demarrer() {
    this.tempsDebut = Date.now();  // On prend le temps actuel
    this.tempsFin = null;          // Réinitialisation de la fin de partie
  }

  // Arrête le chronomètre
  terminer() {
    this.tempsFin = Date.now();    // On prend le timestamp actuel comme fin
  }

  // Renvoie le temps écoulé en millisecondes
  obtenirTempsEcoule() {
    if (!this.tempsDebut) 
      return 0; // Si la partie n'a jamais commencé, on renvoie 0
    // Si la partie est en cours, on prend le temps actuel, sinon on prend le temps de fin
    return (this.tempsFin ?? Date.now()) - this.tempsDebut;
  }
}
