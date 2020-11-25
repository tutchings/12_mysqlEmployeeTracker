-- adds departments to department table
INSERT INTO department (department_name) VALUES ('Management');
INSERT INTO department (department_name) VALUES ('Sales');
INSERT INTO department (department_name) VALUES ('Accounting');
INSERT INTO department (department_name) VALUES ('Customer Service');
INSERT INTO department (department_name) VALUES ('Reception');
INSERT INTO department (department_name) VALUES ('Warehouse');
INSERT INTO department (department_name) VALUES ('Temp');
INSERT INTO department (department_name) VALUES ('Human Resources');
INSERT INTO department (department_name) VALUES ('Administration');

-- adds roles to role table
INSERT INTO role (title, salary, department_id) VALUES ('Regional Manager', 250000, 1);
INSERT INTO role (title, salary, department_id) VALUES ('Sales Representative', 150000, 2);
INSERT INTO role (title, salary, department_id) VALUES ('Senior Accountant', 200000, 3);
INSERT INTO role (title, salary, department_id) VALUES ('Accountant', 150000, 3);
INSERT INTO role (title, salary, department_id) VALUES ('Supplier Relations Representative', 50000, 4);
INSERT INTO role (title, salary, department_id) VALUES ('Customer Service Representative', 40000, 4);
INSERT INTO role (title, salary, department_id) VALUES ('Quality Assurance Representative', 75000, 4);
INSERT INTO role (title, salary, department_id) VALUES ('Receptionist', 32000, 5);
INSERT INTO role (title, salary, department_id) VALUES ('Warehouse Foreman', 100000, 6);
INSERT INTO role (title, salary, department_id) VALUES ('Temp', 25000, 7);
INSERT INTO role (title, salary, department_id) VALUES ('Human Resources Representative', 175000, 8);
INSERT INTO role (title, salary, department_id) VALUES ('Office Administrator', 100000, 9);

-- adds employees to employee table
INSERT INTO employee (first_name, last_name, role_id) VALUES ('Michael', 'Scott', 1);
INSERT INTO employee (first_name, last_name, role_id) VALUES ('Jim', 'Halpert', 2);
INSERT INTO employee (first_name, last_name, role_id) VALUES ('Dwight', 'Schrute', 2);
INSERT INTO employee (first_name, last_name, role_id) VALUES ('Andy', 'Bernard', 2);
INSERT INTO employee (first_name, last_name, role_id) VALUES ('Stanley', 'Hudson', 2);
INSERT INTO employee (first_name, last_name, role_id) VALUES ('Phyllis', 'Lapin-Vance', 2);
INSERT INTO employee (first_name, last_name, role_id) VALUES ('Angela', 'Martin', 3);
INSERT INTO employee (first_name, last_name, role_id) VALUES ('Kevin', 'Malone', 4);
INSERT INTO employee (first_name, last_name, role_id) VALUES ('Oscar', 'Martinez', 4);
INSERT INTO employee (first_name, last_name, role_id) VALUES ('Meredith', 'Palmer', 5);
INSERT INTO employee (first_name, last_name, role_id) VALUES ('Kelly', 'Kapoor', 6);
INSERT INTO employee (first_name, last_name, role_id) VALUES ('Creed', 'Bratton', 7);
INSERT INTO employee (first_name, last_name, role_id) VALUES ('Erin', 'Hannon', 8);
INSERT INTO employee (first_name, last_name, role_id) VALUES ('Darryl', 'Philbin', 9);
INSERT INTO employee (first_name, last_name, role_id) VALUES ('Ryan', 'Howard', 10);
INSERT INTO employee (first_name, last_name, role_id) VALUES ('Toby', 'Flenderson', 11);
INSERT INTO employee (first_name, last_name, role_id) VALUES ('Holly', 'Flax', 11);
INSERT INTO employee (first_name, last_name, role_id) VALUES ('Pam', 'Halpert', 12);


