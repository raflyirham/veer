"use server";

import { auth } from "@/auth";
import db from "@/libs/db";
import { createTaskSchema } from "@/schemas/task";
import { Priority } from "../generated/prisma";

export const getUserTasks = async () => {
  try {
    const user = await auth();

    const tasks = await db.task.findMany({
      where: { userId: user?.user?.id },
    });

    return { success: true, data: tasks };
  } catch {
    return { success: false, data: null };
  }
};

export const getUserTaskSummary = async () => {
  try {
    const user = await auth();

    const tasks = await db.task.findMany({
      where: {
        userId: user?.user?.id,
      },
    });

    const lowPriorityTasks = tasks.filter((task) => task.priority === "LOW");
    const mediumPriorityTasks = tasks.filter(
      (task) => task.priority === "MEDIUM"
    );
    const highPriorityTasks = tasks.filter((task) => task.priority === "HIGH");

    return {
      success: true,
      data: {
        lowPriorityTasks: lowPriorityTasks.length,
        mediumPriorityTasks: mediumPriorityTasks.length,
        highPriorityTasks: highPriorityTasks.length,
      },
    };
  } catch {
    return { success: false, data: null };
  }
};

export const getLatestTasks = async () => {
  try {
    const user = await auth();

    const tasks = await db.task.findMany({
      where: {
        userId: user?.user?.id,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 3,
    });

    return { success: true, data: tasks };
  } catch {
    return { success: false, data: null };
  }
};

interface ResponseState {
  success: boolean;
  message: string | null;
  errors: Record<string, string[]> | null;
}

export const createTask = async (
  previousState: ResponseState,
  formData: FormData
): Promise<ResponseState> => {
  try {
    const user = await auth();

    const taskName = formData.get("taskName");
    const taskDescription = formData.get("taskDescription");
    const taskPriority = formData.get("taskPriority");
    const taskDeadline = new Date(formData.get("taskDeadline") as string);

    const validatedFields = createTaskSchema.safeParse({
      taskName,
      taskDescription,
      taskPriority,
      taskDeadline,
    });

    if (!validatedFields.success) {
      return {
        success: false,
        message: "Invalid fields",
        errors: validatedFields.error.flatten().fieldErrors,
      };
    }

    await db.task.create({
      data: {
        name: taskName as string,
        description: taskDescription as string,
        priority: taskPriority as Priority,
        deadline: taskDeadline,
        userId: user?.user?.id as string,
      },
    });

    return {
      success: true,
      message: "Task created successfully",
      errors: null,
    };
  } catch {
    return {
      success: false,
      message: "ERROR: Failed to create task",
      errors: null,
    };
  }
};
