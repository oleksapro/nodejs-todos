import type { IncomingMessage } from "node:http";

import { HTTP_STATUS, type RequestContext } from "../modules/router/index.ts";
import { type Response } from "../modules/router/index.ts";

import * as repository from "../repositories/task.repository.ts";
import type {
  PostTaskPayload,
  UpdateTaskPayload,
} from "../repositories/task.repository.ts";

const handleError = (res: Response, err: Error) => {
  if (err.cause === "not-found") {
    res.writeHead(HTTP_STATUS.notFound, {
      "Content-Type": "application/json",
    });
    res.end(JSON.stringify({ error: "Task not found" }));
    return;
  }

  res.writeHead(HTTP_STATUS.serverError, {
    "Content-Type": "application/json",
  });
  res.end(JSON.stringify({ ...err, message: "Something went wrong" }));
};

export const getTasks = (req: IncomingMessage, res: Response) => {
  repository.getTasks((err, tasks) => {
    if (err) {
      return handleError(res, err);
    }

    res.writeHead(HTTP_STATUS.success, {
      "Content-Type": "application/json",
    });
    res.end(JSON.stringify({ tasks: tasks }));
  });
};

export const getTask = (
  _req: IncomingMessage,
  res: Response,
  { params }: RequestContext,
) => {
  repository.getTask(params.id, (err, task) => {
    if (err) {
      return handleError(res, err);
    }

    res.writeHead(HTTP_STATUS.success, {
      "Content-Type": "application/json",
    });
    res.end(JSON.stringify({ task: task }));
  });
};

export const updateTask = (
  _req: IncomingMessage,
  res: Response,
  { params, body }: RequestContext,
) => {
  const payload = body as UpdateTaskPayload;

  repository.updateTask(params.id, payload, (err, task) => {
    if (err) {
      return handleError(res, err);
    }

    res.writeHead(HTTP_STATUS.success, {
      "Content-Type": "application/json",
    });
    res.end(JSON.stringify({ task }));
  });
};

export const postTask = (
  _req: IncomingMessage,
  res: Response,
  { body }: RequestContext,
) => {
  const payload = body as PostTaskPayload;

  repository.postTask(payload, (err, task) => {
    if (err) {
      return handleError(res, err);
    }

    res.writeHead(HTTP_STATUS.success, {
      "Content-Type": "application/json",
    });
    res.end(JSON.stringify({ task: task }));
  });
};

export const deleteTask = (
  _req: IncomingMessage,
  res: Response,
  { params }: RequestContext,
) => {
  repository.deleteTask(params.id, (err) => {
    if (err) {
      return handleError(res, err);
    }

    res.writeHead(HTTP_STATUS.success, {
      "Content-Type": "application/json",
    });
    res.end(JSON.stringify({ message: "Deleted" }));
  });
};
