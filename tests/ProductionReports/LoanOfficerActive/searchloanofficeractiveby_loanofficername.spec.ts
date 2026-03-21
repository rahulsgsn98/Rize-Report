import { test, expect } from '@playwright/test';
import { ReportPanelPage } from '@pages/reportpanelpage';
import { LoanOfficerActivePage } from '@pages/LoanOfficerActivepage';
import { TestConfig } from '@config';

const config = new TestConfig();

// multiple test datasets
const loanOfficerSets = [
  ['Natalie Premock'],
  ['Andres Pumariega', 'John Rivera'],
];

loanOfficerSets.forEach((loanOfficerSet) => {

  test(`Search Loan Officer Active by loan officer: ${loanOfficerSet.join(', ')}`, async ({ page }) => {
    test.slow();

    const loanOfficerActivePage = new LoanOfficerActivePage(page);
    const reportPanelPage = new ReportPanelPage(page);

    // ✅ Fix 1: proper goto wait
    await page.goto(config.appUrl, {
      waitUntil: 'networkidle',
      timeout: 60_000
    });

    // ✅ Navigate first
    await reportPanelPage.clickSidebarToggle();
    await reportPanelPage.clickLoanOfficerActiveLink();

    // ✅ Now check heading (correct place)
   // await expect(loanPage.heading).toBeVisible();

    // ✅ Perform actions
    await loanOfficerActivePage.loanOfficerSelection(loanOfficerSet);

    await loanOfficerActivePage.clickSubmit();

    await loanOfficerActivePage.verifyLoanOfficerData(loanOfficerSet);

  });

});