import { test, expect } from '@playwright/test';
import { ReportPanelPage } from '@pages/reportpanelpage';
import { ShippingReportPage } from '@pages/ComplianceReportsPages/ShippingReportpage';
import { ReportDashboardPage } from '@pages/reportdashboardpage';
import { TestConfig } from '@config';
import { handleContinueLogin } from "@utils/sessionGuard";

let reportDashboardPage: ReportDashboardPage;
let config: TestConfig;
let reportPanelPage: ReportPanelPage;
let shippingReportPage: ShippingReportPage;

test.beforeEach(async ({ page }) => {
  reportPanelPage = new ReportPanelPage(page);
  shippingReportPage = new ShippingReportPage(page);
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


// ─── Shipping Report Expand / Collapse (Desktop + Mobile) ───────────────────

test('Verify that the Shipping Report Expand button is visible and clickable', async ({ page }) => {

  await reportPanelPage.clickSidebarToggle();
  await reportPanelPage.clickShippingLink();

  const expandButton = shippingReportPage.expandButton;

  await expect(expandButton).toBeVisible({ timeout: 30000 });

  if (await expandButton.isVisible({ timeout: 30000 })) {
    console.log('Shipping Report Expand button is visible');
  }

  await expect(expandButton).toBeEnabled({ timeout: 30000 });
  await expect(expandButton).toHaveText(/Expand/i);

  await shippingReportPage.clickExpand();
});


test('Verify that the Shipping Report Collapse button is visible and clickable after expanding', async ({ page }) => {

  await reportPanelPage.clickSidebarToggle();
  await reportPanelPage.clickShippingLink();

  await expect(shippingReportPage.expandButton).toBeVisible({ timeout: 30000 });
  await expect(shippingReportPage.expandButton).toBeEnabled({ timeout: 30000 });

  await shippingReportPage.clickExpand();

  const collapseButton = shippingReportPage.collapseButton;

  await expect(collapseButton).toBeVisible({ timeout: 30000 });

  if (await collapseButton.isVisible()) {
    console.log('Shipping Report Collapse button is visible');
  }

  await expect(collapseButton).toBeEnabled({ timeout: 30000 });
  await expect(collapseButton).toHaveText(/Collapse/i);

  await collapseButton.click({ timeout: 30000 });

  await expect(collapseButton).toBeHidden({ timeout: 30000 });

  console.log('Shipping Report Collapse button is not visible after collapsing');
});