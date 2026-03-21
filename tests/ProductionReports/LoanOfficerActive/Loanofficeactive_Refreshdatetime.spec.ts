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

// Verify date time displays or not
test('Verify date time displays correctly after clicking the Loan Officer Active link', async ({ page }) => {

  // Navigate to Loan Officer Active page
  await reportPanelPage.clickSidebarToggle();
  await reportPanelPage.clickLoanOfficerActiveLink();

  await page.waitForLoadState('networkidle');

  await loanOfficerActivePage.waitForRefreshDateTimeToBeVisible();

  const isRefreshDateTimeDisplayed = await loanOfficerActivePage.isRefreshDateTimeDisplayed();

  expect(isRefreshDateTimeDisplayed).toBeTruthy();

  console.log('Refresh date time displays', isRefreshDateTimeDisplayed);
});