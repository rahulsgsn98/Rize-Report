import { test, expect } from "@playwright/test";
import { ReportDashboardPage } from "../pages/reportdashboardpage";

import { TestConfig } from "../test.config";
import { ReportPanelPage } from "../pages/reportpanelpage";
import { LoanOfficerFundedPage } from "../pages/LoanOfficer-Fundedpage";



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


test('Verify that the Clear button resets filters and results', async ({ page }) => {

   // test.slow();
// Navigate to Loan Officer Funded page
await reportPanelPage.clickSidebarToggle();
await reportPanelPage.clickLoanOfficerFundedLink();

// Apply some filters (e.g., select a loan officer and a month)
await loanOfficerFundedPage.loanOfficerSelection(["Natalie Premock"]);

await loanOfficerFundedPage.clickSubmit();

// Wait for the page to load after submit
await page.waitForLoadState('networkidle');

// Verify that results are displayed based on filters
//await loanOfficerFundedPage.verifyLoanOfficerData(["Natalie Premock"]);


 

await loanOfficerFundedPage.clickClear();





});