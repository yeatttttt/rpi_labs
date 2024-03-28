import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    id: String,
    description: String,
    status: String
});

export const TaskModel = mongoose.model('Task', taskSchema)