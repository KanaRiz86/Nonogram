/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package model;

// Classe qui permet de créer un administrateur

public class Admin {
    public static String id_admin; // Identifiant de l'administrateur
    public static String mdp_admin; // Mot de passe de l'administrateur
    public static boolean isAdmin = false; // Statut : est-ce un admin ou pas (par défaut : non)
    

    // Constructeur par défaut (sans paramètre)
    public Admin() {
    }

    
    //Getters et Setters//
    
    
    // Méthode pour vérifier si c’est un admin
    public static boolean isIsAdmin() {
        return isAdmin;
    }

    // Méthode pour changer le statut admin
    public static void setIsAdmin(boolean isAdmin) {
        Admin.isAdmin = isAdmin;
    }
    

    // Méthode pour obtenir l'identifiant
    public static String getId_admin() {
        return id_admin;
    }

    // Méthode pour définir l'identifiant
    public static void setId_admin(String id_admin) {
        Admin.id_admin = id_admin;
    }

    // Méthode pour obtenir le mot de passe
    public static String getMdp_admin() {
        return mdp_admin;
    }

    // Méthode pour définir le mot de passe
    public static void setMdp_admin(String mdp_admin) {
        Admin.mdp_admin = mdp_admin;
    }
    
}
