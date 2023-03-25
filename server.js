const inquirer = require('inquirer');
const cTable = require('console.table');
const mysql = require('mysql2');
const db = require('./connection');

const options = ['View All Departments', 'View All Roles', 'View All Employees', 'Add a Department', 'Add a Role', 'Add an Employee', 'Update an Employee Role', 'Quit']

inquirer.prompt ([
        {
            type: 'list',
            name: 'startQuestions',
            message: 'What would you like to do?',
            choices: options
        }
    ]).then((answer) => {
        if(answer.startQuestions == options[0]){
            viewAllDepartments();
        } else if(answer.startQuestions == options[1]){
            viewAllRoles();
        } else if(answer.startQuestions == options[2]){
            viewAllEmployees();
        } else if(answer.startQuestions == options[3]){
            addDepartment();
        } else if(answer.startQuestions == options[4]){
            addRole();
        } else if(answer.startQuestions == options[5]){
            addEmployee();
        } else if(answer.startQuestions == options[6]){
            updateEmployeeRole();
        } 
    });


    function viewAllDepartments() {
        
        db.query("SELECT * FROM department", function (err, result) {
            if (err) throw err;

            return console.table(result);
        })
    }


    function viewAllRoles() {

        db.query("SELECT * FROM employee_role", function (err, result) {
            if (err) throw err;

            return console.table(result);
        })
    }


    function viewAllEmployees() {

        db.query("SELECT * FROM employee", function (err, result) {
            if (err) throw err;

            return console.table(result);
        })

    }



    function addDepartment() {

        inquirer.prompt([
           {
            type:"input",
            name: "addDepartment",
            message: "What is the name of your Department?"
           }

        ]).then(function(answer) {
            db.query('INSERT INTO department SET ?', 
                
            { department_name: answer.addDepartment}, function (err) {
                if (err) throw err;
                
            });
            return console.log("Department added!");
        })
            
    }

    function addRole() {
        const departmentChoices = []

        db.query("SELECT * FROM department", function (err, result) {
            if (err) throw err;



            for (let i = 0; i < result.length; i++) {
                departmentChoices.push(result[i].department_name);
            }
           
        });
        
        inquirer.prompt([
           { 
            type:"input",
            name: "roleTitle",
            message: "Enter role title:"

        },
        {
            type: "input",
            name: "roleSalary",
            message: "Enter salary for this role:"
        },
        {
            type: "list",
            name: "departmentChoice",
            message: "Choose department assoiciated with this role",
            choices: departmentChoices
        }
        
        ]).then(function(answer) {
            db.query("SELECT * FROM department WHERE ?", 
                { department_name: answer.departmentChoice }, function (err, result) {
                if (err) throw err;
                console.log(result[0].id);

                db.query("INSERT INTO employee_role SET ?", {
                    title: answer.roleTitle,
                    salary: parseInt(answer.roleSalary),
                    department_id: parseInt(result[0].id)
                });

            })
            console.log("Role added!")
        })
        
    }



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
                    type: "input",
                    message: "Enter the employee's role",
                }
            ]).then((answer) => {
                db.query("SELECT * FROM employee_role WHERE ?", { title: answer.roleChoice }, function (err, result) {
                    if (err) throw err;

                    db.query("INSERT INTO employee SET ?", {
                        first_name: answer.firstName,
                        last_name: answer.lastName,
                        role_id: result[0].id
                    });
                    
                    return console.table(result);
                })
                console.log("Employee added!")
            })

            
    }

    function updateEmployeeRole(){
        inquirer.prompt([
            {
                name: "employeeFirstName",
                type:"input",
                message:"Enter the employee's first name:"
            },
            {
                name: "employeeLastName",
                type:"input",
                message:"Enter the employee's last name:"
            },

            {
                name: "updateEmployeeRole",
                type:"input",
                message:"Enter the employee's new role:"
            }

        ]).then(function(answer) {
            db.query("SELECT * FROM employee_role WHERE ?",
            { title: answer.updateEmployeeRole}, function (err, result) {
            if (err) throw err;


                db.query("UPDATE employee SET role_id = ? WHERE first_name = ? AND last_name = ?", 
                [result[0].id, answer.employeeFirstName, answer.last_name ],function (err, result) {
                    if (err) throw err;
            });
        console.log("Updated Employee Role!")
    
        })

    })
}