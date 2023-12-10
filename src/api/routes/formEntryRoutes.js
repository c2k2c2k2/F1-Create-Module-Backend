const express = require('express');
const { createNewFormEntry, deleteFormEntry, listAllFormEntries, readFormEntry, updateFormEntry } = require("../controllers/formEntryController")
const formEntryRouter = express.Router();

// Define user routes
formEntryRouter.post('/', createNewFormEntry);
formEntryRouter.get('/:id', readFormEntry);
formEntryRouter.put('/:id', updateFormEntry);
formEntryRouter.delete('/:id', deleteFormEntry);
formEntryRouter.get('/', listAllFormEntries);

module.exports = formEntryRouter;