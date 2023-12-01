const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: "mochawesome",
  reporterOptions: {
    reportFilename: "callenge-report",
  },
  e2e: {
    baseUrl: "https://www.demoblaze.com",
  },
});
