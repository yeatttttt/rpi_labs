class Task {
    constructor(id, description, status) {
        this.id = id;
        this.description = description;
        this.status = status;
    }

    toString() {
        return `Task ID: ${this.id}, Description: ${this.description}, Status: ${this.status}`;
    }
}

export default Task;