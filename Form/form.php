<?php
// Reprend la session en cours en fonction d'un identifiant de session ($_SESSION) transmis via la requête POST
session_start();
include_once 'function.php';
?>

<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="../styles/form.css" rel="stylesheet">
    <title>Document</title>
</head>

<body>
    <h1>Formulaire d'inscription</h1>
    <?php
    include_once 'errors.php';
    include_once 'success.php';
    ?>
    <!-- SECTION formulaire -->
    <section>
        <form method="POST" action="traitement.php">
            <p class="obligation">Tous les champs doivent obligatoirement être remplis.</p>
            <!-- encadrement de la première zone du formulaire -->
            <fieldset>
                <!-- titre du fieldset -->
                <legend>Information personnelle</legend>
                <div class="email">
                    <!-- le for fait référence à l'id dans le input et -->
                    <label for="email">Votre email :</label>
                    <!-- autofocus : met directement le curseur sur le champ voulu 1 max / page
                        et le required oblige l'utilisateur à remplir ce champ -->
                    <input type="email" name="email" id="email" placeholder="Ex : toto.lavedette@gmail.com" size="30" value="<?= isset($_SESSION['preserve']['email']) ? htmlspecialchars($_SESSION['preserve']['email']) : '' ?>" autofocus required>
                </div>
            </fieldset>
            <!-- encadrement de la deuxième zone du formulaire -->
            <fieldset>
                <legend>Vos informations de connexion</legend>
                <div class="informations">
                    <label for="nickname">Votre pseudo :</label>
                    <!-- Dans la value, c'est pour retrouver la variable (si elle existe), ça permet à l'utilisateur d'éviter de remplir ce champ en cas d'erreur -->
                    <input type="text" name="nickname" id="nickname" placeholder="Ex : Toto" minlength="4" value="<?= isset($_SESSION['preserve']['nickname']) ? htmlspecialchars($_SESSION['preserve']['nickname']) : '' ?>" maxlength="12" required>

                    <label for="password">Votre mot de passe :</label>
                    <input type="password" name="password" id="password" placeholder="12 caractères minimum" minlength="12" required>

                    <label for="confirmPassword">Veuillez saisir à nouveau votre mot de passe :</label>
                    <input type="password" name="confirmPassword" id="confirmPassword" placeholder="12 caractères minimum" minlength="12" required>
                </div>
            </fieldset>

            <div class="accept">
                <input type="radio" name="accept" value="accept" id="accept" required>
                <label for="accept"> J'accepte que les informations de mon inscription soient stockées à des fins académiques.</label>
            </div>
            <!-- <button class="submit_btn" type="submit">Envoyer le formulaire</button> est une autre possibilitée -->
            <input class="submit_btn" type="submit" value="Envoyer le formulaire" />
        </form>
        <!-- Fin de section du formulaire -->
    </section>
    <?php
    // Supprime les anciennes valeurs après affichage pour éviter qu'elles persistent
    if (isset($_SESSION['preserve'])) {
        unset($_SESSION['preserve']);
    }
    ?>
</body>

</html>