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


// ─── Show Dates ───────────────────────────────────────────────────────────────

test('Verify that the Show Dates button is visible and clickable', async ({ page }) => {

  await reportPanelPage.clickSidebarToggle();
  await reportPanelPage.clickPostClosingManagerLink();

  const showDatesButton = postClosingManagerPage.showDatesButton;

  await expect(showDatesButton).toBeVisible({ timeout: 30000 });

  if (await showDatesButton.isVisible({ timeout: 30000 })) {
    console.log('Show Dates button is visible');
  }

  await expect(showDatesButton).toBeEnabled({ timeout: 30000 });
  await expect(showDatesButton).toHaveText(/Show Dates/i);

  await postClosingManagerPage.clickShowDates();
});


// ─── Hide Dates ───────────────────────────────────────────────────────────────

test('Verify that Hide Dates button is visible after clicking Show Dates', async ({ page }) => {

  await reportPanelPage.clickSidebarToggle();
  await reportPanelPage.clickPostClosingManagerLink();

  await expect(postClosingManagerPage.showDatesButton).toBeVisible({ timeout: 30000 });
  await expect(postClosingManagerPage.showDatesButton).toBeEnabled({ timeout: 30000 });

  await postClosingManagerPage.clickShowDates();

  const hideDatesButton = postClosingManagerPage.hideDatesButton;

  await expect(hideDatesButton).toBeVisible({ timeout: 30000 });

  if (await hideDatesButton.isVisible({ timeout: 30000 })) {
    console.log('Hide Dates button is visible');
  }

  await expect(hideDatesButton).toBeEnabled({ timeout: 30000 });
  await expect(hideDatesButton).toHaveText(/Hide Dates/i);

  await postClosingManagerPage.clickHideDates();

  await expect(postClosingManagerPage.showDatesButton).toBeVisible({ timeout: 30000 });

  console.log('Show Dates button is visible again after hiding');
});