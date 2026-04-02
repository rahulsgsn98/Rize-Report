import { test } from '@playwright/test';
import { ReportPanelPage } from '@pages/reportpanelpage';
import { CocMonitoringPage } from '@pages/ComplianceReportsPages/Cocmonitoringpage';
import { TestConfig } from '@config';
import { handleContinueLogin } from "@utils/sessionGuard";

const config = new TestConfig();

const complianceStatusSets = [
  ['CD Disclosed'],
  ['Disclosed', 'CD Approved'],
];

complianceStatusSets.forEach((complianceStatusSet) => {

  test(`Search COC Monitoring by Compliance Status: ${complianceStatusSet.join(', ')}`, async ({ page }) => {
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

    await cocMonitoringPage.complianceStatusSelection(complianceStatusSet);

    await cocMonitoringPage.clickSubmit();

    await cocMonitoringPage.verifyComplianceReportComplianceStatusData(complianceStatusSet);
  });

});