import { test, expect } from '@playwright/test';
import { ReportPanelPage } from '@pages/reportpanelpage';
import { LoanOfficerActivePage } from '@pages/ProductionReportsPages/LoanOfficerActivepage';
import { TestConfig } from '@config';
import { handleContinueLogin } from "@utils/sessionGuard";

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
     
      timeout: 60_000
    });
    await handleContinueLogin(page);

     const appRoot = page.locator('#app');

  // wait for app root at least
  await appRoot.waitFor({ state: 'visible', timeout: 30000 });

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