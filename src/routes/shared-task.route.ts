import { sharedTasksController } from "../controllers/shared-task.controller.ts";
import { HTTP_METHODS } from "../modules/router/const.ts";
import type { Route } from "../modules/router/types.ts";

export const routes: Route[] = [
  {
    path: "/shared-tasks",
    method: HTTP_METHODS.GET,
    handler: sharedTasksController.getTasks,
  },
  {
    path: "/shared-tasks/:id",
    method: HTTP_METHODS.GET,
    handler: sharedTasksController.getTask,
  },
  {
    path: "/shared-tasks/:id",
    method: HTTP_METHODS.PATCH,
    handler: sharedTasksController.updateTask,
  },
  {
    path: "/shared-tasks",
    method: HTTP_METHODS.POST,
    handler: sharedTasksController.createTask,
  },
  {
    path: "/shared-tasks/:id",
    method: HTTP_METHODS.DELETE,
    handler: sharedTasksController.deleteTask,
  },
];
