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

                case "Role":

                case "Employee":

                case "Cancel":
                    break;

            }

        });

    runApp();
};

const viewCase = () => {
    inquire.view()
        .then((answer) => {

            switch(answer.viewResponse) {

                case "Department":

                case "Role":
    
                case "Employee":

                case "Cancel":
                    break;

            }
        });
    
    runApp();
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