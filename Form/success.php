<?php
//Si tous les champs ont été remplis correctement
if(!empty($_SESSION['success'])) { ?>
    <div class="success">
        <!-- Boucle pour afficher le message de validation d'inscription -->
        <? foreach($_SESSION['success'] as $msg) { ?>
            <p class="msgSuccess"><?= $msg; ?></p>
        <? } ?>
    </div>
<? } ?>

<!-- Destruction de la variable success -->
<?
unset($_SESSION['success']);
?>