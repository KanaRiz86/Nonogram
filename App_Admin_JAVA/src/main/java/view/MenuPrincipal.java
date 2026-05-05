/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package view;

import bdd.Connecter;
import javax.swing.*;
import java.awt.*;
import java.sql.Connection;

/**
 *
 * @author fauss
 */
public class MenuPrincipal extends JFrame {

// Composants graphiques
    private JPanel jPanel1;
    private JLabel jLabel1;
    private JButton boutonGestionUsers, boutonGestionTickets, boutonDeconnexion;

    // Connexion à la base de données
    private Connection con;

    //Constructeur
    public MenuPrincipal() {

        // Initialisation des éléments de l'interface
        initComponents();

        // Titre de la fenêtre
        this.setTitle("Menu principal - Nonogramme");

        // Fermer l'app lors de la fermeture de la fenêtre
        this.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);

        // Ajouter le contenu principal
        setContentPane(jPanel1);

        // Adapter la taille automatiquement
        this.pack();

        // Centrer la fenêtre à l'écran
        this.setLocationRelativeTo(null);

        //Afficher la fenêtre
        this.setVisible(true);
    }

    // Création de tous les éléments graphiques
    private void initComponents() {
        // Fenêtre principale, dimension et couleur de fond
        jPanel1 = new JPanel(null);
        jPanel1.setBackground(new Color(34, 34, 34));
        jPanel1.setPreferredSize(new Dimension(350, 300));

        //Les zones de texte
        jLabel1 = new JLabel("Administration");
        jLabel1.setFont(new Font("Trebuchet MS", Font.BOLD, 20));
        jLabel1.setForeground(Color.WHITE);
        jLabel1.setBounds(105, 20, 350, 30);
        jPanel1.add(jLabel1);

        // Boutons
        boutonGestionUsers = new JButton("Gestion des utilisateurs");
        boutonGestionUsers.setBounds(85, 100, 180, 30);
        boutonGestionUsers.setCursor(new java.awt.Cursor(java.awt.Cursor.HAND_CURSOR));
        boutonGestionUsers.setForeground(Color.WHITE);
        boutonGestionUsers.setBackground(new Color(70, 70, 70));
        boutonGestionUsers.setFocusPainted(false); // Enlève le rectangle au clic
        jPanel1.add(boutonGestionUsers);

        boutonGestionTickets = new JButton("Gestion des tickets");
        boutonGestionTickets.setBounds(85, 150, 180, 30);
        boutonGestionTickets.setCursor(new java.awt.Cursor(java.awt.Cursor.HAND_CURSOR));
        boutonGestionTickets.setForeground(Color.WHITE);
        boutonGestionTickets.setBackground(new Color(70, 70, 70));
        jPanel1.add(boutonGestionTickets);

        boutonDeconnexion = new JButton("Déconnexion");
        boutonDeconnexion.setBounds(105, 220, 140, 30);
        boutonDeconnexion.setCursor(new java.awt.Cursor(java.awt.Cursor.HAND_CURSOR));
        boutonDeconnexion.setForeground(Color.WHITE);
        boutonDeconnexion.setBackground(new Color(70, 70, 70));
        jPanel1.add(boutonDeconnexion);

        // Gestion des évènements (actions des boutons
        boutonGestionUsers.addActionListener(e -> gestionUsers());
        boutonGestionTickets.addActionListener(e -> gestionTickets());
        boutonDeconnexion.addActionListener(e -> {
            new Accueil();   // retourne à la page login
            this.dispose();  // ferme le menu principal
        });
    }

    // Méthodes liées aux évènements
    // Ouvrir la fenêtre de saisie d'une nouvelle offre
    private void gestionUsers() {
        new GestionUsers(); // Affiche la fenêtre pour l’admin
        this.setVisible(false);
    }

    //Ouvrir la fenêtre de création d'entreprise
    private void gestionTickets() {
        new GestionTickets();
        this.setVisible(false);
    }

    // Méthode principale pour exécuter cette fenêtre
    public static void main(String[] args) {
        SwingUtilities.invokeLater(MenuPrincipal::new);
    }
}
