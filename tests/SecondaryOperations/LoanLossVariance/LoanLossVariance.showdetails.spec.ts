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


// ─── Show Details ─────────────────────────────────────────────────────────────

test('Verify that the Show Details button is visible and clickable', async ({ page }) => {

  await reportPanelPage.clickSidebarToggle();
  await reportPanelPage.clickLoanLossVarianceLink();

  const showDetailsButton = loanLossVariancePage.showDetailsButton;

  await expect(showDetailsButton).toBeVisible({ timeout: 30000 });

  if (await showDetailsButton.isVisible({ timeout: 30000 })) {
    console.log('Show Details button is visible');
  }

  await expect(showDetailsButton).toBeEnabled({ timeout: 30000 });
  await expect(showDetailsButton).toHaveText(/Show Details/i);

  await loanLossVariancePage.clickShowDetails();
});


// ─── Hide Details ─────────────────────────────────────────────────────────────

test('Verify that Hide Details button is visible after clicking Show Details', async ({ page }) => {

  await reportPanelPage.clickSidebarToggle();
  await reportPanelPage.clickLoanLossVarianceLink();

  await expect(loanLossVariancePage.showDetailsButton).toBeVisible({ timeout: 30000 });
  await expect(loanLossVariancePage.showDetailsButton).toBeEnabled({ timeout: 30000 });

  await loanLossVariancePage.clickShowDetails();

  const hideDetailsButton = loanLossVariancePage.hideDetailsButton;

  await expect(hideDetailsButton).toBeVisible({ timeout: 30000 });

  if (await hideDetailsButton.isVisible({ timeout: 30000 })) {
    console.log('Hide Details button is visible');
  }

  await expect(hideDetailsButton).toBeEnabled({ timeout: 30000 });
  await expect(hideDetailsButton).toHaveText(/Hide Details/i);

  await loanLossVariancePage.clickHideDetails();

  await expect(loanLossVariancePage.showDetailsButton).toBeVisible({ timeout: 30000 });

  console.log('Show Details button is visible again after hiding');
});