import sqlite3 from "sqlite3";

import { logger } from "./services/logger.ts";
import { config } from "./config.ts";

const sqlite = sqlite3.verbose();

export const db = new sqlite.Database(config.databaseUrl, (err) => {
  if (err) {
    logger.error("Error connecting to database:", err.message);
  } else {
    logger.info("Connected to the SQLite database.");
  }
});

db.run(`
  CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    completed BOOLEAN DEFAULT false
  )
`);
