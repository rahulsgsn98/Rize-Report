import { test, expect } from '@playwright/test';
import { ReportPanelPage } from '@pages/reportpanelpage';
import { BizDevActivePage } from '@pages/ProductionReportsPages/BizDevActivepage';
import { ReportDashboardPage } from '@pages/reportdashboardpage';
import { TestConfig } from '@config';
import { handleContinueLogin } from "@utils/sessionGuard";

let reportDashboardPage: ReportDashboardPage;
let config: TestConfig;
let reportPanelPage: ReportPanelPage;
let bizDevActivePage: BizDevActivePage;

test.beforeEach(async ({ page }) => {

    reportPanelPage = new ReportPanelPage(page);
    bizDevActivePage = new BizDevActivePage(page);
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


test('Verify that the map displays correctly after click on the Biz Dev Active link', async ({ page }) => {

await reportPanelPage.clickSidebarToggle();
await reportPanelPage.clickBizDevActiveLink();

const isCountryMapVisible = await bizDevActivePage.isCountryMapVisible();
expect(isCountryMapVisible).toBeTruthy();

console.log("Country map is visible: " + isCountryMapVisible);
});


// verify that the map is displays after selecting the filters and click on submit button

test('Verify that the map displays correctly after applying filters and clicking submit', async ({ page }) => {

await reportPanelPage.clickSidebarToggle();
await reportPanelPage.clickBizDevActiveLink();

// Apply some filters
await bizDevActivePage.bdsNameSelection(["Diane Govea "]);
await bizDevActivePage.clickSubmit();

const isCountryMapVisible = await bizDevActivePage.isCountryMapVisible();
expect(isCountryMapVisible).toBeTruthy();
console.log("Country map is visible after applying filters and clicking submit: " + isCountryMapVisible);
});