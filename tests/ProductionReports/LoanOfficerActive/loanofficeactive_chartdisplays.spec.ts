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

  await page.goto(config.appUrl, {
    waitUntil: 'networkidle',
    timeout: 60_000
  });
});


// ✅ Loan Status Chart
test('Verify that the loan status chart displays correctly after clicking Loan Officer Active link', async () => {

  await reportPanelPage.clickSidebarToggle();
  await reportPanelPage.clickLoanOfficerActiveLink(); // 👈 UPDATED

  const isVisible = await loanOfficerActivePage.isLoanStatusChartVisible();

  expect(isVisible).toBeTruthy();

  console.log("Loan Status chart is displayed:", isVisible);
});


// ✅ Loan Channel Chart
test('Verify that the loan channel chart displays correctly after clicking Loan Officer Active link', async () => {

  await reportPanelPage.clickSidebarToggle();
  await reportPanelPage.clickLoanOfficerActiveLink();

  const isVisible = await loanOfficerActivePage.isLoanChannelChartVisible();

  expect(isVisible).toBeTruthy();

  console.log("Loan Channel chart is displayed:", isVisible);
});


// ✅ Product Name Chart (replaces Program)
test('Verify that the product name chart displays correctly after clicking Loan Officer Active link', async () => {

  await reportPanelPage.clickSidebarToggle();
  await reportPanelPage.clickLoanOfficerActiveLink();

  const isVisible = await loanOfficerActivePage.isProductNameChartVisible();

  expect(isVisible).toBeTruthy();

  console.log("Product Name chart is displayed:", isVisible);
});


// ✅ Loan Purpose Chart
test('Verify that the loan purpose chart displays correctly after clicking Loan Officer Active link', async () => {

  await reportPanelPage.clickSidebarToggle();
  await reportPanelPage.clickLoanOfficerActiveLink();

  const isVisible = await loanOfficerActivePage.isLoanPurposeChartVisible();

  expect(isVisible).toBeTruthy();

  console.log("Loan Purpose chart is displayed:", isVisible);
});


// ✅ Loan Investor Chart
test('Verify that the loan investor chart displays correctly after clicking Loan Officer Active link', async () => {

  await reportPanelPage.clickSidebarToggle();
  await reportPanelPage.clickLoanOfficerActiveLink();

  const isVisible = await loanOfficerActivePage.isLoanInvestorChartVisible();

  expect(isVisible).toBeTruthy();

  console.log("Loan Investor chart is displayed:", isVisible);
});