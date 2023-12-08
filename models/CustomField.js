const mongoose = require("mongoose");

const { Schema } = mongoose;

const customFieldSchema = new Schema(
  {
    type: {
      type: String,
      required: true,
      enum: ["text", "textarea", "select", "checkbox", "radio"],
    },
    label: {
      type: String,
      required: true,
    },
    isMandatory: {
      type: Boolean,
      required: true,
      default: false,
    },
    defaultValue: {
      type: String,
      required: false,
    },
    block: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Block",
    },
  },
  { timestamps: true }
);

const CustomField = mongoose.model("CustomField", customFieldSchema);

module.exports = CustomField;
