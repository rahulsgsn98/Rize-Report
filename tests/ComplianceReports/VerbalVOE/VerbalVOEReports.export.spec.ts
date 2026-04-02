import { test, expect } from '@playwright/test';
import { ReportPanelPage } from '@pages/reportpanelpage';
import { VerbalVOEPage } from '@pages/ComplianceReportsPages/VerbalVOEpage';
import { ReportDashboardPage } from '@pages/reportdashboardpage';
import { TestConfig } from '@config';
import { handleContinueLogin } from "@utils/sessionGuard";

let reportDashboardPage: ReportDashboardPage;
let config: TestConfig;
let reportPanelPage: ReportPanelPage;
let verbalVOEPage: VerbalVOEPage;

// ───────────────────────────── Desktop Tests ─────────────────────────────

test.describe('Warehouse Reports - Desktop', () => {

  test.skip(({ isMobile }) => isMobile, 'Runs only on Desktop');
  test.beforeEach(async ({ page }) => {
  reportPanelPage = new ReportPanelPage(page);
  verbalVOEPage = new VerbalVOEPage(page);
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



  test('Verify that the Export (Default) button downloads file on Desktop', async ({ page }) => {

    await reportPanelPage.clickSidebarToggle();
    await reportPanelPage.clickVerbalVOELink();

    const exportButton = verbalVOEPage.exportButtonDesktop;

    await expect(exportButton).toBeVisible({ timeout: 30000 });

    if (await exportButton.isVisible({ timeout: 30000 })) {
      console.log('Export button is visible on Desktop');
    }

    await expect(exportButton).toBeEnabled({ timeout: 30000 });
    await expect(exportButton).toHaveText(/Export/i);

    await verbalVOEPage.clickExport();

    const [download] = await Promise.all([
      page.waitForEvent('download'),
      verbalVOEPage.clickExportDefault(),
    ]);

    expect(download.suggestedFilename()).toBeTruthy();

    console.log('✅ File downloaded successfully (Default) on Desktop:', download.suggestedFilename());
  });


  test('Verify that the Export (Filtered) button downloads file on Desktop', async ({ page }) => {

    await reportPanelPage.clickSidebarToggle();
    await reportPanelPage.clickVerbalVOELink();

    const exportButton = verbalVOEPage.exportButtonDesktop;

    await expect(exportButton).toBeVisible({ timeout: 30000 });

    if (await exportButton.isVisible({ timeout: 30000 })) {
      console.log('Export button is visible on Desktop');
    }

    await expect(exportButton).toBeEnabled({ timeout: 30000 });
    await expect(exportButton).toHaveText(/Export/i);

    await verbalVOEPage.clickExport();

    const [download] = await Promise.all([
      page.waitForEvent('download'),
      verbalVOEPage.clickExportFiltered(),
    ]);

    expect(download.suggestedFilename()).toBeTruthy();

    console.log('✅ File downloaded successfully (Filtered) on Desktop:', download.suggestedFilename());
  });

});


// ───────────────────────────── Mobile Tests ─────────────────────────────

test.describe('Warehouse Reports - Mobile', () => {

  test.skip(({ isMobile }) => !isMobile, 'Runs only on Mobile/Tablet');
  test.beforeEach(async ({ page }) => {
  reportPanelPage = new ReportPanelPage(page);
  verbalVOEPage = new VerbalVOEPage(page);
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



  test('Verify that the Export (Default) button downloads file on Mobile', async ({ page }) => {

    await reportPanelPage.clickSidebarToggle();
    await reportPanelPage.clickVerbalVOELink();

    const exportButton = verbalVOEPage.exportButtonMobile;

    await expect(exportButton).toBeVisible({ timeout: 30000 });

    if (await exportButton.isVisible({ timeout: 30000 })) {
      console.log('Export button is visible on Mobile');
    }

    await expect(exportButton).toBeEnabled({ timeout: 30000 });

    await verbalVOEPage.clickExport();

    const [download] = await Promise.all([
      page.waitForEvent('download'),
      verbalVOEPage.clickExportDefault(),
    ]);

    expect(download.suggestedFilename()).toBeTruthy();

    console.log('✅ File downloaded successfully (Default) on Mobile:', download.suggestedFilename());
  });


  test('Verify that the Export (Filtered) button downloads file on Mobile', async ({ page }) => {

    await reportPanelPage.clickSidebarToggle();
    await reportPanelPage.clickVerbalVOELink();

    const exportButton = verbalVOEPage.exportButtonMobile;

    await expect(exportButton).toBeVisible({ timeout: 30000 });

    if (await exportButton.isVisible({ timeout: 30000 })) {
      console.log('Export button is visible on Mobile');
    }

    await expect(exportButton).toBeEnabled({ timeout: 30000 });

    await verbalVOEPage.clickExport();

    const [download] = await Promise.all([
      page.waitForEvent('download'),
      verbalVOEPage.clickExportFiltered(),
    ]);

    expect(download.suggestedFilename()).toBeTruthy();

    console.log('✅ File downloaded successfully (Filtered) on Mobile:', download.suggestedFilename());
  });

});