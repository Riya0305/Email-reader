// routes/emailRoutes.js

const express = require('express');
const router = express.Router();
const { validateEmailFormat } = require('../middleware/validationMiddleware');  // Middleware for email validation
const {
  fetchEmails,
  extractTasks,
  getTasks,
} = require('../controllers/emailController');  // Existing controller functions

// Fetch emails from Gmail API or mock data
router.get('/emails', fetchEmails);

// Process emails to extract tasks
router.post('/tasks', extractTasks);

// Retrieve tasks categorized by priority and deadlines
router.get('/tasks', getTasks);

// Endpoint for validating and processing email format
// Use the email validation middleware here
router.post('/process-email', validateEmailFormat, (req, res) => {
    const { email } = req.body;

    // Additional processing logic can go here if necessary
    // For example, filtering tasks or analyzing the email content

    res.status(200).json({
        message: `Email ${email} is valid and processed successfully.`,
    });
});

module.exports = router;
