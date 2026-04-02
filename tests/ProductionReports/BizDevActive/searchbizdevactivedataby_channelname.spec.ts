import { test, expect } from '@playwright/test';
import { ReportPanelPage } from '@pages/reportpanelpage';
import { BizDevActivePage } from '@pages/ProductionReportsPages/BizDevActivepage';
import { TestConfig } from '@config';
import { handleContinueLogin } from "@utils/sessionGuard";

const config = new TestConfig();

// multiple test datasets
const channelNameSets = [
  ['Delegated'],
  ['Non-Delegated', 'Brokered', 'Delegated'],
];

channelNameSets.forEach((channelNameSet) => {

  test(`Search Biz Dev Active: ${channelNameSet.join(', ')}`, async ({ page }) => {
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

    await bizDevActivePage.channelNameSelection(channelNameSet);

    await bizDevActivePage.clickSubmit();

   // await bizDevActivePage.verifyChannelNameData(channelNameSet);

  });

});