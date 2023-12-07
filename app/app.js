const express = require("express");
const morgan = require("morgan");
const {
    globalErrorHandler,
    notFoundError,
} = require("../middlewares/globalErrorHandler");

const moduleRouter = require("../routes/module");
const blockRouter = require("../routes/block");
const customFieldRouter = require("../routes/customField");
const formEntryRouter = require("../routes/formEntry");

const app = express();

//middlewares
app.use(morgan("dev"));
app.use(express.json()); ///pass incoming json data

//Routes
app.use("/api/v1/modules", moduleRouter);
app.use("/api/v1/blocks", blockRouter);
app.use("/api/v1/custom-fields", customFieldRouter);
app.use("/api/v1/form-entries", formEntryRouter);


//error handler middlewares
app.use(notFoundError);
app.use(globalErrorHandler);

module.exports = app;
