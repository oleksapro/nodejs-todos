import bcrypt from "bcrypt";

import { db, TABLES } from "../db.ts";
import type { UserSensitive, User } from "../entities/User.ts";

function omitSensitiveProps(user: UserSensitive): User {
  const { password, ...otherUserProps } = user;

  return otherUserProps;
}

export const getUsers = (
  callback: (err: Error | null, users: User[]) => void,
) => {
  db.all<User>(`SELECT * FROM ${TABLES.USERS}`, callback);
};

export const getUser = (
  id: string,
  callback: (err: Error | null, user: User) => void,
) => {
  db.get<User>(`SELECT * FROM ${TABLES.USERS} WHERE id = ?`, [id], callback);
};

export type CreateUserPayload = Pick<UserSensitive, "email" | "password">;

export const createUser = (
  payload: CreateUserPayload,
  callback: (err: Error | null, user?: User) => void,
) => {
  bcrypt.hash(payload.password, 10, function (err, hashedPassword) {
    if (err) {
      callback(err);
      return;
    }

    db.run(
      `INSERT INTO ${TABLES.USERS} (email, password) VALUES (?, ?)`,
      [payload.email, hashedPassword],
      async function (err) {
        if (err) {
          callback(err);
          return;
        }

        const id = this.lastID;

        db.get<UserSensitive>(
          `SELECT * FROM ${TABLES.USERS} WHERE id = ?`,
          [id],
          function (err, user) {
            callback(err, omitSensitiveProps(user));
          },
        );
      },
    );
  });
};

type UpdateUserPayload = Pick<UserSensitive, "email" | "password">;

export const updateUser = (
  id: string,
  payload: UpdateUserPayload,
  callback: (err: Error | null, user?: User) => void,
) => {
  db.run(
    `UPDATE ${TABLES.USERS} 
       SET email = COALESCE(?, email), password = COALESCE(?, password)
       WHERE id = ?`,
    [payload.email, payload.password, id],
    function (err) {
      if (err) {
        callback(err);
        return;
      }

      if (this.changes === 0) {
        callback(new Error("Not found", { cause: "not-found" }));
        return;
      }

      db.get<User>(
        `SELECT * FROM ${TABLES.USERS} WHERE id = ?`,
        [id],
        callback,
      );
    },
  );
};

export const deleteUser = (
  id: string,
  callback: (err: Error | null) => void,
) => {
  db.run(`DELETE FROM ${TABLES.USERS} WHERE id = ?`, [id], function (err) {
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
