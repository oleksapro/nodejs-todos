export default {
  apps: [
    {
      name: "nodejs-todos",
      script: "./src/server.ts",
      watch: true,
      autorestart: true,
      max_memory_restart: "1G",
    },
  ],
};
