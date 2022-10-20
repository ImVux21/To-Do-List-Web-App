const UserController = require('../controllers/user.controller');
const verifyToken =  require('../middlewares/auth.middleware');
const express = require('express');
const router = express.Router();

router.get('/me', verifyToken, UserController.getUser);

router.post('/', UserController.register);

module.exports = router;