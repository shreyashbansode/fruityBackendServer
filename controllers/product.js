const model = require('../models/product');
exports.createProduct = async (req, res) => {
    console.log(req.body)
    try {

        let profileImg = req.file;
        let image = profileImg.originalname;
        req.body = { ...req.body, image: image }
        const savedProduct = await new model(req.body).save();

        if (savedProduct) {
            res.send({
                success: true,
                message: 'product successfully saved'
            })
        } else {
            res.send({
                success: false,
                message: "can't create product"
            })
        }
    } catch (err) {
        res.send({
            success: false,
            message: "can't create product"
        })
    }

}