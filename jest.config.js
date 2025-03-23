export default {
  transform: {
    "^.+\\.tsx?$": "@swc/jest",
  },
  testEnvironment: "node",
  testMatch: ["**/?(*.)+(spec|test).[tj]s?(x)"],
  setupFilesAfterEnv: ["./jest.setup.js"],
};
