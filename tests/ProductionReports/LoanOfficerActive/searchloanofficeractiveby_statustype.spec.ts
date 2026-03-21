import { test, expect } from '@playwright/test';
import { ReportPanelPage } from '@pages/reportpanelpage';
import { LoanOfficerActivePage } from '@pages/LoanOfficerActivepage';
import { TestConfig } from '@config';

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

    await reportPanelPage.clickSidebarToggle();
    await reportPanelPage.clickLoanOfficerActiveLink();

    await loanOfficerActivePage.statusTypeSelection(statusTypeSet);

    await loanOfficerActivePage.clickSubmit();

     await loanOfficerActivePage.verifyStatusTypeData(statusTypeSet);
  });

});