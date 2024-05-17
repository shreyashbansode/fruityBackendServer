const mongoose = require('mongoose');

const createProduct = new mongoose.Schema({
    productName: String,
    ProductDesc: String,
    ProductPrice: Number,
    discountPrice: String,
    image: String,
    quantity: Number
})

module.exports = mongoose.model('product', createProduct)