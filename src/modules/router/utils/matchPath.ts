import type { RouteParams } from "../types.ts";

export const matchPath = (routePath: string, pathname: string) => {
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
