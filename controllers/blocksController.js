const AsyncHandler = require("express-async-handler");
const Module = require("../models/Module");
const Block = require("../models/Block");

//@desc Create block
//@route POST /blocks
exports.createBlock = AsyncHandler(async (req, res) => {
  const { name, module, addTo } = req.body;
  //find the program
  console.log(name, addTo);
  //check if exists
  const blockFound = await Block.findOne({ name });
  if (blockFound) {
    throw new Error("Block Already exists.");
  }
  //create
  const blockCreated = await Block.create({
    name,
    module,
    addTo,
  });

  await blockCreated.save();
  res.status(201).json({
    status: "success",
    message: "Block created successfully.",
    data: blockCreated,
  });
});

//@desc Get all blocks
//@route GET /blocks
exports.getBlocks = AsyncHandler(async (req, res) => {
  const blocks = await Block.find().populate("module").populate("fields");

  res.status(201).json({
    status: "success",
    message: "Blocks fetched successfully.",
    data: blocks,
  });
});

//@desc Get single block
//@route GET /blocks/:id
exports.getBlock = AsyncHandler(async (req, res) => {
  const block = await Block.findById(req.params.id)
    .populate("module")
    .populate("fields");

  res.status(201).json({
    status: "success",
    message: "Block fetched successfully.",
    data: block,
  });
});

//@desc   Update  block
//@route  PUT /api/v1/blocks/:id
//@acess  Private
exports.updateBlock = AsyncHandler(async (req, res) => {
  const { name, module, fields } = req.body;
  //check name exists
  const blockFound = await Module.findOne({ name });
  if (blockFound) {
    throw new Error("Block already exists");
  }
  const block = await Block.findByIdAndUpdate(
    req.params.id,
    {
      name,
      module,
      fields,
    },
    {
      new: true,
    }
  );

  res.status(200).json({
    status: "success",
    message: "Block updated successfully",
    data: block,
  });
});

//@desc Delete block
//@route DELETE /blocks/:id
exports.deleteBlock = AsyncHandler(async (req, res) => {
  await Block.findByIdAndDelete(req.params.id);

  res.status(201).json({
    status: "success",
    message: "Block deleted successfully.",
  });
});
