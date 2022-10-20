const TaskController = require('../controllers/task.controller');

const express = require('express');
const router = express.Router();

router.route('/').get(TaskController.getAllTask).post(TaskController.createTask);

router.route('/:id').get(TaskController.getTask).put(TaskController.updateTask).delete(TaskController.deleteTask);

module.exports = router;