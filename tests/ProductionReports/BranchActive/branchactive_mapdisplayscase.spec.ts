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
      waitUntil: 'domcontentloaded',
      timeout: 60_000
    });
    await handleContinueLogin(page);
     const appRoot = page.locator('#app');

  // wait for app root at least
  await appRoot.waitFor({ state: 'visible', timeout: 30000 });
});


test('Verify that the map displays correctly after click on the Branch Active link', async ({ page }) => {

await reportPanelPage.clickSidebarToggle();
await reportPanelPage.clickBranchActiveLink();

const isCountryMapVisible = await branchActivePage.isCountryMapVisible();
expect(isCountryMapVisible).toBeTruthy();

console.log("Country map is visible: " + isCountryMapVisible);
});


// verify that the map is displays after selecting the filters and click on submit button

test('Verify that the map displays correctly after applying filters and clicking submit', async ({ page }) => {

await reportPanelPage.clickSidebarToggle();
await reportPanelPage.clickBranchActiveLink();

await branchActivePage.branchSelection(["Burtonsville, MD | GLG Team/S15300B153R00D10"]);
await branchActivePage.clickSubmit();



const isCountryMapVisible = await branchActivePage.isCountryMapVisible();
expect(isCountryMapVisible).toBeTruthy();

console.log("Country map is visible after applying filters and clicking submit: " + isCountryMapVisible);
});