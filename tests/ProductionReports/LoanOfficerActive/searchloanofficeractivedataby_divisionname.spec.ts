import { test, expect } from '@playwright/test';
import { ReportPanelPage } from '@pages/reportpanelpage';
import { LoanOfficerActivePage } from '@pages/LoanOfficerActivepage';
import { TestConfig } from '@config';

const config = new TestConfig();

// multiple test datasets
const divisionSets = [
  ['A&A'],
  ['A&A', 'Rize'],
];

divisionSets.forEach((divisionSet) => {

  test(`Search Loan Officer Active: ${divisionSet.join(', ')}`, async ({ page }) => {
    test.slow();

    const loanPage = new LoanOfficerActivePage(page);
    const reportPanelPage = new ReportPanelPage(page);

    await page.goto(config.appUrl, {
      waitUntil: 'domcontentloaded',
      timeout: 60_000
    });

    await reportPanelPage.clickSidebarToggle();
    await reportPanelPage.clickLoanOfficerActiveLink();

    await loanPage.selectDivisionNames(divisionSet);

    await loanPage.clickSubmit();

    await loanPage.verifyDivisionData(divisionSet);

  });

});