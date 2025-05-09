import type { Route } from "../modules/router/types.ts";
import {
  getCss,
  getHtml,
  getJS,
  getOpenapiJson,
} from "../controllers/swagger-ui.controller.ts";

export const routes: Route[] = [
  {
    path: "/swagger-ui",
    method: "GET",
    handler: getHtml,
  },
  {
    path: "/swagger-ui/openapi.json",
    method: "GET",
    handler: getOpenapiJson,
  },
  {
    path: "/swagger-ui/swagger-ui.css",
    method: "GET",
    handler: getCss,
  },
  {
    path: "/swagger-ui/swagger-ui-bundle.js",
    method: "GET",
    handler: getJS,
  },
];
