import { test } from '@playwright/test';
import { ReportPanelPage } from '@pages/reportpanelpage';
import { CocMonitoringPage } from '@pages/ComplianceReportsPages/Cocmonitoringpage';
import { TestConfig } from '@config';
import { handleContinueLogin } from "@utils/sessionGuard";

const config = new TestConfig();

const dateRangeSets = [
  { startDate: '2026-01-01', endDate: '2026-01-31' },
 // { startDate: '2026-01-01', endDate: '2026-03-31' },
];

dateRangeSets.forEach(({ startDate, endDate }) => {

  test(`Search COC Monitoring by Last Disclosed Date: ${startDate} to ${endDate}`, async ({ page }) => {
    test.slow();

    const cocMonitoringPage = new CocMonitoringPage(page);
    const reportPanelPage = new ReportPanelPage(page);

    await page.goto(config.appUrl, {
      waitUntil: 'domcontentloaded',
      timeout: 60_000
    });
    await handleContinueLogin(page);

    const appRoot = page.locator('#app');
    await appRoot.waitFor({ state: 'visible', timeout: 30000 });

    await reportPanelPage.clickSidebarToggle();
    await reportPanelPage.clickCocMonitoringLink();

    await cocMonitoringPage.selectLastDisclosedDateRange(startDate, endDate);

    await cocMonitoringPage.clickSubmit();

    await cocMonitoringPage.isComplianceReportTableVisible();

    console.log(`✅ Compliance Report table is visible for date range: ${startDate} to ${endDate}`);
  });

});