import { test, expect } from '@playwright/test';
import { ReportPanelPage } from '@pages/reportpanelpage';
import { GovtInsuringPage } from '@pages/ComplianceReportsPages/GovtInsuringpage';
import { ReportDashboardPage } from '@pages/reportdashboardpage';
import { TestConfig } from '@config';
import { handleContinueLogin } from "@utils/sessionGuard";

let reportDashboardPage: ReportDashboardPage;
let config: TestConfig;
let reportPanelPage: ReportPanelPage;
let govtInsuringPage: GovtInsuringPage;

test.beforeEach(async ({ page }) => {
  reportPanelPage = new ReportPanelPage(page);
  govtInsuringPage = new GovtInsuringPage(page);
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


// ─── View Archived & Paid Button ─────────────────────────────────────────────

test('Verify that the View Archived & Paid button is visible and clickable', async ({ page }) => {

  await reportPanelPage.clickSidebarToggle();
  await reportPanelPage.clickGovtInsuringLink();

  const viewButton = govtInsuringPage.viewArchivedAndPaidButton;

  await expect(viewButton).toBeVisible({ timeout: 30000 });

  if (await viewButton.isVisible({ timeout: 30000 })) {
    console.log('View Archived & Paid button is visible');
  }

  await expect(viewButton).toBeEnabled({ timeout: 30000 });
  await expect(viewButton).toHaveText(/View Archived & Paid/i);

  await govtInsuringPage.clickViewArchivedAndPaid();

  console.log('✅ View Archived & Paid button clicked');
});


// ─── Hide Archived & Paid Button ─────────────────────────────────────────────

test('Verify that the Hide Archived & Paid button is visible and clickable after expanding', async ({ page }) => {

  await reportPanelPage.clickSidebarToggle();
  await reportPanelPage.clickGovtInsuringLink();

  await expect(govtInsuringPage.viewArchivedAndPaidButton).toBeVisible({ timeout: 30000 });
  await expect(govtInsuringPage.viewArchivedAndPaidButton).toBeEnabled({ timeout: 30000 });

  await govtInsuringPage.clickViewArchivedAndPaid();

  const hideButton = govtInsuringPage.hideArchivedAndPaidButton;

  await expect(hideButton).toBeVisible({ timeout: 30000 });

  if (await hideButton.isVisible()) {
    console.log('Hide Archived & Paid button is visible');
  }

  await expect(hideButton).toBeEnabled({ timeout: 30000 });
  await expect(hideButton).toHaveText(/Hide Archived & Paid/i);

  await govtInsuringPage.clickHideArchivedAndPaid();

  await expect(hideButton).toBeHidden({ timeout: 30000 });

  console.log('Hide Archived & Paid button is not visible after hiding');
});