const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const route = require('./routes/route');
require('dotenv').config();

// Initialize the app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to the database
connectDB();

// Routes
app.use('/api/favorite', route);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
