import { test, expect } from '@playwright/test';
import { ReportPanelPage } from '@pages/reportpanelpage';
import { UnderwritingFundedPage } from '@pages/OperationsReportsPages/Underwritingpage';
import { ReportDashboardPage } from '@pages/reportdashboardpage';
import { TestConfig } from '@config';
import { handleContinueLogin } from "@utils/sessionGuard";

let reportDashboardPage: ReportDashboardPage;
let config: TestConfig;
let reportPanelPage: ReportPanelPage;
let underwritingFundedPage: UnderwritingFundedPage;

test.beforeEach(async ({ page }) => {

  reportPanelPage = new ReportPanelPage(page);
  underwritingFundedPage = new UnderwritingFundedPage(page);
  reportDashboardPage = new ReportDashboardPage(page);
  config = new TestConfig();

  await page.goto(config.appUrl, {
    waitUntil: 'domcontentloaded',
    timeout: 60_000
  });
  await handleContinueLogin(page);

  const appRoot = page.locator('#app');

  await appRoot.waitFor({ state: 'visible', timeout: 30000 });
});


// verify that the operations report displays

test('Verify that the operations report displays correctly after click on the Underwriting Funded link', async ({ page }) => {

  await reportPanelPage.clickSidebarToggle();
  await reportPanelPage.clickUnderwritingFundedLink();

  const isVisible = await underwritingFundedPage.isOperationsReportTableVisible();

  expect(isVisible).toBeTruthy();

  console.log("operations report displays", isVisible);

});


// verify that the loan channel report displays

test('Verify that the loan channel report displays correctly after click on the Underwriting Funded link', async ({ page }) => {

  await reportPanelPage.clickSidebarToggle();
  await reportPanelPage.clickUnderwritingFundedLink();

  const isVisible = await underwritingFundedPage.isLoanChannelReportTableVisible();

  expect(isVisible).toBeTruthy();

  console.log("loan channel report displays", isVisible);

});


// verify that the loan product report displays

test('Verify that the loan product report displays correctly after click on the Underwriting Funded link', async ({ page }) => {

  await reportPanelPage.clickSidebarToggle();
  await reportPanelPage.clickUnderwritingFundedLink();

  const isVisible = await underwritingFundedPage.isLoanProductReportTableVisible();

  expect(isVisible).toBeTruthy();

  console.log("loan product report displays", isVisible);

});


// verify that the loan purpose report displays

test('Verify that the loan purpose report displays correctly after click on the Underwriting Funded link', async ({ page }) => {

  await reportPanelPage.clickSidebarToggle();
  await reportPanelPage.clickUnderwritingFundedLink();

  const isVisible = await underwritingFundedPage.isLoanPurposeReportTableVisible();

  expect(isVisible).toBeTruthy();

  console.log("loan purpose report displays", isVisible);

});


// verify that the loan investor report displays

test('Verify that the loan investor report displays correctly after click on the Underwriting Funded link', async ({ page }) => {

  await reportPanelPage.clickSidebarToggle();
  await reportPanelPage.clickUnderwritingFundedLink();

  const isVisible = await underwritingFundedPage.isLoanInvestorReportTableVisible();

  expect(isVisible).toBeTruthy();

  console.log("loan investor report displays", isVisible);

});