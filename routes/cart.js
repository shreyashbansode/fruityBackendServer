const express = require('express');
const routes = express.Router();

routes.post('/addTocart', require('../controllers/cart').addToCart);
routes.delete('/deleteProduct/:id', require('../controllers/cart').deleteCartProduct)

module.exports = routes;

