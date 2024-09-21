import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './src',
	testMatch: /.*\.e2e.(ts|tsx)$/,
	fullyParallel: true,
  timeout: 30_000,
  use: {
    baseURL: 'http://localhost:5173',
    headless: false, // Set to false if you want to see the browser
    actionTimeout: 0,
    trace: 'on-first-retry', // Enable tracing on the first retry
  },
});