const express = require("express");
const {
    createCustomField,
    getCustomField,
    deleteCustomField,
    getCustomFields,
    updateCustomField
} = require("../controllers/customFieldsController");


const customFieldRouter = express.Router();

customFieldRouter.post('/', createCustomField)
customFieldRouter.get('/', getCustomFields)
customFieldRouter.get('/:id', getCustomField)
customFieldRouter.put('/:id', updateCustomField)
customFieldRouter.delete('/:id', deleteCustomField)

module.exports = customFieldRouter;