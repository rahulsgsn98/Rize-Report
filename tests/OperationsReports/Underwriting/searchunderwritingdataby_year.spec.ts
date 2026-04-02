import { test, expect } from '@playwright/test';
import { ReportPanelPage } from '@pages/reportpanelpage';
import { UnderwritingFundedPage } from '@pages/OperationsReportsPages/Underwritingpage';
import { TestConfig } from '@config';
import { handleContinueLogin } from "@utils/sessionGuard";

const targetYear: any = 2026;

test(`Search Underwriting Funded by year: ${targetYear}`, async ({ page }) => {

  test.slow();

  const config = new TestConfig();
  const underwritingFundedPage = new UnderwritingFundedPage(page);
  const reportPanelPage = new ReportPanelPage(page);

  await page.goto(config.appUrl, {
    waitUntil: 'domcontentloaded',
    timeout: 60000
  });
  await handleContinueLogin(page);

  const appRoot = page.locator('#app');

  await appRoot.waitFor({ state: 'visible', timeout: 30000 });

  await reportPanelPage.clickSidebarToggle();
  await reportPanelPage.clickUnderwritingFundedLink();

  await underwritingFundedPage.selectYear(targetYear);

  await underwritingFundedPage.verifyYearData(targetYear);

});