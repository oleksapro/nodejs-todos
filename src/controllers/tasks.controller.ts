import type { Task } from "../entities/task.ts";
import { HTTP_STATUS } from "../modules/router/const.ts";
import {
  type RequestContext,
  type RequestMod,
  type ResponseMod,
} from "../modules/router/types.ts";
import * as repository from "../repositories/task.repository.ts";
import type {
  CreateTaskPayload,
  UpdateTaskPayload,
} from "../repositories/task.repository.ts";
import { handleError, ResError } from "../utils/http.ts";

export type TaskDto = Omit<Task, "userId" | "completed"> & {
  completed?: boolean;
};

export const convertToDto = (task: Task): TaskDto => {
  const { userId, completed, ...taskDto } = task;

  return { ...taskDto, completed: Boolean(completed) };
};

const getTasks = (req: RequestMod, res: ResponseMod) => {
  const userId = req.context.user?.id as string;

  repository.getTasksByUserId(userId, (err, tasks) => {
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
  req: RequestMod,
  res: ResponseMod,
  { params }: RequestContext,
) => {
  repository.getTask(params.id, (err, task) => {
    if (err) {
      return handleError(res, err);
    }

    if (task.userId !== req.context.user?.id) {
      res.writeHead(HTTP_STATUS.forbidden, {
        "Content-Type": "application/json",
      });
      res.end(JSON.stringify({ message: "Forbidden" }));

      return;
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

export type CreateTaskResponse = {
  task: TaskDto;
};

const createTask = (
  req: RequestMod,
  res: ResponseMod,
  { body }: RequestContext,
) => {
  const userId = req.context.user?.id as string;
  const payload = body as CreateTaskPayload;

  repository.createTask(userId, payload, (err, task) => {
    if (err) {
      return handleError(res, err);
    }

    if (!task) {
      return handleError(res, new ResError({ cause: "not-found" }));
    }

    res.writeHead(HTTP_STATUS.created, {
      "Content-Type": "application/json",
    });
    res.end(JSON.stringify({ task: convertToDto(task) } as CreateTaskResponse));
  });
};

const updateTask = (
  req: RequestMod,
  res: ResponseMod,
  { params, body }: RequestContext,
) => {
  const payload = body as UpdateTaskPayload;

  repository.getTask(params.id, (err, task) => {
    if (err) {
      return handleError(res, err);
    }

    if (task.userId !== req.context.user?.id) {
      handleError(res, new Error("", { cause: "forbidden" }));
      return;
    }

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
  });
};

const deleteTask = (
  req: RequestMod,
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

    if (task.userId !== req.context.user?.id) {
      handleError(res, new ResError({ cause: "forbidden" }));
      return;
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

export const tasksController = {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
};
