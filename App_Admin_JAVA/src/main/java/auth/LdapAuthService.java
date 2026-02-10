/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package auth;

/**
 *
 * @author syste
 */
public class LdapAuthService implements AuthService {

    @Override
    public boolean authenticate(String login, String password) {
        throw new UnsupportedOperationException("LDAP non implémenté");
    }

    @Override
    public boolean hasRole(String role) {
        return false;
    }

    @Override
    public String getCurrentUser() {
        return null;
    }
}
