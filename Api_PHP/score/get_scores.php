<?php
require_once("../config/config.php");

try {
    $sql = "SELECT id_score, id_user, id_image, temps, erreurs, date_score
            FROM scores
            ORDER BY temps ASC";

    $stmt = $pdo->prepare($sql);
    $stmt->execute();

    $scores = $stmt->fetchAll(PDO::FETCH_ASSOC);

    header('Content-Type: application/json');
    echo json_encode($scores);

} catch(PDOException $e) {
    header('Content-Type: application/json');
    echo json_encode(["error" => $e->getMessage()]);
}
?>