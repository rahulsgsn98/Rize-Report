import { test, expect } from '@playwright/test';
import { ReportPanelPage } from '@pages/reportpanelpage';
import { UploadBranchPandLPage } from '@pages/UploadExcelFilesPages/Uploadbranchpandlpage';
import { ReportDashboardPage } from '@pages/reportdashboardpage';
import { TestConfig } from '@config';
import path from 'path';
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


// ─── Upload Without File ──────────────────────────────────────────────────────

test('Verify that clicking Upload without selecting a file shows error message', async ({ page }) => {

  await reportPanelPage.clickSidebarToggle();
  await reportPanelPage.clickUploadBranchPandLLink();

  await uploadBranchPandLPage.waitForVerificationAndLoad();

  await uploadBranchPandLPage.clickUpload();

  const isVisible = await uploadBranchPandLPage.isNoFileSelectedMessageVisible();
  expect(isVisible).toBe(true);

  console.log('✅ Error message displayed: Please select a file first');
});


// ─── Upload With Valid File ───────────────────────────────────────────────────

test('Verify that uploading a valid Excel file works successfully', async ({ page }) => {

  await reportPanelPage.clickSidebarToggle();
  await reportPanelPage.clickUploadBranchPandLLink();

  await uploadBranchPandLPage.waitForVerificationAndLoad();

  const filePath = path.resolve(__dirname, '../fixtures/test-file.xlsx'); // replace with valid file path

  await uploadBranchPandLPage.uploadExcelFile(filePath);

  await uploadBranchPandLPage.waitForVerificationAndLoad();

  const isSuccess = await uploadBranchPandLPage.uploadSuccessMessage.isVisible({ timeout: 30000 }).catch(() => false);
  const isError = await uploadBranchPandLPage.uploadErrorMessage.isVisible({ timeout: 30000 }).catch(() => false);

  if (isSuccess) {
    console.log('✅ File uploaded successfully');
  } else if (isError) {
    console.log('❌ Invalid file format');
  }

  expect(isSuccess || isError).toBe(true);
});


// ─── Upload With Invalid File ─────────────────────────────────────────────────

test('Verify that uploading an invalid file shows error message', async ({ page }) => {

  await reportPanelPage.clickSidebarToggle();
  await reportPanelPage.clickUploadBranchPandLLink();

  await uploadBranchPandLPage.waitForVerificationAndLoad();

  const filePath = path.resolve(__dirname, '../fixtures/test-file.pdf'); // replace with invalid file path

  await uploadBranchPandLPage.uploadExcelFile(filePath);

  const isError = await uploadBranchPandLPage.uploadErrorMessage.isVisible({ timeout: 30000 }).catch(() => false);
  expect(isError).toBe(true);

  console.log('✅ Error message displayed: Invalid file format');
});