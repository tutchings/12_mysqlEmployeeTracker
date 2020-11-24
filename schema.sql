-- drops employeeTracker_db if it already exists
DROP DATABASE IF EXISTS employeeTracker_db;

-- creates employeeTracker_db
CREATE DATABASE employeeTracker_db;

-- ensures the remaining code with alter the employeeTracker_db
USE employeeTracker_db;

-- create table called department within the employeeTracker_db
CREATE TABLE department (
    id INT AUTO_INCREMENT NOT NULL,
    department_name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

-- create table called role within the employeeTracker_db
CREATE TABLE role (
    id INT AUTO_INCREMENT NOT NULL,
    title VARCHAR(50) NOT NULL,
    salary DECIMAL(10,2) NOT NULL,
    department_id INT NOT NULL,
    PRIMARY KEY (id)
);

-- create table called employee within the employeeTracker_db
CREATE TABLE employee (
    id INT AUTO_INCREMENT NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT NULL,
    PRIMARY KEY (id)
);



