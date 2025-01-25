// This file defines the API routes for fetching emails, processing emails to extract tasks, and retrieving tasks.

const express = require('express');
const router = express.Router();
const {
  fetchEmails,
  extractTasks,
  getTasks,
} = require('../controllers/emailController'); // Controller routing: controllers/emailController.js

// Fetch emails from Gmail API or mock data
router.get('/emails', fetchEmails);

// Process emails to extract tasks
router.post('/tasks', extractTasks);

// Retrieve tasks categorized by priority and deadlines
router.get('/tasks', getTasks);

module.exports = router;
