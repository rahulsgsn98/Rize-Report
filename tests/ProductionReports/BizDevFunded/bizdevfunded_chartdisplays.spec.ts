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

// verify that the loan channel chart displays after click on the Biz-Dev Funded link
test('Verify that the loan channel chart displays correctly after click on the Biz-Dev Funded link', async () => {
  await reportPanelPage.clickSidebarToggle();
  await reportPanelPage.clickBizDevFundedLink();

  const isLoanChannelChartVisible = await bizDevFundedPage.isLoanChannelChartVisible();

  expect(isLoanChannelChartVisible).toBeTruthy();
  console.log('Loan channel chart is displayed:', isLoanChannelChartVisible);
});

// verify that the loan program chart displays after click on the Biz-Dev Funded link
test('Verify that the loan program chart displays correctly after click on the Biz-Dev Funded link', async () => {
  await reportPanelPage.clickSidebarToggle();
  await reportPanelPage.clickBizDevFundedLink();

  const isLoanProgramChartVisible = await bizDevFundedPage.isLoanProgramChartVisible();

  expect(isLoanProgramChartVisible).toBeTruthy();
  console.log('Loan Program chart is displayed:', isLoanProgramChartVisible);
});

// verify that the loan purpose chart displays after click on the Biz-Dev Funded link
test('Verify that the loan purpose chart displays correctly after click on the Biz-Dev Funded link', async () => {
  await reportPanelPage.clickSidebarToggle();
  await reportPanelPage.clickBizDevFundedLink();

  const isLoanPurposeChartVisible = await bizDevFundedPage.isLoanPurposeChartVisible();

  expect(isLoanPurposeChartVisible).toBeTruthy();
  console.log('Loan Purpose chart is displayed:', isLoanPurposeChartVisible);
});

// verify that the loan investor chart displays after click on the Biz-Dev Funded link
test('Verify that the loan investor chart displays correctly after click on the Biz-Dev Funded link', async () => {
  await reportPanelPage.clickSidebarToggle();
  await reportPanelPage.clickBizDevFundedLink();

  const isLoanInvestorChartVisible = await bizDevFundedPage.isLoanInvestorChartVisible();

  expect(isLoanInvestorChartVisible).toBeTruthy();
  console.log('Loan Investor chart is displayed:', isLoanInvestorChartVisible);
});