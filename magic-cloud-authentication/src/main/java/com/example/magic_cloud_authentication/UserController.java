package com.example.magic_cloud_authentication;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
// @RequestMapping("/api/users")
public class UserController {
    
    @Autowired
    private UserService userService;


    // public UserController(UserService userService) {
    //     this.userService = userService;
    // }

    @GetMapping("/HelloHello")
    public String hello() {
        return "hello :)";
    }

    // Endpoint to fetch all users
    @GetMapping("/userList")
    public List<User> getUsers() {
        return userService.getAllUsers();
    }

    // // Endpoint to add a new user
    // @PostMapping
    // public void createUser(@RequestBody User user) {
    //     userService.createUser(user);
    // }
}
