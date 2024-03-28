import fs from 'fs';
import Task from './task.js';
import chalk from "chalk";
import { EventEmitter } from 'events';

class TaskManager extends EventEmitter {
    constructor() {
        super();
        this.tasks = [];
    }

    async loadTasks() {
        try {
            const data = await fs.promises.readFile('../tests/tasks.json', 'utf8');
            this.tasks = JSON.parse(data);
            this.emit('tasksLoaded', this.tasks);
        } catch (err) {
            console.error("Ошибка чтения файла:", err);
        }
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
        this.saveTasksToFile('../tests/tasks.json');
        this.printTasks()
    }

    async removeTask(taskId) {
        await this.loadTasks();
        this.tasks = this.tasks.filter(task => task.id !== taskId);
        this.saveTasksToFile('../tests/tasks.json');
        this.printTasks()
        this.emit('taskRemoved', this.tasks);
    }

    saveTasksToFile(filePath) {
        const jsonData = JSON.stringify(this.tasks, null, 2);
        fs.writeFileSync(filePath, jsonData);
    }
}

export default TaskManager;