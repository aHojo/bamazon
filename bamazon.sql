CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
	item_id INT AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(50) NOT NULL,
    department_name VARCHAR(50) NOT NULL,
    price FLOAT NOT NULL,
    stock_quantity INT NOT NULL,
    primary key (item_id)
    
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("WOW", "video games", 60.00, 15);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("GTX 1080ti", "pc hardware", 699.00, 3);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Overwatch", "video games", 30.00, 12);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Intel i9 7900x", "ps hardware", 699.00, 5);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Persona 5", "video games", 60.00, 3);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("ASUS ROG STRIX X299-E GAMING LGA2066", "pc hardware", 290.71, 9);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Skyrim", "video games", 20.00, 15);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Nintendo Switch", "video games", 299.00, 1);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Fallout 4", "video games", 20.00, 18);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("COUGAR Conquer Aluminum Alloy ATX Mid Tower ", "pc hardware", 249.00, 2);
