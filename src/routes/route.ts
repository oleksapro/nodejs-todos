import { routes as swaggerUIRoutes } from "./swagger-ui.route.ts";
import { routes as usersRoutes } from "./user.route.ts";
import { routes as sharedTasksRoutes } from "./shared-task.route.ts";
import { routes as tasksRoutes } from "./task.route.ts";

export const routes = [
  ...swaggerUIRoutes,
  ...usersRoutes,
  ...sharedTasksRoutes,
  ...tasksRoutes,
];
