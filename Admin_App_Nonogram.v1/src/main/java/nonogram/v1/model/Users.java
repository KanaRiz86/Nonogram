/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package nonogram.v1.model;

/**
 *
 * @author syste
 */
public class Users {
    private int id;
    private String pseudo;
    private String email;
    private String role;

    public Users(int id, String pseudo, String email, String role) {
        this.id = id;
        this.pseudo = pseudo;
        this.email = email;
        this.role = role;
    }
}
