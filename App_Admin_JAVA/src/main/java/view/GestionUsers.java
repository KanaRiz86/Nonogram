/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package view;

import bdd.Connecter;
import java.awt.*;
import java.sql.*;
import javax.swing.*;
import javax.swing.table.DefaultTableCellRenderer;
import javax.swing.table.DefaultTableModel;

/**
 *
 * @author fauss
 */
public class GestionUsers extends JFrame {

    // Composants graphiques
    private JTable table;
    private JButton btnSupprimer, btnRetour;
    private JLabel headerLabel;
    private int hoveredRow = -1;

    // Connexion à la base de données
    private Connection con;

    public GestionUsers() {

        con = Connecter.connecter();

        setTitle("Gestion des utilisateurs");
        setSize(800, 500);
        setLocationRelativeTo(null);

        JPanel mainPanel = new JPanel(new BorderLayout());
        mainPanel.setBackground(new Color(24, 24, 27));

        // Header
        JPanel headerPanel = new JPanel(new BorderLayout());
        headerPanel.setBackground(new Color(34, 34, 34));
        headerPanel.setPreferredSize(new Dimension(600, 60));

        // Bouton retour 
        btnRetour = new JButton("← Retour");

        btnRetour.setFont(new Font("Segoe UI", Font.BOLD, 14));
        btnRetour.setForeground(Color.WHITE);
        btnRetour.setBackground(new Color(34, 34, 34));
        btnRetour.setFocusPainted(false);
        btnRetour.setBorderPainted(false);
        btnRetour.setCursor(new Cursor(Cursor.HAND_CURSOR));

        btnRetour.addActionListener(e -> {
            new MenuPrincipal();
            dispose();
        });

        // Titre centré
        headerLabel = new JLabel("Gestion des utilisateurs", SwingConstants.CENTER);
        headerLabel.setFont(new Font("Segoe UI", Font.BOLD, 22));
        headerLabel.setForeground(Color.WHITE);

        // Ajout dans header
        headerPanel.add(btnRetour, BorderLayout.WEST);
        headerPanel.add(headerLabel, BorderLayout.CENTER);
        JPanel rightSpacer = new JPanel();
        rightSpacer.setPreferredSize(btnRetour.getPreferredSize());
        rightSpacer.setBackground(new Color(34, 34, 34));
        headerPanel.add(rightSpacer, BorderLayout.EAST);

        mainPanel.add(headerPanel, BorderLayout.NORTH);

        // Table
        table = new JTable();
        table.setRowHeight(28);

        table.addMouseMotionListener(new java.awt.event.MouseMotionAdapter() {
            @Override
            public void mouseMoved(java.awt.event.MouseEvent e) {
                hoveredRow = table.rowAtPoint(e.getPoint());
                table.repaint();
            }
        });

        table.addMouseListener(new java.awt.event.MouseAdapter() {
            @Override
            public void mouseExited(java.awt.event.MouseEvent e) {
                hoveredRow = -1;
                table.repaint();
            }
        });

        JScrollPane scroll = new JScrollPane(table);
        mainPanel.add(scroll, BorderLayout.CENTER);

        // Bouton supprimer
        btnSupprimer = new JButton("Supprimer");
        btnSupprimer.setFont(new Font("Segoe UI", Font.BOLD, 14));
        btnSupprimer.setBackground(new Color(220, 53, 69));
        btnSupprimer.setForeground(Color.WHITE);
        btnSupprimer.setFocusPainted(false);
        btnSupprimer.setCursor(new Cursor(Cursor.HAND_CURSOR));
        btnSupprimer.addActionListener(e -> supprimerUser());

        JPanel bottom = new JPanel();
        bottom.setBackground(new Color(34, 34, 34));
        bottom.add(btnSupprimer);

        mainPanel.add(bottom, BorderLayout.SOUTH);

        setContentPane(mainPanel);

        loadUsers();

        setVisible(true);
    }

