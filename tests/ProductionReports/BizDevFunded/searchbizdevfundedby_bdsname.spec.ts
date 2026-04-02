import { test, expect } from '@playwright/test';
import { ReportPanelPage } from '@pages/reportpanelpage';
import { BizDevFundedPage } from '@pages/ProductionReportsPages/BizDevFundedpage';
import { TestConfig } from '@config';
import { handleContinueLogin } from "@utils/sessionGuard";

const config = new TestConfig();

// multiple test datasets
const bdsNameSets = [
  ["Juan C. Morales"],
  ["Diane Govea", "Cesar Villareal"],
];

bdsNameSets.forEach((bdsNameSet) => {

  test(`Search Biz-Dev Funded by BDS name: ${bdsNameSet.join(", ")}`, async ({ page }) => {
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

    await bizDevFundedPage.bdsNameSelection(bdsNameSet);

    await bizDevFundedPage.clickSubmit();

    await bizDevFundedPage.verifyBdsNameData(bdsNameSet);

  });

});