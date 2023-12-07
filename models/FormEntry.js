const mongoose = require("mongoose");

const { Schema } = mongoose;

const formEntrySchema = new Schema(
    {
        module: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Module",
        },
        blocks: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Block",
        }],
        formData: {
            type: Object,
        }

    },
    { timestamps: true }
);


const FormEntry = mongoose.model("FormEntry", formEntrySchema);

module.exports = FormEntry;
