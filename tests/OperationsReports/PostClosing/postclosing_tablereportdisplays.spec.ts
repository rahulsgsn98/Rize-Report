import { test, expect } from '@playwright/test';
import { ReportPanelPage } from '@pages/reportpanelpage';
import { PostClosingPage } from '@pages/OperationsReportsPages/PostClosingpage';
import { ReportDashboardPage } from '@pages/reportdashboardpage';
import { TestConfig } from '@config';
import { handleContinueLogin } from "@utils/sessionGuard";

let reportDashboardPage: ReportDashboardPage;
let config: TestConfig;
let reportPanelPage: ReportPanelPage;
let postClosingPage: PostClosingPage;

test.beforeEach(async ({ page }) => {

  reportPanelPage = new ReportPanelPage(page);
  postClosingPage = new PostClosingPage(page);
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

test('Verify that the operations report displays correctly after click on the Post Closing link', async ({ page }) => {

  await reportPanelPage.clickSidebarToggle();
  await reportPanelPage.clickPostClosingLink();

  const isVisible = await postClosingPage.isOperationsReportTableVisible();

  expect(isVisible).toBeTruthy();

  console.log("operations report displays", isVisible);

});


// verify that the manager report displays

test('Verify that the manager report displays correctly after click on the Post Closing link', async ({ page }) => {

  await reportPanelPage.clickSidebarToggle();
  await reportPanelPage.clickPostClosingLink();

  const isVisible = await postClosingPage.isManagerReportTableVisible();

  expect(isVisible).toBeTruthy();

  console.log("manager report displays", isVisible);

});


// verify that the dwell time report displays

test('Verify that the dwell time report displays correctly after click on the Post Closing link', async ({ page }) => {

  await reportPanelPage.clickSidebarToggle();
  await reportPanelPage.clickPostClosingLink();

  const isVisible = await postClosingPage.isDwellTimeReportTableVisible();

  expect(isVisible).toBeTruthy();

  console.log("dwell time report displays", isVisible);

});


// verify that the loan channel report displays

test('Verify that the loan channel report displays correctly after click on the Post Closing link', async ({ page }) => {

  await reportPanelPage.clickSidebarToggle();
  await reportPanelPage.clickPostClosingLink();

  const isVisible = await postClosingPage.isLoanChannelReportTableVisible();

  expect(isVisible).toBeTruthy();

  console.log("loan channel report displays", isVisible);

});


// verify that the loan purpose report displays

test('Verify that the loan purpose report displays correctly after click on the Post Closing link', async ({ page }) => {

  await reportPanelPage.clickSidebarToggle();
  await reportPanelPage.clickPostClosingLink();

  const isVisible = await postClosingPage.isLoanPurposeReportTableVisible();

  expect(isVisible).toBeTruthy();

  console.log("loan purpose report displays", isVisible);

});


// verify that the loan investor report displays

test('Verify that the loan investor report displays correctly after click on the Post Closing link', async ({ page }) => {

  await reportPanelPage.clickSidebarToggle();
  await reportPanelPage.clickPostClosingLink();

  const isVisible = await postClosingPage.isLoanInvestorReportTableVisible();

  expect(isVisible).toBeTruthy();

  console.log("loan investor report displays", isVisible);

});