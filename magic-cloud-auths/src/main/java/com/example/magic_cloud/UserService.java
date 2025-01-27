// package com.example.magic_cloud;

// import java.util.List;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.jdbc.core.JdbcTemplate;
// import org.springframework.stereotype.Service;

// @Service
// public class UserService {
//     @Autowired
//     private JdbcTemplate jdbcTemplate;

//     public List<User> getAllUsers() {
//         String sql = "SELECT id_user, email, password, name, last_name FROM users";
//         return jdbcTemplate.query(sql, (rs, rowNum) -> {
//             User user = new User();
//             user.setId_user(rs.getLong("id_user"));
//             user.setEmail(rs.getString("email"));
//             user.setPassword(rs.getString("password"));
//             user.setName(rs.getString("name"));
//             user.setLast_name(rs.getString("last_name"));
//             return user;
//         });
//     }
// }

package com.example.magic_cloud;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    // Authenticate user by email and password
    public User authenticateUser(String email, String password) {
        String sql = "SELECT id_user, email, password, name, last_name FROM users WHERE email = ? AND password = ?";
        List<User> users = jdbcTemplate.query(sql, (rs, rowNum) -> {
            User user = new User();
            user.setId_user(rs.getLong("id_user"));
            user.setEmail(rs.getString("email"));
            user.setPassword(rs.getString("password"));
            user.setName(rs.getString("name"));
            user.setLast_name(rs.getString("last_name"));
            return user;
        }, email, password); // Using variable arguments

        // Return the first user if found, otherwise null
        return users.isEmpty() ? null : users.get(0);
    }

    // Register a new user
    public boolean registerUser(User newUser) {
        // Check if user with email already exists
        String checkEmailSql = "SELECT COUNT(*) FROM users WHERE email = ?";
        Integer count = jdbcTemplate.queryForObject(checkEmailSql, Integer.class, newUser.getEmail());

        if (count != null && count > 0) {
            return false; // User already exists
        }

        // Insert new user into database
        String insertSql = "INSERT INTO users (email, password, name, last_name) VALUES (?, ?, ?, ?)";
        jdbcTemplate.update(insertSql, newUser.getEmail(), newUser.getPassword(), newUser.getName(), newUser.getLast_name());
        return true;
    }
}
