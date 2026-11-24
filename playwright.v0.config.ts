import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './e2e-v0',
  use: {
    baseURL: 'http://127.0.0.1:4276',
    launchOptions: process.env.LVM_BROWSER_EXECUTABLE
      ? { executablePath: process.env.LVM_BROWSER_EXECUTABLE }
      : {},
  },
  webServer: {
    command: 'node node_modules/vite/bin/vite.js preview --host 127.0.0.1 --port 4276 --strictPort',
    url: 'http://127.0.0.1:4276',
    reuseExistingServer: false,
  },
})
