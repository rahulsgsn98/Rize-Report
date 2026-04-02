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


// verify that the loan channel chart displays
test('Verify that the loan channel chart displays correctly after click on the Closing link', async () => {
  await reportPanelPage.clickSidebarToggle();
  await reportPanelPage.clickClosingLink();

  const isVisible = await closingPage.isloanchannelchartVisible();

  expect(isVisible).toBeTruthy();
  console.log('Loan channel chart is displayed:', isVisible);
});


// verify that the loan product chart displays
test('Verify that the loan product chart displays correctly after click on the Closing link', async () => {
  await reportPanelPage.clickSidebarToggle();
  await reportPanelPage.clickClosingLink();

  const isVisible = await closingPage.isloanproductchartVisible();

  expect(isVisible).toBeTruthy();
  console.log('Loan product chart is displayed:', isVisible);
});


// verify that the loan purpose chart displays
test('Verify that the loan purpose chart displays correctly after click on the Closing link', async () => {
  await reportPanelPage.clickSidebarToggle();
  await reportPanelPage.clickClosingLink();

  const isVisible = await closingPage.isloanpurposechartVisible();

  expect(isVisible).toBeTruthy();
  console.log('Loan purpose chart is displayed:', isVisible);
});


// verify that the loan investor chart displays
test('Verify that the loan investor chart displays correctly after click on the Closing link', async () => {
  await reportPanelPage.clickSidebarToggle();
  await reportPanelPage.clickClosingLink();

  const isVisible = await closingPage.isloaninvestorchartVisible();

  expect(isVisible).toBeTruthy();
  console.log('Loan investor chart is displayed:', isVisible);
});