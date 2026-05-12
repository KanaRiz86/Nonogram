<?php
session_start();
?>

<!DOCTYPE html>
<html lang="fr">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nonogram adaptatif</title>
  <link rel="stylesheet" href="styles/web.css">
  <link rel="stylesheet" href="styles/popup.css">
</head>

<body>

  <h1>MÈMIX</h1>

<!------------------------------------------------------------------------------------------------>
<div class="zoneConnexion">
      <button id="btnConnexion" data-logged="<?php echo isset($_SESSION['LOGGED_USER']) ? 'true' : 'false'; ?>">
      <?php echo isset($_SESSION['LOGGED_USER']) ? 'Déconnexion' : 'Connexion'; ?>
</button>
</div>
<!------------------------------------------------------------------------------------------------>
<div id="gameTableau">
  <div id="game-container"></div>
<!------------------------------------------------------------------------------------------------>  
  <table id="tableau_score">
    <thead>
      <tr>
        <th>Rang</th>
        <th>Joueur</th>
        <th>Score</th>
      </tr>
    </thead>
    <tbody></tbody>
  </table>
</div>
<!---------------------------------------- Popup Gif ------------------------------------------------>
<!-- <div id="gif-score-container"></div> ancien display des gifs avec alert('Félicitations ...) -->

<div id="demo-gifs-container">

  <button data-score-demo="500">
    Démo score faible
  </button>

  <button data-score-demo="1500">
    Démo score moyen
  </button>

  <button data-score-demo="2500">
    Démo score élevé
  </button>

</div>

<!--------------------------------------------------------------------------------------------------->
  <div id="chronometre-container"></div>

  <div id="controls-container">
    <button id="nouvelle-partie">Nouvelle partie</button>
    <button data-size="5">5x5</button>
    <button data-size="10">10x10</button>
    <button data-size="15">15x15</button>
    <button id="Règles">Règles</button>
  </div>

  <!------------------------------------- Popup de connexion ---------------------------------------->
  <div class="popupBackground">
  <div class="popup" id="popupConnexion">
      <div>Connexion</div>
      <form action="traitement/connexion/submit_login.php" method="POST">
          <input type="text" id="nomConnexion" name="nom" placeholder="Pseudo" required>
          <input type="password" id="mdp" name="mdp" placeholder="Mot de passe" required>
    <button id="btnValiderConnexion" type="submit">Valider</button>
        <div class="flex-ligne">
          <a href="traitement/form/form.php" id="btnInscription">Inscription</a>
          <button id="btnMdpPerdu" type="button">Nouveau mot de passe</button>
        </div>
      </form>

    </div>

 <!-- Script pour ouvrir popup et gérer infobulles côté serveur -->
    <script type="module">
      import { initAddEventListenerPopup, afficherPopup, cacherPopup } from './js/controller/ControlPopup.js';

      // Initialisation des boutons popups
      initAddEventListenerPopup();

      // ------------------- Affichage alert succès Connexion et Déconnexion -------------------
      <?php if (isset($_SESSION['LOGIN_SUCCESS']) && $_SESSION['LOGIN_SUCCESS'] === true): ?>
          afficherPopup('popupConnexion');
          setTimeout(() => {
              alert('Connexion réussie ! Bienvenue, <?php echo $_SESSION['LOGGED_USER']['nickname']; ?> !');
              cacherPopup();
          }, 50);
          <?php unset($_SESSION['LOGIN_SUCCESS']); ?>
      <?php endif; ?>

    
      <?php if (isset($_SESSION['LOGOUT_SUCCESS']) && $_SESSION['LOGOUT_SUCCESS'] === true): ?>
          setTimeout(() => {
          alert('Déconnexion réussie ! À bientôt !');
          }, 50);
          <?php unset($_SESSION['LOGOUT_SUCCESS']); ?>
      <?php endif; ?>


      // ------------------- Gestion des erreurs serveur -------------------
      <?php if (isset($_SESSION['LOGIN_ERROR_MESSAGE'])): ?>
          afficherPopup('popupConnexion');
          const message = "<?php echo $_SESSION['LOGIN_ERROR_MESSAGE']; ?>";
          const inputNom = document.getElementById("nomConnexion");
          const inputMdp = document.getElementById("mdp");

          // Choisir le champ cible
          if (message.includes("Pseudo")) {
              inputNom.setCustomValidity(message);
              inputNom.reportValidity();
          } else {
              inputMdp.setCustomValidity(message);
              inputMdp.reportValidity();
          }

          // Efface l'erreur quand l'utilisateur tape
          inputNom.addEventListener("input", () => inputNom.setCustomValidity(""));
          inputMdp.addEventListener("input", () => inputMdp.setCustomValidity(""));

          <?php unset($_SESSION['LOGIN_ERROR_MESSAGE']); ?>
      <?php endif; ?>
    </script>

    <!-- Popup Changer mot de passe -->
<div class="popup" id="popupChangePassword">
  <div>Nouveau mot de passe</div>
  <form id="formChangePassword" method="POST" action="traitement/connexion/change_password.php">
    <input type="email" name="email" placeholder="Votre email" required>
    <input type="password" name="new_password" placeholder="Nouveau mot de passe" required>
    <input type="password" name="confirm_password" placeholder="Confirmez le nouveau mot de passe" required>
    <button type="submit">Changer le mot de passe</button>
  </form>
</div>
  <!------------------------------------- Popup d'Aide -------------------------------------------->
    <div class="popup" id="popupAide">
      <div>Nous contacter</div>
      <form>
        <input type="text" id="nomAide" name="nom" placeholder="Pseudo">
        <textarea placeholder="Votre message"></textarea>
        <button id="btnValiderMessage" type="button">Envoyer</button>
      </form>
    </div>
  </div>
  <!------------------------------------- Popup Règles -------------------------------------------->

  <div class="popup" id="popupRegles">
  <div>Règles du jeu</div>
  <div class="popup-content">
    <p>
      Le but de ce jeu est de découvrir une planche de cellules bleues et de cellules libres. Vous pouvez faire ceci en suivant les définitions des lignes et des colonnes – des séquences de nombres qui décrivent les groupes de cellules bleues apparaissant sur ces lignes et colonnes.
    </p>
    <ul>
      <li>Cliquez sur une case pour la remplir.</li>
      <li>Cliquez encore une fois afin de les marquer avec un X. Ceci vous permet de marquer les cellules que vous considérez comme vides.</li>
      <li>Cliquez une deuxième fois pour les ramener à leurs états initiaux.</li>
      <li>Le chronomètre calcule le temps de jeu et le score final.</li>
      <li>Vous pouvez recommencer une partie avec les boutons "Nouvelle Partie" "5x5", "10x10", ou "15x15".</li>
    </ul>
    <button id="btnFermerRegles">Fermer</button>
  </div>
</div>

  <!------------------------------------- Popup Score -------------------------------------------->
<div class="popup" id="popupScore">
  <div>Résultat de la partie</div>

  <div class="popup-content">
    <p id="message-score"></p>

    <img id="gif-score" src="" alt="GIF de score">

    <button id="btnFermerScore" type="button">Fermer</button>
  </div>
</div>

  <!------------------------------------------------------------------------------------------------>
 <div class="zoneAide">
    <button>Aide</button>
  </div>
  <!------------------------------------------------------------------------------------------------>

  <script type="module" src="js/controller/ControlPopup.js"></script>
  <script type="module" src="js/main/main.js"></script>

  
</body>

</html>