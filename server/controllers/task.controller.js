const { Task, validateTask } = require('../models/task.model'); 
const { User } = require('../models/user.model');
const asyncWrapper = require('../middlewares/async');
const { createCustomError } = require('../errors/custom-error');

const getAllTask = asyncWrapper(async (req, res) => {
    const tasks = await Task.find();
    res.status(200).json({ tasks });
});

const getTask = asyncWrapper(async (req, res, next) => {
    const task = await Task.findById(req.params.id);
    if (!task) return next(createCustomError(`No task with id : ${req.params.id}`, 404));

    res.status(200).json({ task });
});

const createTask = asyncWrapper(async (req, res, next) => {
    const { error } = validateTask(req.body);
    if (error) return next(createCustomError(error.details[0].message, 400));

    // const user = await User.findById(req.body.createBy);

    const task = new Task({
        name: req.body.name,
        createBy: req.body.createBy
    });
    await task.save();

    res.status(201).json({ task });
});

const deleteTask = asyncWrapper(async (req, res, next) => {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) next(createCustomError(`No task with id : ${req.params.id}`, 404));

    res.status(200).json({ task })
});

const updateTask = asyncWrapper(async (req, res, next) => {
    const { error } = validateTask(req.body);
    if (error) return next(createCustomError(error.details[0].message, 400));

    const task = await Task.findByIdAndUpdate(req.params.id, {
        $set: {
            completed: req.body.completed
        }
    }, {  new: true });

    if (!task)  next(createCustomError(`No task with id : ${req.params.id}`, 404));

    res.status(200).json({ task })
});

module.exports = {
    getAllTask,
    getTask,
    createTask,
    deleteTask,
    updateTask
}