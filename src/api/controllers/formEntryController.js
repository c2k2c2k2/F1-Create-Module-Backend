const AsyncHandler = require("express-async-handler");
const Joi = require('joi');
const FormEntryModel = require('../models/FormEntry');
const formEntryModel = new FormEntryModel();


//validation schema for FormEntry
const createFormEntrySchema = Joi.object({
    moduleId: Joi.string().required(),
    formData: Joi.object().required
})


exports.createNewFormEntry = AsyncHandler(async (req, res) => {
    const formEntryData = req.body;

    formEntryData.createdAt = new Date();
    formEntryData.updatedAt = new Date();

    const { value, error } = createFormEntrySchema.validate(formEntryData, {
        abortEarly: false,
    });

    if (error) {
        throw new Error(error)
    }

    const createdFormEntry = await formEntryModel.createFormEntry(value);

    res.status(201).json({
        status: "success",
        message: "FormEntry created successfully.",
        data: createdFormEntry,
    });
});

// Get module by ID
exports.readFormEntry = AsyncHandler(async (req, res) => {
    const formEntryId = req.params.id;
    const formEntry = await formEntryModel.getFormEntryById(formEntryId);
    if (!formEntry) {
        throw new Error("FormEntry Not Found.");
    }
    res.status(201).json({
        status: "success",
        message: "FormEntry fetched successfully.",
        data: formEntry,
    });
});

// Update module by ID
exports.updateFormEntry = AsyncHandler(async (req, res) => {

    const formEntryId = req.params.id;
    const updatedFormEntry = req.body;
    const result = await formEntryModel.updateFormEntry(formEntryId, updatedFormEntry);

    res.status(200).json({
        status: "success",
        message: "FormEntry updated successfully.",
        data: result,
    });

});

// Delete module by ID
exports.deleteFormEntry = AsyncHandler(async (req, res) => {
    const formEntryId = req.params.id;
    const deletedCount = await formEntryModel.deleteFormEntry(formEntryId);
    if (deletedCount === 0) {
        throw new Error("No FormEntry found");
    }
    res.status(200).json({
        status: "success",
        message: "FormEntry deleted successfully.",
        data: {},
    });
})

exports.listAllFormEntries = AsyncHandler(async (req, res) => {
    const formEntries = await formEntryModel.listAllFormEntries();

    res.status(200).json({
        status: "success",
        message: "FormEntry fetched successfully.",
        data: formEntries,
    });
});

