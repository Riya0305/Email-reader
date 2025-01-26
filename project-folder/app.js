const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const session = require('express-session');
const { google } = require('googleapis');
const { fetchEmailsFromGmail, categorizeAndExtractTasks, analyzeEmailWithChatGPT, processEmails } = require('../utils/emailProcessor'); // Utility routing
const taskStore = []; // Temporary in-memory storage for tasks (replace with DB later)

const app = express();

// Session setup
app.use(session({ secret: 'your-session-secret', resave: true, saveUninitialized: true }));

// Passport setup for Google OAuth
passport.use(new GoogleStrategy({
  clientID: 'YOUR_GOOGLE_CLIENT_ID', // Replace with your actual client ID
  clientSecret: 'YOUR_GOOGLE_CLIENT_SECRET', // Replace with your actual client secret
  callbackURL: 'http://localhost:3000/auth/google/callback' // Replace with your callback URL
},
(accessToken, refreshToken, profile, done) => {
  // Handle the user profile and tokens after authentication
  return done(null, { profile, accessToken });
}));

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

app.use(passport.initialize());
app.use(passport.session());

// Middleware to check if the user is authenticated
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.status(401).json({ message: 'User not authenticated' });
  }
};

// OAuth Routes for Google
app.get('/auth/google', passport.authenticate('google', { scope: ['email', 'profile', 'https://www.googleapis.com/auth/gmail.readonly'] }));

app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
  res.redirect('/'); // Successful authentication, redirect home
});

// Mocked API routes that simulate Gmail API behavior
app.get('/emails', isAuthenticated, async (req, res) => {
  try {
    const oauth2Client = new google.auth.OAuth2();
    oauth2Client.setCredentials({ access_token: req.user.accessToken });

    const gmail = google.gmail({ version: 'v1', auth: oauth2Client });
    const response = await gmail.users.messages.list({ userId: 'me' });

    res.status(200).json({ emails: response.data.messages });
  } catch (error) {
    console.error('Error fetching emails:', error);
    res.status(500).json({ error: 'Failed to fetch emails' });
  }
});

// API to fetch emails from Gmail (simulated)
const fetchEmails = async (req, res) => {
  try {
    const emails = await fetchEmailsFromGmail(); // Use Gmail API or mock function
    res.json(emails);
  } catch (error) {
    console.error('Error fetching emails:', error);
    res.status(500).json({ error: 'Failed to fetch emails' });
  }
};

// API to extract tasks from email body
const extractTasks = (req, res) => {
  try {
    const { emailBody } = req.body;
    if (!emailBody) {
      return res.status(400).json({ error: 'Email body is required' });
    }

    const tasks = categorizeAndExtractTasks(emailBody); // Extract tasks from email body
    taskStore.push(...tasks); // Add tasks to the temporary store
    res.json({ message: 'Tasks extracted successfully', tasks });
  } catch (error) {
    console.error('Error extracting tasks:', error);
    res.status(500).json({ error: 'Failed to extract tasks' });
  }
};

// API to get all tasks
const getTasks = (req, res) => {
  try {
    res.json(taskStore); // Send all tasks from the in-memory store
  } catch (error) {
    console.error('Error retrieving tasks:', error);
    res.status(500).json({ error: 'Failed to retrieve tasks' });
  }
};

// API to analyze email using ChatGPT
const analyzeEmails = async (req, res) => {
  const { emailId } = req.body; // Assume emailId is passed in the request body to analyze a specific email
  try {
    const email = await fetchEmailsFromGmail(); // Mock fetching email using Gmail API or an ID
    const analysis = await analyzeEmailWithChatGPT(email);
    res.status(200).json({ analysis });
  } catch (error) {
    console.error('Error in analyzeEmails:', error.message);
    res.status(500).json({ message: 'Error analyzing email' });
  }
};

// API to process emails (combine fetching, analyzing, and categorizing)
const processAllEmails = async (req, res) => {
  try {
    const processedEmails = await processEmails(); // Call the combined function for email processing
    res.status(200).json({ processedEmails });
  } catch (error) {
    console.error('Error in processEmails:', error.message);
    res.status(500).json({ message: 'Error processing emails' });
  }
};

// Root route to check if the server is working
app.get('/', (req, res) => {
  res.send('Welcome to the email processing app!');
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

module.exports = { fetchEmails, extractTasks, getTasks, analyzeEmails, processAllEmails };
