import { test, expect } from '@playwright/test';
import { ReportPanelPage } from '@pages/reportpanelpage';
import { BizDevActivePage } from '@pages/ProductionReportsPages/BizDevActivepage';
import { TestConfig } from '@config';
import { handleContinueLogin } from "@utils/sessionGuard";

const config = new TestConfig();

// multiple test datasets
const branchSets = [
  ["Kendall, FL | Vista Mortgage Team/S10901B109R00D11"],
  ["Plantation, FL | Ortiz-Pena R4R/S15104B151R03D10", "Melbourne, FL | Goodman Team/S13200B132R00D12"],
];

branchSets.forEach((branchSet) => {

  test(`Search Biz Dev Active by branch: ${branchSet.join(", ")}`, async ({ page }) => {
    test.slow();

    const bizDevActivePage = new BizDevActivePage(page);
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
    await reportPanelPage.clickBizDevActiveLink();

    await bizDevActivePage.branchSelection(branchSet);

    await bizDevActivePage.clickSubmit();

    await bizDevActivePage.verifyBranchData(branchSet);

  });

});