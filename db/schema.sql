DROP DATABASE IF EXISTS employeeMgmt_db;
CREATE DATABASE employeeMgmt_db;

USE employeeMgmt_db;

DROP TABLE IF EXISTS department;
CREATE TABLE department (
  dept_id INT AUTO_INCREMENT PRIMARY KEY,
  depName VARCHAR(30)
);

DROP TABLE IF EXISTS emp_role;
CREATE TABLE emp_role (
  role_id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30),
  salary DECIMAL,
  department_id INT,
  FOREIGN KEY (department_id)
  REFERENCES department(dept_id)
);

DROP TABLE IF EXISTS employee;
CREATE TABLE employee (
  emp_id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INT,
  manager_id INT,
  FOREIGN KEY (role_id) REFERENCES emp_role(role_id),
  FOREIGN KEY (manager_id) REFERENCES employee(emp_id)
);
