import { tasksController } from "../controllers/tasks.controller.ts";
import { authMiddleware } from "../middlewares/auth.ts";
import { HTTP_METHODS } from "../modules/router/const.ts";
import type { Route } from "../modules/router/types.ts";

export const routes: Route[] = [
  {
    path: "/tasks",
    method: HTTP_METHODS.GET,
    handler: authMiddleware(tasksController.getTasks),
  },
  {
    path: "/tasks/:id",
    method: HTTP_METHODS.GET,
    handler: authMiddleware(tasksController.getTask),
  },
  {
    path: "/tasks/:id",
    method: HTTP_METHODS.PATCH,
    handler: authMiddleware(tasksController.updateTask),
  },
  {
    path: "/tasks",
    method: HTTP_METHODS.POST,
    handler: authMiddleware(tasksController.createTask),
  },
  {
    path: "/tasks/:id",
    method: HTTP_METHODS.DELETE,
    handler: authMiddleware(tasksController.deleteTask),
  },
];
