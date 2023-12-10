const { ObjectId } = require('mongodb');
const { getDb } = require('../../config/db');

class FormEntryModel {
    constructor() {
        this.collectionName = 'formEntries';
    }

    async createFormEntry(formEntry) {
        const db = getDb();

        const createdFormEntry = await db.collection(this.collectionName).insertOne(formEntry);
        const result = await this.getFormEntryById(createdFormEntry.insertedId);
        return result;
    }

    async getFormEntryById(formEntryId) {
        const db = getDb();
        const formEntryFound = await db.collection(this.collectionName).findOne({ _id: new ObjectId(formEntryId) });
        return formEntryFound;
    }

    async updateFormEntry(formEntryId, updatedFormEntry) {
        const db = getDb();
        const result = await db.collection(this.collectionName).updateOne(
            { _id: new ObjectId(formEntryId) },
            { $set: updatedFormEntry }
        );

        if (result.matchedCount === 0) {
            throw new Error("Module not found.")
        }
        return this.getFormEntryById(formEntryId);
    }

    async deleteFormEntry(formEntryId) {
        const db = getDb();
        const result = await db.collection(this.collectionName).deleteOne({ _id: new ObjectId(formEntryId) });
        return result.deletedCount;
    }

    async listAllFormEntries() {
        const db = getDb();
        return db.collection(this.collectionName).find().toArray();
    }
}

module.exports = FormEntryModel;
