import { test, expect } from '@playwright/test';
import { ReportPanelPage } from '@pages/reportpanelpage';
import { WarehouseTrackingPage } from '@pages/SecondaryOperationsPages/WarehouseTrackingpage';
import { ReportDashboardPage } from '@pages/reportdashboardpage';
import { TestConfig } from '@config';
import { handleContinueLogin } from "@utils/sessionGuard";

let reportDashboardPage: ReportDashboardPage;
let config: TestConfig;
let reportPanelPage: ReportPanelPage;
let warehouseTrackingPage: WarehouseTrackingPage;

test.beforeEach(async ({ page }) => {
  reportPanelPage = new ReportPanelPage(page);
  warehouseTrackingPage = new WarehouseTrackingPage(page);
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


// ─── Show Dates ───────────────────────────────────────────────────────────────

test('Verify that the Show Dates button is visible and clickable', async ({ page }) => {

  await reportPanelPage.clickSidebarToggle();
  await reportPanelPage.clickWarehouseTrackingLink();

  const showDatesButton = warehouseTrackingPage.showDatesButton;

  await expect(showDatesButton).toBeVisible({ timeout: 30000 });

  if (await showDatesButton.isVisible({ timeout: 30000 })) {
    console.log('Show Dates button is visible');
  }

  await expect(showDatesButton).toBeEnabled({ timeout: 30000 });
  await expect(showDatesButton).toHaveText(/Show Dates/i);

  await warehouseTrackingPage.clickShowDates();
});


// ─── Hide Dates ───────────────────────────────────────────────────────────────

test('Verify that Hide Dates button is visible after clicking Show Dates', async ({ page }) => {

  await reportPanelPage.clickSidebarToggle();
  await reportPanelPage.clickWarehouseTrackingLink();

  await expect(warehouseTrackingPage.showDatesButton).toBeVisible({ timeout: 30000 });
  await expect(warehouseTrackingPage.showDatesButton).toBeEnabled({ timeout: 30000 });

  await warehouseTrackingPage.clickShowDates();

  const hideDatesButton = warehouseTrackingPage.hideDatesButton;

  await expect(hideDatesButton).toBeVisible({ timeout: 30000 });

  if (await hideDatesButton.isVisible({ timeout: 30000 })) {
    console.log('Hide Dates button is visible');
  }

  await expect(hideDatesButton).toBeEnabled({ timeout: 30000 });
  await expect(hideDatesButton).toHaveText(/Hide Dates/i);

  await warehouseTrackingPage.clickHideDates();

  await expect(warehouseTrackingPage.showDatesButton).toBeVisible({ timeout: 30000 });

  console.log('Show Dates button is visible again after hiding');
});