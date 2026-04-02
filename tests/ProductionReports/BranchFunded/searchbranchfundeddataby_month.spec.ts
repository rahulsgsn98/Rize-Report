import { test, expect } from '@playwright/test';
import { ReportPanelPage } from '@pages/reportpanelpage';
import { BranchFundedPage } from '@pages/ProductionReportsPages/BranchFundedpage';
import { TestConfig } from '@config';
import { handleContinueLogin } from "@utils/sessionGuard";

const config = new TestConfig();

// multiple test datasets
const monthSets = [
  ['January 2026'],
  ['February 2026', 'March 2026'],
];

monthSets.forEach((monthSet) => {

  test(`Search Branch Funded by month: ${monthSet.join(', ')}`, async ({ page }) => {
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

    

    await branchFundedPage.monthSelection(monthSet);

    await branchFundedPage.clickSubmit();

    await branchFundedPage.verifyMonthData(monthSet);

  });

});