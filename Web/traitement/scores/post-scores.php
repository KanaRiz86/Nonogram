<?php
// On va récupérer la BDD
require_once("../form/config.php");

// Récupère les 5 meilleurs scores avec le nom du joueur
$sql = "
SELECT users.nickname, scores.score_final 
FROM scores
JOIN users ON scores.id_user = users.id_user
ORDER BY scores.score_final DESC
LIMIT 5
";

try {
    // Variable qui contient la requête préparée
    $stmt = $db->query($sql);
    // Variable qui contient les données de la requête sous forme de tableau associatif.
    $scores = $stmt->fetchAll(PDO::FETCH_ASSOC);
    // Renvoie les scores en JSON
    echo json_encode($scores);
} catch (PDOException $e) {
    // Envoie un code HTTP 500 pour indiquer qu'une erreur s'est produite côté serveur
    http_response_code(500);
    // Envoie un message d'erreur détaillé
    echo json_encode(['error' => 'Erreur lors de la récupération des scores : ' . $e->getMessage()]);
}