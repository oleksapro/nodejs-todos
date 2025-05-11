import { db, TABLES } from "../db.ts";
import type { SharedTask } from "../entities/shared-task.ts";
import type {
  CreateTaskPayload,
  UpdateTaskPayload,
} from "../schemas/shared-task.schema.ts";
import { ResError } from "../utils/http.ts";

export const getTasks = (
  callback: (err: Error | null, tasks: SharedTask[]) => void,
) => {
  db.all<SharedTask>(`SELECT * FROM ${TABLES.SHARED_TASKS}`, callback);
};

export const getTask = (
  id: string,
  callback: (err: Error | null, task: SharedTask) => void,
) => {
  db.get<SharedTask>(
    `SELECT * FROM ${TABLES.SHARED_TASKS} WHERE id = ?`,
    [id],
    callback,
  );
};

export const createTask = (
  payload: CreateTaskPayload,
  callback: (err: Error | null, task?: SharedTask) => void,
) => {
  db.run(
    `INSERT INTO ${TABLES.SHARED_TASKS} (title, description, completed) VALUES (?, ?, ?)`,
    [payload.title, payload.description, payload.completed],
    async function (err) {
      if (err) {
        callback(err);
        return;
      }

      const id = this.lastID;

      db.get<SharedTask>(
        `SELECT * FROM ${TABLES.SHARED_TASKS} WHERE id = ?`,
        [id],
        callback,
      );
    },
  );
};

export const updateTask = (
  id: string,
  payload: UpdateTaskPayload,
  callback: (err: Error | null, task?: SharedTask) => void,
) => {
  db.run(
    `UPDATE ${TABLES.SHARED_TASKS} 
     SET title = COALESCE(?, title), description = COALESCE(?, description), completed = COALESCE(?, completed)
     WHERE id = ?`,
    [payload.title, payload.description, payload.completed, id],
    function (err) {
      if (err) {
        callback(err);
        return;
      }

      if (this.changes === 0) {
        callback(new ResError({ cause: "not-found" }));
        return;
      }

      db.get<SharedTask>(
        `SELECT * FROM ${TABLES.SHARED_TASKS} WHERE id = ?`,
        [id],
        callback,
      );
    },
  );
};

export const deleteTask = (
  id: string,
  callback: (err: Error | null) => void,
) => {
  db.run(
    `DELETE FROM ${TABLES.SHARED_TASKS} WHERE id = ?`,
    [id],
    function (err) {
      if (err) {
        callback(err);
        return;
      }

      if (this.changes === 0) {
        callback(new ResError({ cause: "not-found" }));
        return;
      }

      callback(err);
    },
  );
};
