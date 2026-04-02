import { test, expect } from '@playwright/test';
import { ReportPanelPage } from '@pages/reportpanelpage';
import { PostClosingManagerPage } from '@pages/OperationsReportsPages/PostClosingManagerpage';
import { ReportDashboardPage } from '@pages/reportdashboardpage';
import { TestConfig } from '@config';
import { handleContinueLogin } from "@utils/sessionGuard";

let reportDashboardPage: ReportDashboardPage;
let config: TestConfig;
let reportPanelPage: ReportPanelPage;
let postClosingManagerPage: PostClosingManagerPage;

test.beforeEach(async ({ page }) => {
  reportPanelPage = new ReportPanelPage(page);
  postClosingManagerPage = new PostClosingManagerPage(page);
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


// ─── Export Button - Desktop ──────────────────────────────────────────────────

test('Verify that the Export button is visible and clickable on Desktop', async ({ page, isMobile }) => {

  test.skip(isMobile, 'Runs only on Desktop');

  await reportPanelPage.clickSidebarToggle();
  await reportPanelPage.clickPostClosingManagerLink();

  const exportButton = postClosingManagerPage.exportButtonDesktop;

  await expect(exportButton).toBeVisible({ timeout: 30000 });

  if (await exportButton.isVisible({ timeout: 30000 })) {
    console.log('Export button is visible on Desktop');
  }

  await expect(exportButton).toBeEnabled({ timeout: 30000 });
  await expect(exportButton).toHaveText(/Export/i);

  const [download] = await Promise.all([
    page.waitForEvent('download'),
    postClosingManagerPage.clickExport(),
  ]);

  expect(download.suggestedFilename()).toBeTruthy();

  console.log('✅ File downloaded successfully on Desktop:', download.suggestedFilename());
});


// ─── Export Button - Mobile ───────────────────────────────────────────────────

test('Verify that the Export button is visible and clickable on Mobile', async ({ page, isMobile }) => {

  test.skip(!isMobile, 'Runs only on Mobile/Tablet');

  await reportPanelPage.clickSidebarToggle();
  await reportPanelPage.clickPostClosingManagerLink();

  const exportButton = postClosingManagerPage.exportButtonMobile;

  await expect(exportButton).toBeVisible({ timeout: 30000 });

  if (await exportButton.isVisible({ timeout: 30000 })) {
    console.log('Export button is visible on Mobile');
  }

  await expect(exportButton).toBeEnabled({ timeout: 30000 });

  const [download] = await Promise.all([
    page.waitForEvent('download'),
    postClosingManagerPage.clickExport(),
  ]);

  expect(download.suggestedFilename()).toBeTruthy();

  console.log('✅ File downloaded successfully on Mobile:', download.suggestedFilename());
});