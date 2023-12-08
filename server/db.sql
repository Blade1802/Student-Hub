CREATE DATABASE student_hub_v1;
-- Users Table
CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
    user_email VARCHAR(255) UNIQUE NOT NULL,
    user_password VARCHAR(255) NOT NULL,
    user_name VARCHAR(255) NOT NULL,
    user_type VARCHAR(10) NOT NULL check(user_type IN ('admin', 'student'))
);
-- Tasks table
CREATE TABLE tasks(
    task_id SERIAL PRIMARY KEY,
    task_title VARCHAR(255) NOT NULL,
    task_url VARCHAR(255) NOT NULL,
    task_createdAt DATE DEFAULT current_date,
    user_id INTEGER,
    CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES users(user_id) ON DELETE CASCADE
);
-- Dummy Data - Users
INSERT INTO users (user_email, user_password, user_name, user_type)
VALUES (
        'admin@mytudublin.ie',
        'admin123',
        'Admin Persona',
        'admin'
    );
INSERT INTO users (user_email, user_password, user_name, user_type)
VALUES (
        'student@mytudublin.ie',
        'student123',
        'Test Student',
        'student'
    );
INSERT INTO users (user_email, user_password, user_name, user_type)
VALUES (
        'student2@mytudublin.ie',
        'student123',
        'Test Student 2',
        'student'
    );
-- Dummy Data - Tasks
INSERT INTO tasks (task_title, task_url, user_id)
VALUES (
        'Complete Action Item: Event Registration',
        'https://forms.gle/MMmWxPeyHZKhN3Ej6',
        1
    );
INSERT INTO tasks (task_title, task_url, user_id)
VALUES (
        'Complete Action Item: T-Shirt Sign Up',
        'https://forms.gle/EoMfwxeqmfrQ2p59A',
        1
    );