const express = require("express");
const morgan = require("morgan");
const {
    globalErrorHandler,
    notFoundError,
} = require("../middlewares/globalErrorHandler");

const moduleRouter = require("../routes/module");
const blockRouter = require("../routes/block");


const app = express();

//middlewares
app.use(morgan("dev"));
app.use(express.json()); ///pass incoming json data

//Routes
app.use("/api/v1/modules", moduleRouter);
app.use("/api/v1/blocks", blockRouter);


//error handler middlewares
app.use(notFoundError);
app.use(globalErrorHandler);

module.exports = app;
