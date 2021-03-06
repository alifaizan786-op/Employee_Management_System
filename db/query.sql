SELECT 
employee.first_name, 
employee.last_name, 
emp_role.title, 
emp_role.salary, 
department.depname, 
CONCAT(e.first_name, ' ' ,e.last_name) AS Manager 
FROM employee 
INNER JOIN role on role.id = employee.role_id 
INNER JOIN department on department.id = role.department_id 
left join employee e on employee.manager_id = e.id;