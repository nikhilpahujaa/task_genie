const express = require('express');
const Task = require('./../models/taskModel');
const router = express.Router();

module.exports = (upload) => {

    router.post('/', upload.array('files'), async (req, res) => {
        try {
            const fileNames = req.files.map(file => file.filename);

            const task = new Task({
                userEmail: req.body.userEmail,
                organization: req.body.organization,
                taskTitle: req.body.taskTitle,
                taskDescription: req.body.taskDescription,
                status: req.body.status,
                files: fileNames
            });
            await task.save();
            console.log('Task saved with multiple files');
            res.status(201).json(task);
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    });

    router.get('/', async (req, res) => {
        try {
            const tasks = await Task.find();
            console.log('Tasks fetched');
            res.status(200).json(tasks);
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    });

    router.get('/:id', async (req, res) => {
        try {
            const task = await Task.findById(req.params.id);
            if (!task) {
                return res.status(404).json({ message: 'Task not found' });
            }
            res.status(200).json(task);
        } catch (err) {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    });

    router.put('/:id', async (req, res) => {
        try {
            const taskId = req.params.id;
            const updatesTaskId = req.body;

            const updatedTask = await Task.findByIdAndUpdate(taskId, updatesTaskId, {
                new: true,
                runValidators: true,
            });

            if (!updatedTask) {
                return res.status(404).json({ message: 'Task not found' });
            }

            console.log('Task updated');
            res.status(200).json(updatedTask);

        } catch (err) {
            console.error('Error updating task:', err.message);
            res.status(500).json({ error: 'Failed to update task' });
        }
    });

    router.delete('/:id', async (req, res) => {
        try {
            const task = await Task.findByIdAndDelete(req.params.id);

            if (!task) {
                return res.status(404).json({ message: 'Task not found' });
            }

            res.status(200).json(task);
        } catch (error) {
            console.error('Error deleting task:', error.message);
            res.status(500).json({ error: 'Failed to delete task' });
        }
    });

    router.get('/download/:id', async (req, res) => {
        try {
            const task = await Task.findById(req.params.id);
            if (!task || !task.file) {
                return res.status(404).json({ message: 'File not found' });
            }

            const filePath = `uploads/${task.file}`;
            res.download(filePath, (err) => {
                if (err) {
                    console.error('Error downloading file:', err.message);
                    res.status(500).json({ message: 'Internal Server Error' });
                }
            });
        } catch (err) {
            console.error('Error fetching task for download:', err.message);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    });

    return router;
};
