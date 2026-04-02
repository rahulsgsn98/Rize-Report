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


// ─── Expand Button ────────────────────────────────────────────────────────────

test('Verify that the Expand button is visible and clickable', async ({ page }) => {

  await reportPanelPage.clickSidebarToggle();
  await reportPanelPage.clickUploadBranchPandLLink();

  await uploadBranchPandLPage.waitForVerificationAndLoad();

  const expandButton = uploadBranchPandLPage.expandButton;
  await expect(expandButton).toBeVisible({ timeout: 30000 });
  if (await expandButton.isVisible()) {
    console.log('Expand button is visible');
  }
  await expect(expandButton).toBeEnabled({ timeout: 30000 });
  await expect(expandButton).toHaveText(/Expand/i);

  await uploadBranchPandLPage.clickExpand();
});


// ─── Collapse Button ──────────────────────────────────────────────────────────

test('Verify that the Collapse button is visible and clickable after expanding', async ({ page }) => {

  await reportPanelPage.clickSidebarToggle();
  await reportPanelPage.clickUploadBranchPandLLink();

  await uploadBranchPandLPage.waitForVerificationAndLoad();

  await expect(uploadBranchPandLPage.expandButton).toBeVisible({ timeout: 30000 });
  await expect(uploadBranchPandLPage.expandButton).toBeEnabled({ timeout: 30000 });

  await uploadBranchPandLPage.clickExpand();

  const collapseButton = uploadBranchPandLPage.collapseButton;
  await expect(collapseButton).toBeVisible({ timeout: 30000 });
  if (await collapseButton.isVisible()) {
    console.log('Collapse button is visible');
  }

  await expect(collapseButton).toBeEnabled({ timeout: 30000 });
  await expect(collapseButton).toHaveText(/Collapse/i);
  await expect(collapseButton).toBeVisible({ timeout: 30000 });

  await collapseButton.click({ force: true });

  await expect(collapseButton).toBeHidden({ timeout: 30000 });

  console.log('Collapse button is not visible after collapsing');
});