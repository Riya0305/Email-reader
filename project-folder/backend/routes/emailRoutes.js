const express = require('express');
const router = express.Router();
const { fetchEmails } = require('../controllers/emailController');

router.get('/emails', fetchEmails);

module.exports = router;
