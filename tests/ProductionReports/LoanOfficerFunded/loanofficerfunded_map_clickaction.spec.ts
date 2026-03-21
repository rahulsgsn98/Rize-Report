import { test, expect } from '@playwright/test';
import { ReportPanelPage } from '@pages/reportpanelpage';
import { LoanOfficerFundedPage } from '@pages/LoanOfficerFundedpage';
import { ReportDashboardPage } from '@pages/reportdashboardpage';
import { TestConfig } from '@config';


let reportDashboardPage: ReportDashboardPage;
let config: TestConfig;
let reportPanelPage: ReportPanelPage;
let loanOfficerFundedPage: LoanOfficerFundedPage;

test.beforeEach(async ({ page }) => {

    reportPanelPage = new ReportPanelPage(page);
    loanOfficerFundedPage = new LoanOfficerFundedPage(page);
    reportDashboardPage = new ReportDashboardPage(page);
    config = new TestConfig();
   // ✅ Fix 1: proper goto wait
    await page.goto(config.appUrl, {
      waitUntil: 'networkidle',
      timeout:60_000
    });
});


// click on map and verify that the map is displayed in large view

test('Verify that clicking on the map displays it in a larger view', async ({ page }) => {
    
// Navigate to Loan Officer Funded page
await reportPanelPage.clickSidebarToggle();
await reportPanelPage.clickLoanOfficerFundedLink();

// Wait for the page to load and ensure data is available
await page.waitForLoadState('networkidle');
await loanOfficerFundedPage.isCountryMapVisible();

// Click on the map
await loanOfficerFundedPage.clickOnCountryMap();

// Verify that the map is displayed in a larger view

const isMapInLargeView = await loanOfficerFundedPage.isMapInLargeView();
expect(isMapInLargeView).toBeTruthy();

console.log("Map is displayed in large view: " + isMapInLargeView);

});