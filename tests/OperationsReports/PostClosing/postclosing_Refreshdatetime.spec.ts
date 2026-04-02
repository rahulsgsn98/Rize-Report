import { test, expect } from '@playwright/test';
import { ReportPanelPage } from '@pages/reportpanelpage';
import { PostClosingPage } from '@pages/OperationsReportsPages/PostClosingpage';
import { ReportDashboardPage } from '@pages/reportdashboardpage';
import { TestConfig } from '@config';
import { handleContinueLogin } from "@utils/sessionGuard";

let reportDashboardPage: ReportDashboardPage;
let config: TestConfig;
let reportPanelPage: ReportPanelPage;
let postClosingPage: PostClosingPage;

test.beforeEach(async ({ page }) => {

  reportPanelPage = new ReportPanelPage(page);
  postClosingPage = new PostClosingPage(page);
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

test('Verify date time displays or not correctly after click on the Post Closing link', async ({ page }) => {

  await reportPanelPage.clickSidebarToggle();
  await reportPanelPage.clickPostClosingLink();

  await postClosingPage.waitForRefreshDateTimeToBeVisible();

  const isRefreshDateTimeDisplayed = await postClosingPage.isRefreshDateTimeDisplayed();

  expect(isRefreshDateTimeDisplayed).toBeTruthy();

  console.log("Refresh date time displays", isRefreshDateTimeDisplayed);

});