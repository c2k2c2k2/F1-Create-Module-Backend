const mongoose = require("mongoose");
const Module = require("./Module");

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


blockSchema.pre('findOneAndDelete', { document: false, query: true }, async function (next) {
    const block = this;
    await Module.updateMany(
        {},
        { $pull: { blocks: block._conditions._id } }
    );
    next();
});

const Block = mongoose.model("Block", blockSchema);

module.exports = Block;
