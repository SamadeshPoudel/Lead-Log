import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title: {type: String, required: true},
    dueDate: {type: Date, required: true},
    status: {type: String, enum: ["pending", "done"], default: "pending"},
    leadId: {type: mongoose.Schema.Types.ObjectId, ref:"Lead", required: true},
    userId: {type: String, required: true},
    createdAt: {type: Date, default: Date.now},
});

const task = mongoose.model("Task", taskSchema);

export default task;