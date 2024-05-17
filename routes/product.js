const express = require('express');
const routes = express.Router();
const multer = require('multer')


const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'upload');
    },
    filename(req, file, cb) {
        cb(null, file.originalname);
    }
})
const upload = multer({ storage });

routes.post('/createProduct', upload.single('image'), require('../controllers/product').createProduct);
routes.get('/getProduct', require('../controllers/product').getProduct);
routes.get('/getProduct/:id', require('../controllers/product').getPerticularProduct);
routes.delete('/deleteProduct/:id', require('../controllers/product').deleteProduct);

module.exports = routes;