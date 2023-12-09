const express = require('express');
const { createNewModule, deleteModule, listAllModules, readModule, updateModule } = require("../controllers/moduleController")
const moduleRouter = express.Router();

// Define user routes
moduleRouter.post('/', createNewModule);
moduleRouter.get('/:id', readModule);
moduleRouter.put('/:id', updateModule);
moduleRouter.delete('/:id', deleteModule);
moduleRouter.get('/', listAllModules);

module.exports = moduleRouter;