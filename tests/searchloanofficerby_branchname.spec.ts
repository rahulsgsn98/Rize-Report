import { test, expect } from "@playwright/test";
import { LoanOfficerFundedPage } from "../pages/LoanOfficer-Fundedpage";
import { TestConfig } from "../test.config";
import { ReportPanelPage } from "../pages/reportpanelpage";

const config = new TestConfig();

// multiple test datasets
const branchSets = [
  ["Burtonsville, MD | GLG Team/S15300B153R00D10"],
  ["Coral Gables, FL | HPP Financial/S10801B108R00D11", "Innovation Mortgage/S10300B103R00D10"],
];

branchSets.forEach((branchSet) => {

  test(`Search Loan Officer Funded by branch: ${branchSet.join(", ")}`, async ({ page }) => {
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
    await loanPage.branchSelection(branchSet);

    await loanPage.clickSubmit();

    await loanPage.verifyBranchData(branchSet);

  });

});