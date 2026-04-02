import { test } from '@playwright/test';
import { ReportPanelPage } from '@pages/reportpanelpage';
import { LoanLossVariancePage } from '@pages/SecondaryOperationsPages/LoanLossVariancepages';
import { TestConfig } from '@config';
import { handleContinueLogin } from "@utils/sessionGuard";

const config = new TestConfig();

const investorSets = [
  ['PennyMac'],
  ['Planet Home Lending', 'NewRez'],
];

investorSets.forEach((investorSet) => {
// Dom structure issue , Aphabetic lowercase , and Upper Case
  test(`Search Loan Loss Variance by investor: ${investorSet.join(', ')}`, async ({ page }) => {
   

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

    await loanLossVariancePage.investorSelection(investorSet);

    await loanLossVariancePage.clickSubmit();

    await loanLossVariancePage.verifyInvestorData(investorSet);
  });

});