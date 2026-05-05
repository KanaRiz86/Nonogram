/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package model;

// Classe qui permet de créer un utilisateur
public class Users {
    // Attributs de l'utilisateur
    private int id_user;
    private String nickname;
    private String email;
    private String password;

    // Constructeur vide
    public Users() {
    }

    // Constructeur avec tous les champs
    public Users(int id_user, String nickname, String email, String password) {
        this.id_user = id_user;
        this.nickname = nickname;
        this.email = email;
        this.password = password;
    }
    
    // Getters et setters
    public int getId_user() {
        return id_user;
    }

    public void setId_user(int id_user) {
        this.id_user = id_user;
    }

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public String toString() {
        return "Users{" + "id_user=" + id_user + ", nickname=" + nickname + ", email=" + email + ", password=" + password + '}';
    }
    
}



