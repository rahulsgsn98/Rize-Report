import { test, expect } from '@playwright/test';
import { ReportPanelPage } from '@pages/reportpanelpage';
import { ProcessorFundedPage } from '@pages/OperationsReportsPages/Processingpage';
import { ReportDashboardPage } from '@pages/reportdashboardpage';
import { TestConfig } from '@config';
import { handleContinueLogin } from "@utils/sessionGuard";

let reportDashboardPage: ReportDashboardPage;
let config: TestConfig;
let reportPanelPage: ReportPanelPage;
let processorFundedPage: ProcessorFundedPage;

test.beforeEach(async ({ page }) => {

  reportPanelPage = new ReportPanelPage(page);
  processorFundedPage = new ProcessorFundedPage(page);
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


// Verify date time displays or not 

test('Verify date time displays or not correctly after click on the Processor Funded link', async ({ page }) => {

  await reportPanelPage.clickSidebarToggle();
  await reportPanelPage.clickProcessorFundedLink();

  await processorFundedPage.waitForRefreshDateTimeToBeVisible();

  const isRefreshDateTimeDisplayed = await processorFundedPage.isRefreshDateTimeDisplayed();

  expect(isRefreshDateTimeDisplayed).toBeTruthy();

  console.log("Refresh date time displays", isRefreshDateTimeDisplayed);

});