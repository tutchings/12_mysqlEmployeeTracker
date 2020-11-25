// node requirements
var mysql = require('mysql');
var inquirer = require('inquirer');

// connects app.js to the inquirer class stored in the inquirerClass.js file
const Inquire = require("./inquirerClass");

// global variables
let exitProgram = false;
let initialResponseOptions = ["Add Department, Role, or Employee", "View Departments, Roles, Employees, or All Records", "Update Employee", "Delete Employee", "Exit"];
let tableOptions = ["Department", "Role", "Employee", "Cancel"];
let deleteOptions = ["Delete One Employee", "Delete All Employees", "Cancel"];
let employeeRecordList = ["first_name", "last_name", "role_id", "manager_id", "cancel"];

// creates a new instance of the inquire class to be used throughout the program
const inquire = new Inquire(initialResponseOptions, tableOptions, deleteOptions);

// sets up connection the the mysql database
var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'employeeTracker_db'
});

// connects to the database then runs the app
connection.connect((err) => {
    if (err) throw err;
    runApp();
});



// the base of the app which runs the initial query then determines which functions to run based on the user response to the initial query
const runApp = () => {
    inquire.initialQuery()
        .then((answer) => {
            switch (answer.initialResponse) {
                case "Add Department, Role, or Employee":
                    addCase();
                    break;
                
                case "View Departments, Roles, Employees, or All Records":
                    viewCase();
                    break;
                
                case "Update Employee":
                    updateCase();
                    break;

                case "Delete Employee":
                    deleteCase();
                    break;

                case "Exit":
                    connection.end();
                    break;
            }

        }); //end .then

}; //end function runApp()



// this function queries the user as to whether they want to add a department, role, or employee to the database
// runs an associated app depending on which option the user selects
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

        }); //end inquire.add().then

}; //end function addCase()



// this function queries the user as to whether they want to delete one employee or all employees
// runs an associated app depending on which option the user selects
const deleteCase = () => {

        inquire.delete()
            .then((answer) => {

                switch(answer.deleteResponse) {
                    case "Delete One Employee":
                        deleteOne();
                        break;

                    case "Delete All Employees":
                        deleteAll()
                        break;

                    case "Cancel":
                        runApp();
                        break;

                }

            }); //end inquire.delete().then

}; //end deleteCase()



// this function queries the user as to which employee they want to delete
// the resulting employee id will be used to run a DELETE query from the employee table
const deleteOne = () => {
    connection.query(`SELECT id, first_name, last_name FROM employee;`, function(err, res) {
        if (err) throw err;

        console.table(res);

        inquire.deleteOneEmployee()
            .then((answer) => {

                connection.query(`DELETE FROM employee WHERE id = ${answer.chosenEmployee};`, function(err, res) {
                    if (err) throw err;

                    console.log(`Employee ${answer.chosenEmployee} successfully deleted`);

                    runApp();
                }); //end DELETE sql query

            }); //end inquire.deleteOneEmployee().then

    }); //end SELECT sql query

}; //end function deleteOe()



// if the user opts to delete all employees, this function queries the employee table for all employee ids
// the function then creates a string of employee ids from the response of the query then deletes all employees using the string of ids
const deleteAll = () => {
    connection.query("SELECT id FROM employee;", function(err, res) {
        if (err) throw err;

        const idArray = [];

        res.forEach(object => {

            idArray.push(object.id);
            
        }); //end forEach

        const idString = idArray.join(', ');
        
        connection.query(`DELETE FROM employee WHERE id IN (${idString});`, function(err, res) {

            if (err) throw err;

            console.log("All employee records successfully deleted");

            runApp();

        }); //end DELETE sql query

    }); //end SELECT sql query

}; //end cuntion deleteAll()



// this function asks the user if they want to view departments, roles, employees, or all records then runs an associated function
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

            } //end switch conditional

        }); //end inquire.view().then
    
}; //end function viewCase()



