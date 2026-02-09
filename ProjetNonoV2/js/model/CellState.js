
// Définit les trois états possibles d'une case du nonogram

export const CellState = Object.freeze({ 
  // export de l'objet pour qu'il puisse être réutilisé dans d'autres scripts
  EMPTY: 0,    // Case vide
  FILLED: 1,   // Case remplie (noire)
  UNKNOWN: 2   // Case indéterminée (croix)
});


//La méthode Object.freeze() permet de geler un objet, 
// c'est-à-dire qu'on empêche d'ajouter de nouvelles propriétés, 
// de supprimer ou d'éditer des propriétés existantes, 
// y compris en ce qui concerne leur caractère énumérable, 
// configurable ou pour l'accès en écriture. L'objet devient ainsi immuable.