const express = require('express');
const { getCategorizedEmails, getFilteredEmails } = require('../controllers/emailController');

const router = express.Router();

// Route to categorize emails
router.post('/categorize', getCategorizedEmails);

// Route to filter emails by category
router.post('/filter', getFilteredEmails);

module.exports = router;
