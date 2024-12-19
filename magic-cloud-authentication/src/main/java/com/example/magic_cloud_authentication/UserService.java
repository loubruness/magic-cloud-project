package com.example.magic_cloud_authentication;

// import java.util.List;
// import java.util.Optional;

// import org.springframework.stereotype.Service;

// @Service
// public class UserService {

//     private final UserRepository userRepository;

//     // @Autowired
//     public UserService(UserRepository userRepository) {
//         this.userRepository = userRepository;
//     }

//     // Get all users
//     public List<User> getAllUsers() {
//         return userRepository.findAll();
//     }

//     // Get user by email
//     public User getUserByEmail(String email) {
//         return userRepository.findByEmail(email);
//     }

//     // Add a new user
//     public User createUser(User user) {
//         return userRepository.save(user);
//     }

//     // Get user by ID
//     public Optional<User> getUserById(Long id) {
//         return userRepository.findById(id);
//     }
// }

// import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    
    @Autowired(required = false)
    private JdbcTemplate jdbcTemplate;
    
    // Fetch all users
    public List<User> getAllUsers() {
        if (jdbcTemplate == null) {
        throw new IllegalStateException("JdbcTemplate is not initialized.");
    }
    String sql = "SELECT id_user, email, password, name, last_name FROM users";
    return jdbcTemplate.query(sql, (rs, rowNum) -> {
        User user = new User();
        user.setId_user(rs.getLong("id_user"));
        user.setEmail(rs.getString("email"));
        user.setPassword(rs.getString("password"));
        user.setName(rs.getString("name"));
        user.setLast_name(rs.getString("last_name"));
        return user;
    });
    }
    // // Insert a new user
    // public void createUser(User user) {
    //     String sql = "INSERT INTO users (email, password, name, last_name) VALUES (?, ?, ?, ?)";
    //     jdbcTemplate.update(sql, user.getEmail(), user.getPassword(), user.getName(), user.getLast_name());
    // }
}
