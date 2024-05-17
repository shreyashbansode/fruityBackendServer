const model = require('../models/cart');


exports.addToCart = async (req, res) => {
    try {
        let body = { ...req.body };
        const { pid, uid } = req.body;
        const isalreadyAdded = await model.find({ pid: pid, uid: uid })
        if (isalreadyAdded.length) {
            const updateData = await model.findOneAndUpdate({ pid: pid, uid: uid }, { $inc: { quantity: 1 } }, { new: true });
            if (updateData) {
                res.send({
                    success: true,
                    message: 'product already added ,quantity has been increment'
                })
            }
        } else {
            const saveCart = await new model(body).save();
            if (saveCart) {
                res.send({
                    success: true,
                    message: 'Product added successfully'
                })
            }
        }
    } catch (err) {
        res.send({
            success: false,
            message: "Can't add product"
        })
    }
}