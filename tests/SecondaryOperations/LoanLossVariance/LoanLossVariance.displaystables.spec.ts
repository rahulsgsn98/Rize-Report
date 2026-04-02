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


// verify that the secondary table displays

test('Verify that the Secondary Table displays correctly after click on the Loan Loss Variance link', async ({ page }) => {

  await reportPanelPage.clickSidebarToggle();
  await reportPanelPage.clickLoanLossVarianceLink();

  const isVisible = await loanLossVariancePage.isSecondaryTableVisible();

  expect(isVisible).toBeTruthy();

  console.log('Secondary Table displays', isVisible);
});