/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package auth;

/**
 *
 * @author syste
 */
import java.util.Map;
import java.util.Set;

public class LocalAuthService implements AuthService {

    private static class User {
        String password;
        Set<String> roles;

        User(String password, Set<String> roles) {
            this.password = password;
            this.roles = roles;
        }
    }

    private final Map<String, User> users = Map.of(
        "admin", new User("admin123", Set.of("ADMIN")),
        "moderateur", new User("mod123", Set.of("MODERATOR"))
    );

    private String currentUser;

    @Override
    public boolean authenticate(String login, String password) {
        User user = users.get(login);
        if (user != null && user.password.equals(password)) {
            currentUser = login;
            return true;
        }
        return false;
    }

    @Override
    public boolean hasRole(String role) {
        return currentUser != null &&
               users.get(currentUser).roles.contains(role);
    }

    @Override
    public String getCurrentUser() {
        return currentUser;
    }
}