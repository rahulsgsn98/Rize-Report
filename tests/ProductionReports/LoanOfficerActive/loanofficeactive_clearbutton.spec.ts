import { test, expect } from '@playwright/test';
import { ReportPanelPage } from '@pages/reportpanelpage';
import { LoanOfficerActivePage } from '@pages/LoanOfficerActivepage';
import { ReportDashboardPage } from '@pages/reportdashboardpage';
import { TestConfig } from '@config';

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
    waitUntil: 'networkidle',
    timeout: 60_000
  });
});

test('Verify that the Clear button resets filters and results', async ({ page }) => {
  await reportPanelPage.clickSidebarToggle();
  await reportPanelPage.clickLoanOfficerActiveLink();

  
  await page.waitForLoadState('networkidle');


  // Apply filter
  await loanOfficerActivePage.loanOfficerSelection(['Natalie Premock']);
  await loanOfficerActivePage.clickSubmit();

  await page.waitForLoadState('networkidle');

  // Clear filters
  await loanOfficerActivePage.clickClear();
});