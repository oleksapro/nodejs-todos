import { z } from "zod";

export const createTaskSchema = z.object({
  title: z.string().trim().max(250),
  description: z.string().trim().max(1000),
  completed: z.boolean(),
});

export type CreateTaskPayload = z.infer<typeof createTaskSchema>;

export const updateTaskSchema = z.object({
  title: z.string().trim().max(250).optional(),
  description: z.string().trim().max(1000).optional(),
  completed: z.boolean().optional(),
});

export type UpdateTaskPayload = z.infer<typeof updateTaskSchema>;
