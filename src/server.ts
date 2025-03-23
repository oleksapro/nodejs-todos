import { createServer } from "node:http";

import { PORT } from "./const.ts";
import { router } from "./modules/router/router.ts";
import { routes } from "./routes/routes.ts";
import { logger } from "./services/logger.ts";

export const server = createServer(router(routes));

process.on("uncaughtException", (err) => {
  logger.error("Uncaught Exception:", err);

  server.close(() => {
    logger.info("Server closed due to uncaught exception");
    process.exit(1);
  });
});

// Handle unhandled rejections
process.on("unhandledRejection", (reason, promise) => {
  logger.error("Unhandled Rejection at:", promise, "Reason:", reason);

  server.close(() => {
    logger.info("Server closed due to unhandled rejection");
    process.exit(1);
  });
});

server.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});
