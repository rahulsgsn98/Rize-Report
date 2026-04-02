import { test, expect } from '@playwright/test';
import { ReportPanelPage } from '@pages/reportpanelpage';
import { UploadBranchPandLPage } from '@pages/UploadExcelFilesPages/Uploadbranchpandlpage';
import { ReportDashboardPage } from '@pages/reportdashboardpage';
import { TestConfig } from '@config';
import { handleContinueLogin } from "@utils/sessionGuard";

let reportDashboardPage: ReportDashboardPage;
let config: TestConfig;
let reportPanelPage: ReportPanelPage;
let uploadBranchPandLPage: UploadBranchPandLPage;

test.beforeEach(async ({ page }) => {
  reportPanelPage = new ReportPanelPage(page);
  uploadBranchPandLPage = new UploadBranchPandLPage(page);
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


// ─── Mobile Details Button ────────────────────────────────────────────────────

test('Verify that the Details button is visible and clickable on Mobile', async ({ page, isMobile }) => {

  test.skip(!isMobile, 'Runs only on Mobile/Tablet');

  await reportPanelPage.clickSidebarToggle();
  await reportPanelPage.clickUploadBranchPandLLink();

  await uploadBranchPandLPage.waitForVerificationAndLoad();

  await uploadBranchPandLPage.selectDate('2026-02-28'); // replace with valid date

  const firstDetailsButton = uploadBranchPandLPage.mobileDetailsButtons.first();
  await expect(firstDetailsButton).toBeVisible({ timeout: 30000 });
  await expect(firstDetailsButton).toBeEnabled({ timeout: 30000 });

  console.log('✅ Details button is visible on Mobile');

  await uploadBranchPandLPage.clickFirstMobileDetailsButton();
});


// ─── Mobile Details Modal Opens ───────────────────────────────────────────────

test('Verify that clicking Details button opens Payment Details modal on Mobile', async ({ page, isMobile }) => {

  test.skip(!isMobile, 'Runs only on Mobile/Tablet');

  await reportPanelPage.clickSidebarToggle();
  await reportPanelPage.clickUploadBranchPandLLink();

  await uploadBranchPandLPage.waitForVerificationAndLoad();

  await uploadBranchPandLPage.selectDate('2026-02-28'); // replace with valid date

  await uploadBranchPandLPage.clickFirstMobileDetailsButton();

  const isModalVisible = await uploadBranchPandLPage.isMobileDetailsModalVisible();
  expect(isModalVisible).toBe(true);

  console.log('✅ Payment Details modal is visible after clicking Details button');
});


// ─── Mobile Details Modal Closes ──────────────────────────────────────────────

test('Verify that the Payment Details modal closes on Mobile', async ({ page, isMobile }) => {

  test.skip(!isMobile, 'Runs only on Mobile/Tablet');

  await reportPanelPage.clickSidebarToggle();
  await reportPanelPage.clickUploadBranchPandLLink();

  await uploadBranchPandLPage.waitForVerificationAndLoad();

  await uploadBranchPandLPage.selectDate('2026-02-28'); // replace with valid date

  await uploadBranchPandLPage.clickFirstMobileDetailsButton();

  const isModalVisible = await uploadBranchPandLPage.isMobileDetailsModalVisible();
  expect(isModalVisible).toBe(true);

  await uploadBranchPandLPage.closeMobileDetailsModal();

  await expect(uploadBranchPandLPage.mobileDetailsModal).toBeHidden({ timeout: 30000 });

  console.log('✅ Payment Details modal closed successfully');
});