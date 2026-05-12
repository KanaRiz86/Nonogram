// Tranches de score utilisées pour choisir le GIF de fin de partie.
// Le score dépend de la taille de la grille et du temps de résolution.
// Scores maximum théoriques :
// 5x5   = 1300 points
// 10x10 = 2700 points
// 15x15 = 5300 points
//
// Tranches retenues pour la démo :
// 0 à 999      = score faible
// 1000 à 1999  = score moyen
// 2000 et plus = score élevé

const gifsParScore = [
  {
    scoreMin: 2000,
    scoreMax: Infinity,
    gifs: [
      "gif/Bryan_Cranston_Mic_Drop.gif"
    ]
  },
  {
    scoreMin: 1000,
    scoreMax: 1999,
    gifs: [
      "gif/victoire.gif"
    ]
  },
  {
    scoreMin: 0,
    scoreMax: 999,
    gifs: [
      "gif/The_Punisher_No.gif"
    ]
  }
];

export function choisirGifSelonScore(score) {
  const tranche = gifsParScore.find(item => score >= item.scoreMin && score <= item.scoreMax);

  if (!tranche) return null;

  const indexAleatoire = Math.floor(Math.random() * tranche.gifs.length);
  return tranche.gifs[indexAleatoire];
}