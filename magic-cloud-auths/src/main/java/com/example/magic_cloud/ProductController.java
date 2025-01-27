package com.example.magic_cloud;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ProductController {
    
    @Autowired
    private ProductService productService;

    @GetMapping("/Hello")
    public String hello() {
        return "hello :)";
    }

    @GetMapping("/products")
    public List<Product> getProducts() {
        return productService.getAllProducts();
    }

    @GetMapping("/HelloHi")
    public String hi() {
        return "hello :')";
    }
    
}

