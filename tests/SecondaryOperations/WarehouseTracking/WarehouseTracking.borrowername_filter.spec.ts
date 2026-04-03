import { test } from '@playwright/test';
import { ReportPanelPage } from '@pages/reportpanelpage';
import { WarehouseTrackingPage } from '@pages/SecondaryOperationsPages/WarehouseTrackingpage';
import { TestConfig } from '@config';
import { handleContinueLogin } from "@utils/sessionGuard";

const config = new TestConfig();

const borrowerNameSets = [
  ['Adam Wendt'],
  ['Andrew Rath', 'Adam Wendt'],
];

borrowerNameSets.forEach((borrowerNameSet) => {

  test(`Search Warehouse Tracking by borrower name: ${borrowerNameSet.join(', ')}`, async ({ page }) => {
    test.slow();

    const warehouseTrackingPage = new WarehouseTrackingPage(page);
    const reportPanelPage = new ReportPanelPage(page);

    await page.goto(config.appUrl, {
      waitUntil: 'domcontentloaded',
      timeout: 60_000
    });
    await handleContinueLogin(page);

    const appRoot = page.locator('#app');
    await appRoot.waitFor({ state: 'visible', timeout: 30000 });

    await reportPanelPage.clickSidebarToggle();
    await reportPanelPage.clickWarehouseTrackingLink();

    await warehouseTrackingPage.borrowerNameSelection(borrowerNameSet);

    await warehouseTrackingPage.clickSubmit();

    await warehouseTrackingPage.verifyBorrowerNameData(borrowerNameSet);
  });

});