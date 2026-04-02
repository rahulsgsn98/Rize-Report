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


// ─── Select Specific Date ─────────────────────────────────────────────────────

test('Verify that selecting a date loads data in Payment Details table', async ({ page }) => {
  test.slow();

  await reportPanelPage.clickSidebarToggle();
  await reportPanelPage.clickUploadBranchPandLLink();

  await uploadBranchPandLPage.waitForVerificationAndLoad();

  await uploadBranchPandLPage.selectDate('2026-02-28'); // replace with valid date

  await uploadBranchPandLPage.verifyTableDataDisplayedAfterDateSelection();
});


// ─── Select Today ─────────────────────────────────────────────────────────────

test('Verify that clicking Today button loads data in Payment Details table', async ({ page }) => {
  test.slow();

  await reportPanelPage.clickSidebarToggle();
  await reportPanelPage.clickUploadBranchPandLLink();

  await uploadBranchPandLPage.waitForVerificationAndLoad();

  await uploadBranchPandLPage.clickTodayButton();

  await uploadBranchPandLPage.verifyTableDataDisplayedAfterDateSelection();
});


// ─── Select Date With No Records ──────────────────────────────────────────────

test('Verify that selecting a date with no data shows No records found message', async ({ page }) => {
  test.slow();

  await reportPanelPage.clickSidebarToggle();
  await reportPanelPage.clickUploadBranchPandLLink();

  await uploadBranchPandLPage.waitForVerificationAndLoad();

  await uploadBranchPandLPage.selectDate('2020-01-01'); // replace with date that has no data

  const isNoRecord = await uploadBranchPandLPage.isNoRecordsFoundMessageVisible();
  expect(isNoRecord).toBe(true);

  console.log('✅ No records found message displayed for selected date');
});