import { pino } from "pino";

export const logger = pino({
  level: process.env.NODE_ENV === "test" ? "error" : "info",
});
