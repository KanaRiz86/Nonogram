/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package auth;

/**
 *
 * @author syste
 */
public interface AuthService {

    boolean authenticate(String login, String password);

    boolean hasRole(String role);

    String getCurrentUser();
}
