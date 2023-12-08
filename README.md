# Student-Hub

Final year project

## Setting up the project

- Rename the `server/.env.example` file in the server directory to `.env`
- Edit the environment variables according to your Postgres credentials
- Create a database in postgres using psql or similar, ensure the same databse is used in your .env file.
- Setup the database (includes dummy data) using SQL in `server/db.sql`. Omit `CREATE DATABASE` on `line 1` if you are changing the database name.

## Running the project

### Starting the server

- Open a terminal in the project directory.
- Navigate into the server directory using `cd .\server\`.
- Start the server using `npm start`.
- `server has started on port $PORT` should be printed on the terminal.

### Starting the client

- Open a terminal in the project directory.
- Navigate into the client directory using `cd .\client\`.
- Start the client using `npm start`.
- Open [http://localhost:3000](http://localhost:3000) to view it in your browser.
- Home page is still under development so move to the login page by clicking on the login button on the top right of the navbar.

## Dummy User Information

### Admin User

Email: `admin@mytudublin.ie`
Password: `admin123`
Name: `Admin Persona`

### Student User

#### Student 1:

Email: `student@mytudublin.ie`\
Password: `student123`\
Name: `Test Student`

#### Student 2:

Email: `student2@mytudublin.ie`\
Password: `student123`\
Name: `Test Student 2`
