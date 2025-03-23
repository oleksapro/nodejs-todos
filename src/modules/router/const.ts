import type { HttpMethod } from "./types.ts";

export const HTTP_METHODS: Record<HttpMethod, HttpMethod> = {
  GET: "GET",
  POST: "POST",
  PATCH: "PATCH",
  DELETE: "DELETE",
};
