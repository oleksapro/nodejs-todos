import { db, dbAsync, TABLES } from "../db.ts";
import type { UserSensitive } from "../entities/user.ts";

const user: UserSensitive = {
  id: 1,
  email: "user@email.com",
  password: "abcd",
};

export async function seedUsers() {
  await dbAsync.run(
    `INSERT INTO ${TABLES.USERS} (email, password) VALUES (?, ?)`,
    [user.email, user.password],
  );
}

export async function clearSharedTasks() {
  db.run(`DELETE FROM ${TABLES.USERS}`);
}
