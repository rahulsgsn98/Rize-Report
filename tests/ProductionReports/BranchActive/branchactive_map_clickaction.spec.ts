import { test, expect } from '@playwright/test';
import { ReportPanelPage } from '@pages/reportpanelpage';
import { BranchActivePage } from '@pages/ProductionReportsPages/BranchActivepage';
import { ReportDashboardPage } from '@pages/reportdashboardpage';
import { TestConfig } from '@config';
import { handleContinueLogin } from "@utils/sessionGuard";

let reportDashboardPage: ReportDashboardPage;
let config: TestConfig;
let reportPanelPage: ReportPanelPage;
let branchActivePage: BranchActivePage;

test.beforeEach(async ({ page }) => {

    reportPanelPage = new ReportPanelPage(page);
    branchActivePage = new BranchActivePage(page);
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


// click on map and verify that the map is displayed in large view

test('Verify that clicking on the map displays it in a larger view', async ({ page }) => {
    
await reportPanelPage.clickSidebarToggle();
await reportPanelPage.clickBranchActiveLink();


await branchActivePage.isCountryMapVisible();

await branchActivePage.clickOnCountryMap();

const isMapInLargeView = await branchActivePage.isMapInLargeView();
expect(isMapInLargeView).toBeTruthy();

console.log("Map is displayed in large view: " + isMapInLargeView);

});