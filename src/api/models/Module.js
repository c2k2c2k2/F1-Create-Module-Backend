const { ObjectId } = require('mongodb');
const { getDb } = require('../../config/db');

class ModuleModel {
    constructor() {
        this.collectionName = 'modules'; 
    }

    async createModule(module) {
        const db = getDb();
        const moduleFound = await db.collection(this.collectionName).findOne({ name: module.name })
        if (moduleFound) {
            throw new Error("Module with same name already exists");
        }
        const createdModule = await db.collection(this.collectionName).insertOne(module);
        const result = await this.getModuleById(createdModule.insertedId);
        return result;
    }

    async getModuleById(moduleId) {
        const db = getDb();
        const moduleFound = await db.collection(this.collectionName).findOne({ _id: new ObjectId(moduleId) });
        return moduleFound;
    }

    async updateModule(moduleId, updatedModule) {
        const db = getDb();
        const result = await db.collection(this.collectionName).updateOne(
            { _id: new ObjectId(moduleId) },
            { $set: updatedModule }
        );

        console.log(result);

        if (result.matchedCount === 0) {
            throw new Error("Module not found.")
        }
        return this.getModuleById(moduleId);
    }

    async deleteModule(moduleId) {
        const db = getDb();
        const result = await db.collection(this.collectionName).deleteOne({ _id: new ObjectId(moduleId) });
        return result.deletedCount;
    }

    async listAllModules() {
        const db = getDb();
        return db.collection(this.collectionName).find().toArray();
    }
}

module.exports = ModuleModel;
