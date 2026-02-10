/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package model;

/**
 *
 * @author syste
 */
public class IMG {
    private int id;
    private String nom;
    private int largeur;
    private int hauteur;
    private String difficulte;
    private String grille;

    public IMG(int id, String nom, int largeur, int hauteur,
                 String difficulte, String grille) {
        this.id = id;
        this.nom = nom;
        this.largeur = largeur;
        this.hauteur = hauteur;
        this.difficulte = difficulte;
        this.grille = grille;
    }
}
