var mysql = require("mysql");
const inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    // Your port; if not 3306
    port: 3306,
    // Your username
    user: "root",
    // Your password
    password: "rootroot",
    database: "employeeDB"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    askUser();
});


function askUser() {
    inquirer
        .prompt([{
            type: 'checkbox',
            name: 'action',
            message: "Where are you headed? \n",
            choices: ['Employees', 'Departments', 'Roles\n']
        }])
        .then((response) => {
            if (response.action == 'Employees') {
                employees();

            } else if (response.action == 'Departments') {
                departments();

            } else if (response.action == 'Roles') {
                roles();

            } else(console.log("somethings wrong"))

        })

};

function employees() {

    inquirer
        .prompt([{
            type: 'checkbox',
            name: 'action',
            message: "What do you want to do? \n",
            choices: ['Add Employee', 'Update Employee', 'Remove Employee\n']
        }])
        .then((response) => {
            if (response.action == 'Update Employee') {
                updateEmp();

            } else if (response.action == 'Remove Employee') {
                deleteEmp();

            } else(console.log("somethings wrong"))

        });
    addEmp();
};

// function addEmp(){

// }