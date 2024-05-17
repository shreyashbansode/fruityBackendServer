const jwt = require('jsonwebtoken');
const secretKey = 'mynameisshreyashbansode';
const model = require('../models/user')

exports.Auth = async (req, res) => {
    try {
        const token = req.headers.token;
        const varifyToken = jwt.verify(token, secretKey);
        const user = await model.findOne({ _id: varifyToken._id });
        if (user) {
            res.send({
                success: true,
                message: 'user varify',
                data: user
            })
        } else {
            res.send({
                success: false,
                message: 'cant varify login'
            })
        }

    } catch (err) {
        res.send({
            success: false,
            message: 'cant varify login'
        })
    }
}