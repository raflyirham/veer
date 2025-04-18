import { z } from "zod";

const createTaskSchema = z.object({
  taskName: z
    .string()
    .min(1, "Task name is required")
    .max(100, "Task name must be less than 100 characters"),
  taskDescription: z
    .string()
    .min(1, "Task description is required")
    .max(1000, "Task description must be less than 1000 characters"),
  taskPriority: z.enum(["LOW", "MEDIUM", "HIGH"], {
    message: "Invalid task priority",
  }),
  taskDeadline: z
    .date({
      message: "Invalid task deadline",
    })
    .refine((date) => date > new Date(), {
      message: "Task deadline must be in the future",
    }),
});

export { createTaskSchema };
export type CreateTaskSchema = z.infer<typeof createTaskSchema>;
