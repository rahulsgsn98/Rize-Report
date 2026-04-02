import { test, expect } from '@playwright/test';
import { ReportPanelPage } from '@pages/reportpanelpage';
import { BranchFundedPage } from '@pages/ProductionReportsPages/BranchFundedpage';
import { ReportDashboardPage } from '@pages/reportdashboardpage';
import { TestConfig } from '@config';
import { handleContinueLogin } from "@utils/sessionGuard";

let reportDashboardPage: ReportDashboardPage;
let config: TestConfig;
let reportPanelPage: ReportPanelPage;
let branchFundedPage: BranchFundedPage;

test.beforeEach(async ({ page }) => {

    reportPanelPage = new ReportPanelPage(page);
    branchFundedPage = new BranchFundedPage(page);
    reportDashboardPage = new ReportDashboardPage(page);
    config = new TestConfig();

    await page.goto(config.appUrl, {
      
      timeout: 60_000
    });
    await handleContinueLogin(page);
      const appRoot = page.locator('#app');

  // wait for app root at least
  await appRoot.waitFor({ state: 'visible', timeout: 30000 });
});

// verify that the funded report displays after click on the Branch Funded link

test('Verify that the funded report displays correctly after click on the Branch Funded link', async ({ page }) => {

await reportPanelPage.clickSidebarToggle();
await reportPanelPage.clickBranchFundedLink();

const isFundedReportVisible = await branchFundedPage.isFundedReportTableVisible();

expect(isFundedReportVisible).toBeTruthy();

console.log("funded report displays", isFundedReportVisible);

});


// verify that the loan channel report displays after click on the Branch Funded link

test('Verify that the loan channel report displays correctly after click on the Branch Funded link', async ({ page }) => {

await reportPanelPage.clickSidebarToggle();
await reportPanelPage.clickBranchFundedLink();

const isLoanChannelReportTableVisible = await branchFundedPage.isLoanChannelReportTableVisible();

expect(isLoanChannelReportTableVisible).toBeTruthy();

console.log("loan channel report displays", isLoanChannelReportTableVisible);

});


// verify that the Loan Program report displays after click on the Branch Funded link

test('Verify that the Loan Program report displays correctly after click on the Branch Funded link', async ({ page }) => {

await reportPanelPage.clickSidebarToggle();
await reportPanelPage.clickBranchFundedLink();

const isLoanProgramReportTableVisible = await branchFundedPage.isLoanProgramReportTableVisible();

expect(isLoanProgramReportTableVisible).toBeTruthy();

console.log("Loan Program displays", isLoanProgramReportTableVisible);

});


// verify that the Loan Purpose report displays after click on the Branch Funded link

test('Verify that the Loan Purpose report displays correctly after click on the Branch Funded link', async ({ page }) => {

await reportPanelPage.clickSidebarToggle();
await reportPanelPage.clickBranchFundedLink();

const isLoanPurposeReportTableVisible = await branchFundedPage.isLoanPurposeReportTableVisible();

expect(isLoanPurposeReportTableVisible).toBeTruthy();

console.log("Loan Purpose report displays", isLoanPurposeReportTableVisible);

});


// verify that the Loan Investor report displays after click on the Branch Funded link

test('Verify that the Loan Investor report displays correctly after click on the Branch Funded link', async ({ page }) => {

await reportPanelPage.clickSidebarToggle();
await reportPanelPage.clickBranchFundedLink();

const isLoanInvestorReportTableVisible = await branchFundedPage.isLoanInvestorReportTableVisible();

expect(isLoanInvestorReportTableVisible).toBeTruthy();

console.log("Loan Investor report displays", isLoanInvestorReportTableVisible);

});