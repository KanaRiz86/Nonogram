export default class AffichageGifScore {
  constructor(conteneur) {
    this.conteneur = conteneur;
  }

  afficherGif(cheminGif) {
    if (!cheminGif || !this.conteneur) return;

    this.conteneur.innerHTML = `
      <div class="popup-gif-score">
        <img src="${cheminGif}" alt="GIF de score">
      </div>
    `;
  }

  vider() {
    if (!this.conteneur) return;
    this.conteneur.innerHTML = "";
  }
}