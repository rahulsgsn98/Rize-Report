import { test, expect } from '@playwright/test';
import { ReportPanelPage } from '@pages/reportpanelpage';
import { ProcessorFundedPage } from '@pages/OperationsReportsPages/Processingpage';
import { TestConfig } from '@config';
import { handleContinueLogin } from "@utils/sessionGuard";

const config = new TestConfig();

// multiple test datasets
const processorSets = [
  ['Juan Alvarez'],
  ['Leslie Garcia', 'Juan Alvarez'],
];

processorSets.forEach((processorSet) => {

  test(`Search Processor Funded by Processor Name: ${processorSet.join(', ')}`, async ({ page }) => {

    test.slow();

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

    await processorFundedPage.processorNameSelection(processorSet);

    await processorFundedPage.clickSubmit();

    await processorFundedPage.verifyProcessorNameData(processorSet);

  });

});