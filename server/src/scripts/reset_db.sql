-- Drop existing tables if they exist to start fresh
DROP TABLE IF EXISTS announcements,
apps,
adminTasks,
tasks,
users CASCADE;
-- Create Users Table
CREATE TABLE users(
  user_id SERIAL PRIMARY KEY,
  user_email VARCHAR(255) UNIQUE NOT NULL,
  user_password VARCHAR(255) NOT NULL,
  user_name VARCHAR(255) NOT NULL,
  user_type VARCHAR(10) NOT NULL CHECK (user_type IN ('admin', 'student'))
);
-- Create Tasks Table
CREATE TABLE tasks(
  task_id SERIAL PRIMARY KEY,
  task_title VARCHAR(255) NOT NULL,
  task_url VARCHAR(255) NOT NULL,
  task_createdAt DATE DEFAULT CURRENT_DATE,
  task_deadline DATE DEFAULT (CURRENT_DATE + INTERVAL '7 days'),
  user_id INTEGER,
  CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES users(user_id) ON DELETE CASCADE
);
-- Create Admin Tasks Table
CREATE TABLE adminTasks(
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) UNIQUE NOT NULL
);
-- Create Apps Table
CREATE TABLE apps (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  image_url VARCHAR(255),
  app_link VARCHAR(255) NOT NULL
);
-- Create Announcements Table
CREATE TABLE announcements (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  image_url VARCHAR(255),
  description TEXT NOT NULL,
  createdAt DATE DEFAULT CURRENT_DATE
);
-- Insert Dummy Data for Users
INSERT INTO users (user_email, user_password, user_name, user_type)
VALUES (
    'admin@mytudublin.ie',
    'admin123',
    'Admin Persona',
    'admin'
  ),
  (
    'student@mytudublin.ie',
    'student123',
    'Test Student',
    'student'
  ),
  (
    'student2@mytudublin.ie',
    'student123',
    'Test Student 2',
    'student'
  );
-- Insert Dummy Data for Tasks
INSERT INTO tasks (
    task_title,
    task_url,
    task_createdAt,
    task_deadline,
    user_id
  )
VALUES (
    'Complete Action Item: Event Registration',
    'https://forms.gle/MMmWxPeyHZKhN3Ej6',
    '2024-01-01',
    '2024-04-30',
    1
  ),
  (
    'Complete Action Item: Event Registration',
    'https://forms.gle/MMmWxPeyHZKhN3Ej6',
    '2024-01-01',
    '2024-04-30',
    2
  ),
  (
    'Complete Action Item: Event Registration',
    'https://forms.gle/MMmWxPeyHZKhN3Ej6',
    '2024-01-01',
    '2024-04-30',
    3
  ),
  (
    'Complete Action Item: Career Fair Registration',
    'https://forms.gle/MMmWxPeyHZKhN3Ej6',
    '2024-02-01',
    '2024-05-21',
    1
  ),
  (
    'Complete Action Item: Career Fair Registration',
    'https://forms.gle/MMmWxPeyHZKhN3Ej6',
    '2024-02-01',
    '2024-05-21',
    2
  ),
  (
    'Complete Action Item: Career Fair Registration',
    'https://forms.gle/MMmWxPeyHZKhN3Ej6',
    '2024-02-01',
    '2024-05-21',
    3
  ),
  (
    'Complete Action Item: T-Shirt Sign Up',
    'https://forms.gle/EoMfwxeqmfrQ2p59A',
    '2024-04-01',
    '2024-06-21',
    1
  ),
  (
    'Complete Action Item: T-Shirt Sign Up',
    'https://forms.gle/EoMfwxeqmfrQ2p59A',
    '2024-04-01',
    '2024-06-21',
    2
  ),
  (
    'Complete Action Item: T-Shirt Sign Up',
    'https://forms.gle/EoMfwxeqmfrQ2p59A',
    '2024-04-01',
    '2024-06-21',
    3
  ),
  (
    'Register for FYP Demo',
    'https://forms.gle/VMdtmeLAxH6QMFP77',
    '2024-04-01',
    '2024-04-25',
    1
  ),
  (
    'Register for FYP Demo',
    'https://forms.gle/VMdtmeLAxH6QMFP77',
    '2024-04-01',
    '2024-04-25',
    2
  ),
  (
    'Register for FYP Demo',
    'https://forms.gle/VMdtmeLAxH6QMFP77',
    '2024-04-01',
    '2024-04-25',
    3
  );
-- Insert Dummy adminTasks
INSERT INTO adminTasks (title)
VALUES ('Create Task'),
  ('Create App'),
  ('Create Announcement');
-- Insert Dummy Apps
INSERT INTO apps (name, image_url, app_link)
VALUES (
    'Library',
    'uploads\library.png',
    'https://www.tudublin.ie/library/'
  ),
  (
    'Brightspace',
    'uploads\brightspace.png',
    'https://brightspace.tudublin.ie/d2l/home'
  );
INSERT INTO announcements (title, image_url, description)
VALUES (
    'Response to the COVID-19 Pandemic',
    'uploads\covid.jpg',
    'All COVID-19 restrictions for travelling to Ireland have been lifted. You no longer need to complete a passenger locator form. You also no longer need proof of vaccination or recovery, or a COVID-19 test.'
  ),
  (
    'Emergency Communications',
    'uploads\covid.jpg',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nulla porttitor massa id neque aliquam vestibulum morbi.'
  );