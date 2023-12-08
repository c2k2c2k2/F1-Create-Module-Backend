const AsyncHandler = require("express-async-handler");
const Module = require("../models/Module");

//@desc Create module
//@route POST /modules
exports.createModule = AsyncHandler(async (req, res) => {
  const { name } = req.body;
  //find the program

  //check if exists
  const moduleFound = await Module.findOne({ name });
  if (moduleFound) {
    throw new Error("Module Already exists.");
  }
  //create
  const moduleCreated = await Module.create({
    name,
  });

  await moduleCreated.save();
  res.status(201).json({
    status: "success",
    message: "Module created successfully.",
    data: moduleCreated,
  });
});

//@desc Get all modules
//@route GET /modules
exports.getModules = AsyncHandler(async (req, res) => {
  const modules = await Module.find().populate({
    path: "blocks",
    populate: { path: "fields" },
  });

  res.status(201).json({
    status: "success",
    message: "Modules fetched successfully.",
    data: modules,
  });
});

//@desc Get single module
//@route GET /modules/:id
exports.getModule = AsyncHandler(async (req, res) => {
  const module = await Module.findById(req.params.id).populate("blocks");

  res.status(201).json({
    status: "success",
    message: "Module fetched successfully.",
    data: module,
  });
});

//@desc   Update  module
//@route  PUT /api/v1/modules/:id
//@acess  Private
exports.updateModule = AsyncHandler(async (req, res) => {
  const { name, blocks } = req.body;
  // //check name exists
  const moduleFound = await Module.findOne({ name });
  if (moduleFound) {
    throw new Error("Module already exists");
  }
  const module = await Module.findByIdAndUpdate(
    req.params.id,
    {
      name,
      blocks,
    },
    {
      new: true,
    }
  );

  res.status(200).json({
    status: "success",
    message: "Module updated successfully",
    data: module,
  });
});

//@desc Delete module
//@route DELETE /modules/:id
exports.deleteModule = AsyncHandler(async (req, res) => {
  await Module.findByIdAndDelete(req.params.id);

  res.status(201).json({
    status: "success",
    message: "Module deleted successfully.",
  });
});
