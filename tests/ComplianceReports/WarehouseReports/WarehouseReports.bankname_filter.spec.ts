import { test } from '@playwright/test';
import { ReportPanelPage } from '@pages/reportpanelpage';
import { WarehouseReportsPage } from '@pages/ComplianceReportsPages/WarehouseReportspage';
import { TestConfig } from '@config';
import { handleContinueLogin } from "@utils/sessionGuard";

const config = new TestConfig();

const bankNameSets = [
  ['BOK Financial'],
  ['BOK Financial', 'First Bank'],
];

bankNameSets.forEach((bankNameSet) => {

  test(`Search Warehouse Reports by bank name: ${bankNameSet.join(', ')}`, async ({ page }) => {
   // test.slow();

    const warehouseReportsPage = new WarehouseReportsPage(page);
    const reportPanelPage = new ReportPanelPage(page);

    await page.goto(config.appUrl, {
      waitUntil: 'domcontentloaded',
      timeout: 60_000
    });
    await handleContinueLogin(page);

    const appRoot = page.locator('#app');
    await appRoot.waitFor({ state: 'visible', timeout: 30000 });

    await reportPanelPage.clickSidebarToggle();
    await reportPanelPage.clickWarehouseReportsLink();

    await warehouseReportsPage.bankNameSelection(bankNameSet);

    await warehouseReportsPage.clickSubmit();

    await warehouseReportsPage.verifyComplianceReportBankNameData(bankNameSet);

    await warehouseReportsPage.verifyDetailsBankNameData(bankNameSet);
  });

});