import { test } from '@playwright/test';
import { ReportPanelPage } from '@pages/reportpanelpage';
import { LoanLossVariancePage } from '@pages/SecondaryOperationsPages/LoanLossVariancepages';
import { TestConfig } from '@config';
import { handleContinueLogin } from "@utils/sessionGuard";

const config = new TestConfig();

const channelSets = [
  ['Delegated'],
  ['Delegated', 'Non-Delegated'],
];

channelSets.forEach((channelSet) => {

  test(`Search Loan Loss Variance by channel: ${channelSet.join(', ')}`, async ({ page }) => {
    test.slow();

    const loanLossVariancePage = new LoanLossVariancePage(page);
    const reportPanelPage = new ReportPanelPage(page);

    await page.goto(config.appUrl, {
      waitUntil: 'domcontentloaded',
      timeout: 60_000
    });
    await handleContinueLogin(page);

    const appRoot = page.locator('#app');
    await appRoot.waitFor({ state: 'visible', timeout: 30000 });

    await reportPanelPage.clickSidebarToggle();
    await reportPanelPage.clickLoanLossVarianceLink();

    await loanLossVariancePage.channelSelection(channelSet);

    await loanLossVariancePage.clickSubmit();

    await loanLossVariancePage.verifyChannelData(channelSet);
  });

});