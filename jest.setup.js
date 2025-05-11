const { seedUsers, clearUsers } = require("./src/seed/user.seed");
const { seedTasks, clearTasks } = require("./src/seed/task.seed");
const {
  seedSharedTasks,
  clearSharedTasks,
} = require("./src/seed/shared-task.seed");

beforeAll(async () => {
  await seedUsers();
  await seedTasks();
  await seedSharedTasks();
});

afterAll(async () => {
  await clearSharedTasks();
  await clearTasks();
  await clearUsers();
});
