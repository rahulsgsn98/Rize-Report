import { test } from '@playwright/test';
import { ReportPanelPage } from '@pages/reportpanelpage';
import { WarehouseTrackingPage } from '@pages/SecondaryOperationsPages/WarehouseTrackingpage';
import { TestConfig } from '@config';
import { handleContinueLogin } from "@utils/sessionGuard";

const config = new TestConfig();

const loanTypeSets = [
  ['Conventional'],
  ['VA', 'FHA'],
];

loanTypeSets.forEach((loanTypeSet) => {

  test(`Search Warehouse Tracking by loan type: ${loanTypeSet.join(', ')}`, async ({ page }) => {
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

    await warehouseTrackingPage.loanTypeSelection(loanTypeSet);

    await warehouseTrackingPage.clickSubmit();

    await warehouseTrackingPage.verifyLoanTypeData(loanTypeSet);
  });

});