const mongoose = require("mongoose");

const { Schema } = mongoose;

const moduleSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        blocks: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Block",
            },
        ],
    },
    { timestamps: true }
);

const Module = mongoose.model("Module", moduleSchema);

module.exports = Module;
