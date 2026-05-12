/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package view;

import bdd.Connecter;
import java.awt.Color;
import java.awt.Font;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import javax.swing.*;

public class Accueil extends JFrame {

    // Déclaration des composants graphiques
    private JPanel jPanel1;
    private JLabel lblTitre, lblIdentifiant, lblMotDePasse;
    private JTextField txtIdentifiant;
    private JButton btnValider;
    private JPasswordField txtMotDePasse;

    //Variables SQL
    private Connection con;
    private PreparedStatement pr;
    private ResultSet rs;

    //Constructeur principal : initialise l'interface et établit la connexion SQL
    public Accueil() {
        initComponents(); //Construit l'interface graphique
        con = Connecter.connecter();// connexion à la base de données
    }

    //Méthode pour créer l'interface graphique
    private void initComponents() {

        //Fenêtre principale JPanel
        jPanel1 = new JPanel();
        jPanel1.setLayout(null);
        jPanel1.setBackground(new Color(34, 34, 34));//couleur de fond

        //Titre de la fenêtre
        lblTitre = new JLabel("Connexion");
        lblTitre.setFont(new Font("Trebuchet MS", Font.BOLD, 20));
        lblTitre.setForeground(Color.WHITE);
        lblTitre.setBounds(25, 20, 400, 30);
        lblTitre.setHorizontalAlignment(SwingConstants.CENTER);
        jPanel1.add(lblTitre);

        // Label et champ identifiant
        lblIdentifiant = new JLabel("Email");
        lblIdentifiant.setBounds(40, 80, 100, 20);
        lblIdentifiant.setForeground(Color.WHITE);
        lblIdentifiant.setHorizontalAlignment(SwingConstants.CENTER);
        jPanel1.add(lblIdentifiant);

        txtIdentifiant = new JTextField();
        txtIdentifiant.setBounds(150, 80, 200, 25);
        jPanel1.add(txtIdentifiant);

        // Label et champ mot de passe
        lblMotDePasse = new JLabel("Mot de passe");
        lblMotDePasse.setBounds(40, 120, 100, 20);
        lblMotDePasse.setForeground(Color.WHITE);
        lblMotDePasse.setHorizontalAlignment(SwingConstants.CENTER);
        jPanel1.add(lblMotDePasse);

        txtMotDePasse = new JPasswordField();
        txtMotDePasse.setBounds(150, 120, 200, 25);
        jPanel1.add(txtMotDePasse);
        
        // Uniformisation Police
        Font labelFont = new Font("Trebuchet MS", Font.PLAIN, 14);
        lblIdentifiant.setFont(labelFont);
        lblMotDePasse.setFont(labelFont);
        
        // Bouton de connexion
        btnValider = new JButton("Valider");
        btnValider.setBounds(185, 180, 80, 30);
        btnValider.setForeground(Color.WHITE);
        btnValider.setBackground(new Color(70, 70, 70));
        jPanel1.add(btnValider);
        btnValider.setCursor(new java.awt.Cursor(java.awt.Cursor.HAND_CURSOR));

        // Action : quand on clique sur "Valider"
        btnValider.addActionListener(e -> connecter());

        // Paramètres de la fenêtre principale
        this.setTitle("Accueil - Nonogramme");
        this.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        this.setContentPane(jPanel1);
        this.setSize(450, 300);
        this.setLocationRelativeTo(null);
        this.setVisible(true);

    }

    // Méthode pour connecter l’utilisateur à partir des champs remplis
    private void connecter() {
        // Identifiant saisi
        String identifiant = txtIdentifiant.getText();
        // Mot de passe saisi
        String mdp = new String(txtMotDePasse.getPassword());
        // Table et champs à selectionner dans la BDD
        String table = "admin";
        String champEmail = "email_admin";
        String champMdp = "mdp_admin";

        try {
            // Préparation de la requête SQL
            String sql = "SELECT * FROM " + table + " WHERE " + champEmail + "=? AND " + champMdp + "=?";

            pr = con.prepareStatement(sql);
            pr.setString(1, identifiant);
            pr.setString(2, mdp);
            rs = pr.executeQuery();

            if (rs.next()) {
                JOptionPane.showMessageDialog(this, "Connexion Réussie !");
                new MenuPrincipal();   // ouvre le menu principal
                this.dispose();//fermer la fenêtre actuelle
            } else {
                JOptionPane.showMessageDialog(this, "Identifiants incorrects.");
            }
        } catch (Exception e) {
            JOptionPane.showMessageDialog(this, " Erreur : " + e.getMessage());
        }

    }

    //Méthode Main
    public static void main(String[] args) {
        SwingUtilities.invokeLater(Accueil::new);  // Lancement de l’interface

    }
}
