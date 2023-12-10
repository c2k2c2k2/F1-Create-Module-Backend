require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require("cors");
const { notFoundError, globalErrorHandler, validationError } = require('./api/middlewares/errorHandlers');
const db = require('./config/db');

const moduleRouter = require("./api/routes/moduleRoutes");
const formEntryRouter = require('./api/routes/formEntryRoutes');

const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
db.connectToServer();

// Register routes
app.use("/api/v1/modules", moduleRouter);
app.use("/api/v1/form-entries", formEntryRouter);

//error handler middlewares
app.use(notFoundError);
app.use(globalErrorHandler);

module.exports = app;