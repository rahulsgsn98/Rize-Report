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

// verify that the active report displays after click on the Loan Officer Active link

test('Verify that the active report displays correctly after click on the Loan Officer Active link', async ({ page }) => {

// Navigate to Loan Officer Active page
await reportPanelPage.clickSidebarToggle();
await reportPanelPage.clickLoanOfficerActiveLink();

        const isActiveReportVisible =await loanOfficerActivePage.isActiveReportTableVisible();
        
        expect(isActiveReportVisible).toBeTruthy()

        console.log("active report displays", isActiveReportVisible)


})


// verify that the loan status report displays after click on the Loan Officer Active link

test('Verify that the loan status report displays correctly after click on the Loan Officer Active link', async ({ page }) => {

// Navigate to Loan Officer Active page
await reportPanelPage.clickSidebarToggle();
await reportPanelPage.clickLoanOfficerActiveLink();

        const isLoanStatusReportTableVisible =await loanOfficerActivePage.isLoanStatusReportTableVisible();
        
        expect(isLoanStatusReportTableVisible).toBeTruthy()

        console.log("loan status report displays", isLoanStatusReportTableVisible)


})


// verify that the loan channel report displays after click on the Loan Officer Active link

test('Verify that the loan channel report displays correctly after click on the Loan Officer Active link', async ({ page }) => {

// Navigate to Loan Officer Active page
await reportPanelPage.clickSidebarToggle();
await reportPanelPage.clickLoanOfficerActiveLink();

        const isLoanChannelReportTableVisible =await loanOfficerActivePage.isLoanChannelReportTableVisible();
        
        expect(isLoanChannelReportTableVisible).toBeTruthy()

        console.log("loan channel report displays", isLoanChannelReportTableVisible)


})


// verify that the Product Name report displays after click on the Loan Officer Active link

test('Verify that the Product Name report displays correctly after click on the Loan Officer Active link', async ({ page }) => {

// Navigate to Loan Officer Active page
await reportPanelPage.clickSidebarToggle();
await reportPanelPage.clickLoanOfficerActiveLink();

        const isProductNameReportTableVisible =await loanOfficerActivePage.isProductNameReportTableVisible();
        
        expect(isProductNameReportTableVisible).toBeTruthy()

        console.log("Product Name report displays", isProductNameReportTableVisible)


})


// verify that the Loan Purpose report displays after click on the Loan Officer Active link

test('Verify that the Loan Purpose report displays correctly after click on the Loan Officer Active link', async ({ page }) => {

// Navigate to Loan Officer Active page
await reportPanelPage.clickSidebarToggle();
await reportPanelPage.clickLoanOfficerActiveLink();

        const isLoanPurposeReportTableVisible =await loanOfficerActivePage.isLoanPurposeReportTableVisible();
        
        expect(isLoanPurposeReportTableVisible).toBeTruthy()

        console.log("Loan Purpose report displays", isLoanPurposeReportTableVisible)


})


// verify that the Loan Investor report displays after click on the Loan Officer Active link

test('Verify that the Loan Investor report displays correctly after click on the Loan Officer Active link', async ({ page }) => {

// Navigate to Loan Officer Active page
await reportPanelPage.clickSidebarToggle();
await reportPanelPage.clickLoanOfficerActiveLink();

        const isLoanInvestorReportTableVisible =await loanOfficerActivePage.isLoanInvestorReportTableVisible();
        
        expect(isLoanInvestorReportTableVisible).toBeTruthy()

        console.log("Loan Investor report displays", isLoanInvestorReportTableVisible)


})