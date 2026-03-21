import { test, expect } from '@playwright/test';
import { ReportPanelPage } from '@pages/reportpanelpage';
import { LoanOfficerFundedPage } from '@pages/LoanOfficerFundedpage';
import { ReportDashboardPage } from '@pages/reportdashboardpage';
import { TestConfig } from '@config';

const config = new TestConfig();

// multiple test datasets
const monthSets = [
  ["January 2026"],
  ["February 2026", "March 2026"],
];

monthSets.forEach((monthSet) => {

  test(`Search Loan Officer Funded by month: ${monthSet.join(", ")}`, async ({ page }) => {
    test.slow();

    const loanPage = new LoanOfficerFundedPage(page);
    const reportPanelPage = new ReportPanelPage(page);

    // ✅ Fix 1: proper goto wait
    await page.goto(config.appUrl, {
      waitUntil: 'domcontentloaded',
      timeout:60_000
    });

    // ✅ Navigate first
    await reportPanelPage.clickSidebarToggle();
    await reportPanelPage.clickLoanOfficerFundedLink();

    // ✅ Now check heading (correct place)
    await expect(loanPage.heading).toBeVisible();

    // ✅ Perform actions
    await loanPage.monthSelection(monthSet);

    await loanPage.clickSubmit();

    await loanPage.verifyMonthData(monthSet);

  });

});