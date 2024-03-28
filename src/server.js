import http from 'http';
import TaskManager from "./classes/task-manager.js";
import task from "./classes/task.js";


const server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello, World!\n');
});
const taskManager = new TaskManager();
taskManager.loadTasks();

taskManager.on('tasksLoaded', (tasks) => {
    console.log("Tasks loaded:", tasks);
});

taskManager.printTasks();
taskManager.removeTask(1)

taskManager.on('taskRemoved', (tasks) => {

    console.log("Task removed:", tasks)
})

server.listen(3000, () => {
    console.log("Server running at http://localhost:3000/");
});

