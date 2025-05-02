import dotenv from "dotenv";
import { logger } from "./services/logger.ts";

const env = process.env.NODE_ENV;

if (!env) throw Error("Set NODE_ENV variable.");

dotenv.config({ path: `.env.${env}` });

export const config = {
  server: {
    timeout: 30 * 1000, // 30s
  },
  nodeEnv: process.env.NODE_ENV,
  port: Number(process.env.PORT) || 3000,
  databaseUrl: process.env.DATABASE_URL || "./tasks.db",
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN || "1d",
    hasRounds: 10,
  },
};

export type Config = typeof config;

const getProtectedConfig = (config: Config) => {
  const configClone = structuredClone(config);

  configClone.jwt.secret = "Hidden";

  return configClone;
};

logger.info(getProtectedConfig(config), "Server loaded config:");
