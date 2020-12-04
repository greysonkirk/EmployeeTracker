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
    askUser();
});



function departments() {

    inquirer
        .prompt([{
            type: 'checkbox',
            name: 'action',
            message: "What do you want to do? \n",
            choices: ['Add Department', 'Update Department', 'Remove Department\n']
        }])
        .then((response) => {
            if (response.action == 'Add Department') {
                addDepartment();

            } else if (response.action == 'Update Department') {
                updateDepartment();

            } else if (response.action == 'Remove Department\n') {
                deleteDepartment();

            } else(console.log("somethings wrong"))

        });

};


function addDepartment() {

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


function updateDepartment() {

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
                console.log("UPDATING: " + answer.employee.first_name + " " + answer.employee.last_name + " ID: " + answer.employee.id)
                connection.query("SELECT * FROM role",
                    function(err, roles) {
                        if (err) throw err;
                        //console.table(response)
                        inquirer
                            .prompt([{
                                name: "empRole",
                                type: "list",
                                choices: roles.map(role => ({ name: role.id + " " + role.title, value: role.id })),
                                message: "What is the employees role?"
                            }]).then(response => {
                                console.log(response.empRole);
                                connection.query("UPDATE employee SET ? WHERE ?", [{
                                        role_id: response.empRole
                                    },
                                    {
                                        id: answer.employee.id
                                    }
                                ], function() {
                                    if (err) throw err;
                                    console.log("role recived")
                                })
                            }).then(response => {
                                connection.query("SELECT * FROM employee WHERE is_manager = 1", function(err, managers) {
                                    if (err) throw err;
                                    inquirer
                                        .prompt([{
                                            name: "empManager",
                                            type: "list",
                                            choices: managers.map(manager => ({ name: manager.first_name + " " + manager.last_name, value: manager.id })),
                                            message: "What is the employees manager?"
                                        }]).then(setMan => {
                                            connection.query("UPDATE employee SET ? WHERE ?", [{
                                                manager_id: setMan.empManager
                                            }, {
                                                id: answer.employee.id
                                            }], function(err, response) {
                                                if (err) throw err;
                                                console.log("Employee has been updated!!!")
                                            });
                                        })
                                })
                            })
                    });





            })
    });
};


function deleteDepartment() {

    connection.query("SELECT * FROM employee", function(err, employees) {
        if (err) throw err;

        inquirer
            .prompt([{
                name: "employee",
                type: "list",
                choices: employees.map(employee => ({ name: employee.first_name + " " + employee.last_name, value: employee })),
                message: "Which employee would you like to delete?"
            }, {
                name: "confirm",
                type: "confirm",
                message: "Are you sure you want to do this?"
            }])
            .then(function(answer) {
                if (answer.confirm) {
                    console.log("\x1b[31m", "DELETING: " + answer.employee.first_name + " " + answer.employee.last_name + " ID: " + answer.employee.id)
                    connection.query("DELETE FROM employee where ? ", { id: answer.employee.id }, function(err) {
                        if (err) throw err;
                        console.log("\x1b[31m", answer.employee.first_name + " " + answer.employee.last_name + " was deleted")
                    })
                } else { askUser(); }

            });

    })
};