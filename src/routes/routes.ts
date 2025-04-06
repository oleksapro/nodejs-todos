import { routes as swaggerUIRoutes } from "./swagger-ui.routes.ts";
import { routes as usersRoutes } from "./users.routes.ts";
import { routes as sharedTasksRoutes } from "./shared-tasks.routes.ts";

export const routes = [
  ...swaggerUIRoutes,
  ...usersRoutes,
  ...sharedTasksRoutes,
];
