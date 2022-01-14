INSERT INTO department (depName)
VALUES ("Quality Assurance"),
       ("Accounts"),
       ("Sales"), 
       ("Customer Service"),
       ("Human Resource"),
       ("Marketing"),
       ("IT");

INSERT INTO emp_role (title, salary, department_id)
VALUES ("Sales Person", 25000, 3),
       ("Sales Lead", 30000, 3),
       ("Manager HR", 50000, 5), 
       ("Customer Service Rep.", 20000, 4),
       ("Graphics Designer", 45000, 6), 
       ("Marketing Strategist", 50000, 6),
       ("IT Technician", 50000, 7),
       ("CFO", 80000, 2),
       ("Quality Assurance Officer", 60000, 1),
       ("Regional Manager", 90000, 3),
       ("Web Developer", 60000, 7);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("David", "Wallace", 8, NULL),
       ("Michael", "Scott", 10, NULL),
       ("Jim", "Halpert", 1, 2),
       ("Dwight", "Shrute", 2, 2),
       ("Toby", "Flenderson", 3, 2),
       ("Kelly", "Kapoor", 4, 2),
       ("Pam", "Halpert", 5, 2),
       ("Nick", "Armstrong", 7, 2),
       ("Creed", "Bratton", 9, 2),
       ("Ryan", "Howard", 7, 2);


SELECT * FROM department;
SELECT * FROM emp_role;
SELECT * FROM employee;