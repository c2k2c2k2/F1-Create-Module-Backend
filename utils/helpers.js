const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')
//hash password
exports.hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
};

exports.isPasswordMatched = async (password, hash) => {
    console.log(password, hash);
    return await bcrypt.compare(password, hash);
};

exports.generateToken = (id) => {
    return jwt.sign({ id }, 'anykey', { expiresIn: '5d' })
}

exports.verifyToken = (token) => {
    return jwt.verify(token, "anykey", (err, decoded) => {
        if (err) {
            return false
        } else {
            return decoded
        }
    })
}