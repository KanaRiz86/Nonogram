//main.js est reponsable de la création du modèle, de la vue et du contrôleur. Il est aussi en charge de lancer et relancer une partie.
import { GrilleJoueur } from "./model/GrilleJoueur.js"; //Import de la grille joueur
import { Puzzle } from "./model/Puzzle.js"; //Import du puzzle(solution + indices)
import { Interface } from "./view/Interface.js"; //Import de la vue
import { Controleur } from "./controller/Controleur.js"; //Import du contrôleur
import { Temps } from "./model/Temps.js";


// ===================== Génération aléatoire de la solution // =====================

function generationSolutionAleatoire(lignes, colonnes) {
  const solution = [];
  for (let i = 0; i < lignes; i++) {
    const ligneSolution = [];
    for (let j = 0; j < colonnes; j++) {
      ligneSolution.push(Math.random() < 0.5 ? 1 : 0); //Génère un nombre décimal aléatoire entre 0 (inclus) et 1 (exclu), 50% de chance d'être true ou false
    } //Si le nombre est inférieur à 0.5, le résultat est 1, sinon le résultat est 0
    solution.push(ligneSolution);
  }
  return solution;
}

// ===================== Fonction qui lance une partie // =====================

let intervalID = null; // pour suivre le setInterval du chrono

