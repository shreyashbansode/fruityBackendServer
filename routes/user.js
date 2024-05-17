const express = require('express');
const routes = express.Router();

routes.post('/createUser', require('../controllers/user').createUser);
routes.post('/loginUser', require('../controllers/user').loginUser);
routes.get('/getUser', require('../middleware/Auth').Auth);
routes.put('/forgot', require('../controllers/user').sendOtp);
routes.get('/varifyOtp', require('../controllers/user').varifyOtp);
routes.put('/newPassword', require('../controllers/user').createNewPassword)

module.exports = routes;