import { test, expect } from '@playwright/test';
import { ReportPanelPage } from '@pages/reportpanelpage';
import { BizDevActivePage } from '@pages/ProductionReportsPages/BizDevActivepage';
import { ReportDashboardPage } from '@pages/reportdashboardpage';
import { TestConfig } from '@config';
import { handleContinueLogin } from "@utils/sessionGuard";

let reportDashboardPage: ReportDashboardPage;
let config: TestConfig;
let reportPanelPage: ReportPanelPage;
let bizDevActivePage: BizDevActivePage;

test.beforeEach(async ({ page }) => {

  reportPanelPage = new ReportPanelPage(page);
  bizDevActivePage = new BizDevActivePage(page);
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


// ✅ Loan Status Chart
test('Verify that the loan status chart displays correctly after clicking Biz Dev Active link', async () => {

  await reportPanelPage.clickSidebarToggle();
  await reportPanelPage.clickBizDevActiveLink();

  const isVisible = await bizDevActivePage.isloanstatuschartVisible();

  expect(isVisible).toBeTruthy();

  console.log("Loan Status chart is displayed:", isVisible);
});


// ✅ Loan Channel Chart
test('Verify that the loan channel chart displays correctly after clicking Biz Dev Active link', async () => {

  await reportPanelPage.clickSidebarToggle();
  await reportPanelPage.clickBizDevActiveLink();

  const isVisible = await bizDevActivePage.isloanchannelchartVisible();

  expect(isVisible).toBeTruthy();

  console.log("Loan Channel chart is displayed:", isVisible);
});


// ✅ Product Name Chart
test('Verify that the product name chart displays correctly after clicking Biz Dev Active link', async () => {

  await reportPanelPage.clickSidebarToggle();
  await reportPanelPage.clickBizDevActiveLink();

  const isVisible = await bizDevActivePage.isproductnamechartVisible();

  expect(isVisible).toBeTruthy();

  console.log("Product Name chart is displayed:", isVisible);
});


// ✅ Loan Purpose Chart
test('Verify that the loan purpose chart displays correctly after clicking Biz Dev Active link', async () => {

  await reportPanelPage.clickSidebarToggle();
  await reportPanelPage.clickBizDevActiveLink();

  const isVisible = await bizDevActivePage.isloanpurposechartVisible();

  expect(isVisible).toBeTruthy();

  console.log("Loan Purpose chart is displayed:", isVisible);
});


// ✅ Loan Investor Chart
test('Verify that the loan investor chart displays correctly after clicking Biz Dev Active link', async () => {

  await reportPanelPage.clickSidebarToggle();
  await reportPanelPage.clickBizDevActiveLink();

  const isVisible = await bizDevActivePage.isloaninvestorchartVisible();

  expect(isVisible).toBeTruthy();

  console.log("Loan Investor chart is displayed:", isVisible);
});