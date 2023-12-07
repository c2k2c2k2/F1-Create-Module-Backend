const express = require("express");
const {
    createBlock,
    getBlock,
    getBlocks,
    updateBlock,
    deleteBlock,
} = require("../controllers/blocksController");


const blockRouter = express.Router();

blockRouter.post('/', createBlock)
blockRouter.get('/', getBlocks)
blockRouter.get('/:id', getBlock)
blockRouter.put('/:id', updateBlock)
blockRouter.delete('/:id', deleteBlock)

module.exports = blockRouter;