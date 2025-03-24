import { createServer } from "node:http";

import { config } from "./config.ts";
import { router } from "./modules/router/router.ts";
import { routes } from "./routes/routes.ts";
import { logger } from "./services/logger.ts";

export const server = createServer(router(routes));

process.on("uncaughtException", (err) => {
  logger.error(err, "Uncaught Exception:");

  server.close(() => {
    logger.info("Server closed due to uncaught exception");
    process.exit(1);
  });
});

process.on("unhandledRejection", (reason) => {
  logger.error(reason, "Unhandled Rejection at:");

  server.close(() => {
    logger.info("Server closed due to unhandled rejection");
    process.exit(1);
  });
});

server.listen(config.port, () => {
  logger.info(`Server is running on port ${config.port}`);
});
