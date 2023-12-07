const AsyncHandler = require("express-async-handler");

const FormEntry = require("../models/FormEntry");

//@desc Create form-entry
//@route POST /form-entries
exports.createFormEntry = AsyncHandler(async (req, res) => {
    const { module, blocks, formData } = req.body;

    //create
    const formEntryCreated = await FormEntry.create({
        module, blocks, formData
    });

    await formEntryCreated.save();
    res.status(201).json({
        status: "success",
        message: "Form Entry created successfully.",
        data: formEntryCreated,
    });
});

//@desc Get all form-entry
//@route GET /form-entries
exports.getFormEntries = AsyncHandler(async (req, res) => {
    const formEntries = await FormEntry.find().populate('blocks').populate('module');

    res.status(201).json({
        status: "success",
        message: "Form entries fetched successfully.",
        data: formEntries,
    });
});

//@desc Get single form-entry
//@route GET /form-entries/:id
exports.getFormEntry = AsyncHandler(async (req, res) => {
    const formEntry = await FormEntry.findById(req.params.id).populate('module').populate('blocks');

    res.status(201).json({
        status: "success",
        message: "Form Entry fetched successfully.",
        data: formEntry,
    });
});

//@desc   Update  form-entry
//@route  PUT /api/v1/form-entries/:id
exports.updateFormEntry = AsyncHandler(async (req, res) => {
    const { module, blocks, formData } = req.body;


    const updatedFormEntry = await FormEntry.findByIdAndUpdate(
        req.params.id,
        {
            module, blocks, formData
        },
        {
            new: true,
        }
    );

    res.status(200).json({
        status: "success",
        message: "Form Entry updated successfully",
        data: updatedFormEntry,
    });
});

//@desc Delete form-entry
//@route DELETE /form-entries/:id
exports.deleteFormEntry = AsyncHandler(async (req, res) => {
    await FormEntry.findByIdAndDelete(req.params.id);

    res.status(201).json({
        status: "success",
        message: "Form Entry deleted successfully.",
    });
});
