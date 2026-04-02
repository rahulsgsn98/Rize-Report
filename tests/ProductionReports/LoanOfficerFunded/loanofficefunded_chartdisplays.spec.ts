import { test, expect } from '@playwright/test';
import { ReportPanelPage } from '@pages/reportpanelpage';
import { LoanOfficerFundedPage } from '@pages/ProductionReportsPages/LoanOfficerFundedpage';
import { ReportDashboardPage } from '@pages/reportdashboardpage';
import { TestConfig } from '@config';
import { handleContinueLogin } from "@utils/sessionGuard";

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
     
      timeout:60_000
    });
    await handleContinueLogin(page);

     const appRoot = page.locator('#app');

  // wait for app root at least
  await appRoot.waitFor({ state: 'visible', timeout: 30000 });
});

// verify that the loan channel chart is displays after click on the Loan Officer Funded link

test('Verify that the loan channel chart displays correctly after click on the Loan Officer Funded link', async ({ page }) => {

// Navigate to Loan Officer Funded page
await reportPanelPage.clickSidebarToggle();
await reportPanelPage.clickLoanOfficerFundedLink();

        const isloanchannelchartVisible =await loanOfficerFundedPage.isloanchannelchartVisible();
        
        expect(isloanchannelchartVisible).toBeTruthy()

        console.log("loan channel chart is displays  displays", isloanchannelchartVisible)


})


// verify that the loan Program chart is displays after click on the Loan Officer Funded link

test('Verify that the loan Program chart displays correctly after click on the Loan Officer Funded link', async ({ page }) => {

// Navigate to Loan Officer Funded page
await reportPanelPage.clickSidebarToggle();
await reportPanelPage.clickLoanOfficerFundedLink();

        const isloanprogramchartVisible =await loanOfficerFundedPage.isloanprogramchartVisible();
        
        expect(isloanprogramchartVisible).toBeTruthy()

        console.log("loan Program chart is displays  displays", isloanprogramchartVisible)


})


// verify that the loan Purpose chart is displays after click on the Loan Officer Funded link

test('Verify that the loan Purpose chart displays correctly after click on the Loan Officer Funded link', async ({ page }) => {

// Navigate to Loan Officer Funded page
await reportPanelPage.clickSidebarToggle();
await reportPanelPage.clickLoanOfficerFundedLink();

        const isloanpurposechartVisible =await loanOfficerFundedPage.isloanpurposechartVisible();
        
        expect(isloanpurposechartVisible).toBeTruthy()

        console.log("loan Purpose chart is displays  displays", isloanpurposechartVisible)


})




// verify that the loan investor chart is displays after click on the Loan Officer Funded link

test('Verify that the loan investor chart displays correctly after click on the Loan Officer Funded link', async ({ page }) => {

// Navigate to Loan Officer Funded page
await reportPanelPage.clickSidebarToggle();
await reportPanelPage.clickLoanOfficerFundedLink();

        const isloaninvestorchartVisible =await loanOfficerFundedPage.isloaninvestorchartVisible();
        
        expect(isloaninvestorchartVisible).toBeTruthy()

        console.log("loan investor chart is displays  displays", isloaninvestorchartVisible)


})






