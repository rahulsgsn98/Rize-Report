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


// ─── Clear Button - Bank Name Filter ─────────────────────────────────────────

test('Verify that the Clear button resets Bank Name filter', async ({ page }) => {

  await reportPanelPage.clickSidebarToggle();
  await reportPanelPage.clickVerbalVOELink();

  await verbalVOEPage.branchNameSelection(['Coral Gables, FL | HPP Financial/S10801B108R00D11']); // replace with valid data

  await verbalVOEPage.clickSubmit();

  await verbalVOEPage.clickClear();
});