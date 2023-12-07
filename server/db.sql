CREATE DATABASE student_hub_v1;
-- Users Table
CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
    user_email VARCHAR(255) UNIQUE NOT NULL,
    user_password VARCHAR(255) NOT NULL,
    user_type VARCHAR(10) NOT NULL check(user_type IN ('admin', 'student'))
);
INSERT INTO users (user_email, user_password, user_type)
VALUES ('aayush@gmail.com', 'aayush123', 'admin');
INSERT INTO users (user_email, user_password, user_type)
VALUES ('test@gmail.com', 'test123', 'student');