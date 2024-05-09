
// Sure, I can guide you through developing a web application to automate this process. We'll use Node.js for the backend, JavaScript for the frontend, and MySQL for the database. We'll also use Express.js as the web framework for Node.js.

// Let's break it down into steps:

// Set up your Node.js project.
// Create a web form for inputting non-user IDs and new employee IDs.
// Handle the form submission in the backend.
// Connect to the MySQL database and perform the required SQL queries.
// Display the results or success message on the web page.
// Here's a step-by-step guide to achieve this:

// Step 1: Set up your Node.js project
// First, make sure you have Node.js installed on your system. Then, create a new directory for your project and initialize a Node.js project:

// bash
// Copy code
// mkdir employee-id-update-app
// cd employee-id-update-app
// npm init -y
// Install necessary packages:

// bash
// Copy code
// npm install express mysql ejs body-parser

const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');

// MySQL Connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'your_username',
    password: 'your_password',
    database: 'SECPRDDB'
});

// Connect to MySQL
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to database: ' + err.stack);
        return;
    }
    console.log('Connected to database as ID ' + connection.threadId);
});

// Route for rendering the form
app.get('/', (req, res) => {
    res.render('index');
});

// Route for handling form submission
app.post('/update', (req, res) => {
    const nonUserId = req.body.nonUserId;
    const newEmployeeId = req.body.newEmployeeId;

    // SQL query to update employee ID
    const sql = `UPDATE user_tool SET EE_CONTR_ID = ?, UPDT_USER_ID = ? WHERE user_nm = ?`;

    connection.query(sql, [newEmployeeId, '<yourSecondary ID>', nonUserId], (err, result) => {
        if (err) {
            console.error('Error updating employee ID: ' + err.message);
            res.status(500).send('Error updating employee ID');
            return;
        }
        console.log('Employee ID updated successfully');
        res.send('Employee ID updated successfully');
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

