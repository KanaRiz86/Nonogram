export const gifScoresRanges = [
  {
    min: 0,
    max: 49,
    gifs: [
      {
        src: "./gifs/lowscores/lost.gif",
        alt: "Score faible",
        message: "Oups... on dirait que cette grille t'a perdu."
      },
      {
        src: "./gifs/lowdscores/fail-whatever.gif",
        alt: "Petit score",
        message: "Courage, la prochaine sera meilleure."
      }
    ]
  },
  {
    min: 50,
    max: 79,
    gifs: [
      {
        src: "./gifs/midscores/not-bad.gif",
        alt: "Score moyen",
        message: "Pas mal du tout."
      }
    ]
  },
  {
    min: 80,
    max: 100,
    gifs: [
      {
        src: "./gifs/highscores/drop-mic.gif",
        alt: "Excellent score",
        message: "Là, c'est une masterclass."
      },
      {
        src: "./gifs/highscores/victoire.gif",
        alt: "Très bon score",
        message: "Propre. Très propre."
      }
    ]
  }
];

export function getRandomGifByScore(score) {
    const range = gifScoresRanges.find(range => score >= range.min && score <= range.max);

    if (!range || range.gifs.length === 0) {
        return null;
    }

    const randomIndex = Math.floor(Math.random() * range.gifs.length);
    return range.gifs[randomIndex];
}