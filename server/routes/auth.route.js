const AuthController = require('../controllers/auth.controller');
const express = require('express');
const router = express.Router();

router.post('/', AuthController.checkAuthentication);

module.exports = router;