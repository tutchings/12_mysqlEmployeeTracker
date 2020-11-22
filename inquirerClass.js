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


}

module.exports = Inquire;