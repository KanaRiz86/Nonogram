export default class GifScoreView {
  constructor(container, imageElement, textElement) {
    this.container = container;
    this.imageElement = imageElement;
    this.textElement = textElement;
  }

  showGif(gifData) {
    if (!gifData) return;

    this.imageElement.src = gifData.src;
    this.imageElement.alt = gifData.alt || "Réaction au score";
    this.textElement.textContent = gifData.message || "";

    this.container.classList.remove("hidden");
  }

  hideGif() {
    this.imageElement.src = "";
    this.imageElement.alt = "";
    this.textElement.textContent = "";
    this.container.classList.add("hidden");
  }
}