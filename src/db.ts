import sqlite3 from "sqlite3";

import { logger } from "./services/logger.ts";
import { config } from "./config.ts";

const sqlite = sqlite3.verbose();

export const TABLES = {
  USERS: "users",
  SHARED_TASKS: "shared_tasks",
  TASKS: "tasks",
};

export const db = new sqlite.Database(config.databaseUrl, (err) => {
  if (err) {
    logger.error("Error connecting to database:", err.message);
  } else {
    logger.info("Connected to the SQLite database.");
  }
});

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
    completed BOOLEAN DEFAULT false
  );
`);
