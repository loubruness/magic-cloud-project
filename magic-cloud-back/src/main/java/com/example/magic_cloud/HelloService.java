package com.example.magic_cloud;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
public class HelloService {
    
    @GetMapping("/Hello")
    public String hello() {
        return "hello :)";
    }
}

