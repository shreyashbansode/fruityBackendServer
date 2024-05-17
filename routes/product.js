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

module.exports = routes;