const AsyncHandler = require("express-async-handler");

const CustomField = require("../models/CustomField");

//@desc Create custom-field
//@route POST /custom-fields
exports.createCustomField = AsyncHandler(async (req, res) => {
    const { type, label, isMandatory, defaultValue, block } = req.body;

    //create
    const customFieldCreated = await CustomField.create({
        type, label, isMandatory, defaultValue, block
    });

    await customFieldCreated.save();
    res.status(201).json({
        status: "success",
        message: "Custom Field created successfully.",
        data: customFieldCreated,
    });
});

//@desc Get all custom-field
//@route GET /custom-fields
exports.getCustomFields = AsyncHandler(async (req, res) => {
    const customFields = await CustomField.find().populate('block');

    res.status(201).json({
        status: "success",
        message: "Custom Fields fetched successfully.",
        data: customFields,
    });
});

//@desc Get single custom-field
//@route GET /custom-fields/:id
exports.getCustomField = AsyncHandler(async (req, res) => {
    const customField = await CustomField.findById(req.params.id).populate('block');

    res.status(201).json({
        status: "success",
        message: "Block fetched successfully.",
        data: customField,
    });
});

//@desc   Update  custom-field
//@route  PUT /api/v1/custom-fields/:id
exports.updateCustomField = AsyncHandler(async (req, res) => {
    const { type, label, isMandatory, defaultValue, block } = req.body;


    const updatedCustomField = await CustomField.findByIdAndUpdate(
        req.params.id,
        {
            type, label, isMandatory, defaultValue, block
        },
        {
            new: true,
        }
    );

    res.status(200).json({
        status: "success",
        message: "Custom Field updated successfully",
        data: updatedCustomField,
    });
});

//@desc Delete custom-field
//@route DELETE /custom-fields/:id
exports.deleteCustomField = AsyncHandler(async (req, res) => {
    await CustomField.findByIdAndDelete(req.params.id);

    res.status(201).json({
        status: "success",
        message: "Custom Field deleted successfully.",
    });
});
