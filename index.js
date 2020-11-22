var mysql = require('mysql');
var inquirer = require('inquirer');

const Inquire = require("./inquirerClass");

let exitProgram = false;
let initialResponseOptions = ["Add Department, Role, or Employee", "View Departments, Roles, or Employees", "Update Employee", "Exit"];
let tableOptions = ["Department", "Role", "Employee"];

const inquire = new Inquire(initialResponseOptions, tableOptions);

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'employeeTracker_db'
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected as id " + connection.threadId);

    async function init() {

        try {

            while(!exitProgram) {

                const initialQueryResponse = await inquire.initialQuery();
                
                if (initialQueryResponse.initialResponse === "Add Department, Role, or Employee") {

                    const addResponse = await inquire.add();

                    if(addResponse.addResponse === "Department") {
                        
                    } else if (addResponse.addResponse === "Role") {

                    } else if (addResponse.addResponse === "Employee") {

                    }


                } else if (initialQueryResponse.initialResponse === "View Departments, Roles, or Employees") {

                    const viewResponse = await inquire.view();

                    if(viewResponse.viewResponse === "Department") {
                        
                    } else if (viewResponse.viewResponse === "Role") {

                    } else if (viewResponse.viewResponse === "Employee") {

                    }

                } else if (initialQueryResponse.initialResponse === "Update Employee") {

                } else if (initialQueryResponse.initialResponse === "Exit") {

                    exitProgram = true;

                } //end if/else conditional
                
            }; //end while loop

            if(exitProgram === true) {
                connection.end();
            };

        } catch (err) {

            console.log(err);

        } //end try/catch

    } //end async function init()

    init();
});

