import { test, expect } from '@playwright/test';
import { ReportPanelPage } from '@pages/reportpanelpage';
import { ClosingPage } from '@pages/OperationsReportsPages/Closingpage';
import { ReportDashboardPage } from '@pages/reportdashboardpage';
import { TestConfig } from '@config';
import { handleContinueLogin } from "@utils/sessionGuard";

let reportDashboardPage: ReportDashboardPage;
let config: TestConfig;
let reportPanelPage: ReportPanelPage;
let closingPage: ClosingPage;

test.beforeEach(async ({ page }) => {

  reportPanelPage = new ReportPanelPage(page);
  closingPage = new ClosingPage(page);
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

test('Verify that the operations report displays correctly after click on the Closing link', async ({ page }) => {

  await reportPanelPage.clickSidebarToggle();
  await reportPanelPage.clickClosingLink();

  const isVisible = await closingPage.isOperationsReportTableVisible();

  expect(isVisible).toBeTruthy();

  console.log("operations report displays", isVisible);

});


// verify that the manager report displays

test('Verify that the manager report displays correctly after click on the Closing link', async ({ page }) => {

  await reportPanelPage.clickSidebarToggle();
  await reportPanelPage.clickClosingLink();

  const isVisible = await closingPage.isManagerReportTableVisible();

  expect(isVisible).toBeTruthy();

  console.log("manager report displays", isVisible);

});


// verify that the loan channel report displays

test('Verify that the loan channel report displays correctly after click on the Closing link', async ({ page }) => {

  await reportPanelPage.clickSidebarToggle();
  await reportPanelPage.clickClosingLink();

  const isVisible = await closingPage.isLoanChannelReportTableVisible();

  expect(isVisible).toBeTruthy();

  console.log("loan channel report displays", isVisible);

});


// verify that the loan product report displays

test('Verify that the loan product report displays correctly after click on the Closing link', async ({ page }) => {

  await reportPanelPage.clickSidebarToggle();
  await reportPanelPage.clickClosingLink();

  const isVisible = await closingPage.isLoanProductReportTableVisible();

  expect(isVisible).toBeTruthy();

  console.log("loan product report displays", isVisible);

});


// verify that the loan purpose report displays

test('Verify that the loan purpose report displays correctly after click on the Closing link', async ({ page }) => {

  await reportPanelPage.clickSidebarToggle();
  await reportPanelPage.clickClosingLink();

  const isVisible = await closingPage.isLoanPurposeReportTableVisible();

  expect(isVisible).toBeTruthy();

  console.log("loan purpose report displays", isVisible);

});


// verify that the loan investor report displays

test('Verify that the loan investor report displays correctly after click on the Closing link', async ({ page }) => {

  await reportPanelPage.clickSidebarToggle();
  await reportPanelPage.clickClosingLink();

  const isVisible = await closingPage.isLoanInvestorReportTableVisible();

  expect(isVisible).toBeTruthy();

  console.log("loan investor report displays", isVisible);

});