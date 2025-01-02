package com.example.magic_cloud;

import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@CrossOrigin(origins = "http://magic-cloud.info")
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
}

