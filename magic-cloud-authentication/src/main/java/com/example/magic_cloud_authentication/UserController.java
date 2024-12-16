package com.example.magic_cloud_authentication;

// import java.util.List;
// import java.util.Optional;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.GetMapping;
// import org.springframework.web.bind.annotation.PathVariable;
// import org.springframework.web.bind.annotation.PostMapping;
// import org.springframework.web.bind.annotation.RequestBody;
// import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RestController;

// @RestController
// // @RequestMapping("/api/users")
// public class UserController {
    
//     private final UserService userService;

//     public UserController(UserService userService) {
//         this.userService = userService;
//     }

//     // Endpoint to get all users
//     @GetMapping
//     public List<User> getAllUsers() {
//         return userService.getAllUsers();
//     }

//     // Endpoint to get user by ID
//     @GetMapping("/{id}")
//     public ResponseEntity<User> getUserById(@PathVariable Long id) {
//         Optional<User> user = userService.getUserById(id);
//         return user.map(ResponseEntity::ok)
//                    .orElseGet(() -> ResponseEntity.notFound().build());
//     }

//     // Endpoint to get user by email
//     @GetMapping("/email/{email}")
//     public ResponseEntity<User> getUserByEmail(@PathVariable String email) {
//         User user = userService.getUserByEmail(email);
//         if (user != null) {
//             return ResponseEntity.ok(user);
//         } else {
//             return ResponseEntity.notFound().build();
//         }
//     }

//     // Endpoint to create a new user
//     @PostMapping
//     public User createUser(@RequestBody User user) {
//         return userService.createUser(user);
//     }
// }


// import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;


    public UserController(UserService userService) {
        this.userService = userService;
    }

    // Endpoint to fetch all users
    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    // Endpoint to add a new user
    @PostMapping
    public void createUser(@RequestBody User user) {
        userService.createUser(user);
    }
}
