import { test, expect } from '@playwright/test';
import { ReportPanelPage } from '@pages/reportpanelpage';
import { UnderwritingFundedPage } from '@pages/OperationsReportsPages/Underwritingpage';
import { TestConfig } from '@config';
import { handleContinueLogin } from "@utils/sessionGuard";

const config = new TestConfig();

// multiple test datasets
const underwriterSets = [
  ['Nicole Barreto'],
  ['Lisa A Folger', 'Nicole Barreto'],
];

underwriterSets.forEach((underwriterSet) => {

  test(`Search Underwriting Funded by underwriter: ${underwriterSet.join(', ')}`, async ({ page }) => {
    test.slow();

    const underwritingFundedPage = new UnderwritingFundedPage(page);
    const reportPanelPage = new ReportPanelPage(page);

    await page.goto(config.appUrl, {
      waitUntil: 'domcontentloaded',
      timeout: 60_000
    });
    await handleContinueLogin(page);

    const appRoot = page.locator('#app');

    await appRoot.waitFor({ state: 'visible', timeout: 30000 });

    await reportPanelPage.clickSidebarToggle();
    await reportPanelPage.clickUnderwritingFundedLink();

    await underwritingFundedPage.underwriterSelection(underwriterSet);

    await underwritingFundedPage.clickSubmit();

    await underwritingFundedPage.verifyUnderwriterNameData(underwriterSet);

  });

});