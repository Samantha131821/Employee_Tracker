const inquirer = require('inquirer');
const cTable = require('console.table');
const {db} = require('./connection');

const options = ['View All Departments', 'View All Roles', 'View All Employees', 'Add a Department', 'Add a Role', 'Add an Employee', 'Update an Employee Role', 'Quit']

inquirer.prompt ([
        {
            type: 'list',
            name: 'startQuestions',
            message: 'What would you like to do?',
            choices: options
        }
    ]).then((answer) => {
        if(answer == options[0]){
            viewAllDepartments();
        } else if(answer == options[1]){
            viewAllRoles();
        } else if(answer == options[2]){
            viewAllEmployees();
        } else if(answer == options[3]){
            addDepartment();
        } else if(answer == options[4]){
            addRole();
        } else if(answer == options[5]){
            addEmployee();
        } else if(answer == options[6]){
            updateEmployeeRole();
        } 
    });


    function viewAllDepartments() {
        
        db.query("SELECT * FROM department", function (err, result) {
            if (err) throw err;

            return console.table(result);
        })
    }


    // function viewAllRoles() {

    // }


    // function viewAllEmployees() {

    // }


    // function addDepartment() {

    // }

    // function addRole() {

    // }

    function addEmployee(){
            inquirer.prompt([
                {
                    name: "firstName",
                    type:"input",
                    message:"Enter the employee's First Name:"
                },
                {
                    name: "lastName",
                    type:"input",
                    message:"Enter employee's Last Name:"
                },
                {
                    name: "roleChoice",

                }
            ]).then((data) => {
                db.query("INSERT INTO * FROM employee_role", function (err, result) {
                    if (err) throw err;
                })
            })
    }

    // function updateEmployeeRole(){
        
    // }