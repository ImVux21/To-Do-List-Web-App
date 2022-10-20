const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 5
    },
    completed: {
        type: Boolean,
        default: false
    },
    createBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    }
},
{ timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

const Task = mongoose.model('Task', taskSchema);

function validateTask(task) {
    const schema = Joi.object({
        name: Joi.string().min(5).required(),
        completed: Joi.boolean().default(1),
        createBy: Joi.objectId(),
    });

    return schema.validate(task);
}

module.exports = { Task, validateTask };