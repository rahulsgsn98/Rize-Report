import { test, expect } from '@playwright/test';
import { ReportPanelPage } from '@pages/reportpanelpage';
import { LoanOfficerFundedPage } from '@pages/LoanOfficerFundedpage';
import { ReportDashboardPage } from '@pages/reportdashboardpage';
import { TestConfig } from '@config';


const targetYear:any = 2026;

test(`Search Loan Officer Funded by year: ${targetYear}`, async ({ page }) => {

  test.slow();

  const config = new TestConfig();
  const loanPage = new LoanOfficerFundedPage(page);
  const reportPanelPage = new ReportPanelPage(page);

  // ✅ Open application
  await page.goto(config.appUrl, {
    waitUntil: 'domcontentloaded',
    timeout: 60000
  });

  // ✅ Navigate to report
  await reportPanelPage.clickSidebarToggle();
  await reportPanelPage.clickLoanOfficerFundedLink();

  // ✅ Verify page loaded
  await expect(loanPage.heading).toBeVisible();

  // ✅ Select year
  await loanPage.selectYear(targetYear);

  // ✅ Submit
 // await loanPage.clickSubmit();

  // ✅ Verify result (IMPORTANT)
 await loanPage.verifyYearData(targetYear);

});