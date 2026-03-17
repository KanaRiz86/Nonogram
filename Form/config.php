<?php

$user = 'root';
// Il se peut que d'un serveur à l'autre (MAMP/WAMP/LAMP) le $pwd soit comme ça : ''
$pwd = 'root';

// Création de la variable concernant la BDD
try{
    $db = new PDO('mysql:host=localhost;dbname=nonogramme_db;charset=utf8', $user, $pwd);
}
catch (PDOException $e)
{
    // On affiche le message d'erreur
    print "Erreur :" . $e->getMessage();
    // On arrête tout le programme
    die;
}