import TaskManager from '../src/classes/task-manager.js';
import Task from "../src/classes/task.js";

const taskManager = new TaskManager();
taskManager.loadTasks('tasks.json');
taskManager.printTasks();
console.log()
taskManager.addTask(new Task(1, "Test Description", "Test Status"))
console.log()
taskManager.removeTask(4)