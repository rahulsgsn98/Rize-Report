import { test, expect } from '@playwright/test';
import { ReportPanelPage } from '@pages/reportpanelpage';
import { MortgageInsurancePage } from '@pages/ComplianceReportsPages/Mortgageinsurancepage';
import { TestConfig } from '@config';
import { handleContinueLogin } from "@utils/sessionGuard";

let reportPanelPage: ReportPanelPage;
let mortgageInsurancePage: MortgageInsurancePage;
let config: TestConfig;

test.beforeEach(async ({ page }) => {
  reportPanelPage = new ReportPanelPage(page);
  mortgageInsurancePage = new MortgageInsurancePage(page);
  config = new TestConfig();

  await page.goto(config.appUrl, {
    waitUntil: 'domcontentloaded',
    timeout: 60_000
  });
  await handleContinueLogin(page);

  const appRoot = page.locator('#app');
  await appRoot.waitFor({ state: 'visible', timeout: 30000 });

  await reportPanelPage.clickSidebarToggle();
  await reportPanelPage.clickMortgageInsuranceLink();
});




// ─── Table ────────────────────────────────────────────────────────────────────

test('Verify that Mortgage Insurance table is displayed', async ({ page }) => {
  const isVisible = await mortgageInsurancePage.isComplianceReportTableVisible();
  expect(isVisible).toBe(true);
  console.log('✅ Mortgage Insurance table is visible');
});