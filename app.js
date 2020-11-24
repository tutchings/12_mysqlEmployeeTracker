var mysql = require('mysql');
var inquirer = require('inquirer');

const Inquire = require("./inquirerClass");

let exitProgram = false;
let initialResponseOptions = ["Add Department, Role, or Employee", "View Departments, Roles, or Employees", "Update Employee", "Exit"];
let tableOptions = ["Department", "Role", "Employee", "Cancel"];
let employeeRecordList = ["first_name", "last_name", "role_id", "manager_id", "cancel"];

const inquire = new Inquire(initialResponseOptions, tableOptions);

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'employeeTracker_db'
});

connection.connect((err) => {
    if (err) throw err;
    runApp();
});

const runApp = () => {
    inquire.initialQuery()
        .then((answer) => {
            switch (answer.initialResponse) {
                case "Add Department, Role, or Employee":
                    addCase();
                    break;
                
                case "View Departments, Roles, or Employees":
                    viewCase();
                    break;
                
                case "Update Employee":
                    updateCase();
                    break;

                case "Exit":
                    connection.end();
                    break;
            }

        });
};



const addCase = () => {
    
    inquire.add()
        .then((answer) => {

            switch (answer.addResponse) {
                case "Department":
                    addDepartment();
                    break;

                case "Role":
                    addRole();
                    break;

                case "Employee":
                    addEmployee();
                    break;

                case "Cancel":
                    runApp();
                    break;

            }

        });

};

const viewCase = () => {

    var viewOptions = tableOptions;
    if (viewOptions.length === 4) {
        viewOptions.splice(3, 0, "All Records");
    } else {
        viewOptions.splice(3, 1, "All Records");
    }
    

    inquire.view(viewOptions)
        .then((answer) => {

            switch(answer.viewResponse) {

                case "Department":
                    var responseLower = answer.viewResponse.toLowerCase();
                    viewTables(responseLower);
                    break;

                case "Role":
                    var responseLower = answer.viewResponse.toLowerCase();
                    viewTables(responseLower);
                    break;
    
                case "Employee":
                    var responseLower = answer.viewResponse.toLowerCase();
                    viewTables(responseLower);
                    break;

                case "All Records":
                    viewAll();
                    break; 

                case "Cancel":
                    runApp();
                    break;

            }
        });
    
};

const updateCase = () => {

    connection.query('SELECT id, first_name, last_name FROM employee;', function(err, res) {
        if (err) throw err;

        console.table(res);

        const idArray = [];

        res.forEach(object => {

            idArray.push(object.id);
            
        });
        

        inquire.update(idArray, employeeRecordList)
            .then((answer) => {

                switch(answer.selectedRecord) {

                    case "first_name": 

                        inquire.updateFirstName()
                            .then((value) => {
                                updateEmployee(answer.selectedEmployee, answer.selectedRecord, value.updatedFirstName);
                            })

                        break;
                        
                    case "last_name": 

                        inquire.updateLastName()
                            .then((value) => {
                                updateEmployee(answer.selectedEmployee, answer.selectedRecord, value.updatedLastName);
                            })

                        break;

                    case "role_id":

                        inquire.updateRoleId()
                            .then((value) => {
                                updateEmployee(answer.selectedEmployee, answer.selectedRecord, value.updatedRoleId);
                            })

                        break;

                    case "manager_id":

                        inquire.updateManagerId()
                            .then((value) => {
                                updateEmployee(answer.selectedEmployee, answer.selectedRecord, value.updatedManagerId);
                            })

                        break;

                    case "cancel":
                        runApp();
                        break;

                } //end switch 

            });
        
    });

};


const updateEmployee = (id, parameter, updatedValue) => {

    
    connection.query(`UPDATE employee SET ${parameter} = '${updatedValue}' WHERE id = ${id};`, function(err, res) {
        if (err) throw err;

        console.log(`Successfully updated ${parameter} for employee ${id}`);

        runApp();

    });

};

const addDepartment = () => {
    inquire.department()
        .then ((answer) => {

            connection.query(`INSERT INTO department (department_name) VALUES ('${answer.newDepartment}');`, function(err, res) {
                if (err) throw err;
                console.log("Successfully added department");

                connection.query(`SELECT * FROM department WHERE department_name = '${answer.newDepartment}';`, function(err, res) {
                    if (err) throw err;

                    console.table(res);

                    runApp();
                });

            });

        });
};

const addRole = () => {
    inquire.role()
        .then((answer) => {

            connection.query(`INSERT INTO role (title, salary, department_id) VALUES ('${answer.newRole}', ${answer.newSalary}, ${answer.newDepartmentId});`, function(err, res) {
                if (err) throw err;
                console.log("New role successfuly added");

                connection.query(`SELECT * FROM role WHERE title = '${answer.newRole}';`, function(err, res) {
                    if (err) throw err;

                    console.table(res);

                    runApp();
                });

            });
        })
};


const addEmployee = () => {

    inquire.employee()
        .then((answer) => {

            connection.query(`INSERT INTO employee (first_name, last_name, role_id) VALUES ('${answer.newFirstName}', '${answer.newLastName}', ${answer.newRoleId});`, function(err, res) {
                if (err) throw err;

                console.log("New employee successfully added");

                connection.query(`SELECT * FROM employee WHERE first_name = '${answer.newFirstName}' AND last_name = '${answer.newLastName}';`, function(err, res) {
                    if (err) throw err;

                    console.table(res);

                    runApp();
                });
            });
        });
};

const viewTables = (table) => {
    connection.query(`SELECT * FROM ${table};`, function(err, res) {
        if (err) throw err;

        console.table(res);

        runApp();
    });
};


const viewAll = () => {
    connection.query(`SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.department_name FROM role LEFT JOIN department ON role.department_id = department.id RIGHT JOIN employee ON role.id = employee.role_id;`, function (err, res) {
        if (err) throw err;

        console.table(res);

        runApp();
    });
};

