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

// Loan Status Chart
test('Verify that the loan status chart displays correctly after clicking Branch Active link', async ({ page }) => {
  await reportPanelPage.clickSidebarToggle();
  await reportPanelPage.clickBranchActiveLink();

  const isVisible = await branchActivePage.isLoanStatusChartVisible();

  expect(isVisible).toBeTruthy();

  console.log('Loan Status chart is displayed:', isVisible);
});

// Loan Channel Chart
test('Verify that the loan channel chart displays correctly after clicking Branch Active link', async ({ page }) => {
  await reportPanelPage.clickSidebarToggle();
  await reportPanelPage.clickBranchActiveLink();

  const isVisible = await branchActivePage.isLoanChannelChartVisible();

  expect(isVisible).toBeTruthy();

  console.log('Loan Channel chart is displayed:', isVisible);
});

// Product Name Chart
test('Verify that the product name chart displays correctly after clicking Branch Active link', async ({ page }) => {
  await reportPanelPage.clickSidebarToggle();
  await reportPanelPage.clickBranchActiveLink();

  const isVisible = await branchActivePage.isProductNameChartVisible();

  expect(isVisible).toBeTruthy();

  console.log('Product Name chart is displayed:', isVisible);
});

// Loan Purpose Chart
test('Verify that the loan purpose chart displays correctly after clicking Branch Active link', async ({ page }) => {
  await reportPanelPage.clickSidebarToggle();
  await reportPanelPage.clickBranchActiveLink();

  const isVisible = await branchActivePage.isLoanPurposeChartVisible();

  expect(isVisible).toBeTruthy();

  console.log('Loan Purpose chart is displayed:', isVisible);
});

// Loan Investor Chart
test('Verify that the loan investor chart displays correctly after clicking Branch Active link', async ({ page }) => {
  await reportPanelPage.clickSidebarToggle();
  await reportPanelPage.clickBranchActiveLink();

  const isVisible = await branchActivePage.isLoanInvestorChartVisible();

  expect(isVisible).toBeTruthy();

  console.log('Loan Investor chart is displayed:', isVisible);
});