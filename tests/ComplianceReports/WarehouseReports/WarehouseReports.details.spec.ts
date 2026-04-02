import { test, expect } from '@playwright/test';
import { ReportPanelPage } from '@pages/reportpanelpage';
import { WarehouseReportsPage } from '@pages/ComplianceReportsPages/WarehouseReportspage';
import { ReportDashboardPage } from '@pages/reportdashboardpage';
import { TestConfig } from '@config';
import { handleContinueLogin } from "@utils/sessionGuard";

let reportDashboardPage: ReportDashboardPage;
let config: TestConfig;
let reportPanelPage: ReportPanelPage;
let warehouseReportsPage: WarehouseReportsPage;

test.describe('Mobile Tests', () => {

    test.skip(({ isMobile }) => !isMobile, 'Runs only on Mobile/Tablet');
    
test.beforeEach(async ({ page }) => {
  reportPanelPage = new ReportPanelPage(page);
  warehouseReportsPage = new WarehouseReportsPage(page);
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


// ─── Mobile Details Button (Mobile & Tablet Only) ─────────────────────────────

test('Verify that the Details button is visible and clickable - Mobile & Tablet Only', async ({ page, isMobile }) => {

  test.skip(!isMobile, 'Runs only on Mobile/Tablet');

  await reportPanelPage.clickSidebarToggle();
  await reportPanelPage.clickWarehouseReportsLink();

  const detailsButton = warehouseReportsPage.mobileDetailsButtons.first();

  await expect(detailsButton).toBeVisible({ timeout: 30000 });

  if (await detailsButton.isVisible({ timeout: 30000 })) {
    console.log('Details button is visible');
  }

  await expect(detailsButton).toBeEnabled({ timeout: 30000 });
  await expect(detailsButton).toHaveText(/Details/i);

  await warehouseReportsPage.clickFirstMobileDetailsButton();
});


// ─── Mobile Details Modal (Mobile & Tablet Only) ──────────────────────────────

test('Verify that the Details modal opens and closes correctly - Mobile & Tablet Only', async ({ page, isMobile }) => {

  test.skip(!isMobile, 'Runs only on Mobile/Tablet');

  await reportPanelPage.clickSidebarToggle();
  await reportPanelPage.clickWarehouseReportsLink();

  await warehouseReportsPage.clickFirstMobileDetailsButton();

  const isModalVisible = await warehouseReportsPage.isMobileDetailsModalVisible();

  expect(isModalVisible).toBeTruthy();

  if (isModalVisible) {
    console.log('Details modal is visible');
  }

  // Verify modal title
  const modalTitle = warehouseReportsPage.page.locator('h4.popup-title');
  await expect(modalTitle).toBeVisible({ timeout: 30000 });
  await expect(modalTitle).toHaveText(/Details/i);

  // Verify close button is visible
  const closeButton = warehouseReportsPage.mobileDetailsModalCloseButton;
  await expect(closeButton).toBeVisible({ timeout: 30000 });
  await expect(closeButton).toBeEnabled({ timeout: 30000 });

  await warehouseReportsPage.closeMobileDetailsModal();

  await expect(warehouseReportsPage.mobileDetailsModal).toBeHidden({ timeout: 30000 });

  console.log('Details modal is closed successfully');
})
});