const express = require("express");
const {
    createModule,
    getModule,
    getModules,
    updateModule,
    deleteModule,
} = require("../controllers/modulesController");


const moduleRouter = express.Router();

moduleRouter.post('/', createModule)
moduleRouter.get('/', getModules)
moduleRouter.get('/:id', getModule)
moduleRouter.put('/:id', updateModule)
moduleRouter.delete('/:id', deleteModule)

module.exports = moduleRouter;

// advanced result example
// moduleRouter.get(
//     "/admin",
//     isLoggedIn,
//     isAdmin,
//     advancedResults(Teacher, {
//       path: "examsCreated",
//       populate: {
//         path: "questions"
//       }
//     }),
//     getAllTeachersAdmin
//   );