<?php

// Reprend la session en cours en fonction d'un identifiant de session ($_SESSION) transmis via la requête POST
session_start();
// Relis le contenu du fichier
include_once 'function.php';
include_once 'config.php';

// Initialisation des 3 variables
$postData = $_POST;
$errors = [];
$success = [];

// isset vérifie si la variable $postdata existe
if(isset($postData)){
    // Vérification si les champs ont été remplis
    if(notEmpty(['email','nickname','password','confirmPassword'])){

        // Vérification des variables et trim retire les espaces accidentelles.
        $email = trim($postData['email']);
        $nickname = trim($postData['nickname']);
        $password = $postData['password'];
        $confirmPassword = $postData['confirmPassword']; 

        // Vérification de la variable email
        if(invalidEmail($email)){
            $errors[] = 'Adresse email incorrect';
        }

        // Vérification si la variable $nickname à au moins 4 caractères
        if(verifLength($nickname, 4)){
            $errors[] = 'Pseudo trop court, 4 caractères minimum.';
        }

        // Vérification si la variable $password à au moins 12 caractères
        if(verifLength($password, 12)){
            $errors[] = 'Mot de passe trop court, 12 caractères minimum.';
        }

        // Vérification si les mots de passe sont identiques
        if($password != $confirmPassword){
            $errors[] = 'Les mots de passe ne sont pas identiques';
        }

        // Vérification si le bouton radio a été coché
        if(!isset($_POST['accept'])){
            $errors[] = "Vous devez accepter que vos informations soient stockées.";
        }

        // Vérifier si email / pseudo existent déjà
        $req = $db->prepare('SELECT email, nickname FROM users WHERE email = :email OR nickname = :nickname');
        $req->execute([
            ':email' => $email,
            ':nickname' => $nickname
        ]);

        $user = $req->fetch(PDO::FETCH_ASSOC);

        if($user){
            // Vérification couple email/pseudo
            if($user['email'] === $email && $user['nickname'] === $nickname){
                $errors[] = "⚠️Un compte avec cet email et ce pseudo existe déjà, veuillez vous connecter.⚠️";

            }
            // Vérification email
            elseif($user['email'] === $email){
                $errors[] = "Cet email est déjà utilisé, veuillez en utiliser un nouveau !👻";
            }
            // Vérification pseudo
            elseif($user['nickname'] === $nickname){
                $errors[] = "Ce pseudo est déjà utilisé, merci d'en choisir un autre !💩";
            }
        }

        // Si, il n'y a pas d'erreurs, ajout à la BDD
        if(count($errors) == 0){
            // Hash du mot de passe avec Bcrypt
            $hashedPassword = password_hash($password, PASSWORD_BCRYPT);
            // Insertion dans la table users 
            // $req pour pour établir la requête sql
            $req = $db->prepare('INSERT INTO users(email, nickname, password) VALUES (:email, :nickname, :password)');

            $req->execute(([
                ':email' => $email,
                ':nickname' => $nickname,
                ':password' => $hashedPassword,
            ]));

            $success[] = 'Félicitations, compte créé ! 🎉';
        }

    }
    else{
        $errors[] = 'Veuillez remplir tous les champs.';
    }
}

// Stockage dans la session
$_SESSION['errors'] = $errors;
$_SESSION['success'] = $success;
// Conserve les champs pré-remplis en cas d'erreur (pour des notions de sécurité on ne conserve pas le password)
$_SESSION['preserve'] = [
    'email' => $email,
    'nickname' => $nickname,
];


// Redirection  ----> PROCHAINEMENT : index.html (voir fichier de Fabien)
header('Location: form.php');
// Termine le script en cours avec un code d'état
exit;

?>