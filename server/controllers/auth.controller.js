const { User } = require('../models/user.model');
const asyncWrapper = require('../middlewares/async');
const { createCustomError } = require('../errors/custom-error');

const bcrypt = require('bcrypt');
const Joi = require('joi');
const { joiPasswordExtendCore } = require('joi-password');
const joiPassword = Joi.extend(joiPasswordExtendCore);

// login
const checkAuthentication = asyncWrapper(async (req, res, next) => {
    const { error } = validate(req.body);
    if (error) return next(createCustomError(error.details[0].message, 400));

    let user = await User.findOne({ email: req.body.email });
    if (!user) return next(createCustomError('Email is not registered', 400));

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return next(createCustomError('Password is not correct', 400));

    const token = user.generateAuthToken();

    const cookieOptions = {
        credentials: true,
        path: "/",
        secure: true,
        httpOnly: true,
        sameSite: "none", 
        maxAge: 24 * 60 * 60 * 1000
    }

    res
    .cookie('token', token, cookieOptions)
    .status(200)
    .json({ user: { id: user._id, name: user.name }, token});
});

const validate = (user) => 
    Joi.object({
        email: Joi.string().required().min(5).max(255).email(),
        password: joiPassword
            .string()
            .required()
    }).validate(user);

module.exports = { checkAuthentication };