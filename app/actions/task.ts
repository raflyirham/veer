import { auth } from "@/auth";
import db from "@/libs/db";

export const getTasks = async () => {
  const tasks = await db.task.findMany();
  return tasks;
};

export const getTaskSummary = async () => {
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
