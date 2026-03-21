import { test, expect } from '@playwright/test';
import { ReportPanelPage } from '@pages/reportpanelpage';
import { LoanOfficerActivePage } from '@pages/LoanOfficerActivepage';
import { ReportDashboardPage } from '@pages/reportdashboardpage';
import { TestConfig } from '@config';

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
      waitUntil: 'networkidle',
      timeout:60_000
    });
});


// click on map and verify that the map is displayed in large view

test('Verify that clicking on the map displays it in a larger view', async ({ page }) => {
    
// Navigate to Loan Officer Active page
await reportPanelPage.clickSidebarToggle();
await reportPanelPage.clickLoanOfficerActiveLink();

// Wait for the page to load and ensure data is available
await page.waitForLoadState('networkidle');
await loanOfficerActivePage.isCountryMapVisible();

// Click on the map
await loanOfficerActivePage.clickOnCountryMap();

// Verify that the map is displayed in a larger view

const isMapInLargeView = await loanOfficerActivePage.isMapInLargeView();
expect(isMapInLargeView).toBeTruthy();

console.log("Map is displayed in large view: " + isMapInLargeView);

});