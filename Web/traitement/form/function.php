<?php

// Vérification si les champs ont été remplis
function notEmpty(array $fields){
    // Boucle de vérification pour chaques champs
    foreach($fields as $field){
        if(empty($_POST[$field])){
            return false;
        }
    }
    // Retourne TRUE si tous les champs sont remplis
    return true; 
}


// Vérification de l'email
function invalidEmail($email) {
    // avec le ! ça return TRUE si l'email est invalide et FALSE si l'email est valide
    return !filter_var($email, FILTER_VALIDATE_EMAIL);
}


// Vérification de la taille des variables
function verifLength($string, $minLength){
    return strlen($string) < $minLength;
}