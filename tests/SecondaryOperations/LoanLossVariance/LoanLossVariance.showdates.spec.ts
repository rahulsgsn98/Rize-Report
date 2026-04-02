import { test, expect } from '@playwright/test';
import { ReportPanelPage } from '@pages/reportpanelpage';
import { LoanLossVariancePage } from '@pages/SecondaryOperationsPages/LoanLossVariancepages';
import { ReportDashboardPage } from '@pages/reportdashboardpage';
import { TestConfig } from '@config';
import { handleContinueLogin } from "@utils/sessionGuard";

let reportDashboardPage: ReportDashboardPage;
let config: TestConfig;
let reportPanelPage: ReportPanelPage;
let loanLossVariancePage: LoanLossVariancePage;

test.beforeEach(async ({ page }) => {
  reportPanelPage = new ReportPanelPage(page);
  loanLossVariancePage = new LoanLossVariancePage(page);
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
  await reportPanelPage.clickLoanLossVarianceLink();

  const showDatesButton = loanLossVariancePage.showDatesButton;

  await expect(showDatesButton).toBeVisible({ timeout: 30000 });

  if (await showDatesButton.isVisible({ timeout: 30000 })) {
    console.log('Show Dates button is visible');
  }

  await expect(showDatesButton).toBeEnabled({ timeout: 30000 });
  await expect(showDatesButton).toHaveText(/Show Dates/i);

  await loanLossVariancePage.clickShowDates();
});


// ─── Hide Dates ───────────────────────────────────────────────────────────────

test('Verify that Hide Dates button is visible after clicking Show Dates', async ({ page }) => {

  await reportPanelPage.clickSidebarToggle();
  await reportPanelPage.clickLoanLossVarianceLink();

  await expect(loanLossVariancePage.showDatesButton).toBeVisible({ timeout: 30000 });
  await expect(loanLossVariancePage.showDatesButton).toBeEnabled({ timeout: 30000 });

  await loanLossVariancePage.clickShowDates();

  const hideDatesButton = loanLossVariancePage.hideDatesButton;

  await expect(hideDatesButton).toBeVisible({ timeout: 30000 });

  if (await hideDatesButton.isVisible({ timeout: 30000 })) {
    console.log('Hide Dates button is visible');
  }

  await expect(hideDatesButton).toBeEnabled({ timeout: 30000 });
  await expect(hideDatesButton).toHaveText(/Hide Dates/i);

  await loanLossVariancePage.clickHideDates();

  await expect(loanLossVariancePage.showDatesButton).toBeVisible({ timeout: 30000 });

  console.log('Show Dates button is visible again after hiding');
});