CREATE DATABASE manager;

CREATE TABLE employee (
    employee_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    firstname VARCHAR(50),
    lastname VARCHAR(50) NOT NULL,
    email VARCHAR(255) UNIQUE,
    department_id uuid REFERENCES department(department_id)
)

CREATE TABLE department (
    department_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    department_name VARCHAR(255) UNIQUE NOT NULL
)

CREATE TABLE users (
    user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    avatar TEXT
)

CREATE TABLE supervisor (
    supervisor_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    supervisor_name VARCHAR(255),
    employee_id uuid REFERENCES employee(employee_id)
)