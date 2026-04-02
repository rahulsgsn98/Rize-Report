import { test, expect } from '@playwright/test';
import { ReportPanelPage } from '@pages/reportpanelpage';
import { BizDevFundedPage } from '@pages/ProductionReportsPages/BizDevFundedpage';
import { ReportDashboardPage } from '@pages/reportdashboardpage';
import { TestConfig } from '@config';
import { handleContinueLogin } from "@utils/sessionGuard";

let reportDashboardPage: ReportDashboardPage;
let config: TestConfig;
let reportPanelPage: ReportPanelPage;
let bizDevFundedPage: BizDevFundedPage;

test.beforeEach(async ({ page }) => {

    reportPanelPage = new ReportPanelPage(page);
    bizDevFundedPage = new BizDevFundedPage(page);
    reportDashboardPage = new ReportDashboardPage(page);
    config = new TestConfig();

    await page.goto(config.appUrl, {
      waitUntil: 'domcontentloaded',
      timeout: 60_000
    });
    await handleContinueLogin(page);
     const appRoot = page.locator('#app');

  // wait for app root at least
  await appRoot.waitFor({ state: 'visible', timeout: 30000 });
});

// verify that the funded report displays after click on the Biz-Dev Funded link

test('Verify that the funded report displays correctly after click on the Biz-Dev Funded link', async ({ page }) => {

await reportPanelPage.clickSidebarToggle();
await reportPanelPage.clickBizDevFundedLink();

const isFundedReportVisible = await bizDevFundedPage.isFundedReportTableVisible();

expect(isFundedReportVisible).toBeTruthy();

console.log("funded report displays", isFundedReportVisible);

});


// verify that the loan channel report displays after click on the Biz-Dev Funded link

test('Verify that the loan channel report displays correctly after click on the Biz-Dev Funded link', async ({ page }) => {

await reportPanelPage.clickSidebarToggle();
await reportPanelPage.clickBizDevFundedLink();

const isLoanChannelReportTableVisible = await bizDevFundedPage.isLoanChannelReportTableVisible();

expect(isLoanChannelReportTableVisible).toBeTruthy();

console.log("loan channel report displays", isLoanChannelReportTableVisible);

});


// verify that the Loan Program report displays after click on the Biz-Dev Funded link

test('Verify that the Loan Program report displays correctly after click on the Biz-Dev Funded link', async ({ page }) => {

await reportPanelPage.clickSidebarToggle();
await reportPanelPage.clickBizDevFundedLink();

const isLoanProgramReportTableVisible = await bizDevFundedPage.isLoanProgramReportTableVisible();

expect(isLoanProgramReportTableVisible).toBeTruthy();

console.log("Loan Program displays", isLoanProgramReportTableVisible);

});


// verify that the Loan Purpose report displays after click on the Biz-Dev Funded link

test('Verify that the Loan Purpose report displays correctly after click on the Biz-Dev Funded link', async ({ page }) => {

await reportPanelPage.clickSidebarToggle();
await reportPanelPage.clickBizDevFundedLink();

const isLoanPurposeReportTableVisible = await bizDevFundedPage.isLoanPurposeReportTableVisible();

expect(isLoanPurposeReportTableVisible).toBeTruthy();

console.log("Loan Purpose report displays", isLoanPurposeReportTableVisible);

});


// verify that the Loan Investor report displays after click on the Biz-Dev Funded link

test('Verify that the Loan Investor report displays correctly after click on the Biz-Dev Funded link', async ({ page }) => {

await reportPanelPage.clickSidebarToggle();
await reportPanelPage.clickBizDevFundedLink();

const isLoanInvestorReportTableVisible = await bizDevFundedPage.isLoanInvestorReportTableVisible();

expect(isLoanInvestorReportTableVisible).toBeTruthy();

console.log("Loan Investor report displays", isLoanInvestorReportTableVisible);

});