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


// ─── Clear Button - Loan Number Filter ───────────────────────────────────────

/* test('Verify that the Clear button resets Loan Number filter', async ({ page }) => {

  await reportPanelPage.clickSidebarToggle();
  await reportPanelPage.clickWarehouseTrackingLink();

  await warehouseTrackingPage.loanNumberSelection(['20241001002']); // replace with valid data

  await warehouseTrackingPage.clickSubmit();

  await warehouseTrackingPage.clickClear();
});
 */

// ─── Clear Button - Borrower Name Filter ─────────────────────────────────────
/* 
test('Verify that the Clear button resets Borrower Name filter', async ({ page }) => {

  await reportPanelPage.clickSidebarToggle();
  await reportPanelPage.clickWarehouseTrackingLink();

  await warehouseTrackingPage.borrowerNameSelection(['Alan Ronson']); // replace with valid data

  await warehouseTrackingPage.clickSubmit();

  await warehouseTrackingPage.clickClear();
});


// ─── Clear Button - Loan Purpose Filter ──────────────────────────────────────

test('Verify that the Clear button resets Loan Purpose filter', async ({ page }) => {

  await reportPanelPage.clickSidebarToggle();
  await reportPanelPage.clickWarehouseTrackingLink();

  await warehouseTrackingPage.loanPurposeSelection(['Purchase']); // replace with valid data

  await warehouseTrackingPage.clickSubmit();

  await warehouseTrackingPage.clickClear();
}); */


// ─── Clear Button - Loan Type Filter ─────────────────────────────────────────

test('Verify that the Clear button resets Loan Type filter', async ({ page }) => {

  await reportPanelPage.clickSidebarToggle();
  await reportPanelPage.clickWarehouseTrackingLink();

  await warehouseTrackingPage.loanTypeSelection(['Conventional']); // replace with valid data

  await warehouseTrackingPage.clickSubmit();

  await warehouseTrackingPage.clickClear();
});


// ─── Clear Button - Select Date Type + Date Range Filter ─────────────────────

/* test('Verify that the Clear button resets Select Date Type and Date Range filter', async ({ page }) => {

  await reportPanelPage.clickSidebarToggle();
  await reportPanelPage.clickWarehouseTrackingLink();

  await warehouseTrackingPage.selectDateTypeSelection(['Date Funded (E)']); // replace with valid data

  await warehouseTrackingPage.selectDateRange('2026-01-01', '2026-03-20'); // replace with valid data

  await warehouseTrackingPage.clickSubmit();

  await warehouseTrackingPage.clickClear();
}); */