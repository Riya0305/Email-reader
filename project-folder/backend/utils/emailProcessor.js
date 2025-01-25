//fetch and analyze emails
const { google } = require('googleapis');
const axios = require('axios');
const { OAuth2 } = google.auth;

const oAuth2Client = new OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

// Fetch emails using Gmail API
async function fetchEmails() {
  const gmail = google.gmail({ version: 'v1', auth: oAuth2Client });

  try {
    const response = await gmail.users.messages.list({
      userId: 'me',
      q: 'is:unread', // Fetch unread emails
    });

    const messages = response.data.messages || [];

    const emails = [];
    for (const message of messages) {
      const email = await gmail.users.messages.get({
        userId: 'me',
        id: message.id,
      });

      emails.push({
        id: email.data.id,
        subject: getHeader(email.data.payload.headers, 'Subject'),
        body: email.data.snippet,
      });
    }

    return emails;
  } catch (error) {
    console.error('Error fetching emails:', error.message);
    throw error;
  }
}

// Analyze emails using ChatGPT
async function analyzeEmailWithChatGPT(email) {
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/completions',
      {
        model: 'text-davinci-003',
        prompt: `Analyze the following email and identify tasks with due dates and priority:\n\nSubject: ${email.subject}\n\nBody: ${email.body}`,
        max_tokens: 150,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data.choices[0].text.trim();
  } catch (error) {
    console.error('Error analyzing email with ChatGPT:', error.message);
    throw error;
  }
}

// Helper function to extract headers
function getHeader(headers, name) {
  const header = headers.find(h => h.name.toLowerCase() === name.toLowerCase());
  return header ? header.value : '';
}

module.exports = { fetchEmails, analyzeEmailWithChatGPT };
