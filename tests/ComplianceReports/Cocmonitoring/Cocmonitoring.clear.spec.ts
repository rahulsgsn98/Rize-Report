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
    waitUntil: 'domcontentloaded',
    timeout: 60_000
  });
  await handleContinueLogin(page);

  const appRoot = page.locator('#app');

  await appRoot.waitFor({ state: 'visible', timeout: 30000 });
});

// ─── Loan Officer ─────────────────────────────────────────────────────────────

test('Verify that the Clear button resets Loan Officer filter and results', async ({ page }) => {

  await reportPanelPage.clickSidebarToggle();
  await reportPanelPage.clickCocMonitoringLink();

  await cocMonitoringPage.loanOfficerSelection(['Mauricio Bedoya']); // replace with valid data

  await cocMonitoringPage.clickSubmit();

  await cocMonitoringPage.clickClear();
});

// ─── COC Reason ───────────────────────────────────────────────────────────────

test('Verify that the Clear button resets COC Reason filter and results', async ({ page }) => {

  await reportPanelPage.clickSidebarToggle();
  await reportPanelPage.clickCocMonitoringLink();

  await cocMonitoringPage.cocReasonSelection(['APR Change']); // replace with valid data

  await cocMonitoringPage.clickSubmit();

  await cocMonitoringPage.clickClear();
});

// ─── Loan Status ──────────────────────────────────────────────────────────────

test('Verify that the Clear button resets Loan Status filter and results', async ({ page }) => {

  await reportPanelPage.clickSidebarToggle();
  await reportPanelPage.clickCocMonitoringLink();

  await cocMonitoringPage.loanStatusSelection(['Post Closing Complete']); // replace with valid data

  await cocMonitoringPage.clickSubmit();

  await cocMonitoringPage.clickClear();
});

// ─── Compliance Status ────────────────────────────────────────────────────────

test('Verify that the Clear button resets Compliance Status filter and results', async ({ page }) => {

  await reportPanelPage.clickSidebarToggle();
  await reportPanelPage.clickCocMonitoringLink();

  await cocMonitoringPage.complianceStatusSelection(['CD Approved']); // replace with valid data

  await cocMonitoringPage.clickSubmit();

  await cocMonitoringPage.clickClear();
});

// ─── Lock Status ──────────────────────────────────────────────────────────────

test('Verify that the Clear button resets Lock Status filter and results', async ({ page }) => {

  await reportPanelPage.clickSidebarToggle();
  await reportPanelPage.clickCocMonitoringLink();

  await cocMonitoringPage.lockStatusSelection(['Lock Confirmed']); // replace with valid data

  await cocMonitoringPage.clickSubmit();

  await cocMonitoringPage.clickClear();
});

// ─── Last Disclosed Date ──────────────────────────────────────────────────────

test('Verify that the Clear button resets Last Disclosed Date filter and results', async ({ page }) => {

  await reportPanelPage.clickSidebarToggle();
  await reportPanelPage.clickCocMonitoringLink();

  await cocMonitoringPage.selectLastDisclosedDateRange('2026-01-01', '2026-01-31'); // replace with valid data

  await cocMonitoringPage.clickSubmit();

  await cocMonitoringPage.clickClear();
});