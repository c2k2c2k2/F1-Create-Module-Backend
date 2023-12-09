const Joi = require("joi");

const globalErrorHandler = (err, req, res, next) => {
    //status
    //message
    //stack
    const stack = err.stack;
    const message = err.message;
    const status = err.status ? err.status : "failed";
    const statusCode = err.statusCode ? err.statusCode : 500;

    res.status(statusCode).json({
        status,
        message,
        stack,
    });
};

//not found error handler
const notFoundError = (req, res, next) => {
    const err = new Error(`Can't find the ${req.originalUrl} on the server`)
    next(err)
}

const validationError = (err, req, res, next) => {

    if (err instanceof Joi.ValidationError) {
        // Handle Joi validation errors
        const validationErrors = err.details.map((error) => error.message);
        // Log the validation errors using Morgan or your preferred logging library
        morgan('Validation Errors: ', validationErrors.join(', '))(req, res, next);
        // Respond with a 400 Bad Request and the validation errors
        res.status(400).json({ error: 'Validation Error', details: validationErrors });
    } else {
        // Pass the error to the next middleware if it's not a Joi validation error
        next(err);
    }

}


module.exports = { globalErrorHandler, notFoundError, validationError };