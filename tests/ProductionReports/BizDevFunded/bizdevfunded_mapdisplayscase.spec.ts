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


test('Verify that the map displays correctly after click on the Biz-Dev Funded link', async ({ page }) => {

await reportPanelPage.clickSidebarToggle();
await reportPanelPage.clickBizDevFundedLink();

const isCountryMapVisible = await bizDevFundedPage.isCountryMapVisible();
expect(isCountryMapVisible).toBeTruthy();

console.log("Country map is visible: " + isCountryMapVisible);
});


// verify that the map is displays after selecting the filters and click on submit button

test.fixme('Verify that the map displays correctly after applying filters and clicking submit', async ({ page }) => {

await reportPanelPage.clickSidebarToggle();
await reportPanelPage.clickBizDevFundedLink();

// Apply some filters
await bizDevFundedPage.branchSelection(["Burtonsville, MD | GLG Team/S15300B153R00D10"]);
await bizDevFundedPage.clickSubmit();

const isCountryMapVisible = await bizDevFundedPage.isCountryMapVisible();
expect(isCountryMapVisible).toBeTruthy();
console.log("Country map is visible after applying filters and clicking submit: " + isCountryMapVisible);
});


// verify that the map is displays after selecting year
test('Verify that the map displays correctly after selecting a year filter ', async ({ page }) => {

await reportPanelPage.clickSidebarToggle();
await reportPanelPage.clickBizDevFundedLink();

await bizDevFundedPage.selectYear(2025);

const isCountryMapVisible = await bizDevFundedPage.isCountryMapVisible();
expect(isCountryMapVisible).toBeTruthy();
console.log("Country map is visible after selecting a year filter: " + isCountryMapVisible);
});