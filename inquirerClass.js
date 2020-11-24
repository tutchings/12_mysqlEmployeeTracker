const inquirer = require("inquirer");

class Inquire {
    constructor(initialOptions, tableOptions, deleteOptions) {
        this.initialOptions = initialOptions;
        this.tableOptions = tableOptions;
        this.deleteOptions = deleteOptions;
    }

    initialQuery() {
        return inquirer.prompt([
            {
                type: 'list',
                message: 'Please select an option from the following list: ',
                name: 'initialResponse',
                choices: this.initialOptions
            }
        ]);
    }

    add() {
        return inquirer.prompt([
            {
                type: 'list',
                message: 'What do you want to add: ',
                name: 'addResponse',
                choices: this.tableOptions
            }
        ]);
    }

    delete() {
        return inquirer.prompt([
            {
                type: 'list',
                message: 'What do you want to delete: ',
                name: 'deleteResponse',
                choices: this.deleteOptions
            }
        ]);
    }

    view(viewOptions) {
        return inquirer.prompt([
            {
                type: 'list',
                message: 'What do you want to view: ',
                name: 'viewResponse',
                choices: viewOptions
            }
        ]);
    }


    deleteOneEmployee() {
        return inquirer.prompt([
            {
                type: 'input',
                message: 'Enter the ID of the employee whose records you want to delete: ',
                name: 'chosenEmployee'
            }
        ]);
    }


    update(employeeList, employeeRecordList) {
        return inquirer.prompt([
            {
                type: 'list',
                message: 'Select the ID of the employee whose records you want to update: ',
                name: 'selectedEmployee',
                choices: employeeList
            },
            {
                type: 'list',
                message: 'Select the record you want to update: ',
                name: 'selectedRecord',
                choices: employeeRecordList
            }
        ]);
    }

    updateFirstName() {
        return inquirer.prompt([
            {
                type: 'input',
                message: 'Enter the updated first name for this employee: ',
                name: 'updatedFirstName',
            }
        ]);
    }

    updateLastName() {

        return inquirer.prompt([
            {
                type: 'input',
                message: 'Enter the updated last name for this employee: ',
                name: 'updatedLastName',
            }
        ]);

    }

    updateRoleId() {

        return inquirer.prompt([
            {
                type: 'input',
                message: 'Enter the updated role id for this employee: ',
                name: 'updatedRoleId',
            }
        ]);

    }

    updateManagerId() {

        return inquirer.prompt([
            {
                type: 'input',
                message: 'Enter the updated manager id for this employee: ',
                name: 'updatedManagerId',
            }
        ]);

    }

    department() {
        return inquirer.prompt([
            {
                type: 'input',
                message: 'Enter the name of the department to add: ',
                name: 'newDepartment'
            }
        ]);
    }

    role() {
        return inquirer.prompt([
            {
                type: 'input',
                message: 'Enter the name of the role to add: ',
                name: 'newRole'
            },
            {
                type: 'input',
                message: 'Enter the salary for the new role',
                name: 'newSalary'
            },
            {
                type: 'input',
                message: 'Enter the department id for the new role',
                name: 'newDepartmentId'
            }
        ]);
    }

    employee() {
        return inquirer.prompt([
            {
                type: 'input',
                message: 'Enter the first name of the employee to add',
                name: 'newFirstName'
            },
            {
                type: 'input',
                message: 'Enter the last name of the employee to add',
                name: 'newLastName'
            },
            {
                type: 'input',
                message: 'Enter the role id of the employee to add',
                name: 'newRoleId'
            }
        ]);
    }



}

module.exports = Inquire;