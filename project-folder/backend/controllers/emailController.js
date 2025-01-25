//fetching emails, extracting tasks, retrieving tasks) while adding the new task to analyze emails using ChatGPT and processing emails in one step.

const { fetchEmailsFromGmail, categorizeAndExtractTasks, analyzeEmailWithChatGPT, processEmails } = require('../utils/emailProcessor'); // Utility routing: utils/emailProcessor.js
const taskStore = []; // Temporary in-memory storage for tasks (replace with DB later)

// Fetch emails
const fetchEmails = async (req, res) => {
  try {
    const emails = await fetchEmailsFromGmail(); // Use Gmail API or mock function
    res.json(emails);
  } catch (error) {
    console.error('Error fetching emails:', error);
    res.status(500).json({ error: 'Failed to fetch emails' });
  }
};

// Process emails to extract tasks
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

// Retrieve tasks
const getTasks = (req, res) => {
  try {
    res.json(taskStore); // Send all tasks from the in-memory store
  } catch (error) {
    console.error('Error retrieving tasks:', error);
    res.status(500).json({ error: 'Failed to retrieve tasks' });
  }
};

// Analyze email using ChatGPT (Task 4 integration)
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

// Process emails: fetch, analyze, and categorize tasks (combined task)
const processAllEmails = async (req, res) => {
  try {
    const processedEmails = await processEmails(); // Call the combined function for email processing
    res.status(200).json({ processedEmails });
  } catch (error) {
    console.error('Error in processEmails:', error.message);
    res.status(500).json({ message: 'Error processing emails' });
  }
};

module.exports = { fetchEmails, extractTasks, getTasks, analyzeEmails, processAllEmails };
