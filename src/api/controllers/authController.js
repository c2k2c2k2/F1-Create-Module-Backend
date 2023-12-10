const AsyncHandler = require("express-async-handler");
const Joi = require('joi');
const AuthModel = require('../models/Auth');
const authModel = new AuthModel();

// Validation schema for the fields inside the blocks
const registerUserSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
    createdAt: Joi.date(),
    updatedAt: Joi.date(),
});

// Validation schema for the blocks
const loginSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required()
});




exports.registerUser = AsyncHandler(async (req, res) => {
    const registerUserData = req.body;

    registerUserData.createdAt = new Date();
    registerUserData.updatedAt = new Date();

    const { value, error } = registerUserSchema.validate(registerUserData, {
        abortEarly: false,
    });

    if (error) {
        throw new Error(error)
    }

    const createdUser = await authModel.createNewUser(value);

    res.status(201).json({
        status: "success",
        message: "User created successfully.",
        data: createdUser,
    });
});

// Get module by ID
exports.loginUser = AsyncHandler(async (req, res) => {
    const loginData = req.body;


    const { value, error } = loginSchema.validate(loginData, {
        abortEarly: false,
    });

    if (error) {
        throw new Error(error)
    }

    const loginStatus = await authModel.loginUser(value);

    if (loginStatus.token) {
        res.status(201).json({
            status: "success",
            message: "User Loggend In successfully.",
            data: loginStatus.token,
        });
    }


});



