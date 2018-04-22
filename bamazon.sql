DROP DATABASE IF EXISTS bamazon_db;
CREATE database bamazon_db;

USE bamazon_db;

CREATE TABLE products (
  item_id INTEGER(200) auto_increment not null PRIMARY key,

    product_name VARCHAR(50) NOT NULL,

   department_name VARCHAR(50) not null,

   price DECIMAL(10,2) not null, 

   stock_quantity INTEGER(10) not null
);

SELECT * FROM products;
