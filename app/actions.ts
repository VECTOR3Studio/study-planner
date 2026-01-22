"use server";

import connectDB from "@/lib/db";
import Task from "@/models/Task";
import { revalidatePath } from "next/cache";

export async function addTask(formData: FormData) {
    await connectDB();

    const title = formData.get("title");

    if(title) {
        await Task.create({ title});
        revalidatePath("/");
    }
}

export async function deleteTask(id: string) {
    await connectDB();
    await Task.findByIdAndDelete(id);
    revalidatePath("/");
}