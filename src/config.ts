import dotenv from "dotenv";
import { logger } from "./services/logger.ts";

const env = process.env.NODE_ENV;

if (!env) throw Error("Set NODE_ENV variable.");

dotenv.config({ path: `.env.${env}` });

export const config = {
  nodeEnv: process.env.NODE_ENV,
  port: Number(process.env.PORT) || 3000,
  databaseUrl: process.env.DATABASE_URL || "./tasks.db",
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN || "1d",
  },
};

logger.info(config, "Server loaded config:");
