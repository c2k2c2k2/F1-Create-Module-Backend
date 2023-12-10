const { ObjectId } = require('mongodb');
const { getDb } = require('../../config/db');
const { hashPassword, isPasswordMatched, generateToken } = require('../../../utils/helpers');

class AuthModel {
    constructor() {
        this.collectionName = 'users';
    }

    async createNewUser(user) {
        const db = getDb();

        const userFound = await db.collection(this.collectionName).findOne({ email: user.email });
        if (userFound) {
            throw new Error("User with same email already exist.")
        }

        user.password = await hashPassword(user.password);

        const createdUser = await db.collection(this.collectionName).insertOne(user);

        return createdUser.insertedId;
    }

    async loginUser(loginData) {
        const db = getDb();
        const userFound = await db.collection(this.collectionName).findOne({ email: loginData.email });
        if (!userFound) {
            throw new Error("Invalid credentials");
        }
        if (userFound) {
            const isMatched = await isPasswordMatched(loginData.password, userFound.password)
            if (!isMatched) {
                throw new Error("Invalid Credentials")
            }
            const token = generateToken(userFound._id);
            return { token };
        }

        return false;
    }





}

module.exports = AuthModel;
