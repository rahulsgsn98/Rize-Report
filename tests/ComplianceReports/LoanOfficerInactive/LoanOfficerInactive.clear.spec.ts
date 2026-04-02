import { test, expect } from '@playwright/test';
import { ReportPanelPage } from '@pages/reportpanelpage';
import { LoanOfficerInactivePage } from '@pages/ComplianceReportsPages/LoanOfficerInactivepage';
import { ReportDashboardPage } from '@pages/reportdashboardpage';
import { TestConfig } from '@config';
import { handleContinueLogin } from "@utils/sessionGuard";

let reportDashboardPage: ReportDashboardPage;
let config: TestConfig;
let reportPanelPage: ReportPanelPage;
let loanOfficerInactivePage: LoanOfficerInactivePage;

test.beforeEach(async ({ page }) => {
  reportPanelPage = new ReportPanelPage(page);
  loanOfficerInactivePage = new LoanOfficerInactivePage(page);
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


// ─── Clear Button - Branch Name Filter ───────────────────────────────────────

test('Verify that the Clear button resets Branch Name filter', async ({ page }) => {

  await reportPanelPage.clickSidebarToggle();
  await reportPanelPage.clickLoanOfficerInactiveLink();

  await loanOfficerInactivePage.branchNameSelection(['Naples, FL/S10400B104R00D10']); // replace with valid data

  await loanOfficerInactivePage.clickSubmit();

  await loanOfficerInactivePage.clickClear();
});