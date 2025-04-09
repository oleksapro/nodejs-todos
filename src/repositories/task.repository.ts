import { db, TABLES } from "../db.ts";
import type { Task } from "../entities/Task.ts";

export const getTasks = (
  callback: (err: Error | null, tasks: Task[]) => void,
) => {
  db.all<Task>(`SELECT * FROM ${TABLES.TASKS}`, callback);
};

export const getTask = (
  id: string,
  callback: (err: Error | null, task: Task) => void,
) => {
  db.get<Task>(`SELECT * FROM ${TABLES.TASKS} WHERE id = ?`, [id], callback);
};

export type CreateTaskPayload = Pick<
  Task,
  "title" | "description" | "completed"
>;

export const createTask = (
  payload: CreateTaskPayload,
  callback: (err: Error | null, task?: Task) => void,
) => {
  db.run(
    `INSERT INTO ${TABLES.TASKS} (title, description) VALUES (?, ?)`,
    [payload.title, payload.description],
    async function (err) {
      if (err) {
        callback(err);
        return;
      }

      const id = this.lastID;

      db.get<Task>(
        `SELECT * FROM ${TABLES.TASKS} WHERE id = ?`,
        [id],
        callback,
      );
    },
  );
};

export type UpdateTaskPayload = Partial<
  Pick<Task, "title" | "description" | "completed">
>;

export const updateTask = (
  id: string,
  payload: UpdateTaskPayload,
  callback: (err: Error | null, task?: Task) => void,
) => {
  db.run(
    `UPDATE ${TABLES.TASKS} 
     SET title = COALESCE(?, title), description = COALESCE(?, description), completed = COALESCE(?, completed)
     WHERE id = ?`,
    [payload.title, payload.description, payload.completed, id],
    function (err) {
      if (err) {
        callback(err);
        return;
      }

      if (this.changes === 0) {
        callback(new Error("Not found", { cause: "not-found" }));
        return;
      }

      db.get<Task>(
        `SELECT * FROM ${TABLES.TASKS} WHERE id = ?`,
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
  db.run(`DELETE FROM ${TABLES.TASKS} WHERE id = ?`, [id], function (err) {
    if (err) {
      callback(err);
      return;
    }

    if (this.changes === 0) {
      callback(new Error("Not found", { cause: "not-found" }));
      return;
    }

    callback(err);
  });
};
