import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30000, // Set timeout for tests
  expect: {
    timeout: 5000, // Expect timeout for assertions
  },
  use: {
    headless: false, // Change to true for headless testing
    viewport: { width: 1280, height: 720 },
    actionTimeout: 5000, // Timeout for interactions
    trace: 'on', // Collect trace for debugging
  },
  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium' },
    },
    {
      name: 'firefox',
      use: { browserName: 'firefox' },
    },
    {
      name: 'webkit',
      use: { browserName: 'webkit' },
    },
  ],
});
