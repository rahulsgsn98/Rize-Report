import { test, expect } from '@playwright/test';
import { ReportPanelPage } from '@pages/reportpanelpage';
import { CocMonitoringPage } from '@pages/ComplianceReportsPages/Cocmonitoringpage';
import { ReportDashboardPage } from '@pages/reportdashboardpage';
import { TestConfig } from '@config';
import { handleContinueLogin } from "@utils/sessionGuard";

let reportDashboardPage: ReportDashboardPage;
let config: TestConfig;
let reportPanelPage: ReportPanelPage;
let cocMonitoringPage: CocMonitoringPage;

test.beforeEach(async ({ page }) => {

  reportPanelPage = new ReportPanelPage(page);
  cocMonitoringPage = new CocMonitoringPage(page);
  reportDashboardPage = new ReportDashboardPage(page);
  config = new TestConfig();

  await page.goto(config.appUrl, {
    waitUntil:'domcontentloaded',
    timeout: 60_000
  });
  await handleContinueLogin(page);

  const appRoot = page.locator('#app');
  await appRoot.waitFor({ state: 'visible', timeout: 30000 });
});


// ─── Expand Button ────────────────────────────────────────────────────────────

test('Verify that the Expand button is visible and clickable', async ({ page }) => {

  await reportPanelPage.clickSidebarToggle();
  await reportPanelPage.clickCocMonitoringLink();

  await cocMonitoringPage.waitForGridToLoad();

  const expandButton = cocMonitoringPage.compliancereportexpandButton;
  await expect(expandButton).toBeVisible();
  if (await expandButton.isVisible()) {
    console.log('Expand button is visible');
  }
  await expect(expandButton).toBeEnabled();
  await expect(expandButton).toHaveText(/Expand/i);

  await cocMonitoringPage.clickComplianceReportExpand();
});


// ─── Collapse Button ──────────────────────────────────────────────────────────

test('Verify that the Collapse button is visible and clickable after expanding', async ({ page }) => {

  await reportPanelPage.clickSidebarToggle();
  await reportPanelPage.clickCocMonitoringLink();

  await cocMonitoringPage.waitForGridToLoad();

  await expect(cocMonitoringPage.compliancereportexpandButton).toBeVisible();
  await expect(cocMonitoringPage.compliancereportexpandButton).toBeEnabled();

  await cocMonitoringPage.clickComplianceReportExpand();

  const collapseButton = cocMonitoringPage.compliancereportcollapseButton;
  await expect(collapseButton).toBeVisible();
  if (await collapseButton.isVisible()) {
    console.log('Collapse button is visible');
  }

  await expect(collapseButton).toBeEnabled();
  await expect(collapseButton).toHaveText(/Collapse/i);
  await expect(collapseButton).toBeVisible();

  await collapseButton.click({ force: true });

  await expect(collapseButton).toBeHidden();

  console.log('Collapse button is not visible after collapsing');
});