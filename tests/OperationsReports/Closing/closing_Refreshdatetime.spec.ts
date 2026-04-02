import { test, expect } from '@playwright/test';
import { ReportPanelPage } from '@pages/reportpanelpage';
import { ClosingPage } from '@pages/OperationsReportsPages/Closingpage';
import { ReportDashboardPage } from '@pages/reportdashboardpage';
import { TestConfig } from '@config';
import { handleContinueLogin } from "@utils/sessionGuard";

let reportDashboardPage: ReportDashboardPage;
let config: TestConfig;
let reportPanelPage: ReportPanelPage;
let closingPage: ClosingPage;

test.beforeEach(async ({ page }) => {

  reportPanelPage = new ReportPanelPage(page);
  closingPage = new ClosingPage(page);
  reportDashboardPage = new ReportDashboardPage(page);
  config = new TestConfig();

  await page.goto(config.appUrl, {
    waitUntil: 'domcontentloaded',
    timeout: 60_000
  });
  await handleContinueLogin(page);

  const appRoot = page.locator('#app');

  await appRoot.waitFor({ state: 'visible', timeout: 30000 });
});


// Verify date time displays or not 

test('Verify date time displays or not correctly after click on the Closing link', async ({ page }) => {

  await reportPanelPage.clickSidebarToggle();
  await reportPanelPage.clickClosingLink();

  await closingPage.waitForRefreshDateTimeToBeVisible();

  const isRefreshDateTimeDisplayed = await closingPage.isRefreshDateTimeDisplayed();

  expect(isRefreshDateTimeDisplayed).toBeTruthy();

  console.log("Refresh date time displays", isRefreshDateTimeDisplayed);

});