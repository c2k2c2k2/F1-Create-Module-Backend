require('dotenv').config();
const express = require('express');
// const userRoutes = require('./api/routes/userRoutes');
const db = require('./config/db');

const app = express();

app.use(express.json());
db.connectToServer();

// Register routes
// userRoutes(app);

module.exports = app;