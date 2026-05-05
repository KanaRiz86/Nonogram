package main;


import bdd.Connecter;
import java.sql.Connection;


public class Main {

    public static void main(String[] args) {
        // Test de la connexion
        Connection con = Connecter.connecter();

        if (con != null){
            System.out.println("Connexion OK !");
        } else {
            System.out.println("Échec de la connexion.");
        }
    }
}