require("dotenv").config(); // Load .env variables
const { exec } = require("child_process");

const databaseName = process.env.PGDATABASE || "student_hub_v1"; // Default to 'student_hub_v1' if not specified
const databaseUser = process.env.PGUSER;
const resetScriptPath = "./src/scripts/reset_db.sql";

// Command to reset the database
const command = `psql -d ${databaseName} -U ${databaseUser} -f ${resetScriptPath}`;

exec(command, (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
  console.error(`stderr: ${stderr}`);
});
