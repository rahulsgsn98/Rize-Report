import { test, expect } from '@playwright/test';
import { ReportPanelPage } from '@pages/reportpanelpage';
import { BizDevActivePage } from '@pages/ProductionReportsPages/BizDevActivepage';
import { ReportDashboardPage } from '@pages/reportdashboardpage';
import { TestConfig } from '@config';
import { handleContinueLogin } from "@utils/sessionGuard";

let reportDashboardPage: ReportDashboardPage;
let config: TestConfig;
let reportPanelPage: ReportPanelPage;
let bizDevActivePage: BizDevActivePage;

test.beforeEach(async ({ page }) => {
  reportPanelPage = new ReportPanelPage(page);
  bizDevActivePage = new BizDevActivePage(page);
  reportDashboardPage = new ReportDashboardPage(page);
  config = new TestConfig();

  await page.goto(config.appUrl, {
      waitUntil: 'domcontentloaded',
      timeout: 60_000
    });
  await handleContinueLogin(page);
   const appRoot = page.locator('#app');

  // wait for app root at least
  await appRoot.waitFor({ state: 'visible', timeout: 30000 });
});

test('Verify that the Clear button resets filters and results', async ({ page }) => {
  await reportPanelPage.clickSidebarToggle();
  await reportPanelPage.clickBizDevActiveLink();

  // Apply filter
  await bizDevActivePage.bdsNameSelection(['Diane Govea ']);
  await bizDevActivePage.clickSubmit();

  // Clear filters
  await bizDevActivePage.clickClear();
});