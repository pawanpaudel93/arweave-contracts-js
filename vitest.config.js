const { defineConfig } = require("vitest/config");

export default defineConfig({
  test: {
    include: ["**/test/*.test.js"],
    globals: true,
  },
});
