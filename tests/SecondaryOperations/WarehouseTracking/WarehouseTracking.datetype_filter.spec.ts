import { test, expect } from '@playwright/test';
import { ReportPanelPage } from '@pages/reportpanelpage';
import { WarehouseTrackingPage } from '@pages/SecondaryOperationsPages/WarehouseTrackingpage';
import { TestConfig } from '@config';
import { handleContinueLogin } from "@utils/sessionGuard";

const config = new TestConfig();

const dateTypeWithRangeSets = [
  {
    dateTypes: ['Date Funded (E)'],
    startDate: '2026-01-01',
    endDate: '2026-03-20',
  },
  {
    dateTypes: ['Date Funded (E)', 'Commitment Date (P)'],
    startDate: '2026-03-01',
    endDate: '2026-03-20',
  },
];

dateTypeWithRangeSets.forEach(({ dateTypes, startDate, endDate }) => {

  test(`Search Warehouse Tracking by date type: ${dateTypes.join(', ')} with range: ${startDate} - ${endDate}`, async ({ page }) => {
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

    await warehouseTrackingPage.selectDateTypeSelection(dateTypes);

    await warehouseTrackingPage.selectDateRange(startDate, endDate);

    await warehouseTrackingPage.clickSubmit();

    const result = await warehouseTrackingPage.waitForTableOrNoRecord();

    if (result === 'noRecord') {
      const isNoRecord = await warehouseTrackingPage.isNoRecordFoundMessageVisible();
      expect(isNoRecord).toBeTruthy();
      console.log('⚠️ No record found for date range:', startDate, '-', endDate);
    } else {
      const isVisible = await warehouseTrackingPage.isSecondaryTableVisible();
      expect(isVisible).toBeTruthy();
      console.log('✅ Secondary Table is visible with data for date range:', startDate, '-', endDate);
    }
  });

});