import { test, expect } from '@playwright/test';
import { ReportPanelPage } from '@pages/reportpanelpage';
import { BizDevFundedPage } from '@pages/ProductionReportsPages/BizDevFundedpage';
import { ReportDashboardPage } from '@pages/reportdashboardpage';
import { TestConfig } from '@config';
import { handleContinueLogin } from "@utils/sessionGuard";

let reportDashboardPage: ReportDashboardPage;
let config: TestConfig;
let reportPanelPage: ReportPanelPage;
let bizDevFundedPage: BizDevFundedPage;

test.beforeEach(async ({ page }) => {

    reportPanelPage = new ReportPanelPage(page);
    bizDevFundedPage = new BizDevFundedPage(page);
    reportDashboardPage = new ReportDashboardPage(page);
    config = new TestConfig();

    await page.goto(config.appUrl, {
      waitUntil: 'domcontentloaded',
      timeout: 60_000
    });
    await handleContinueLogin(page);
     const appRoot = page.locator('#app');

  // wait for app root at least
  await appRoot.waitFor({ state: 'visible', timeout: 30000 });
});


// click on map and verify that the map is displayed in large view

test('Verify that clicking on the map displays it in a larger view', async ({ page }) => {
    
await reportPanelPage.clickSidebarToggle();
await reportPanelPage.clickBizDevFundedLink();

await bizDevFundedPage.isCountryMapVisible();

await bizDevFundedPage.clickOnCountryMap();

const isMapInLargeView = await bizDevFundedPage.isMapInLargeView();
expect(isMapInLargeView).toBeTruthy();

console.log("Map is displayed in large view: " + isMapInLargeView);

});