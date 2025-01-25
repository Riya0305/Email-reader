// Predefined filters for categorizing emails
const filters = [
  { keyword: 'Promotion', label: 'Promotions' },
  { keyword: 'Invoice', label: 'Work' },
  { keyword: 'Friend request', label: 'Social' },
  { keyword: 'Win', label: 'Spam' },
];

// Function to categorize an email based on subject and sender
function categorizeEmail(email) {
  if (!email || !email.subject) {
    return 'Uncategorized'; // Handle malformed data
  }

  // Check subject line for predefined keywords
  for (const filter of filters) {
    if (email.subject.includes(filter.keyword)) {
      return filter.label;
    }
  }

  // Additional logic: Categorize based on sender domain
  if (email.sender && email.sender.includes('social@')) {
    return 'Social';
  }

  return 'Uncategorized'; // Default category
}

// Function to filter emails by a specific category
function filterEmails(emails, category) {
  return emails.filter(email => {
    const emailCategory = categorizeEmail(email);
    return emailCategory.toLowerCase() === category.toLowerCase();
  });
}

module.exports = { categorizeEmail, filterEmails };
