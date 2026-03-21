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
      waitUntil: 'domcontentloaded',
      timeout: 60_000
    });
});


test('Verify that the map displays correctly after click on the Loan Officer Funded link', async ({ page }) => {



// Navigate to Loan Officer Funded page
await reportPanelPage.clickSidebarToggle();
await reportPanelPage.clickLoanOfficerFundedLink();


      const isCountryMapVisible =await loanOfficerFundedPage.isCountryMapVisible();
        expect(isCountryMapVisible).toBeTruthy();

        console.log("Country map is visible: " + isCountryMapVisible);
});



// verify that the map is displays after selecting the filters and click on submit button

test('Verify that the map displays correctly after applying filters and clicking submit', async ({ page }) => {

// Navigate to Loan Officer Funded page
await reportPanelPage.clickSidebarToggle();
await reportPanelPage.clickLoanOfficerFundedLink();

// Apply some filters (e.g., select a loan officer)
await loanOfficerFundedPage.loanOfficerSelection(["Natalie Premock"]);
await loanOfficerFundedPage.clickSubmit();
// wait for the page to load after submit
await page.waitForLoadState('networkidle');

        const isCountryMapVisible =await loanOfficerFundedPage.isCountryMapVisible();
        expect(isCountryMapVisible).toBeTruthy();
        console.log("Country map is visible after applying filters and clicking submit: " + isCountryMapVisible);
});




// verify that the map is displays after selecting year
test('Verify that the map displays correctly after selecting a year filter ', async ({ page }) => {



// Navigate to Loan Officer Funded page
await reportPanelPage.clickSidebarToggle();
await reportPanelPage.clickLoanOfficerFundedLink();

// wait for the page to load
await page.waitForLoadState('networkidle');


// Select a year filter (e.g., 2023)
await loanOfficerFundedPage.selectYear(2025);

// wait for the page to load after selecting year
await page.waitForLoadState('networkidle');

        const isCountryMapVisible =await loanOfficerFundedPage.isCountryMapVisible();
        expect(isCountryMapVisible).toBeTruthy();
        console.log("Country map is visible after selecting a year filter: " + isCountryMapVisible);
});
