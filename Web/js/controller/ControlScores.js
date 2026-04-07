import { formaterRang } from "../view/TableauScores.js";
import { calculScore } from "../model/scores.js";
import GifScoreView from "../view/GifScore.js";
import { getRandomGifByScore } from "../model/CatalogGif.js";
// ============================ Envoie le score en JSON à PHP // ===========================================

export function envoyerScore(id_user, id_image, temps, erreurs, tailleGrille) {
  // Création de la variable qui prends le score calculer dans la fonction calculScore
  //const scoreFinal = Math.floor(calculScore(temps, tailleGrille, erreurs));
  const scoreFinal = 0;
  console.log("Score test :", scoreFinal);
  // ==================== GIF lié au score ====================
  const gifContainer = document.getElementById("gif-score-container");
  const gifImage = document.getElementById("gif-score-image");
  const gifText = document.getElementById("gif-score-text");

  if (gifContainer && gifImage && gifText) {
    const gifScoreView = new GifScoreView(gifContainer, gifImage, gifText);
    const gifData = getRandomGifByScore(scoreFinal);
    gifScoreView.showGif(gifData);
  }
  // =========================================================

  // Création de la variable qui va enregistrer les données pour les envoyer au script PHP
  const data = {
    id_user,
    id_image,
    temps,
    erreurs,
    score_final: scoreFinal
  };
  // Utilisation de l'API Fetch pour envoyer les données au serveur PHP via une requête HTTP POST
  // L'URL est le chemin vers le script PHP qui va traiter et sauvegarder le score dans la BDD
  fetch('../Web/traitement/scores/score-sauvegarder.php', {
    method: 'POST', // Type de requête
    headers: {
      'Content-Type': 'application/json' // Type de contenu : JSON
    },
    body: JSON.stringify(data) // Corps de la requête : les données converties (en chaînes de caractères) en JSON
  })

    // Ce bloc de commentaire sert pour voir d'où peut provenir l'erreur pendant le développement via la console
    // Dans notre cas précis, il n'est pas précis car notre Fetch sert uniquement à sauvegarder un score
    //
    // .then(res => {
    //     console.log("STATUS :", res.status);
    //     return res.text();
    // })
    // .then(data => console.log("RÉPONSE PHP :", data))

    .catch(err => {
      console.error("Erreur :", err);
      alert("Une erreur est survenue lors de l'enregistrement du score. Veuillez réessayer plus tard.");
    });
}

// Permet de charger les 5 meilleurs scores
export function chargerTopScores() {
  // Utilisation de l'API Fetch pour envoyer les données au serveur PHP via une requête HTTP POST
  // L'URL est le chemin vers le script PHP qui va traiter et charger le score dans la BDD
  fetch('../Web/traitement/scores/post-scores.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json', // Aucun corps de requête envoyé mais s'il y en avait un il serait au format JSON
    },
  })
    // Traitement de la réponse retourné par le serveur, contenant : le statut HTTP , les en-têtes et le corps de la réponse
    .then(res => res.json())
    // Traitement des données retourné par le serveur
    .then(data => {

      if (!Array.isArray(data)) {
        throw new Error("La réponse JSON n'est pas un tableau : " + JSON.stringify(data));
      }

      // Vide le tableau actuel
      const tbody = document.querySelector("#tableau_score tbody");
      tbody.innerHTML = "";

      // Création des lignes et cellules du tableau
      data.forEach((score, index) => {
        const tr = document.createElement("tr");

        // Création d'une constante pour les cellules "Rang"
        const tdRang = document.createElement("td");
        tdRang.textContent = formaterRang(index + 1);

        // Création d'une constante pour les cellules "Nom"
        const tdNom = document.createElement("td");
        tdNom.textContent = score.nickname;

        // Création d'une constante pour les cellules "Score"
        const tdScore = document.createElement("td");
        tdScore.textContent = score.score_final !== null ? Math.floor(score.score_final) : "-";

        // Ajout des cellules à la ligne
        tr.appendChild(tdRang);
        tr.appendChild(tdNom);
        tr.appendChild(tdScore);

        // Ajout de la ligne au tableau
        tbody.appendChild(tr);
      });
    })
    .catch(err => {
      console.error("Erreur lors du chargement des scores :", err);
      alert("Erreur lors du chargement des scores. Veuillez réessayer.");
    });
}