const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');

// create the connection to database
const connection = mysql.createConnection({host: 'localhost', user: 'root', password: 'root', database: 'employeeMgmt_db'});

connection.connect(err => {
    if (err) 
        throw err;
    
    console.log('connected as id ' + connection.threadId);
    afterConnection();
});

afterConnection = () => {
    console.log("=====================================")
    console.log("||                                 ||")
    console.log("||        EMPLOYEE MANAGER         ||")
    console.log("||                                 ||")
    console.log("=====================================")
    selectemp()
    console.log(listofemp);
    startPrompt();
};

function startPrompt() {
    inquirer.prompt([{
            type: 'list',
            message: 'What would you like to do?',
            name: 'action',
            choices: [
                'Add Role',
                'Add Department',
                'Add Employee',
                'View All Roles',
                'View All Departments',
                'View All Employee',
                'Update Employee Role'
            ]
        }]).then((answers) => {
        if (answers.action === 'Add Role') {
            addRole()
        }
        if (answers.action === 'Add Department') {
            addDept()
        }
        if (answers.action === 'Add Employee') {
            addEmp()
        }
        if (answers.action === 'View All Roles') {
            viewRoles()
        }
        if (answers.action === 'View All Departments') {
            viewDept()
        }
        if (answers.action === 'View All Employee') {
            viewEmp()
        }
        if (answers.action === 'Update Employee Role') {
            updateEmpRole()
        }
    }).catch((error) => {
        if (error.isTtyError) { // Prompt couldn't be rendered in the current environment
        } else { // Something else went wrong
        }
    });
}

var listofroles = [];
function selectRole() {
    connection.query("SELECT * FROM emp_role", function (err, res) {
        if (err) 
            throw err
        for (var i = 0; i < res.length; i++) {
            listofroles.push(res[i].title);
        }

    })
    return listofroles;
}

var listofemp = [];
function selectemp() {
    connection.query("SELECT * FROM employee", function (err, res) {
        if (err) 
            throw err
        for (var i = 0; i < res.length; i++) {
            listofemp.push(res[i].first_name);

        }

    })
    return listofemp;
}

var listofdepts = [];
function selectdept() {
    connection.query("SELECT * FROM department", function (err, res) {
        if (err) 
            throw err
        for (var i = 0; i < res.length; i++) {
            listofdepts.push(res[i].depName);
        }

    })
    return listofdepts;
}

var listofmaanger = ['NULL'];
function selectmanager() {
    connection.query("SELECT * FROM employee where manager_id IS NULL;", function (err, res) {
        if (err) 
            throw err
        for (var i = 0; i < res.length; i++) {
            listofmaanger.push(res[i].first_name);
        }

    })
    return listofmaanger;
}

function addRole() {
    inquirer.prompt([
        /* Pass your questions in here */
        {
            type: 'input',
            message: 'What is the Role Title ?',
            name: 'role_name'
        }, {
            type: 'input',
            message: 'What is the Role Salary ?',
            name: 'role_salary'
        }, {
            type: 'list',
            message: 'What is the Role department ?',
            name: 'dept',
            choices: selectdept()
        }
    ]).then((answers) => {
        connection.query(`INSERT INTO emp_role (title, salary, department_id)
    VALUES ("${
            answers.role_name
        }", ${
            answers.role_salary
        } , ${
            listofdepts.indexOf(answers.dept) + 1
        })`),
        function (err) {
            if (err) 
                throw err
            startPrompt()
        }
        console.log('Role Successfully added')
        startPrompt()
    })
}

function addDept() {
    inquirer.prompt([
        {
            type: 'input',
            message: 'What is the name of the department?',
            name: 'dept',
        }
    ]).then((answers) => {
        connection.query(`INSERT INTO department (depName)
        VALUES ("${answers.dept}")`),
        function (err) {
            if (err) 
                throw err
            startPrompt()
        }
        console.log('Department Successfully added')
        startPrompt()
    })
}

function addEmp() {
    inquirer.prompt([
        {
            type: 'input',
            message: 'What is the First name of the Employee?',
            name: 'first_name',
        },{
            type: 'input',
            message: 'What is the last name of the Employee?',
            name: 'last_name',
        },{
            type: 'list',
            message: 'What is the Role of the Employee?',
            name: 'emp_role',
            choices: selectRole()

        },{
            type: 'list',
            message: 'Who is the manager of the Employee?',
            name: 'manager',
            choices: selectmanager()

        }
    ]).then((answers) => {
        connection.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) 
        VALUES (
        "${answers.first_name}", 
        "${answers.last_name}", 
        ${listofroles.indexOf(answers.emp_role)+1}, 
        ${listofmaanger.indexOf(answers.manager)});`),
        function (err) {
            if (err) 
                throw err
            startPrompt()
        }
        console.log('Employee Successfully added')
        startPrompt()
    })
}

function viewRoles(){
    let query = `SELECT * FROM emp_role JOIN department ON emp_role.department_id = department.id`
    connection.query(query, function (err, res){
        if (err) throw err
        console.table(res)
        startPrompt()
    })
}

function viewDept(){
    let query = `SELECT * FROM department`
    connection.query(query, function (err, res){
        if (err) throw err
        console.table(res)
        startPrompt()
    })
}

function viewEmp(){
    let query = `SELECT * FROM employee JOIN emp_role ON employee.role_id = emp_role.role_id`
    connection.query(query, function (err, res){
        if (err) throw err
        console.table(res)
        startPrompt()
    })
}

function updateEmpRole(){
    inquirer.prompt([
        {
            type: 'list',
            message: 'Which employee role you would like to update?',
            name: 'emp_name',
            choices: selectemp()

        },{
            type: 'list',
            message: 'What role would you like to assign to this employee?',
            name: 'emp_role',
            choices: selectRole()

        }
    ]).then((answers) => {
        connection.query(`UPDATE employee SET role_id = ${listofroles.indexOf(answers.emp_role)+1} WHERE emp_id = ${listofemp.indexOf(answers.emp_name)+1}`),
        function (err) {
            if (err) 
                throw err
                console.log(err);
        startPrompt()
        }
        console.log('Employee Role Changed Successfully')
        startPrompt()
    })
    
}