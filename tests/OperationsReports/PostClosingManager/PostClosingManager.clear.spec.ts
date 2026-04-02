import { test, expect } from '@playwright/test';
import { ReportPanelPage } from '@pages/reportpanelpage';
import { PostClosingManagerPage } from '@pages/OperationsReportsPages/PostClosingManagerpage';
import { ReportDashboardPage } from '@pages/reportdashboardpage';
import { TestConfig } from '@config';
import { handleContinueLogin } from "@utils/sessionGuard";

let reportDashboardPage: ReportDashboardPage;
let config: TestConfig;
let reportPanelPage: ReportPanelPage;
let postClosingManagerPage: PostClosingManagerPage;

test.beforeEach(async ({ page }) => {
  reportPanelPage = new ReportPanelPage(page);
  postClosingManagerPage = new PostClosingManagerPage(page);
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


// ─── Clear Button - Post Closer Filter ───────────────────────────────────────

test('Verify that the Clear button resets Post Closer filter', async ({ page }) => {

  await reportPanelPage.clickSidebarToggle();
  await reportPanelPage.clickPostClosingManagerLink();

  await postClosingManagerPage.postCloserSelection(['Lindy Osten']); // replace with valid data

  await postClosingManagerPage.clickSubmit();

  await postClosingManagerPage.clickClear();
});


// ─── Clear Button - Status Filter ────────────────────────────────────────────

test('Verify that the Clear button resets Status filter', async ({ page }) => {

  await reportPanelPage.clickSidebarToggle();
  await reportPanelPage.clickPostClosingManagerLink();

  await postClosingManagerPage.statusSelection(['To Be Purchased']); // replace with valid data

  await postClosingManagerPage.clickSubmit();

  await postClosingManagerPage.clickClear();
});