DROP DATABASE IF EXISTS employeeDB;
CREATE DATABASE employeeDB;
USE employeeDB;
CREATE TABLE employee (
id INT NOT NULL AUTO_INCREMENT,
first_name varchar(30) NOT NULL,
last_name varchar(30) NOT NULL,
role_id INT NOT NULL,
manager_id int,
PRIMARY KEY (id)
);


CREATE TABLE department (
id INT NOT NULL AUTO_INCREMENT,
name varchar(30) NOT NULL,
PRIMARY KEY (id)
);

CREATE TABLE role (
id INT NOT NULL AUTO_INCREMENT,
title varchar(30) NOT NULL,
salary decimal,
department_id int,
PRIMARY KEY (id)
);

INSERT INTO department (name)
VALUES("Sales"),
("IT"),
("Legal"),
("Finance");

INSERT INTO role ( title, salary,department_id)
VALUES("CTO",200000.00,2),
("Director of IT",125000.00,2),
("Developer",115000.00,2),
("Sales Manager",85000.00,1),
("Sales Rep",45000.00,1),
("Senior Accountant",100000.00,4),
("Accountant",65000.00,4),
("Lawyer",135000.00,3),
("Paralegal",70000.00,3),
("Legal Secretary",35000.00,3);

INSERT INTO employee (first_name,last_name,role_id,manager_id)
VALUES('Lois','Walker',1,null),
('Brenda','Robinson',2,1),
('Diane','Evans',3,2),
('Benjamin','Russell',3,2),
('Patrick','Bailey',3,2),
('Nancy','Baker',4,1),
('Carol','Murphy',5,7),
('Frances','Young',5,7),
('Diana','Peterson',5,7),
('Ralph','Flores',5,7),
('Jack','Alexander',5,7),
('Melissa','King',6,1),
('Wayne','Watson',7,13),
('Cheryl','Scott',7,13),
('Paula','Diaz',8,1),
('Joshua','Stewart',9,16),
('Theresa','Lee',10,16);


