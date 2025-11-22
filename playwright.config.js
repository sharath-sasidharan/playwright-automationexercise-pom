import { defineConfig, devices } from '@playwright/test';

// Get viewport configuration based on maximize setting
function getViewportConfig() {
  // Always use the screen dimensions for consistency
  // The --start-maximized flag will handle the actual window maximization
  return {
    width: parseInt(process.env.VIEWPORT_WIDTH || '1920'),
    height: parseInt(process.env.VIEWPORT_HEIGHT || '1200')
  };
}

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 2,
  workers: 1,
  reporter: [
    ['html'],
    ['allure-playwright', { 
      outputFolder: 'allure-results'
    }]
  ],
  use: {
    trace: 'retain-on-failure',
    headless: process.env.HEADLESS === 'true',
    actionTimeout: parseInt(process.env.ACTION_TIMEOUT || '90000'),
    navigationTimeout: parseInt(process.env.NAVIGATION_TIMEOUT || '90000'),
    screenshot: 'on',
    video: 'on',
    baseURL: process.env.BASE_URL || 'https://automationexercise.com',
  },
  timeout: parseInt(process.env.TEST_TIMEOUT || '120000'),
  projects: [
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
        viewport: getViewportConfig(),
        launchOptions: {
          args: process.env.MAXIMIZE === 'true' ? [
            '--start-maximized',
            '--window-size=1920,1200',
            '--window-position=0,0',
            '--disable-web-security',
            '--disable-features=VizDisplayCompositor',
            '--disable-infobars',
            '--disable-extensions',
            '--no-sandbox',
            '--disable-dev-shm-usage'
          ] : []
        }
      },
    },
  ],
});