import {
  getTasks,
  getTask,
  updateTask,
  postTask,
  deleteTask,
} from "../controllers/tasks.controller.ts";
import { HTTP_METHODS } from "../modules/router/const.ts";
import type { Route } from "../modules/router/types.ts";

export const routes: Route[] = [
  {
    path: "/tasks",
    method: HTTP_METHODS.GET,
    handler: getTasks,
  },
  {
    path: "/tasks/:id",
    method: HTTP_METHODS.GET,
    handler: getTask,
  },
  {
    path: "/tasks/:id",
    method: HTTP_METHODS.PATCH,
    handler: updateTask,
  },
  {
    path: "/tasks",
    method: HTTP_METHODS.POST,
    handler: postTask,
  },
  {
    path: "/tasks/:id",
    method: HTTP_METHODS.DELETE,
    handler: deleteTask,
  },
];
