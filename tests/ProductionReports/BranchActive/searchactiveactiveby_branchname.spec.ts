import { test, expect } from '@playwright/test';
import { ReportPanelPage } from '@pages/reportpanelpage';
import { BranchActivePage } from '@pages/ProductionReportsPages/BranchActivepage';
import { TestConfig } from '@config';
import { handleContinueLogin } from "@utils/sessionGuard";

const config = new TestConfig();

// multiple test datasets
const branchSets = [
  ["Burtonsville, MD | GLG Team/S15300B153R00D10"],
  ["Coral Gables, FL | HPP Financial/S10801B108R00D11", "Plantation, Fl | Orlando Team/S15100B151R00D10"],
];

branchSets.forEach((branchSet) => {

  test(`Search Branch Active by branch: ${branchSet.join(", ")}`, async ({ page }) => {
    test.slow();

    const branchActivePage = new BranchActivePage(page);
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
    await reportPanelPage.clickBranchActiveLink();

    await branchActivePage.branchSelection(branchSet);
    await branchActivePage.clickSubmit();
    await branchActivePage.verifyBranchData(branchSet);
  });

});