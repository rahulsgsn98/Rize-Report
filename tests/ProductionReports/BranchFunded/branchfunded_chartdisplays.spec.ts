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

// verify that the loan channel chart is displays after click on the Branch Funded link

test('Verify that the loan channel chart displays correctly after click on the Branch Funded link', async ({ page }) => {
  await reportPanelPage.clickSidebarToggle();
  await reportPanelPage.clickBranchFundedLink();

  const isLoanChannelChartVisible = await branchFundedPage.isLoanChannelChartVisible();

  expect(isLoanChannelChartVisible).toBeTruthy();

  console.log('loan channel chart is displays displays', isLoanChannelChartVisible);
});

// verify that the loan Program chart is displays after click on the Branch Funded link

test('Verify that the loan Program chart displays correctly after click on the Branch Funded link', async ({ page }) => {
  await reportPanelPage.clickSidebarToggle();
  await reportPanelPage.clickBranchFundedLink();

  const isLoanProgramChartVisible = await branchFundedPage.isLoanProgramChartVisible();

  expect(isLoanProgramChartVisible).toBeTruthy();

  console.log('loan Program chart is displays displays', isLoanProgramChartVisible);
});

// verify that the loan Purpose chart is displays after click on the Branch Funded link

test('Verify that the loan Purpose chart displays correctly after click on the Branch Funded link', async ({ page }) => {
  await reportPanelPage.clickSidebarToggle();
  await reportPanelPage.clickBranchFundedLink();

  const isLoanPurposeChartVisible = await branchFundedPage.isLoanPurposeChartVisible();

  expect(isLoanPurposeChartVisible).toBeTruthy();

  console.log('loan Purpose chart is displays displays', isLoanPurposeChartVisible);
});

// verify that the loan investor chart is displays after click on the Branch Funded link

test('Verify that the loan investor chart displays correctly after click on the Branch Funded link', async ({ page }) => {
  await reportPanelPage.clickSidebarToggle();
  await reportPanelPage.clickBranchFundedLink();

  const isLoanInvestorChartVisible = await branchFundedPage.isLoanInvestorChartVisible();

  expect(isLoanInvestorChartVisible).toBeTruthy();

  console.log('loan investor chart is displays displays', isLoanInvestorChartVisible);
});