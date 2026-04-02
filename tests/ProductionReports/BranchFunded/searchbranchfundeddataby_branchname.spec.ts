import { test, expect } from '@playwright/test';
import { ReportPanelPage } from '@pages/reportpanelpage';
import { BranchFundedPage } from '@pages/ProductionReportsPages/BranchFundedpage';
import { TestConfig } from '@config';
import { handleContinueLogin } from "@utils/sessionGuard";

const config = new TestConfig();

// multiple test datasets
const branchSets = [
  ["Burtonsville, MD | GLG Team/S15300B153R00D10"],
  ["Coral Gables, FL | HPP Financial/S10801B108R00D11", "Innovation Mortgage/S10300B103R00D10"],
];

branchSets.forEach((branchSet) => {

  test(`Search Branch Funded by branch: ${branchSet.join(", ")}`, async ({ page }) => {
    test.slow();

    const branchFundedPage = new BranchFundedPage(page);
    const reportPanelPage = new ReportPanelPage(page);

    await page.goto(config.appUrl, {
      waitUntil: 'domcontentloaded',
      timeout: 60_000
    });
    await handleContinueLogin(page);
  const appRoot = page.locator('#app');

  // wait for app root at least
  await appRoot.waitFor({ state: 'visible', timeout: 30000 });
  
    await reportPanelPage.clickSidebarToggle();
    await reportPanelPage.clickBranchFundedLink();

   // await expect(branchFundedPage.heading).toBeVisible();

    await branchFundedPage.branchSelection(branchSet);

    await branchFundedPage.clickSubmit();

    await branchFundedPage.verifyBranchData(branchSet);

  });

});