    // Méthode qui récupère les données de la base et les met dans le JTable
    private void loadUsers() {

        try {

            // Récupère toutes les lignes de la table users
            String sql = "SELECT * FROM users";

            PreparedStatement ps = con.prepareStatement(sql);

            // Exécute la requête et récupère les résultats
            ResultSet rs = ps.executeQuery();

            // récupérer les colonnes automatiquement
            ResultSetMetaData meta = rs.getMetaData();

            int columnCount = meta.getColumnCount();

            // Modèle de données du JTable (structure du tableau)
            DefaultTableModel model = new DefaultTableModel();

            // colonnes - Boucle sur toutes les colonnes SQL
            for (int i = 1; i <= columnCount; i++) {
                // Ajoute le nom de chaque colonne dans le JTable
                model.addColumn(meta.getColumnName(i));

            }
            // lignes

            // Parcourt toutes les lignes du résultat SQL
            while (rs.next()) {

                //Crée un tableau pour stocker une ligne complète
                Object[] row = new Object[columnCount];

                //Parcourt toutes les colonnes de la ligne actuelle
                for (int i = 1; i <= columnCount; i++) {
                    //  Récupère la valeur de chaque colonne
                    row[i - 1] = rs.getObject(i); // getObject = accepte n’importe quel type (String, int, date...)
                }

                model.addRow(row);
                // Ajoute la ligne complète au tableau
            }
            //Injecte le modèle rempli dans le JTable (affichage final)
            table.setModel(model);
            
            applyHoverRenderer();

            rs.close();
            ps.close();

        } catch (Exception e) {
            // Affiche une popup avec le message d’erreur
            JOptionPane.showMessageDialog(this, "Erreur : " + e.getMessage());

        }
    }

    private void applyHoverRenderer() {

        DefaultTableCellRenderer renderer;
        renderer = new DefaultTableCellRenderer() {
            
            @Override
            public Component getTableCellRendererComponent(
                    JTable table,
                    Object value,
                    boolean isSelected,
                    boolean hasFocus,
                    int row,
                    int column) {

                Component c = super.getTableCellRendererComponent(
                        table, value, isSelected, hasFocus, row, column);

                // Alignement colonne 0
                if (column == 0) {
                    setHorizontalAlignment(SwingConstants.CENTER);
                } else {
                    setHorizontalAlignment(SwingConstants.LEFT);
                }

                // fond par défaut
                c.setBackground(Color.WHITE);

                // hover
                if (row == hoveredRow && !isSelected) {
                    c.setBackground(new Color(220, 240, 255));
                }

                // sélection
                if (isSelected) {
                    c.setBackground(new Color(184, 207, 229));
                }

                return c;
            }
        };

        // Appliquer à TOUTES les colonnes
        for (int i = 0; i < table.getColumnCount(); i++) {
            table.getColumnModel().getColumn(i).setCellRenderer(renderer);
        }
    }

    private void supprimerUser() {
        try {

            // Retourne le numéro de ligne sélectionnée ou -1 si aucune ligne n’est sélectionnée
            int selectedRow = table.getSelectedRow();

            if (selectedRow == -1) {
                JOptionPane.showMessageDialog(this, "Sélectionnez un utilisateur à supprimer.");
                return;
            }

            // Confirmation avant suppression
            int confirm = JOptionPane.showConfirmDialog(
                    this,
                    "Confirmer  la suppression ?",
                    "Suppression",
                    JOptionPane.YES_NO_OPTION
            );

            if (confirm != JOptionPane.YES_OPTION) {
                return;
            }

            // Récupération ID utilisateur
            int idUser = Integer.parseInt(table.getValueAt(selectedRow, 0).toString());

            String sql = "DELETE FROM users WHERE id_user = ?";
            PreparedStatement ps = con.prepareStatement(sql);
            ps.setInt(1, idUser);

            ps.executeUpdate();
            ps.close();

            JOptionPane.showMessageDialog(this, "Utilisateur supprimé avec succès.");

            loadUsers(); // recharge tableau

        } catch (Exception e) {
            JOptionPane.showMessageDialog(this, "Erreur suppression : " + e.getMessage());
        }

    }

}
