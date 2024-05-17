const express = require('express');
const routes = express.Router();
const { Auth } = require("./../middleware/Auth");
routes.post('/createUser', require('../controllers/user').createUser);
routes.post('/loginUser', require('../controllers/user').loginUser);
routes.get('/getUser', Auth);
routes.put('/forgot', Auth, require('../controllers/user').sendOtp);
routes.get('/varifyOtp', Auth, require('../controllers/user').varifyOtp);
routes.put('/newPassword', Auth, require('../controllers/user').createNewPassword);
routes.post('/changeAddress', require('../controllers/user').changeAddress)

module.exports = routes;