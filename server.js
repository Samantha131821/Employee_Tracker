const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');
const Connection = require('mysql2/typings/mysql/lib/Connection');
// const connection = require('./db/connection');

const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // MySQL password
      password: 'Password123',
      database: 'employee_db'
    },
    console.log(`Connected to the employee_db database.`)
  );


inquirer.prompt ([
        {
            type: 'list',
            name: 'startQuestions',
            message: 'What would you like to do?',
            choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add a Department', 'Add a Role', 'Add an Employee', 'Update an Employee Role', 'Quit']
        }
    ]).then((answer) => {
        if(answer = choices[0]){
            viewAllDepartments();
        } else if(answer = choices[1]){
            viewAllRoles();
        } else if(answer = choices[2]){
            viewAllEmployees();
        } else if(answer = choices[3]){
            addDepartment();
        } else if(answer = choices[4]){
            addRole();
        } else if(answer = choices[5]){
            addEmployee();
        } else if(answer = choices[6]){
            updateEmployeeRole();
        } 
    });

    function viewAllEmployees() {
        var employeesArray = [];
        var query = "SELECT employee.id, first_name, last_name, title, salary, department_name FROM employee JOIN employee_role ON (employee_role.id = employee_role.id) JOIN department ON (department.id = employee_role.department_id)";
    }