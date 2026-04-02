import { test, expect } from '@playwright/test';
import { ReportPanelPage } from '@pages/reportpanelpage';
import { LoanOfficerActivePage } from '@pages/ProductionReportsPages/LoanOfficerActivepage';
import { TestConfig } from '@config';
import { handleContinueLogin } from "@utils/sessionGuard";

const config = new TestConfig();

// multiple test datasets
const statusTypeSets = [
  ['Opening'],
  ['Processing', 'Underwriting'],
];

statusTypeSets.forEach((statusTypeSet) => {

  test(`Search Loan Officer Active by status type: ${statusTypeSet.join(', ')}`, async ({ page }) => {
    test.slow();

    const loanOfficerActivePage = new LoanOfficerActivePage(page);
    const reportPanelPage = new ReportPanelPage(page);

    await page.goto(config.appUrl, {
      waitUntil: 'domcontentloaded',
      timeout: 60_000
    });
    await handleContinueLogin(page);
 const appRoot = page.locator('#app');

  // wait for app root at least
  await appRoot.waitFor({ state: 'visible', timeout: 30000 });
  
    await reportPanelPage.clickSidebarToggle();
    await reportPanelPage.clickLoanOfficerActiveLink();

    await loanOfficerActivePage.statusTypeSelection(statusTypeSet);

    await loanOfficerActivePage.clickSubmit();

     await loanOfficerActivePage.verifyStatusTypeData(statusTypeSet);
  });

});