import bcrypt from "bcrypt";

import { db, dbAsync, TABLES } from "../db.ts";
import type { UserSensitive } from "../entities/user.ts";
import { config } from "../config.ts";

export const seededUser: UserSensitive = {
  id: 1,
  email: "user@email.com",
  password: "abcd",
};

export async function seedUsers() {
  const hashedPassword = bcrypt.hashSync(
    seededUser.password,
    config.jwt.hashRounds,
  );

  await dbAsync.run(
    `INSERT INTO ${TABLES.USERS} (email, password) VALUES (?, ?)`,
    [seededUser.email, hashedPassword],
  );
}

export async function clearUsers() {
  dbAsync.run(`DELETE FROM ${TABLES.USERS}`);
}
