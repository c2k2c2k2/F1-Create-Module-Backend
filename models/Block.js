const mongoose = require("mongoose");

const { Schema } = mongoose;

const blockSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        addTo: {
            type: String,
            required: true,
            enum: ["Admin", "User"],
        },
        module: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Module",
        },

        fields: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "CustomField",
            },
        ],
    },
    { timestamps: true }
);

const Block = mongoose.model("Block", blockSchema);

module.exports = Block;
