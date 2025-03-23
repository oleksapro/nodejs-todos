import type { HttpMethod } from "./types.ts";

export const HTTP_METHODS: Record<HttpMethod, HttpMethod> = {
  GET: "GET",
  POST: "POST",
  PATCH: "PATCH",
  DELETE: "DELETE",
};

export const HTTP_STATUS = {
  success: 200,
  notFound: 404,
  serverError: 500,
};
