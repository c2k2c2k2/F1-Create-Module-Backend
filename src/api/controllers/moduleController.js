const AsyncHandler = require("express-async-handler");
const Joi = require('joi');
const ModuleModel = require('../models/Module');
const moduleModel = new ModuleModel();

// Validation schema for the fields inside the blocks
const fieldSchema = Joi.object({
  type: Joi.string().required(),
  label: Joi.string().required(),
  options : Joi.array().items(Joi.string()),
  isMandatory: Joi.boolean().required(),
  defaultValue: Joi.string().required()
});

// Validation schema for the blocks
const blockSchema = Joi.object({
  name: Joi.string().required(),
  addAfter: Joi.string().required(),
  fields: Joi.array().items(fieldSchema)
});

// Root validation schema
const createModuleSchema = Joi.object({
  name: Joi.string().required(),
  blocks: Joi.array().items(blockSchema),
  createdAt: Joi.date(),
  updatedAt: Joi.date()
});


exports.createNewModule = AsyncHandler(async (req, res) => {
  const moduleData = req.body;

  moduleData.createdAt = new Date();
  moduleData.updatedAt = new Date();

  const { value, error } = createModuleSchema.validate(moduleData, {
    abortEarly: false,
  });

  if (error) {
    throw new Error(error)
  }

  const createModule = await moduleModel.createModule(value);

  res.status(201).json({
    status: "success",
    message: "Module created successfully.",
    data: createModule,
  });
});

// Get module by ID
exports.readModule = AsyncHandler(async (req, res) => {
  const moduleId = req.params.id;
  const module = await moduleModel.getModuleById(moduleId);
  if (!module) {
    throw new Error("Module Not Found.");
  }
  res.status(201).json({
    status: "success",
    message: "Module fetched successfully.",
    data: module,
  });
});

// Update module by ID
exports.updateModule = AsyncHandler(async (req, res) => {

  const moduleId = req.params.id;
  const updatedModule = req.body;
  const result = await moduleModel.updateModule(moduleId, updatedModule);

  res.status(200).json({
    status: "success",
    message: "Modules updated successfully.",
    data: result,
  });

});

// Delete module by ID
exports.deleteModule = AsyncHandler(async (req, res) => {
  const moduleId = req.params.id;
  const deletedCount = await moduleModel.deleteModule(moduleId);
  if (deletedCount === 0) {
    throw new Error("No module found");
  }
  res.status(200).json({
    status: "success",
    message: "Modules deleted successfully.",
    data: {},
  });
})

exports.listAllModules = AsyncHandler(async (req, res) => {
  const modules = await moduleModel.listAllModules();

  res.status(200).json({
    status: "success",
    message: "Modules fetched successfully.",
    data: modules,
  });
});

