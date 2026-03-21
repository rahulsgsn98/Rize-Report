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


// Verify date time displays or not 

test('  Verify date time displays or not correctly after click on the Loan Officer Funded link', async ({ page }) => {

// Navigate to Loan Officer Funded page
await reportPanelPage.clickSidebarToggle();
await reportPanelPage.clickLoanOfficerFundedLink();
 /* 
   await expect(
    loanOfficerFundedPage.loanfundeddesktoprefresh.or(loanOfficerFundedPage.loanfundedmobilerefresh).first()
  ).toBeVisible();
  */
 await  page.waitForLoadState('networkidle')

  await loanOfficerFundedPage.waitForRefreshDateTimeToBeVisible();

        const isRefreshDateTimeDisplayed =await loanOfficerFundedPage.isRefreshDateTimeDisplayed();
        
        expect(isRefreshDateTimeDisplayed).toBeTruthy()

        console.log(" Refresh date time  displays", isRefreshDateTimeDisplayed)


})