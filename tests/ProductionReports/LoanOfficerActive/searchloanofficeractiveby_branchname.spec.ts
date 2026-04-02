import { test, expect } from '@playwright/test';
import { ReportPanelPage } from '@pages/reportpanelpage';
import { LoanOfficerActivePage } from '@pages/ProductionReportsPages/LoanOfficerActivepage';
import { TestConfig } from '@config';
import { handleContinueLogin } from "@utils/sessionGuard";

const config = new TestConfig();

// multiple test datasets
const branchSets = [
  ["Burtonsville, MD | GLG Team/S15300B153R00D10"],
  ["Coral Gables, FL | HPP Financial/S10801B108R00D11", "Plantation, Fl | Orlando Team/S15100B151R00D10"],
];

branchSets.forEach((branchSet) => {

  test(`Search Loan Officer Active by branch: ${branchSet.join(", ")}`, async ({ page }) => {
    test.slow();

    const loanOfficerActivePage = new LoanOfficerActivePage(page);
    const reportPanelPage = new ReportPanelPage(page);

    // ✅ Fix 1: proper goto wait
    await page.goto(config.appUrl, {
      waitUntil: 'domcontentloaded',
      timeout:60_000
    });
    await handleContinueLogin(page);
     const appRoot = page.locator('#app');

  // wait for app root at least
  await appRoot.waitFor({ state: 'visible', timeout: 30000 });

    // ✅ Navigate first
    await reportPanelPage.clickSidebarToggle();
    await reportPanelPage.clickLoanOfficerActiveLink();

    // ✅ Now check heading
  //  await expect(loanPage.heading).toBeVisible();

    // ✅ Perform actions
    await loanOfficerActivePage.branchSelection(branchSet);

    await loanOfficerActivePage.clickSubmit();

    await loanOfficerActivePage.verifyBranchData(branchSet);

  });

});