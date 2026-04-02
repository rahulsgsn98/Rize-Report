import { test, expect } from '@playwright/test';
import { ReportPanelPage } from '@pages/reportpanelpage';
import { BizDevActivePage } from '@pages/ProductionReportsPages/BizDevActivepage';
import { TestConfig } from '@config';
import { handleContinueLogin } from "@utils/sessionGuard";

const config = new TestConfig();

// multiple test datasets
const statusTypeSets = [
  ['Opening'],
  ['Processing', 'Underwriting'],
];

statusTypeSets.forEach((statusTypeSet) => {

  test(`Search Biz Dev Active by status type: ${statusTypeSet.join(', ')}`, async ({ page }) => {
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

    await bizDevActivePage.statusTypeSelection(statusTypeSet);

    await bizDevActivePage.clickSubmit();

    await bizDevActivePage.verifyStatusTypeData(statusTypeSet);
  });

});