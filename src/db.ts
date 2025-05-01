import { promisify } from "node:util";
import sqlite3 from "sqlite3";

import { logger } from "./services/logger.ts";
import { config } from "./config.ts";

const sqlite = sqlite3.verbose();

export const TABLES = {
  USERS: "users",
  SHARED_TASKS: "shared_tasks",
  TASKS: "tasks",
};

const db = new sqlite.Database(config.databaseUrl, (err) => {
  if (err) {
    logger.error("Error connecting to database:", err.message);
  } else {
    logger.info("Connected to the SQLite database.");
  }
});

function runAsync(sql: string, params: unknown[] = []): Promise<void> {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) {
        return reject(err);
      }

      resolve();
    });
  });
}

const dbAsync = {
  run: runAsync,
};

db.exec(`
  CREATE TABLE IF NOT EXISTS ${TABLES.USERS} (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS ${TABLES.SHARED_TASKS} (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    completed BOOLEAN DEFAULT false
  );

  CREATE TABLE IF NOT EXISTS ${TABLES.TASKS} (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    completed BOOLEAN DEFAULT false,
    userId INTEGER NOT NULL,
    FOREIGN KEY (userId) REFERENCES users(id)
  );
`);

export { db, dbAsync };
