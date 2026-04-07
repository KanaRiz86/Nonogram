<?php
session_start();
require_once("../form/config.php"); // connexion à la base $db

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = trim($_POST['email']);
    $new = $_POST['new_password'];
    $confirm = $_POST['confirm_password'];

    // Vérification du mot de passe
    if ($new !== $confirm) {
        $_SESSION['RESET_PASS_ERROR'] = "Le nouveau mot de passe et sa confirmation ne correspondent pas.";
        header("Location: ../../index.php");
        exit;
    }

    // Vérifier si l'utilisateur existe
    $stmt = $db->prepare("SELECT id_user FROM users WHERE email = ?");
    $stmt->execute([$email]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$user) {
        $_SESSION['RESET_PASS_ERROR'] = "Email introuvable.";
        header("Location: ../../index.php");
        exit;
    }

    // Mettre à jour le mot de passe
    $hash = password_hash($new, PASSWORD_DEFAULT);
    $stmt = $db->prepare("UPDATE users SET password = ? WHERE email = ?");
    $stmt->execute([$hash, $email]);

    $_SESSION['RESET_PASS_SUCCESS'] = "Mot de passe changé avec succès ! Vous pouvez maintenant vous connecter.";
    header("Location: ../../index.php");
    exit;
}
?>