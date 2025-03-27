import { routes as tasksRoutes } from "./tasks.routes.ts";
import { routes as swaggerUIRoutes } from "./swagger-ui.routes.ts";

export const routes = [...tasksRoutes, ...swaggerUIRoutes];
