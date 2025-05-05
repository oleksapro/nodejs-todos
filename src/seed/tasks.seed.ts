import type { TaskDto } from "../controllers/tasks.controller.ts";
import { db, dbAsync, TABLES } from "../db.ts";
import { seededUser } from "./users.seed.ts";

export const seededTasks: TaskDto[] = [
  {
    id: 1,
    title: "Seeded Task 1",
    description: "Seeded Description 1",
    completed: false,
  },
  {
    id: 2,
    title: "Seeded Task 2",
    description: "Seeded Description 2",
    completed: true,
  },
];

export async function seedTasks() {
  await dbAsync.run(
    `INSERT INTO ${TABLES.TASKS} (title, description, completed, userId) VALUES (?, ?, ?, ?)`,
    [
      seededTasks[0].title,
      seededTasks[0].description,
      seededTasks[0].completed,
      seededUser.id,
    ],
  );

  dbAsync.run(
    `INSERT INTO ${TABLES.TASKS} (title, description, completed, userId) VALUES (?, ?, ?, ?)`,
    [
      seededTasks[1].title,
      seededTasks[1].description,
      seededTasks[1].completed,
      seededUser.id,
    ],
  );
}

export async function clearTasks() {
  db.run(`DELETE FROM ${TABLES.TASKS}`);
}
