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


// verify that the dwell time chart displays
test('Verify that the dwell time chart displays correctly after click on the Post Closing link', async () => {
  await reportPanelPage.clickSidebarToggle();
  await reportPanelPage.clickPostClosingLink();

  const isVisible = await postClosingPage.isDwellTimechartVisible();

  expect(isVisible).toBeTruthy();
  console.log('Dwell time chart is displayed:', isVisible);
});


// verify that the loan channel chart displays
test('Verify that the loan channel chart displays correctly after click on the Post Closing link', async () => {
  await reportPanelPage.clickSidebarToggle();
  await reportPanelPage.clickPostClosingLink();

  const isVisible = await postClosingPage.isloanchannelchartVisible();

  expect(isVisible).toBeTruthy();
  console.log('Loan channel chart is displayed:', isVisible);
});


// verify that the loan purpose chart displays
test('Verify that the loan purpose chart displays correctly after click on the Post Closing link', async () => {
  await reportPanelPage.clickSidebarToggle();
  await reportPanelPage.clickPostClosingLink();

  const isVisible = await postClosingPage.isloanpurposechartVisible();

  expect(isVisible).toBeTruthy();
  console.log('Loan purpose chart is displayed:', isVisible);
});


// verify that the loan investor chart displays
test('Verify that the loan investor chart displays correctly after click on the Post Closing link', async () => {
  await reportPanelPage.clickSidebarToggle();
  await reportPanelPage.clickPostClosingLink();

  const isVisible = await postClosingPage.isloaninvestorchartVisible();

  expect(isVisible).toBeTruthy();
  console.log('Loan investor chart is displayed:', isVisible);
});