package com.example.magic_cloud;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    public List<Product> getAllProducts() {
        String sql = "SELECT id_product, name, price, imageSrc, imageAlt FROM products";
        return jdbcTemplate.query(sql, (rs, rowNum) -> {
            Product product = new Product();
            product.setIdProduct(rs.getInt("id_product"));
            product.setName(rs.getString("name"));
            product.setPrice(rs.getDouble("price"));
            product.setImageSrc(rs.getString("imageSrc"));
            product.setImageAlt(rs.getString("imageAlt"));
            return product;
        });
    }

}
