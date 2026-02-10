/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package model;

/**
 *
 * @author syste
 */
public class Scores {
    private int id;
    private String pseudo;
    private String image;
    private int score;
    private int temps;

    public Scores(int id, String pseudo, String image, int score, int temps) {
        this.id = id;
        this.pseudo = pseudo;
        this.image = image;
        this.score = score;
        this.temps = temps;
    }
}
