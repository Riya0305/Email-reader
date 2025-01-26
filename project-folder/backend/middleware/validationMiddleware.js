// middleware/validationMiddleware.js

const validateEmailFormat = (req, res, next) => {
    const { email } = req.body;
  
    // Simple email regex pattern to validate the email format
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  
    if (!email || !emailPattern.test(email)) {
      return res.status(400).json({ error: 'Invalid email format.' });
    }
  
    // If the email is valid, move to the next middleware or route handler
    next();
  };
  
  module.exports = { validateEmailFormat };
  