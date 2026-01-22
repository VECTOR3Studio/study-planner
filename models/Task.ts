import mongoose, { Schema, Document } from "mongoose";

export interface ITask extends Document {
  title: string;
  isCompleted: boolean;
  createdAt: Date;
}

const TaskSchema = new Schema<ITask>({
  title: { type: String, required: true },
  isCompleted: { type: Boolean, default: false },
}, { timestamps: true });

// Check if model exists before compiling (Next.js hot reload fix)
const Task = mongoose.models.Task || mongoose.model<ITask>("Task", TaskSchema);

export default Task;