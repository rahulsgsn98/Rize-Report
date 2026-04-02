import { test, expect } from '@playwright/test';
import { ReportPanelPage } from '@pages/reportpanelpage';
import { LoanOfficerActivePage } from '@pages/ProductionReportsPages/LoanOfficerActivepage';
import { ReportDashboardPage } from '@pages/reportdashboardpage';
import { TestConfig } from '@config';
import { handleContinueLogin } from "@utils/sessionGuard";

let reportDashboardPage: ReportDashboardPage;
let config: TestConfig;
let reportPanelPage: ReportPanelPage;
let loanOfficerActivePage: LoanOfficerActivePage;

test.beforeEach(async ({ page }) => {
  reportPanelPage = new ReportPanelPage(page);
  loanOfficerActivePage = new LoanOfficerActivePage(page);
  reportDashboardPage = new ReportDashboardPage(page);
  config = new TestConfig();

  await page.goto(config.appUrl, {
    
    timeout: 60_000
  });
  await handleContinueLogin(page);
   const appRoot = page.locator('#app');

  // wait for app root at least
  await appRoot.waitFor({ state: 'visible', timeout: 30000 });
});

test('Verify that the Clear button resets filters and results', async ({ page }) => {
  await reportPanelPage.clickSidebarToggle();
  await reportPanelPage.clickLoanOfficerActiveLink();

  
  


  // Apply filter
  await loanOfficerActivePage.loanOfficerSelection(['Natalie Premock']);
  await loanOfficerActivePage.clickSubmit();

 

  // Clear filters
  await loanOfficerActivePage.clickClear();
});