<?php
session_start();
require_once("../form/config.php");

// Récupération des données du formulaire
$nickname = isset($_POST['nom']) ? trim($_POST['nom']) : '';
$password = isset($_POST['mdp']) ? $_POST['mdp'] : '';

if ($nickname === '' || $password === '') {
    $_SESSION['LOGIN_ERROR_MESSAGE'] = 'Veuillez remplir tous les champs.';
    header('Location: ../../index.php'); // Retour au jeu
    exit;
}

// Requête pour trouver l'utilisateur par pseudo (nickname)
$stmt = $db->prepare("SELECT id_user, nickname, email, password FROM users WHERE nickname = :nickname");
$stmt->execute(['nickname' => $nickname]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$user) {
    $_SESSION['LOGIN_ERROR_MESSAGE'] = 'Pseudo non trouvé.';
    header('Location: ../../index.php'); // Retour au jeu
    exit;
}

// Vérification du mot de passe
$passwordOk = false;
if (substr($user['password'], 0, 4) === '$2y$') {
    // mot de passe hashé
    $passwordOk = password_verify($password, $user['password']);
} else {
    // mot de passe en clair (anciens comptes)
    $passwordOk = $password === $user['password'];
}

if (!$passwordOk) {
    $_SESSION['LOGIN_ERROR_MESSAGE'] = 'Mot de passe incorrect.';
    header('Location: ../../index.php'); // Retour au jeu
    exit;
}

// Connexion réussie : stocker l’utilisateur en session
$_SESSION['LOGGED_USER'] = [
    'nickname' => $user['nickname'],
    'id_user' => $user['id_user'],
    'email' => $user['email'],
];

// Message de succès
$_SESSION['LOGIN_SUCCESS'] = true;

// Redirection vers la page du jeu
header('Location: ../../index.php');
exit;