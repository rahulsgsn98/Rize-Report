import { test, expect } from '@playwright/test';
import { ReportPanelPage } from '@pages/reportpanelpage';
import { ProcessorFundedPage } from '@pages/OperationsReportsPages/Processingpage';
import { TestConfig } from '@config';
import { handleContinueLogin } from "@utils/sessionGuard";

const targetYear: any = 2025;

test(`Search Processor Funded by year: ${targetYear}`, async ({ page }) => {

  test.slow();

  const config = new TestConfig();
  const processorFundedPage = new ProcessorFundedPage(page);
  const reportPanelPage = new ReportPanelPage(page);

  await page.goto(config.appUrl, {
    waitUntil: 'domcontentloaded',
    timeout: 60000
  });
  await handleContinueLogin(page);

  const appRoot = page.locator('#app');

  await appRoot.waitFor({ state: 'visible', timeout: 30000 });

  await reportPanelPage.clickSidebarToggle();
  await reportPanelPage.clickProcessorFundedLink();

  await processorFundedPage.selectYear(targetYear);

  await processorFundedPage.verifyYearData(targetYear);

});