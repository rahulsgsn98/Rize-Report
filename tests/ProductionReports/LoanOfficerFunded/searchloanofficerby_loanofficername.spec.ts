import { test, expect } from '@playwright/test';
import { ReportPanelPage } from '@pages/reportpanelpage';
import { LoanOfficerFundedPage } from '@pages/ProductionReportsPages/LoanOfficerFundedpage';
import { ReportDashboardPage } from '@pages/reportdashboardpage';
import { TestConfig } from '@config';
import { handleContinueLogin } from "@utils/sessionGuard";

const config = new TestConfig();

// multiple test datasets
const loanOfficerSets = [
  ["Natalie Premock"],
  ["Andres Pumariega", "Curt Bogle"],
];

loanOfficerSets.forEach((loanOfficerSet) => {

  test(`Search Loan Officer Funded by loan officer: ${loanOfficerSet.join(", ")}`, async ({ page }) => {
    test.slow();

    const loanPage = new LoanOfficerFundedPage(page);
    const reportPanelPage = new ReportPanelPage(page);

    // ✅ Fix 1: proper goto wait
    await page.goto(config.appUrl, {
     
      timeout:60_000
    });
    await handleContinueLogin(page);
    
   const appRoot = page.locator('#app');

  // wait for app root at least
  await appRoot.waitFor({ state: 'visible', timeout: 30000 });

    // ✅ Navigate first
    await reportPanelPage.clickSidebarToggle();
    await reportPanelPage.clickLoanOfficerFundedLink();

    // ✅ Now check heading (correct place)
    await expect(loanPage.heading).toBeVisible();

    // ✅ Perform actions
    await loanPage.loanOfficerSelection(loanOfficerSet);

    await loanPage.clickSubmit();

    await loanPage.verifyLoanOfficerData(loanOfficerSet);

  });

});