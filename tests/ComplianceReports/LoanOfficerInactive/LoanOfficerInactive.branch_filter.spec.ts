import { test } from '@playwright/test';
import { ReportPanelPage } from '@pages/reportpanelpage';
import { LoanOfficerInactivePage } from '@pages/ComplianceReportsPages/LoanOfficerInactivepage';
import { TestConfig } from '@config';
import { handleContinueLogin } from "@utils/sessionGuard";
const config = new TestConfig();

const branchNameSets = [
  ['Naples, FL/S10400B104R00D10'],
  ['Naples, FL/S10400B104R00D10', 'Quick Mortgage/S13000B130R00D10'],
];

branchNameSets.forEach((branchNameSet) => {

  test(`Search Loan Officer Inactive by branch name: ${branchNameSet.join(', ')}`, async ({ page }) => {
   // test.slow();

    const loanOfficerInactivePage = new LoanOfficerInactivePage(page);
    const reportPanelPage = new ReportPanelPage(page);

    await page.goto(config.appUrl, {
      waitUntil: 'domcontentloaded',
      timeout: 60_000
    });
    await handleContinueLogin(page);

    const appRoot = page.locator('#app');
    await appRoot.waitFor({ state: 'visible', timeout: 30000 });

    await reportPanelPage.clickSidebarToggle();
    await reportPanelPage.clickLoanOfficerInactiveLink();

    await loanOfficerInactivePage.branchNameSelection(branchNameSet);

    await loanOfficerInactivePage.clickSubmit();

    await loanOfficerInactivePage.verifyComplianceReportBranchData(branchNameSet);

    await loanOfficerInactivePage.verifyDetailsBranchData(branchNameSet);
  });

});