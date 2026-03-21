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
      waitUntil: 'domcontentloaded',
      timeout: 60_000
    });
});


test('Verify that the map displays correctly after click on the Loan Officer Active link', async ({ page }) => {



// Navigate to Loan Officer Active page
await reportPanelPage.clickSidebarToggle();
await reportPanelPage.clickLoanOfficerActiveLink();


      const isCountryMapVisible =await loanOfficerActivePage.isCountryMapVisible();
        expect(isCountryMapVisible).toBeTruthy();

        console.log("Country map is visible: " + isCountryMapVisible);
});



// verify that the map is displays after selecting the filters and click on submit button

test('Verify that the map displays correctly after applying filters and clicking submit', async ({ page }) => {

// Navigate to Loan Officer Active page
await reportPanelPage.clickSidebarToggle();
await reportPanelPage.clickLoanOfficerActiveLink();

// Apply some filters (e.g., select a loan officer)
await loanOfficerActivePage.loanOfficerSelection(["Natalie Premock"]);
await loanOfficerActivePage.clickSubmit();
// wait for the page to load after submit
await page.waitForLoadState('networkidle');

        const isCountryMapVisible =await loanOfficerActivePage.isCountryMapVisible();
        expect(isCountryMapVisible).toBeTruthy();
        console.log("Country map is visible after applying filters and clicking submit: " + isCountryMapVisible);
});



