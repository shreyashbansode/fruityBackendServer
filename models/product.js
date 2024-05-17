const mongoose = require('mongoose');

const createProduct = new mongoose.Schema({
    productName: String,
    ProductDesc: String,
    ProductPrice: Number,
    discountPrice: String,
    image: String
})

module.exports = mongoose.model('product', createProduct)