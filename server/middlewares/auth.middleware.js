const jwt = require('jsonwebtoken');
require('dotenv').config();

const { createCustomError } = require('../errors/custom-error');

const verifyToken = (req, res, next) => {
    const  { token } = req.cookies;
    console.log(token);
    if (!token) return next(createCustomError('Access denied. No token provided.', 401));

    try {
        const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        req.user = payload;
        next();
    } catch (err) {
        next(createCustomError('Invalid access token.', 400));
    }
}

module.exports = verifyToken;