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


// ─── Pagination Visible ───────────────────────────────────────────────────────

test('Verify that pagination is visible on Payment Details table', async ({ page }) => {
  test.slow();

  await reportPanelPage.clickSidebarToggle();
  await reportPanelPage.clickUploadBranchPandLLink();

  await uploadBranchPandLPage.waitForVerificationAndLoad();

  await uploadBranchPandLPage.selectDate('2026-02-28'); // replace with valid date

  await expect(uploadBranchPandLPage.paginationContainer).toBeVisible({ timeout: 30000 });
  await expect(uploadBranchPandLPage.paginationPrevButton).toBeVisible({ timeout: 30000 });
  await expect(uploadBranchPandLPage.paginationNextButton).toBeVisible({ timeout: 30000 });
  await expect(uploadBranchPandLPage.paginationInfo).toBeVisible({ timeout: 30000 });

  // Verify data is displayed on initial load
  const isTableVisible = await uploadBranchPandLPage.isPaymentDetailsTableVisible();
  expect(isTableVisible).toBe(true);

  const rowCount = await uploadBranchPandLPage.entryNoCells.count();
  expect(rowCount).toBeGreaterThan(0);

  console.log(`✅ Pagination is visible — ${rowCount} rows displayed on page 1`);
});


// ─── Previous Button Disabled on Page 1 ──────────────────────────────────────

test('Verify that Previous button is disabled on first page', async ({ page }) => {
  test.slow();

  await reportPanelPage.clickSidebarToggle();
  await reportPanelPage.clickUploadBranchPandLLink();

  await uploadBranchPandLPage.waitForVerificationAndLoad();

  await uploadBranchPandLPage.selectDate('2026-02-28'); // replace with valid date

  await expect(uploadBranchPandLPage.paginationPrevButton).toBeDisabled({ timeout: 30000 });

  // Verify data is displayed on page 1
  const rowCount = await uploadBranchPandLPage.entryNoCells.count();
  expect(rowCount).toBeGreaterThan(0);

  console.log(`✅ Previous button is disabled on page 1 — ${rowCount} rows displayed`);
});


// ─── Click Next Page ──────────────────────────────────────────────────────────

test('Verify that clicking Next page loads data correctly', async ({ page }) => {
  test.slow();

  await reportPanelPage.clickSidebarToggle();
  await reportPanelPage.clickUploadBranchPandLLink();

  await uploadBranchPandLPage.waitForVerificationAndLoad();

  await uploadBranchPandLPage.selectDate('2026-02-28'); // replace with valid date

  // Verify data on page 1 first
  const rowCountPage1 = await uploadBranchPandLPage.entryNoCells.count();
  expect(rowCountPage1).toBeGreaterThan(0);
  console.log(`✅ Page 1 — ${rowCountPage1} rows displayed`);

  // Click Next
  await uploadBranchPandLPage.clickNextPage();

  // Verify active page is 2
  const activeButton = uploadBranchPandLPage.paginationActiveButton;
  await expect(activeButton).toHaveText('2', { timeout: 30000 });

  // Verify data is displayed on page 2
  const isTableVisible = await uploadBranchPandLPage.isPaymentDetailsTableVisible();
  expect(isTableVisible).toBe(true);

  const rowCountPage2 = await uploadBranchPandLPage.entryNoCells.count();
  expect(rowCountPage2).toBeGreaterThan(0);

  console.log(`✅ Page 2 — ${rowCountPage2} rows displayed after clicking Next`);
});


// ─── Click Previous Page ──────────────────────────────────────────────────────

test('Verify that clicking Previous page loads data correctly', async ({ page }) => {
  test.slow();

  await reportPanelPage.clickSidebarToggle();
  await reportPanelPage.clickUploadBranchPandLLink();

  await uploadBranchPandLPage.waitForVerificationAndLoad();

  await uploadBranchPandLPage.selectDate('2026-02-28'); // replace with valid date

  // Go to page 2 first
  await uploadBranchPandLPage.clickNextPage();

  const activeButtonPage2 = uploadBranchPandLPage.paginationActiveButton;
  await expect(activeButtonPage2).toHaveText('2', { timeout: 30000 });

  const rowCountPage2 = await uploadBranchPandLPage.entryNoCells.count();
  expect(rowCountPage2).toBeGreaterThan(0);
  console.log(`✅ Page 2 — ${rowCountPage2} rows displayed`);

  // Go back to page 1
  await uploadBranchPandLPage.clickPrevPage();

  const activeButtonPage1 = uploadBranchPandLPage.paginationActiveButton;
  await expect(activeButtonPage1).toHaveText('1', { timeout: 30000 });

  // Verify data is displayed on page 1
  const isTableVisible = await uploadBranchPandLPage.isPaymentDetailsTableVisible();
  expect(isTableVisible).toBe(true);

  const rowCountPage1 = await uploadBranchPandLPage.entryNoCells.count();
  expect(rowCountPage1).toBeGreaterThan(0);

  console.log(`✅ Page 1 — ${rowCountPage1} rows displayed after clicking Previous`);
});


// ─── Click Specific Page Number ───────────────────────────────────────────────

test('Verify that clicking a specific page number loads data correctly', async ({ page }) => {
  test.slow();

  await reportPanelPage.clickSidebarToggle();
  await reportPanelPage.clickUploadBranchPandLLink();

  await uploadBranchPandLPage.waitForVerificationAndLoad();

  await uploadBranchPandLPage.selectDate('2026-02-28'); // replace with valid date

  // Click page 5
  await uploadBranchPandLPage.clickPageNumber(5);

  // Verify active page is 5
  const activeButton = uploadBranchPandLPage.paginationActiveButton;
  await expect(activeButton).toHaveText('5', { timeout: 30000 });

  // Verify data is displayed on page 5
  const isTableVisible = await uploadBranchPandLPage.isPaymentDetailsTableVisible();
  expect(isTableVisible).toBe(true);

  const rowCount = await uploadBranchPandLPage.entryNoCells.count();
  expect(rowCount).toBeGreaterThan(0);

  console.log(`✅ Page 5 — ${rowCount} rows displayed after clicking page number`);
});


// ─── Click Page 10 — Triggers Verification Loader ────────────────────────────

test('Verify that clicking page 10 handles verification loading and loads next set', async ({ page }) => {
  test.slow();

  await reportPanelPage.clickSidebarToggle();
  await reportPanelPage.clickUploadBranchPandLLink();

  await uploadBranchPandLPage.waitForVerificationAndLoad();

  await uploadBranchPandLPage.selectDate('2026-02-28'); // replace with valid date

  // Click page 10 — may trigger verification loader
  await uploadBranchPandLPage.clickPageNumber(10);

  // Verify active page is 10
  const activeButton = uploadBranchPandLPage.paginationActiveButton;
  await expect(activeButton).toHaveText('10', { timeout: 30000 });

  // Verify data is displayed after verification loader
  const isTableVisible = await uploadBranchPandLPage.isPaymentDetailsTableVisible();
  expect(isTableVisible).toBe(true);

  const rowCount = await uploadBranchPandLPage.entryNoCells.count();
  expect(rowCount).toBeGreaterThan(0);

  console.log(`✅ Page 10 — ${rowCount} rows displayed after verification loader handled`);
});