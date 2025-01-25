const { categorizeEmail, filterEmails } = require('../utils/filter');

// Categorize a batch of emails
const getCategorizedEmails = (req, res) => {
  const emails = req.body.emails; // Receive emails as JSON in the request body
  const categorizedEmails = emails.map(email => ({
    ...email,
    category: categorizeEmail(email),
  }));
  res.json(categorizedEmails);
};

// Filter emails by category
const getFilteredEmails = (req, res) => {
  const { emails, category } = req.body; // Expect category and emails in the body
  const filteredEmails = filterEmails(emails, category);
  res.json(filteredEmails);
};

module.exports = { getCategorizedEmails, getFilteredEmails };
