import { createServer } from "node:http";

import { config } from "./config.ts";
import { router } from "./modules/router/router.ts";
import { routes } from "./routes/route.ts";
import { logger } from "./services/logger.ts";

export const server = createServer(router(routes));

server.timeout = config.server.timeout;

process.on("uncaughtException", (err) => {
  logger.fatal(err, "Uncaught Exception:");

  logger.info("Uncaught Exception. Attempting graceful shutdown...");

  server.close(() => {
    logger.info("Server closed due to uncaught exception");
    process.exit(1);
  });
});

process.on("unhandledRejection", (reason) => {
  logger.error(reason, "Unhandled Rejection at:");

  logger.info("Unhandled Rejection. Attempting graceful shutdown...");

  server.close(() => {
    logger.info("Server closed due to unhandled rejection");
    process.exit(1);
  });
});

if (process.env.NODE_ENV !== "test") {
  server.listen(config.port, () => {
    logger.info(`Server is running on port ${config.port}`);
  });
}
