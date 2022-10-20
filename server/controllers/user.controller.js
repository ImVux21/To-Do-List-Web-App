const { User, validateUser } = require('../models/user.model');
const asyncWrapper = require('../middlewares/async');
const { createCustomError } = require('../errors/custom-error');

const bcrypt = require('bcrypt');

const getUser = asyncWrapper(async (req, res) => {
    const user =  await User.findById(req.user.id).select('-password');
    res.status(200).json({ user: { id: user._id, name: user.name } });
});

const register = asyncWrapper(async (req, res, next) => {
    const { error } = validateUser(req.body); 
    if(error) return next(createCustomError(error.details[0].message, 400));

    let user =  await User.findOne({ email: req.body.email });
    if (user) return next(createCustomError('User already resgistered.', 400));

    user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();

    res.status(200)
    .json({ task: { id: user._id, name: user.name }, token });
});

module.exports = { getUser, register }