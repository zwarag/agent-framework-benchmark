import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './specs',
  fullyParallel: true,
  workers: 4,
  retries: 0,
  timeout: 30_000,
  expect: { timeout: 10_000 },
  reporter: [['list']],
  outputDir: '../test-results',
  use: {
    ...devices['Desktop Chrome'],
    baseURL: process.env.BASE_URL ?? 'http://pokedex.test:3100',
    launchOptions: { args: ['--host-resolver-rules=MAP *.test 127.0.0.1'] },
    trace: 'retain-on-failure',
  },
});