// this function queries the database for a list of employee names and ids and asks the user to select the employee they want to update
// then the user is asked what value they want to update for the selected employee and an update function is run based on the user response
const updateCase = () => {

    connection.query('SELECT id, first_name, last_name FROM employee;', function(err, res) {
        if (err) throw err;

        console.table(res);

        const idArray = [];

        res.forEach(object => {

            idArray.push(object.id);
            
        }); //end forEach
        

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

                        connection.query('SELECT id, title FROM role;', function(err, res) {
                            if (err) throw err;

                            console.table(res);


                            inquire.updateRoleId()
                                .then((value) => {
                                    updateEmployee(answer.selectedEmployee, answer.selectedRecord, value.updatedRoleId);
                                });

                        });

                        break;

                    case "manager_id":

                        connection.query('SELECT id, first_name, last_name FROM employee;', function(err, res) {
                            if (err) throw err;

                            console.table(res);

                            inquire.updateManagerId()
                                .then((value) => {
                                    updateEmployee(answer.selectedEmployee, answer.selectedRecord, value.updatedManagerId);
                                });

                        });

                        break;


                    case "cancel":
                        runApp();
                        break;

                } //end switch conditional

            }); //end inquire.update().then
        
    }); //end SELECT sql query

}; //end function updateCase()



// this function accepts the values passed from the inquirer class and queries the database to update the selected employee and value
const updateEmployee = (id, parameter, updatedValue) => {

    connection.query(`UPDATE employee SET ${parameter} = '${updatedValue}' WHERE id = ${id};`, function(err, res) {
        if (err) throw err;

        console.log(`Successfully updated ${parameter} for employee ${id}`);

        connection.query(`SELECT * FROM employee WHERE id = ${id};`, function(err, res) {

            if (err) throw err;

            console.table(res);

            runApp();

        }); //end SELECT sql query

    }); //end UPDATE sql query

}; //end function updateEmployee()



// this function asks the user for the new department to add then queries the database to add the new department
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

                }); //end SELECT sql query

            }); //end INSERT sql query

        }); //end inquire.department().then

}; //end function addDepartment()



// this function queries the user for values to add to the new role then queries the database to add the new role
const addRole = () => {

    connection.query('SELECT * FROM department;', function(err, res) {
        if (err) throw err;

        console.table(res);

        inquire.role()
            .then((answer) => {

                connection.query(`INSERT INTO role (title, salary, department_id) VALUES ('${answer.newRole}', ${answer.newSalary}, ${answer.newDepartmentId});`, function(err, res) {
                    if (err) throw err;
                    console.log("New role successfuly added");

                    connection.query(`SELECT * FROM role WHERE title = '${answer.newRole}';`, function(err, res) {

                        if (err) throw err;

                        console.table(res);

                        runApp();

                    }); // end SELECT sql query

                }); // end INSERT sql query

            }); // end inquire.role().then

    }); // end SELECT sql query

}; // end function addRole()



// this function queries the user for values to add to the new employee then queries the database to add the new employee
const addEmployee = () => {

    connection.query('SELECT id, title FROM role;', function(err, res) {
        if (err) throw err;

        console.table(res);

        inquire.employee()
            .then((answer) => {

                connection.query(`INSERT INTO employee (first_name, last_name, role_id) VALUES ('${answer.newFirstName}', '${answer.newLastName}', ${answer.newRoleId});`, function(err, res) {
                    if (err) throw err;

                    console.log("New employee successfully added");

                    connection.query(`SELECT * FROM employee WHERE first_name = '${answer.newFirstName}' AND last_name = '${answer.newLastName}';`, function(err, res) {
                        
                        if (err) throw err;

                        console.table(res);

                        runApp();

                    }); //end SELECT sql query

                }); //end INSERT sql query

            }); //end inquire.employee().then

    }); //end SELECT sql query

}; //end function addEmployee()



// this function queries the database for all records from a selected table then displays the table to the console
const viewTables = (table) => {

    connection.query(`SELECT * FROM ${table};`, function(err, res) {
        
        if (err) throw err;

        console.table(res);

        runApp();

    }); //end SELECT sql query

}; //end function viewTables()


// this function queries the database with a right and left join query to display all records to the console
const viewAll = () => {

    connection.query(`SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.department_name FROM role LEFT JOIN department ON role.department_id = department.id RIGHT JOIN employee ON role.id = employee.role_id;`, function (err, res) {
        if (err) throw err;

        console.table(res);

        runApp();

    }); //end SELECT sql query

}; //end function viewAll()

