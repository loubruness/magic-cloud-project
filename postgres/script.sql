-- Enable the pgcrypto extension for UUIDs
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Create the database (if it does not exist)
CREATE DATABASE IF NOT EXISTS shop;

-- Create the users table first
CREATE TABLE users (
   id_user SERIAL PRIMARY KEY,
   email VARCHAR(50) NOT NULL UNIQUE,
   password TEXT NOT NULL,
   name VARCHAR(50),
   last_name VARCHAR(50)
);

-- Create the categories table
CREATE TABLE categories (
   id UUID DEFAULT gen_random_uuid(), -- Use UUID for unique id
   name VARCHAR(50) NOT NULL,
   PRIMARY KEY (id)
);

-- Create the products table (after categories)
CREATE TABLE products (
   id_product SERIAL PRIMARY KEY,
   name VARCHAR(50) NOT NULL,
   price NUMERIC(10, 2),
   imageSrc VARCHAR(255),
   imageAlt VARCHAR(255),
   category_id UUID, -- Foreign key referencing categories
   FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
);

-- Create the orders table (after users and products)
CREATE TABLE orders (
   id_order SERIAL PRIMARY KEY,
   id_user INT NOT NULL,
   id_product INT NOT NULL,
   price NUMERIC(10, 2) NOT NULL,
   order_date DATE DEFAULT CURRENT_DATE,
   FOREIGN KEY (id_user) REFERENCES users(id_user) ON DELETE CASCADE,
   FOREIGN KEY (id_product) REFERENCES products(id_product) ON DELETE CASCADE
);
