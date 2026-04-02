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


// ─── Visibility of tables  ──────────────────────────────────────────────────

test('Verify Visibility of tables', async ({ page, isMobile }) => {

 // test.skip(isMobile, 'Runs only on Desktop');

  await reportPanelPage.clickSidebarToggle();
  await reportPanelPage.clickCocMonitoringLink();

     const isVisible = await cocMonitoringPage.isComplianceReportTableVisible()

     expect(isVisible).toBeTruthy()

       console.log('Compliance Report table displays', isVisible);


});


