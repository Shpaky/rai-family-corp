import { defineConfig, devices } from '@playwright/test';

const BASE = (process.env.BASE_PATH ?? '/rai-family-corp').replace(/\/$/, '');
const PORT = 4324;

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  reporter: [['list']],
  use: {
    baseURL: `http://localhost:${PORT}${BASE}/`,
    trace: 'off',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  // ASTRO_PREVIEW_BACKGROUND=1 keeps Astro 7's preview in the foreground (it otherwise daemonises when it detects an agent environment).
  webServer: {
    command: `npx astro preview --ignore-lock --port ${PORT}`,
    url: `http://localhost:${PORT}${BASE}/`,
    env: { ASTRO_PREVIEW_BACKGROUND: '1' },
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
});
