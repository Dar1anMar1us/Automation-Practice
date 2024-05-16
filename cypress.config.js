const { defineConfig } = require("cypress");

module.exports = defineConfig({
  viewportHeight: 860,
  screenshotOnRunFailure: true,
  screenshotQuality: 20, // lower quality, smaller files
  video: false,
  chromeWebSecurity: true,
  includeShadowDom: true,
  experimentalMemoryManagement: true,
  numTestsKeptInMemory: 0,
  experimentalWebKitSupport: false,
  defaultCommandTimeout: 10000,
  retries: {
    runMode: 1,
    openMode: 0,
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
