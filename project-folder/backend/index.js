const express = require('express');
const bodyParser = require('body-parser');
const { fetchEmails, extractTasks, getTasks, analyzeEmails, processAllEmails } = require('./controllers/emailController');

const app = express();
const port = process.env.PORT || 3000;

// Middleware for parsing JSON bodies
app.use(bodyParser.json());

// Define API endpoints for email operations
app.get('/fetchEmails', fetchEmails); // Fetch emails from Gmail
app.post('/extractTasks', extractTasks); // Extract tasks from email body
app.get('/getTasks', getTasks); // Retrieve tasks from memory store
app.post('/analyzeEmails', analyzeEmails); // Analyze email using ChatGPT
app.get('/processEmails', processAllEmails); // Process emails (fetch, analyze, extract tasks)

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
