const express = require("express");
const {
    createFormEntry,
    deleteFormEntry,
    getFormEntries,
    getFormEntry,
    updateFormEntry
} = require("../controllers/formEntriesController");


const formEntryRouter = express.Router();

formEntryRouter.post('/', createFormEntry)
formEntryRouter.get('/', getFormEntries)
formEntryRouter.get('/:id', getFormEntry)
formEntryRouter.put('/:id', updateFormEntry)
formEntryRouter.delete('/:id', deleteFormEntry)

module.exports = formEntryRouter;