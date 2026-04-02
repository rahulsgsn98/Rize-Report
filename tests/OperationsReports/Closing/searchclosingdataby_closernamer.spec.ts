import { test, expect } from '@playwright/test';
import { ReportPanelPage } from '@pages/reportpanelpage';
import { ClosingPage } from '@pages/OperationsReportsPages/Closingpage';
import { TestConfig } from '@config';
import { handleContinueLogin } from "@utils/sessionGuard";

const config = new TestConfig();

// multiple test datasets
const closerNameSets = [
  ['Rebeca Smidley'],
 // ['Marsha Dyson', 'Jenny Coronell'],
];

closerNameSets.forEach((closerSet) => {

  test(`Search Closing by closer name: ${closerSet.join(', ')}`, async ({ page }) => {
    test.slow();

    const closingPage = new ClosingPage(page);
    const reportPanelPage = new ReportPanelPage(page);

    await page.goto(config.appUrl, {
      waitUntil: 'domcontentloaded',
      timeout: 60_000
    });
    await handleContinueLogin(page);

    const appRoot = page.locator('#app');

    await appRoot.waitFor({ state: 'visible', timeout: 30000 });

    await reportPanelPage.clickSidebarToggle();
    await reportPanelPage.clickClosingLink();

    await closingPage.closerNameSelection(closerSet);

    await closingPage.clickSubmit();

    await closingPage.verifyCloserNameData(closerSet);

  });

});