import { test, expect } from '@playwright/test';
import { ReportPanelPage } from '@pages/reportpanelpage';
import { BranchFundedPage } from '@pages/ProductionReportsPages/BranchFundedpage';
import { ReportDashboardPage } from '@pages/reportdashboardpage';
import { TestConfig } from '@config';
import { handleContinueLogin } from "@utils/sessionGuard";

let reportDashboardPage: ReportDashboardPage;
let config: TestConfig;
let reportPanelPage: ReportPanelPage;
let branchFundedPage: BranchFundedPage;

test.beforeEach(async ({ page }) => {

    reportPanelPage = new ReportPanelPage(page);
    branchFundedPage = new BranchFundedPage(page);
    reportDashboardPage = new ReportDashboardPage(page);
    config = new TestConfig();

    await page.goto(config.appUrl, {
     
      timeout: 60_000
    });
    await handleContinueLogin(page);
      const appRoot = page.locator('#app');

  // wait for app root at least
  await appRoot.waitFor({ state: 'visible', timeout: 30000 });
});

test('Verify that the Clear button resets filters and results', async ({ page }) => {

  await reportPanelPage.clickSidebarToggle();
  await reportPanelPage.clickBranchFundedLink();

  await branchFundedPage.branchSelection(["Burtonsville, MD | GLG Team/S15300B153R00D10"]);

  await branchFundedPage.clickSubmit();

 

  await branchFundedPage.clickClear();

});