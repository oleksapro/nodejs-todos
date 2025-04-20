import type { HttpMethod } from "./types.ts";

export const HTTP_METHODS: Record<HttpMethod, HttpMethod> = {
  GET: "GET",
  POST: "POST",
  PATCH: "PATCH",
  DELETE: "DELETE",
};

export const HTTP_STATUS = {
  success: 200,
  created: 201,
  unauthorized: 401,
  forbidden: 403,
  notFound: 404,
  serverError: 500,
};
