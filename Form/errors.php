<?php
// S'il existe une ou plusieurs erreurs, permet de les afficher
if (!empty($_SESSION['errors'])) { ?>
    <div class="errors">
        <!-- Boucle pour afficher chaque erreur -->
        <? foreach ($_SESSION['errors'] as $error) { ?>
            <p class="msgError"><?= $error; ?></p>
        <? } ?>
    </div>
<? } ?>

<!-- Destruction de la variable errors -->
<?
unset($_SESSION['errors']);
?>