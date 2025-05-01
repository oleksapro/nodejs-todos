import type { IncomingMessage } from "node:http";

import { HTTP_STATUS, type RequestContext } from "../modules/router/index.ts";
import { type ResponseMod } from "../modules/router/index.ts";
import * as repository from "../repositories/shared-task.repository.ts";
import type {
  CreateTaskPayload,
  UpdateTaskPayload,
} from "../repositories/shared-task.repository.ts";
import { handleError, ResError } from "../utils/http.ts";
import type { SharedTask } from "../entities/shared-task.ts";

export type SharedTaskDto = Omit<SharedTask, "completed"> & {
  completed?: boolean;
};

export const convertToDto = (task: SharedTask): SharedTaskDto => {
  const { completed, ...taskDto } = task;

  return { ...taskDto, completed: Boolean(completed) };
};

const getTasks = (_req: IncomingMessage, res: ResponseMod) => {
  repository.getTasks((err, tasks) => {
    if (err) {
      return handleError(res, err);
    }

    res.writeHead(HTTP_STATUS.success, {
      "Content-Type": "application/json",
    });
    res.end(JSON.stringify({ tasks: tasks.map(convertToDto) }));
  });
};

const getTask = (
  _req: IncomingMessage,
  res: ResponseMod,
  { params }: RequestContext,
) => {
  repository.getTask(params.id, (err, task) => {
    if (err) {
      return handleError(res, err);
    }

    if (!task) {
      return handleError(res, new ResError({ cause: "not-found" }));
    }

    res.writeHead(HTTP_STATUS.success, {
      "Content-Type": "application/json",
    });
    res.end(JSON.stringify({ task: convertToDto(task) }));
  });
};

const createTask = (
  _req: IncomingMessage,
  res: ResponseMod,
  { body }: RequestContext,
) => {
  const payload = body as CreateTaskPayload;

  repository.createTask(payload, (err, task) => {
    if (err) {
      return handleError(res, err);
    }

    if (!task) {
      return handleError(res, new ResError({ cause: "not-found" }));
    }

    res.writeHead(HTTP_STATUS.created, {
      "Content-Type": "application/json",
    });
    res.end(JSON.stringify({ task: convertToDto(task) }));
  });
};

const updateTask = (
  _req: IncomingMessage,
  res: ResponseMod,
  { params, body }: RequestContext,
) => {
  const payload = body as UpdateTaskPayload;

  repository.updateTask(params.id, payload, (err, task) => {
    if (err) {
      return handleError(res, err);
    }

    if (!task) {
      return handleError(res, new ResError({ cause: "not-found" }));
    }

    res.writeHead(HTTP_STATUS.success, {
      "Content-Type": "application/json",
    });
    res.end(JSON.stringify({ task: convertToDto(task) }));
  });
};

const deleteTask = (
  _req: IncomingMessage,
  res: ResponseMod,
  { params }: RequestContext,
) => {
  repository.getTask(params.id, (err, task) => {
    if (err) {
      return handleError(res, err);
    }

    if (!task) {
      return handleError(res, new ResError({ cause: "not-found" }));
    }

    repository.deleteTask(params.id, (err) => {
      if (err) {
        return handleError(res, err);
      }

      res.writeHead(HTTP_STATUS.success, {
        "Content-Type": "application/json",
      });
      res.end(JSON.stringify({ message: "Deleted" }));
    });
  });
};

export const sharedTasksController = {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
};
