import { test, expect } from '@playwright/test';
import { ReportPanelPage } from '@pages/reportpanelpage';
import { LoanOfficerActivePage } from '@pages/ProductionReportsPages/LoanOfficerActivepage';
import { ReportDashboardPage } from '@pages/reportdashboardpage';
import { TestConfig } from '@config';
import { handleContinueLogin } from "@utils/sessionGuard";

let reportDashboardPage: ReportDashboardPage;
let config: TestConfig;
let reportPanelPage: ReportPanelPage;
let loanOfficerActivePage: LoanOfficerActivePage;

test.beforeEach(async ({ page }) => {

    reportPanelPage = new ReportPanelPage(page);
    loanOfficerActivePage = new LoanOfficerActivePage(page);
    reportDashboardPage = new ReportDashboardPage(page);
    config = new TestConfig();
   // ✅ Fix 1: proper goto wait
    await page.goto(config.appUrl, {
      
      timeout:60_000
    });
    await handleContinueLogin(page);
     const appRoot = page.locator('#app');

  // wait for app root at least
  await appRoot.waitFor({ state: 'visible', timeout: 30000 });
});


// click on map and verify that the map is displayed in large view

test('Verify that clicking on the map displays it in a larger view', async ({ page }) => {
    
// Navigate to Loan Officer Active page
await reportPanelPage.clickSidebarToggle();
await reportPanelPage.clickLoanOfficerActiveLink();

// Wait for the page to load and ensure data is available

await loanOfficerActivePage.isCountryMapVisible();

// Click on the map
await loanOfficerActivePage.clickOnCountryMap();

// Verify that the map is displayed in a larger view

const isMapInLargeView = await loanOfficerActivePage.isMapInLargeView();
expect(isMapInLargeView).toBeTruthy();

console.log("Map is displayed in large view: " + isMapInLargeView);

});