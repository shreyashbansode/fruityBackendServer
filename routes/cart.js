const express = require('express');
const routes = express.Router();

routes.post('/addTocart', require('../controllers/cart').addToCart);

module.exports = routes;

