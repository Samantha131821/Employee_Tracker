const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');

const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // MySQL password
      password: '',
      database: 'employee_tracker'
    },
    console.log(`Connected to the classlist_db database.`)
  );

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
  

inquirer
    .prompt ([
        {
            type: 'list',
            message: 'View All Departments',
            choices: [],
            name: 'departments',
        },
        {
            type: 'list',
            message: 'View All Roles',
            choices: [],
            name: 'roles',
        },
        {
            type: 'list',
            message: 'View All Employees',
            choices: [],
            name: 'employees',
        },
        {
            type: 'list',
            message: 'Add a Department',
            choices: [],
            name: 'add_department',
        },
        {
            type: 'list',
            message: 'Add a Role',
            choices: [],
            name: 'add_role',
        },
        {
            type: 'list',
            message: 'Add an Employee',
            choices: [],
            name: 'add_employee',
        },
        {
            type: 'list',
            message: 'Update Employee Role',
            choices: [],
            name: 'update_role',
        },
    ])