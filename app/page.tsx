import { addTask, deleteTask } from "./actions";
import connectDB from "@/lib/db";
import Task from "@/models/Task";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

export default async function Home() {
  await connectDB();
  const tasks = await Task.find().sort({ createdAt: -1 });

  return (
    <main className="max-w-2xl mx-auto p-10 space-y-8">
      <h1 className="text-3xl font-bold text-center">Study Planner</h1>

      {/* 2. The Add Task Form */}
      <Card className="p-6">
        <form action={addTask} className="flex gap-4">
          <Input 
            name="title" 
            placeholder="What do you need to study?" 
            required 
          />
          <Button type="submit">Add Task</Button>
        </form>
      </Card>

      {/* 3. The Task List */}
      <div className="space-y-4">
        {tasks.map((task) => (
          <Card key={task._id} className="p-4 flex justify-between items-center">
            <span>{task.title}</span>
            <form action={deleteTask.bind(null, task._id.toString())}>
               <Button variant="destructive" size="sm">Delete</Button>
            </form>
          </Card>
        ))}
      </div>
    </main>
  );
}