function demarrerJeu(lignes, colonnes) {

  chargerTopScores(); // Charge les 5 scores du tableau

  // Si un ancien intervalle existe, on l'arrête
  if (intervalID !== null) {
    clearInterval(intervalID);
  }

  // Création de la grille du joueur
  const grilleJoueur = new GrilleJoueur(lignes, colonnes);
  // console.log("Grille joueur :");
  // console.log(grilleJoueur.cellules);

  // Génération de la solution aléatoire
  const solution = generationSolutionAleatoire(lignes, colonnes);
  console.log("Solution du puzzle :");
  console.log(solution);

  // Création du puzzle (grille du joueur + solution)
  const puzzle = new Puzzle(grilleJoueur, solution);

  // Création de la vue
  const container = document.getElementById("game-container");
  const interfaceJeu = new Interface(container, puzzle);

  // Création du contrôleur qui gère les interactions entre le modèle et la vue"
  const controleur = new Controleur(puzzle, interfaceJeu);

  // Création du chronomètre
  const chrono = new Temps(puzzle);
  chrono.demarrer();

  //Affiche le chrono à 00:00
  interfaceJeu.afficherChrono(chrono.obtenirTempsEcoule());

  //Mise à jour du chrono toutes les secondes
   intervalID = setInterval(() => {
     interfaceJeu.afficherChrono(chrono.obtenirTempsEcoule());
   }, 1000);

// ====================== Fonction permettant de calculer le score // ================================
  
  function calculScore(temps, tailleGrille, erreurs) {
    // création de la variable pour accorder des points fixes de victoire selon la taille de la grille
    let pointsFixes;
    // création de la variable pour accorder un coefficient selon la taille de la grille
    let coefficient;

    switch (tailleGrille) {
        case 5:
            pointsFixes = 100;
            coefficient = 1;
            break;
        case 10:
            pointsFixes = 300;
            coefficient = 2;
            break;
        case 15:
            pointsFixes = 500;
            coefficient = 4;
            break;
        default:
            pointsFixes = 0;
            coefficient = 1;
    }
    // Variable de type constante basé sur 20 minutes (soit 1200 secondes)
    const tempsMax = 1200;
    // Math.max permet de prendre la plus grande valeur
    // Dans notre cas : tempsMax - temps = 1200 - 1500 (si le joueur finit la grille en 25 minutes)
    // Intervient alors Math.max(0, -300) --> Résultat = 0
    // 0 * coefficient = 0 , ça évite tout résultat négatif
    const bonusTemps = Math.max(0, tempsMax - temps) * coefficient;
    // 2 erreurs * 20 = 40 points
    const penalite = erreurs * 20;
    // Même procédé admettons grille 10*10 réalisée en 10 min
    // 300 + ((1200 - 600)*2) - 40 = 300 + (600*2) -40 = 1500 - 40 = 1460
    return Math.max(0, pointsFixes + bonusTemps - penalite);
  }

// ============================ Envoie le score en JSON à PHP // ===========================================

  function envoyerScore(id_user, id_image, temps, erreurs, tailleGrille) {
    // Création de la variable qui prends le score calculer dans la fonction calculScore
    const scoreFinal = Math.floor(calculScore(temps, tailleGrille, erreurs));
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
    fetch('../Web/ScoreSauvegarder.php', {
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

  // Formate la première colonne du tableau "Rang"
  function formaterRang(rang) {
      switch (rang) {
          case 1: return "1er";
          case 2: return "2eme";
          case 3: return "3eme";
          case 4: return "4eme";
          case 5: return "5eme";
          default: return ""; // Ne devrait jamais arriver (car LIMIT 5 en SQL)
      }
  }

  // Permet de charger les 5 meilleurs scores
  function chargerTopScores() {
    // Utilisation de l'API Fetch pour envoyer les données au serveur PHP via une requête HTTP POST
    // L'URL est le chemin vers le script PHP qui va traiter et charger le score dans la BDD
    fetch('../Web/PostScores.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Aucun corps de requête envoyé mais s'il y en avait un il serait au format JSON
      },
    })
    // Traitement de la réponse retourné par le serveur, contenant : le statut HTTP , les en-têtes et le corps de la réponse
    .then(res => res.json())
    // Traitement des données retourné par le serveur
    .then(data => {
      // Vide le tableau actuel
      const tbody = document.querySelector("#tableau_score tbody");
      tbody.innerHTML = "";

      // Création des lignes et cellules du tableau
      data.forEach((score, index) => {
          const tr = document.createElement("tr");

          // Création d'une constante pour les cellules "Rang"
          const tdRang = document.createElement("td");
          tdRang.textContent = formaterRang(index + 1); // index + 1 car les rangs commencent à 1 et en JS ça commence à 0 par défaut
          // Création d'une constante pour les cellules "Nom"
          const tdNom = document.createElement("td");
          tdNom.textContent = score.nickname;
          // Création d'une constante pour les cellules "Score"
          const tdScore = document.createElement("td");
          tdScore.textContent = Math.floor(score.score_final);

          // Ajout des cellules à la ligne
          tr.appendChild(tdRang);
          tr.appendChild(tdNom);
          tr.appendChild(tdScore);
          // Ajout de ligne au tableau
          tbody.appendChild(tr);
      });
    })
    .catch(err => {
      console.error("Erreur lors du chargement des scores :", err);
      alert("Erreur lors du chargement des scores. Veuillez réessayer.");
    });
  }

// ===================================== FIN DE PARTIE // ============================================

  // Arrêter le chrono quand la partie est terminée
  controleur.definirFinDePartie(() => { // callback [voir Controleur.js]
    chrono.terminer();
    clearInterval(intervalID);

    const temps = Math.floor(chrono.obtenirTempsEcoule()/1000); // Diviser par 1000 pour avoir des secondes (pas des ms)
    const erreurs = 0; //////////////////////////////////// changer les valeurs de ces constantes pour que ça s'adapte à l'utilisateur connecté
    const id_user = 2; ///////////////////////////////////// idem
    const id_image = 1; /////////////////////////////////// est-ce qu'on garde ça ?
    const tailleGrille = lignes; // Permet de savoir la taille de la grille

    const scoreFinal = Math.floor(calculScore(temps, tailleGrille, erreurs));

    // Appelle de la fonction pour envoyer les données du score au serveur PHP via Fetch
    envoyerScore(id_user, id_image, temps, erreurs, tailleGrille);
    
    alert(`Félicitations ! Vous avez obtenu un score de : ${scoreFinal}`);
    
    // Exécute la fonction chargerTopScores après 500 ms
    // Permet d'éviter des conflits avec ScoreSauvegarder.php le fichier met du temps à répondre
    setTimeout(chargerTopScores, 500);
  });
}

//Lancement initial
demarrerJeu(5, 5);

// Bouton "Nouvelle partie"
document.getElementById("nouvelle-partie").addEventListener("click", function () {
  demarrerJeu(5, 5);
});

// ===================== Boutons // =====================

const boutons = document.querySelectorAll("#controls-container button[data-size]");
boutons.forEach(bouton => {
  bouton.addEventListener("click", () => {
    const taille = Number(bouton.dataset.size);
    demarrerJeu(taille, taille);
  });
});