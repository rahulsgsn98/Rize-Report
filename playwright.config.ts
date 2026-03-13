import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
 // retries: process.env.CI ? 2 : 0,
 retries:2,

  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
 reporter: [
['html'],
['allure-playwright'],
['dot'],
['list']
],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    // baseURL: 'http://localhost:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
screenshot: 'only-on-failure',
video: 'retain-on-failure',
  },

  /* Configure projects for major browsers */
  projects: [
     { name: 'setup', testMatch: /.*\.setup\.ts/,
       

     }, 
    
    {
  name: 'chromium',
  use: {
    storageState: 'playwright/.auth/user.json',
   headless: process.env.CI ? true : false
     /* viewport: null,
    launchOptions: {
      args: ['--start-maximized']
    }  */
  },
 dependencies: process.env.CI ? [] : ['setup'],
},

    /* {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] ,
        storageState: 'playwright/.auth/user.json', // Loads state automatically
         headless: false // Your actual test shows the UI
      },
      dependencies: ['setup'],
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'],
        storageState: 'playwright/.auth/user.json', // Loads state automatically
         headless: false // Your actual test shows the UI
       },
      dependencies: ['setup'],

    },  */
 
    /* Test against mobile viewports. */
     /* {
       name: 'Mobile Chrome',
       use: { ...devices['Pixel 5'],
        storageState: 'playwright/.auth/user.json',
        headless: false


        },
        dependencies: ['setup'],
     },
     {
       name: 'Mobile Safari',
       use: { ...devices['iPhone 12'] ,
        storageState: 'playwright/.auth/user.json',
        headless: false


       },
        dependencies: ['setup'],
     },
 */
     // Manually added devices for tablets and foldables

    /*  {
  name: 'iPad',
  use: {
    ...devices['iPad Pro 11'],
    storageState: 'playwright/.auth/user.json',
    headless: false
  },
  dependencies: ['setup'],
}, */

/* {
  name: 'Android Tablet',
  use: {
    ...devices['Galaxy Tab S4'],
    storageState: 'playwright/.auth/user.json',
    headless: false
  },
  dependencies: ['setup'],
}, */

/* {
  name: 'Galaxy Fold (Folded)',
  use: {
    viewport: { width: 768, height: 1074 },
    userAgent:
      'Mozilla/5.0 (Linux; Android 12; SAMSUNG SM-F926B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115 Mobile Safari/537.36',
    deviceScaleFactor: 3,
    isMobile: true,
    hasTouch: true,
    storageState: 'playwright/.auth/user.json',
    headless: false
  },
  dependencies: ['setup'],
}, */


/* {
  name: 'Surface Duo Dual Screen',
  use: {
    viewport: { width: 1114, height: 720 },
    userAgent:
      'Mozilla/5.0 (Linux; Android 11; Surface Duo) AppleWebKit/537.36 (KHTML, like Gecko) Chrome Mobile Safari/537.36',
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
    storageState: 'playwright/.auth/user.json',
    headless: false
  },
  dependencies: ['setup'],
},
 */
    /* Test against branded browsers. */
   /*  {
      name: 'Microsoft Edge',
      use: { ...devices['Desktop Edge'], channel: 'msedge',
        storageState: 'playwright/.auth/user.json', // Loads state automatically
          headless: false // Your actual test shows the UI
       },
        dependencies: ['setup'],
    },
    {
      name: 'Google Chrome',
      use: { ...devices['Desktop Chrome'], channel: 'chrome' ,
        storageState: 'playwright/.auth/user.json', // Loads state automatically
         headless: false // Your actual test shows the UI
      },
      dependencies: ['setup'],
    },
    */
  ], 

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
