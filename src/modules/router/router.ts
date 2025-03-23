import { IncomingMessage } from "node:http";

import type { Route, Response } from "./types.ts";
import { HTTP_STATUS } from "./const.ts";
import { matchPath } from "./utils/matchPath.ts";

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
