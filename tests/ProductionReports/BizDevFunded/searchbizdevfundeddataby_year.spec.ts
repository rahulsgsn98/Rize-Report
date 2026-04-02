import { test, expect } from '@playwright/test';
import { ReportPanelPage } from '@pages/reportpanelpage';
import { BizDevFundedPage } from '@pages/ProductionReportsPages/BizDevFundedpage';
import { TestConfig } from '@config';
import { handleContinueLogin } from "@utils/sessionGuard";

const targetYear: any = 2026;

test(`Search Biz-Dev Funded by year: ${targetYear}`, async ({ page }) => {

  test.slow();

  const config = new TestConfig();
  const bizDevFundedPage = new BizDevFundedPage(page);
  const reportPanelPage = new ReportPanelPage(page);

  await page.goto(config.appUrl, {
    waitUntil: 'domcontentloaded',
    timeout: 60000
  });
  await handleContinueLogin(page);
   const appRoot = page.locator('#app');

  // wait for app root at least
  await appRoot.waitFor({ state: 'visible', timeout: 30000 });

  await reportPanelPage.clickSidebarToggle();
  await reportPanelPage.clickBizDevFundedLink();

  await bizDevFundedPage.selectYear(targetYear);

  await bizDevFundedPage.verifyYearData(targetYear);

});