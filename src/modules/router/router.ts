import { IncomingMessage } from "node:http";

import type { Route, RouteParams, Response } from "./types.ts";

export const HTTP_STATUS = {
  success: 200,
  notFound: 404,
  serverError: 500,
};

const matchPath = (routePath: string, pathname: string) => {
  const routeParts = routePath.split("/");
  const pathParts = pathname.split("/");

  if (routeParts.length !== pathParts.length) {
    return { match: false, params: {} };
  }

  const params: RouteParams = {};

  for (let i = 0; i < routeParts.length; i++) {
    const routePart = routeParts[i];
    const pathPart = pathParts[i];

    if (routePart.startsWith(":")) {
      // Dynamic parameter (e.g., :id)
      const paramName = routePart.slice(1);
      params[paramName] = pathPart;
    } else if (routePart !== pathPart) {
      // Static path mismatch
      return { match: false, params: {} };
    }
  }

  return { match: true, params };
};

const parseBody = (req: IncomingMessage, callback: (body: any) => void) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });
  req.on("end", () => {
    callback(JSON.parse(body));
  });
};

export const router = (routes: Route[]) => {
  return (req: IncomingMessage, res: Response) => {
    const url = new URL(req.url!, `http://${req.headers.host}`);
    const pathname = url.pathname;
    const queryParams = Object.fromEntries(url.searchParams.entries());

    for (const route of routes) {
      const { match, params } = matchPath(route.path, pathname);
      const sameMethod = req.method === route.method;

      if (match && sameMethod) {
        if (["POST", "PATCH"].includes(route.method)) {
          parseBody(req, (body) => {
            route.handler(req, res, { params, queryParams, body });
          });

          return;
        }

        route.handler(req, res, { params, queryParams });

        return;
      }
    }

    res.writeHead(HTTP_STATUS.notFound, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Not found" }));
  };
};
