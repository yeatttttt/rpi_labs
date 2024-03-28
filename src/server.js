import express from 'express';
import TaskManager from "./classes/task-manager.js";
import "dotenv/config";
import mongoose from "mongoose";
import cors from "cors"
import {TaskModel} from "../DbService/taskModel.js";
import { validateTaskData } from '../middleware/validateTaskData.js';

const app = express();
app.use(express.json());
app.use(cors())
const PORT = process.env.PORT || 3000;

app.get('/', validateTaskData, (req, res) => {
    res.send('Hello, Express!');
});


// app.get('/tasks', async (req, res) => {
//     try {
//         const tasks = await TaskModel.find();
//         res.json(tasks);
//     } catch (err) {
//         res.status(500).send(err.message);
//     }
// });

app.post('/tasks', validateTaskData, async (req, res) => {
    try {
        const newTask = new TaskModel(req.body);
        const savedTask = await newTask.save();
        res.status(201).json(savedTask);
    } catch (err) {
        res.status(400).send(err.message);
    }
});
app.delete('/tasks/:id', async (req, res) => {
    const taskId = req.params.id;

    try {
        const deletedTask = await TaskModel.findOneAndDelete({ id: taskId });
        if (!deletedTask) {
            return res.status(404).json({ error: 'Task not found' });
        } else {
            return res.status(200).json(deletedTask);
        }

    } catch (err) {
        res.status(500).send('Ошибка при удалении задачи:', err.message);
    }

    // try {
    //     const deletedTask = await TaskModel.findOneAndDelete({ id: taskId }); // Замените { id: taskId } на taskId
    //     if (!deletedTask) {
    //         console.log('Задача не найдена.');
    //     } else {
    //         console.log('Удалена задача:', deletedTask);
    //     }
    // } catch (err) {
    //     console.error('Ошибка при удалении задачи:', err);
});


const taskManager = new TaskManager();
taskManager.loadTasks();

taskManager.on('tasksLoaded', (tasks) => {
    console.log("Tasks loaded:", tasks);
});

// taskManager.printTasks();
// taskManager.removeTask(1)
//
// taskManager.on('taskRemoved', (tasks) => {
//
//     console.log("Task removed:", tasks)
// })

const mongoUri = `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?authSource=admin`;

app.listen(3000, () => {
    console.log(`Server is running on  http://localhost:3000`);
});

mongoose.connect(mongoUri)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error('MongoDB connection error:', err));