DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (

item_id INT NOT NULL AUTO_INCREMENT NOT NULL,

product_name VARCHAR(100) NOT NULL,

department_name VARCHAR(100) NOT NULL,

price DECIMAL(10,2) NOT NULL,

quantity INT(10) NOT NULL,

PRIMARY KEY (item_id)

);

INSERT INTO products (product_name, department_name, price, quantity)
VALUES ("Fish Tank", "Pets", 50.75, 10);

INSERT INTO products (product_name, department_name, price, quantity)
VALUES ("Chew Bone", "Pets", 14.99, 50);

INSERT INTO products (product_name, department_name, price, quantity)
VALUES ("Cat Toy", "Pets", 8.95, 20);

INSERT INTO products (product_name, department_name, price, quantity)
VALUES ("Milk", "Food", 3.99, 40);

INSERT INTO products (product_name, department_name, price, quantity)
VALUES ("Eggs", "Food", 6.50, 120);

INSERT INTO products (product_name, department_name, price, quantity)
VALUES ("Bananas", "Food", 3.50, 75);

INSERT INTO products (product_name, department_name, price, quantity)
VALUES ("Rug", "Furniture", 79.90, 6);

INSERT INTO products (product_name, department_name, price, quantity)
VALUES ("Nightstand", "Furniture", 120.00, 4);

INSERT INTO products (product_name, department_name, price, quantity)
VALUES ("Lamp", "Furniture", 25.00, 10);

SELECT * FROM products;
