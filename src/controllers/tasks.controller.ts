import {
  HTTP_STATUS,
  type RequestContext,
  type RequestMod,
} from "../modules/router/index.ts";
import { type ResponseMod } from "../modules/router/index.ts";

import * as repository from "../repositories/task.repository.ts";
import type {
  CreateTaskPayload,
  UpdateTaskPayload,
} from "../repositories/task.repository.ts";
import { handleError } from "../utils/http.ts";

export const getTasks = (_req: RequestMod, res: ResponseMod) => {
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
  _req: RequestMod,
  res: ResponseMod,
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

export const createTask = (
  _req: RequestMod,
  res: ResponseMod,
  { body }: RequestContext,
) => {
  const payload = body as CreateTaskPayload;

  repository.createTask(payload, (err, task) => {
    if (err) {
      return handleError(res, err);
    }

    res.writeHead(HTTP_STATUS.created, {
      "Content-Type": "application/json",
    });
    res.end(JSON.stringify({ task: task }));
  });
};

export const updateTask = (
  _req: RequestMod,
  res: ResponseMod,
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

export const deleteTask = (
  _req: RequestMod,
  res: ResponseMod,
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
