const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    userEmail: {
        type: String,
        required: true

    },
    organization: {
        type: String,
        required: true
    },
    taskTitle: {
        type: String,
        required: true
    },
    taskDescription: {
        type: String,
        required: true
    },
    status:{
        type: String,
        enum: ['OPEN', 'COMPLETED'],
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    file: {
        type: String
    }
});

const task = mongoose.model('task', taskSchema );
module.exports = task;
