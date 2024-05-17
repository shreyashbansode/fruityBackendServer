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


exports.getProduct = async (req, res) => {
    try {
        const getallProduct = await model.find();
        if (getallProduct) {
            res.send({
                success: true,
                message: 'Product successfully fetched',
                data: getallProduct
            })
        }
        else {
            res.send({
                success: false,
                message: 'Failed to fetch product data'
            })
        }
    }
    catch (err) {
        res.send({
            success: false,
            message: 'Failed to fetch product data'
        })
    }
}

exports.getPerticularProduct = async (req, res) => {

    try {
        const { id } = req.params;
        const getPerticularProduct = await model.find({ _id: id });
        if (getPerticularProduct) {
            res.send({
                success: true,
                message: 'product fetched successfully',
                data: getPerticularProduct
            })
        } else {
            res.send({
                success: false,
                message: 'Failed to fetched product'
            })
        }

    } catch (err) {
        res.send({
            success: false,
            message: 'failed to fetch perticular product'
        })
    }

}


exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const delProduct = await model.findByIdAndDelete({ _id: id });

        if (delProduct) {
            res.send({
                success: true,
                message: "Product delete successfully"
            })
        } else {
            res.send({
                success: false,
                message: "Failed to delete Product"
            })
        }

    } catch (err) {
        res.send({
            success: false,
            message: 'delete product successfully'
        })
    }
}