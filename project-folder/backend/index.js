require('dotenv').config({ path: './config/.env' });
const express = require('express');
const emailRoutes = require('./routes/emailRoutes');

const app = express();
app.use(express.json());
app.use('/api', emailRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
