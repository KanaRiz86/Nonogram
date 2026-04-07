<?php
session_start(); //NEW
require_once("../form/config.php");

// Lire les données JSON envoyées par JS
$data = json_decode(file_get_contents("php://input"), true);

// Sécurité
if (!$data) {
    echo "Erreur : aucune donnée reçue";
    exit;
}

//$id_user = $data['id_user'] ?? null; ANCIENNE METHODE
$id_user = $_SESSION['LOGGED_USER']['id_user']; //NEW
$id_image = $data['id_image'] ?? null;
$temps = $data['temps'] ?? null;
$erreurs = $data['erreurs'] ?? null;
$score_final = $data['score_final'] ?? null;

//  Vérification
if ($id_user === null) {
    echo "Erreur : id_user manquant";
    exit;
}

// Préparer la requête avec PDO
$stmt = $db->prepare("
    INSERT INTO scores (id_user, id_image, temps, erreurs, date_score, score_final)
    VALUES (?, ?, ?, ?, NOW(), ?)
");

// Execute avec les valeurs
$stmt->execute([
    $id_user,
    $id_image,
    $temps,
    $erreurs,
    $score_final
]);

echo "Score enregistré";