import fs from 'fs';
import Task from './task.js';
import chalk from "chalk";
import { EventEmitter } from 'events';
import {TaskModel} from "../../DbService/taskModel.js";

class TaskManager extends EventEmitter {
    constructor() {
        super();
        this.tasks = [];
    }

    loadTasks() {
        fs.readFile('tasks.json', 'utf8', (err, data) => {
            if (err) {
                console.error("Error reading file:", err);
                return;
            }
            console.log("No error");
            const tasksData = JSON.parse(data);
            this.tasks = tasksData.map(task => {
                const newTask = new TaskModel(task);
                newTask.save()
                return newTask;
            })
        })

            // const data = await fs.promises.readFile('../tests/tasks.json', 'utf8');
            // this.tasks = JSON.parse(data);
            // this.emit('tasksLoaded', this.tasks);
    }



    printTasks() {
        this.tasks.forEach(task => {
            if (task.status === 'Complete') {
                console.log(chalk.blue(`Task ID: ${task.id}, Description: ${task.description}, Status: ${task.status}`));
            } if (task.status === 'Test Status') {
                console.log(chalk.green(`Task ID: ${task.id}, Description: ${task.description}, Status: ${task.status}`))
            } else {
                console.log(chalk.red(`Task ID: ${task.id}, Description: ${task.description}, Status: ${task.status}`));
            }
        });
    }

    addTask(task) {
        this.tasks.push(task);
        this.saveTasksToFile('tasks.json');
        this.printTasks()
    }

    async removeTask(taskId) {
        await this.loadTasks();
        this.tasks = this.tasks.filter(task => task.id !== taskId);
        this.saveTasksToFile('tasks.json');
        this.printTasks()
        this.emit('taskRemoved', this.tasks);
    }

    saveTasksToFile(filePath) {
        const jsonData = JSON.stringify(this.tasks, null, 2);
        fs.writeFileSync(filePath, jsonData);
    }
}

export default TaskManager;