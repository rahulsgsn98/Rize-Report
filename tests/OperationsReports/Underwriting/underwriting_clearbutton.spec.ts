import { test, expect } from '@playwright/test';
import { ReportPanelPage } from '@pages/reportpanelpage';
import { UnderwritingFundedPage } from '@pages/OperationsReportsPages/Underwritingpage';
import { ReportDashboardPage } from '@pages/reportdashboardpage';
import { TestConfig } from '@config';
import { handleContinueLogin } from "@utils/sessionGuard";

let reportDashboardPage: ReportDashboardPage;
let config: TestConfig;
let reportPanelPage: ReportPanelPage;
let underwritingFundedPage: UnderwritingFundedPage;

test.beforeEach(async ({ page }) => {
  reportPanelPage = new ReportPanelPage(page);
  underwritingFundedPage = new UnderwritingFundedPage(page);
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

test('Verify that the Clear button resets filters and results', async ({ page }) => {

  await reportPanelPage.clickSidebarToggle();
  await reportPanelPage.clickUnderwritingFundedLink();

  await underwritingFundedPage.underwriterSelection(["Nicole Barreto"]); // replace with valid data

  await underwritingFundedPage.clickSubmit();

  await underwritingFundedPage.clickClear();
});