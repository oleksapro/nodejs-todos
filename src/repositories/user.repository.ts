import bcrypt from "bcrypt";

import { db, TABLES } from "../db.ts";
import type { UserSensitive, User } from "../entities/User.ts";
import { ResError } from "../utils/http.ts";

export function omitSensitiveUserProps(user: UserSensitive): User {
  const { password, ...otherUserProps } = user;

  return otherUserProps;
}

export const getUsers = (
  callback: (err: Error | null, users: User[]) => void,
) => {
  db.all<UserSensitive>(`SELECT * FROM ${TABLES.USERS}`, function (err, users) {
    callback(err, users.map(omitSensitiveUserProps));
  });
};

export const getUser = (
  id: string,
  callback: (err: Error | null, user: User) => void,
) => {
  db.get<UserSensitive>(
    `SELECT * FROM ${TABLES.USERS} WHERE id = ?`,
    [id],
    function (err, user) {
      callback(err, omitSensitiveUserProps(user));
    },
  );
};

export const getUserByEmail = (
  email: string,
  callback: (err: Error | null, user: User) => void,
) => {
  db.get<UserSensitive>(
    `SELECT * FROM ${TABLES.USERS} WHERE email = ?`,
    [email],
    function (err, user) {
      callback(err, omitSensitiveUserProps(user));
    },
  );
};

export const getUserSensitiveByEmail = (
  email: string,
  callback: (err: Error | null, user: UserSensitive) => void,
) => {
  db.get<UserSensitive>(
    `SELECT * FROM ${TABLES.USERS} WHERE email = ?`,
    [email],
    function (err, user) {
      callback(err, user);
    },
  );
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
            callback(err, omitSensitiveUserProps(user));
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
        callback(new ResError({ cause: "not-found" }));
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
      callback(new ResError({ cause: "not-found" }));
      return;
    }

    callback(err);
  });
};
