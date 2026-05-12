/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package bdd;

import java.io.FileInputStream;
import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.Properties;

public class Connecter {

    // Méthode pour établir une connexion à la base de données MySQL
    public static Connection connecter() {
        Connection con = null;
        try {
            // Charger le fichier de config
            Properties props = new Properties();
            String path = System.getProperty("user.dir")
                    + "/src/main/java/config/config.properties";

            FileInputStream fis = new FileInputStream(path);
            props.load(fis);

          
            // URL de connexion à la base de données
            String url = props.getProperty("db.url");

            // Nom d'utilisateur et mot de passe BDD
            String utilisateur = props.getProperty("db.utilisateur");
            String motDePasse = props.getProperty("db.motDePasse");

            // Connexion à la base
            con = DriverManager.getConnection(url, utilisateur, motDePasse);
            System.out.println("Connexion réussie à la base de données.");

            // Gestion des erreurs de connexion
        } catch (SQLException e) {
            System.err.println("Erreur lors de la connexion : " + e.getMessage());

            // Gestion des erreurs liées au fichier configuration
        } catch (IOException e) {
            System.err.println("Erreur lors du chargement du fichier de configuration : " + e.getMessage());
            throw new RuntimeException("Impossible de charger le fichier config.properties", e);
        }

        return con;
    }

    // Méthode pour fermer proprement la connexion
    public static void fermerConnexion(Connection con) {
        if (con != null) {
            try {
                con.close();
                System.out.println("Connexion fermée.");
            } catch (SQLException e) {
                System.err.println("Erreur lors de la fermeture : " + e.getMessage());
            }
        }

    }
}
