const { google } = require('googleapis');
const { Configuration, OpenAIApi } = require('openai');

// Configure Gmail API client
const gmail = google.gmail('v1');
const openai = new OpenAIApi(new Configuration({ apiKey: process.env.OPENAI_API_KEY }));

// Fetch emails from Gmail
const fetchEmailsFromGmail = async () => {
  try {
    // Assuming that OAuth2 authentication has been done and an access token is available
    const auth = new google.auth.OAuth2();
    auth.setCredentials({ access_token: process.env.GMAIL_ACCESS_TOKEN });

    const res = await gmail.users.messages.list({
      auth,
      userId: 'me',
      q: 'is:unread', // Adjust query based on filtering criteria
    });

    const emails = res.data.messages || [];
    const emailDetails = [];

    // Retrieve the details for each email message
    for (const email of emails) {
      const emailDetail = await gmail.users.messages.get({
        auth,
        userId: 'me',
        id: email.id,
      });
      emailDetails.push(emailDetail.data);
    }

    return emailDetails; // Return email details
  } catch (error) {
    console.error('Error fetching emails:', error.message);
    throw new Error('Error fetching emails');
  }
};

// Categorize and extract tasks from email body
const categorizeAndExtractTasks = (emailBody) => {
  const tasks = [];
  // Assume email body is plain text or HTML
  const taskPattern = /\b(?:task|to-do|action)\b.*\?/gi; // A simple task pattern (adjust as needed)
  const matches = emailBody.match(taskPattern);

  if (matches) {
    matches.forEach(task => tasks.push({ taskDescription: task }));
  }

  return tasks;
};

// Analyze email with ChatGPT for additional insights
const analyzeEmailWithChatGPT = async (email) => {
  try {
    const emailContent = email.snippet || ''; // Use snippet or full email body
    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: `Analyze the following email content: \n\n${emailContent}`,
      max_tokens: 200,
    });

    return response.data.choices[0].text.trim();
  } catch (error) {
    console.error('Error analyzing email with ChatGPT:', error.message);
    throw new Error('Error analyzing email');
  }
};

// Process emails: fetch, categorize, and analyze tasks
const processEmails = async () => {
  try {
    const emails = await fetchEmailsFromGmail();
    const processedEmails = [];

    for (const email of emails) {
      const emailBody = email.snippet || '';
      const tasks = categorizeAndExtractTasks(emailBody);
      const analysis = await analyzeEmailWithChatGPT(email);
      processedEmails.push({
        emailId: email.id,
        tasks,
        analysis,
      });
    }

    return processedEmails; // Return processed emails with tasks and analysis
  } catch (error) {
    console.error('Error processing emails:', error.message);
    throw new Error('Error processing emails');
  }
};

module.exports = { fetchEmailsFromGmail, categorizeAndExtractTasks, analyzeEmailWithChatGPT, processEmails };
