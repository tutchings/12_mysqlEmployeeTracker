const inquirer = require("inquirer");

class Inquire {
    constructor(initialOptions, tableOptions) {
        this.initialOptions = initialOptions;
        this.tableOptions = tableOptions;
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

    view() {
        return inquirer.prompt([
            {
                type: 'list',
                message: 'What do you want to view: ',
                name: 'viewResponse',
                choices: this.tableOptions
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



}

module.exports = Inquire;