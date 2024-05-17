const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    uid: {
        type: String,
        require: true
    },
    pid: {
        type: String,
        require: true
    },
    productName: {
        type: String,
        require: true
    },
    ProductDesc: {
        type: String,
        require: true
    },
    ProductPrice: {
        type: Number,
        require: true
    },
    discountPrice: {
        type: String,
        require: true
    },
    image: {
        type: String,
        require: true
    },
    quantity: {
        type: Number,
        require: true
    }

})

module.exports = mongoose.model('carts', cartSchema)