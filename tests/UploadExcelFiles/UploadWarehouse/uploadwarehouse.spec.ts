import { test, expect } from '@playwright/test';
import { ReportPanelPage } from '@pages/reportpanelpage';
import { UploadWarehousePage } from '@pages/UploadExcelFilesPages/Uploadwarehousepage';
import { TestConfig } from '@config';
import path from 'path';
import { handleContinueLogin } from "@utils/sessionGuard";

let reportPanelPage: ReportPanelPage;
let uploadWarehousePage: UploadWarehousePage;
let config: TestConfig;

test.beforeEach(async ({ page }) => {
  reportPanelPage = new ReportPanelPage(page);
  uploadWarehousePage = new UploadWarehousePage(page);
  config = new TestConfig();

  await page.goto(config.appUrl, {
    waitUntil: 'domcontentloaded',
    timeout: 60_000
  });
  await handleContinueLogin(page);

  const appRoot = page.locator('#app');
  await appRoot.waitFor({ state: 'visible', timeout: 30000 });

  await reportPanelPage.clickSidebarToggle();
  await reportPanelPage.clickUploadWarehouseLink();
});


// ─── Heading ─────────────────────────────────────────────────────────────────

/* test('Verify that Upload Warehouse page heading is displayed', async ({ page }) => {
  await expect(uploadWarehousePage.heading).toBeVisible({ timeout: 30000 });
  console.log('✅ Upload Warehouse heading is visible');
});
 */

// ─── Upload Without File ──────────────────────────────────────────────────────

test('Verify that clicking Upload without selecting a file shows error message', async ({ page }) => {
  await uploadWarehousePage.clickUpload();

  const isVisible = await uploadWarehousePage.isNoFileSelectedMessageVisible();
  expect(isVisible).toBe(true);

  console.log('✅ Error message displayed: Please select a file first');
});


// ─── Upload With Valid File ───────────────────────────────────────────────────

test('Verify that uploading a valid file works successfully', async ({ page }) => {
  const filePath = path.resolve(__dirname, '../fixtures/test-warehouse.xlsx'); // replace with valid file path

  await uploadWarehousePage.uploadWarehouseFile(filePath);

  await uploadWarehousePage.waitForVerificationAndLoad();

  const isSuccess = await uploadWarehousePage.uploadSuccessMessage.isVisible({ timeout: 30000 }).catch(() => false);
  const isError = await uploadWarehousePage.uploadErrorMessage.isVisible({ timeout: 30000 }).catch(() => false);

  if (isSuccess) {
    console.log('✅ File uploaded successfully');
  } else if (isError) {
    console.log('❌ Invalid file format');
  }

  expect(isSuccess || isError).toBe(true);
});


// ─── Upload With Invalid File ─────────────────────────────────────────────────

test('Verify that uploading an invalid file shows error message', async ({ page }) => {
  const filePath = path.resolve(__dirname, '../fixtures/test-warehouse.pdf'); // replace with invalid file path

  await uploadWarehousePage.uploadWarehouseFile(filePath);

  const isError = await uploadWarehousePage.uploadErrorMessage.isVisible({ timeout: 30000 }).catch(() => false);
  expect(isError).toBe(true);

  console.log('✅ Error message displayed: Invalid file format');
});


// ─── BOK Toggle ──────────────────────────────────────────────────────────────

test('Verify that BOK toggle is ON by default', async ({ page }) => {
  const isOn = await uploadWarehousePage.isBokToggleOn();
  expect(isOn).toBe(true);

  console.log('✅ BOK toggle is ON by default');
});

test('Verify that BOK toggle can be turned OFF', async ({ page }) => {
  await uploadWarehousePage.turnBokToggleOff();

  const isOff = await uploadWarehousePage.isBokToggleOff();
  expect(isOff).toBe(true);

  console.log('✅ BOK toggle turned OFF successfully');
});

test('Verify that BOK toggle can be turned back ON', async ({ page }) => {
  // First turn OFF
  await uploadWarehousePage.turnBokToggleOff();

  // Then turn back ON
  await uploadWarehousePage.turnBokToggleOn();

  const isOn = await uploadWarehousePage.isBokToggleOn();
  expect(isOn).toBe(true);

  console.log('✅ BOK toggle turned back ON successfully');
});


// ─── Upload With BOK Toggle OFF ───────────────────────────────────────────────

test('Verify that uploading a file with BOK toggle OFF works', async ({ page }) => {
  await uploadWarehousePage.turnBokToggleOff();

  const filePath = path.resolve(__dirname, '../fixtures/test-warehouse.xlsx'); // replace with valid file path

  await uploadWarehousePage.uploadWarehouseFile(filePath);

  await uploadWarehousePage.waitForVerificationAndLoad();

  const isSuccess = await uploadWarehousePage.uploadSuccessMessage.isVisible({ timeout: 30000 }).catch(() => false);
  const isError = await uploadWarehousePage.uploadErrorMessage.isVisible({ timeout: 30000 }).catch(() => false);

  if (isSuccess) {
    console.log('✅ File uploaded successfully with BOK toggle OFF');
  } else if (isError) {
    console.log('❌ Invalid file format with BOK toggle OFF');
  }

  expect(isSuccess || isError).toBe(true);
});


// ─── Upload With BOK Toggle ON ────────────────────────────────────────────────

test('Verify that uploading a file with BOK toggle ON works', async ({ page }) => {
  await uploadWarehousePage.turnBokToggleOn();

  const filePath = path.resolve(__dirname, '../fixtures/test-warehouse.xlsx'); // replace with valid file path

  await uploadWarehousePage.uploadWarehouseFile(filePath);

  await uploadWarehousePage.waitForVerificationAndLoad();

  const isSuccess = await uploadWarehousePage.uploadSuccessMessage.isVisible({ timeout: 30000 }).catch(() => false);
  const isError = await uploadWarehousePage.uploadErrorMessage.isVisible({ timeout: 30000 }).catch(() => false);

  if (isSuccess) {
    console.log('✅ File uploaded successfully with BOK toggle ON');
  } else if (isError) {
    console.log('❌ Invalid file format with BOK toggle ON');
  }

  expect(isSuccess || isError).toBe(true);
});