import { test, expect } from '@playwright/test';
import { ReportPanelPage } from '@pages/reportpanelpage';
import { BizDevFundedPage } from '@pages/ProductionReportsPages/BizDevFundedpage';
import { TestConfig } from '@config';
import { handleContinueLogin } from "@utils/sessionGuard";

const config = new TestConfig();

// multiple test datasets
const branchSets = [
  ["Kendall, FL | Caballero Team/S10500B105R00D11"],
  ["Plantation, FL | EXP Team/S14600B146R03D10", "Laurel, MD/S12000B120R00D10"],
];

branchSets.forEach((branchSet) => {

  test.fixme(`Search Biz-Dev Funded by branch: ${branchSet.join(", ")}`, async ({ page }) => {
    test.slow();

    const bizDevFundedPage = new BizDevFundedPage(page);
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
    await reportPanelPage.clickBizDevFundedLink();

    await bizDevFundedPage.branchSelection(branchSet);

    await bizDevFundedPage.clickSubmit();

    await bizDevFundedPage.verifyBranchData(branchSet);

  });

});