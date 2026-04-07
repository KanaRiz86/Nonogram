<?php
session_start();

// Récupérer les données de session si tu veux les utiliser avant destruction
$user = $_SESSION['LOGGED_USER'] ?? null;

// Détruire la session (tout sauf le message)
session_destroy();

// Relancer une nouvelle session pour stocker le message
session_start();
$_SESSION['LOGOUT_SUCCESS'] = true;

// Redirection
header("Location: ../../index.php");
exit;