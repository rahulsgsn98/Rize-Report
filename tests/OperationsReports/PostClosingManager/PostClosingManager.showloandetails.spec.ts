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


// ─── Show Loan Details ────────────────────────────────────────────────────────

test('Verify that the Show Loan Details button is visible and clickable', async ({ page }) => {

  await reportPanelPage.clickSidebarToggle();
  await reportPanelPage.clickPostClosingManagerLink();

  const showLoanDetailsButton = postClosingManagerPage.showLoanDetailsButton;

  await expect(showLoanDetailsButton).toBeVisible({ timeout: 30000 });

  if (await showLoanDetailsButton.isVisible({ timeout: 30000 })) {
    console.log('Show Loan Details button is visible');
  }

  await expect(showLoanDetailsButton).toBeEnabled({ timeout: 30000 });
  await expect(showLoanDetailsButton).toHaveText(/Show Loan Details/i);

  await postClosingManagerPage.clickShowLoanDetails();
});


// ─── Hide Loan Details ────────────────────────────────────────────────────────

test('Verify that Hide Loan Details button is visible after clicking Show Loan Details', async ({ page }) => {

  await reportPanelPage.clickSidebarToggle();
  await reportPanelPage.clickPostClosingManagerLink();

  await expect(postClosingManagerPage.showLoanDetailsButton).toBeVisible({ timeout: 30000 });
  await expect(postClosingManagerPage.showLoanDetailsButton).toBeEnabled({ timeout: 30000 });

  await postClosingManagerPage.clickShowLoanDetails();

  const hideLoanDetailsButton = postClosingManagerPage.hideLoanDetailsButton;

  await expect(hideLoanDetailsButton).toBeVisible({ timeout: 30000 });

  if (await hideLoanDetailsButton.isVisible({ timeout: 30000 })) {
    console.log('Hide Loan Details button is visible');
  }

  await expect(hideLoanDetailsButton).toBeEnabled({ timeout: 30000 });
  await expect(hideLoanDetailsButton).toHaveText(/Hide Loan Details/i);

  await postClosingManagerPage.clickHideLoanDetails();

  await expect(postClosingManagerPage.showLoanDetailsButton).toBeVisible({ timeout: 30000 });

  console.log('Show Loan Details button is visible again after hiding');
});