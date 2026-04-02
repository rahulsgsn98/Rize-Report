import { test } from '@playwright/test';
import { ReportPanelPage } from '@pages/reportpanelpage';
import { WarehouseTrackingPage } from '@pages/SecondaryOperationsPages/WarehouseTrackingpage';
import { TestConfig } from '@config';
import { handleContinueLogin } from "@utils/sessionGuard";

const config = new TestConfig();

const loanPurposeSets = [
  ['Purchase'],
  ['Purchase', 'Refinance'],
];

loanPurposeSets.forEach((loanPurposeSet) => {

  test(`Search Warehouse Tracking by loan purpose: ${loanPurposeSet.join(', ')}`, async ({ page }) => {
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

    await warehouseTrackingPage.loanPurposeSelection(loanPurposeSet);

    await warehouseTrackingPage.clickSubmit();

    await warehouseTrackingPage.verifyLoanPurposeData(loanPurposeSet);
  });

});