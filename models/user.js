const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const secretKey = 'mynameisshreyashbansode';


const createUser = new mongoose.Schema({
    firstName: String,
    lastName: String,
    mobNumber: Number,
    email: String,
    password: String,
    tokens: [
        {
            token: {
                type: String,
                require: true
            }
        }
    ],
    otp: Number,
    address: String

})


createUser.methods.generateToken = async function () {
    let token23 = jwt.sign({ _id: this._id }, secretKey, { expiresIn: '1d' });
    this.tokens = this.tokens.concat({ token: token23 });
    await this.save();
    return token23
}

module.exports = mongoose.model('user', createUser)