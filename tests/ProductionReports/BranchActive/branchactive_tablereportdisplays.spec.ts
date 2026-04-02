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
      
      timeout: 60_000
    });
    await handleContinueLogin(page);
     const appRoot = page.locator('#app');

  // wait for app root at least
  await appRoot.waitFor({ state: 'visible', timeout: 30000 });
});

// verify that the active report displays after click on the Branch Active link

test('Verify that the active report displays correctly after click on the Branch Active link', async ({ page }) => {

await reportPanelPage.clickSidebarToggle();
await reportPanelPage.clickBranchActiveLink();

const isActiveReportVisible = await branchActivePage.isActiveReportTableVisible();

expect(isActiveReportVisible).toBeTruthy();

console.log("active report displays", isActiveReportVisible);

});


// verify that the loan status report displays after click on the Branch Active link

test('Verify that the loan status report displays correctly after click on the Branch Active link', async ({ page }) => {

await reportPanelPage.clickSidebarToggle();
await reportPanelPage.clickBranchActiveLink();

const isLoanStatusReportTableVisible = await branchActivePage.isLoanStatusReportTableVisible();

expect(isLoanStatusReportTableVisible).toBeTruthy();

console.log("loan status report displays", isLoanStatusReportTableVisible);

});


// verify that the loan channel report displays after click on the Branch Active link

test('Verify that the loan channel report displays correctly after click on the Branch Active link', async ({ page }) => {

await reportPanelPage.clickSidebarToggle();
await reportPanelPage.clickBranchActiveLink();

const isLoanChannelReportTableVisible = await branchActivePage.isLoanChannelReportTableVisible();

expect(isLoanChannelReportTableVisible).toBeTruthy();

console.log("loan channel report displays", isLoanChannelReportTableVisible);

});


// verify that the Product Name report displays after click on the Branch Active link

test('Verify that the Product Name report displays correctly after click on the Branch Active link', async ({ page }) => {

await reportPanelPage.clickSidebarToggle();
await reportPanelPage.clickBranchActiveLink();

const isProductNameReportTableVisible = await branchActivePage.isProductNameReportTableVisible();

expect(isProductNameReportTableVisible).toBeTruthy();

console.log("Product Name report displays", isProductNameReportTableVisible);

});


// verify that the Loan Purpose report displays after click on the Branch Active link

test('Verify that the Loan Purpose report displays correctly after click on the Branch Active link', async ({ page }) => {

await reportPanelPage.clickSidebarToggle();
await reportPanelPage.clickBranchActiveLink();

const isLoanPurposeReportTableVisible = await branchActivePage.isLoanPurposeReportTableVisible();

expect(isLoanPurposeReportTableVisible).toBeTruthy();

console.log("Loan Purpose report displays", isLoanPurposeReportTableVisible);

});


// verify that the Loan Investor report displays after click on the Branch Active link

test('Verify that the Loan Investor report displays correctly after click on the Branch Active link', async ({ page }) => {

await reportPanelPage.clickSidebarToggle();
await reportPanelPage.clickBranchActiveLink();

const isLoanInvestorReportTableVisible = await branchActivePage.isLoanInvestorReportTableVisible();

expect(isLoanInvestorReportTableVisible).toBeTruthy();

console.log("Loan Investor report displays", isLoanInvestorReportTableVisible);

});