-- Drop tables if they exist
DROP TABLE IF EXISTS orders, products, categories, users CASCADE;

-- Connect to the "shop" database
\c shop;

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
   id SERIAL PRIMARY KEY,
   name VARCHAR(50) NOT NULL UNIQUE
);

-- Create the products table (after categories)
CREATE TABLE products (
   id_product SERIAL PRIMARY KEY,
   name VARCHAR(50) NOT NULL,
   price NUMERIC(10, 2),
   imageSrc VARCHAR(255),
   imageAlt VARCHAR(255),
   category_id INT NOT NULL, -- Foreign key referencing categories
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

-- Insert a category (e.g., "Potions")
INSERT INTO categories (name) 
VALUES ('Potions');

-- Insert products into the products table
INSERT INTO products (name, price, imageSrc, imageAlt, category_id)
VALUES
  ('Elixir of Life', 50.00, 'logo.png', 'A glowing golden potion with intricate carvings on the bottle.', (SELECT id FROM categories WHERE name = 'Potions' LIMIT 1)),
  ('Potion of Swiftness', 30.00, 'logo.png', 'A shimmering blue potion swirling with light.', (SELECT id FROM categories WHERE name = 'Potions' LIMIT 1)),
  ('Dragon''s Breath Elixir', 120.00, 'logo.png', 'A fiery red potion with smoke rising from the cork.', (SELECT id FROM categories WHERE name = 'Potions' LIMIT 1)),
  ('Invisibility Draught', 90.00, 'logo.png', 'A translucent potion with a faint silver glow.', (SELECT id FROM categories WHERE name = 'Potions' LIMIT 1)),
  ('Phoenix Tears', 150.00, 'logo.png', 'A radiant bottle with golden liquid and a phoenix feather inside.', (SELECT id FROM categories WHERE name = 'Potions' LIMIT 1));

-- Commit the transaction
COMMIT;
