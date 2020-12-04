var mysql = require("mysql");
const inquirer = require("inquirer");
const { inherits } = require("util");
const { report } = require("process");

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
    init();
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
            if (response.action == 'Add Employee') {
                addEmp();

            } else if (response.action == 'Update Employee') {
                updateEmp();

            } else if (response.action == 'Remove Employee') {
                deleteEmp();

            } else(console.log("somethings wrong"))

        });

};


function addEmp() {

    connection.query("SELECT * FROM role", function(err, roles) {
        if (err) throw err;

        inquirer
            .prompt([{
                name: "empFirst",
                type: "input",
                message: "What is the employees first name?"
            }, {
                name: "empLast",
                type: "input",
                message: "What is the employees last name?"
            }, {
                name: "empRole",
                type: "list",
                choices: roles.map(role => ({ name: role.id + " " + role.title, value: role.id })),
                message: "What is the employees role?"
            }])
            .then(function(answer) {

                connection.query("SELECT * FROM employee where is_manager = 1 ", function(err, managers) {
                    if (err) throw err;



                    inquirer
                        .prompt([{
                            name: "empManager",
                            type: "list",
                            choices: managers.map(manager => ({ name: manager.first_name + " " + manager.last_name, value: manager.id })),
                            message: "What is the employees manager?"
                        }]).then(function(response) {
                            console.log(answer.empRole)

                            connection.query("INSERT INTO employee SET ?", {
                                    first_name: answer.empFirst,
                                    last_name: answer.empLast,
                                    role_id: answer.empRole,
                                    manager_id: response.empManager
                                },
                                function(err, response) {
                                    if (err) throw err;
                                    console.log("Employee succesfully added!!!")
                                }

                            )
                        });

                })

            })
    });
};


function updateEmp() {

    connection.query("SELECT * FROM employee", function(err, employees) {
        if (err) throw err;

        inquirer
            .prompt([{
                name: "employee",
                type: "list",
                choices: employees.map(employee => ({ name: employee.first_name + " " + employee.last_name, value: employee })),
                message: "Which employee would you like to update?"
            }])
            .then(function(answer) {
                console.log("\x1b[31m", answer.employee.first_name + " " + answer.employee.last_name + " " + answer.employee.id)
                connection.query("SELECT * FROM employee where ?", {
                        id: answer.employee.id
                    },
                    function(err, response) {
                        if (err) throw err;
                        console.table(response)


                        // inquirer
                        //     .prompt([{
                        //         name: "empManager",
                        //         type: "list",
                        //         choices: managers.map(manager => ({ name: manager.first_name + " " + manager.last_name, value: manager.id })),
                        //         message: "What is the employees manager?"
                        //     }]).then(function(response) {
                        //         console.log(answer.empRole)

                        //         connection.query("INSERT INTO employee SET ?", {
                        //                 first_name: answer.empFirst,
                        //                 last_name: answer.empLast,
                        //                 role_id: answer.empRole,
                        //                 manager_id: response.empManager
                        //             },
                        //             function(err, response) {
                        //                 if (err) throw err;
                        //                 console.log("Employee succesfully added!!!")
                        //             }

                        //         )
                        //     });

                    })

            })
    });
};


function init() {
    console.log("\x1b[31m", "STARTING EMPLOYEE MANAGER")
}