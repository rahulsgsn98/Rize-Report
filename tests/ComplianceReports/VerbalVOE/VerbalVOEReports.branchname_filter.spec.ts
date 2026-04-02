import { test } from '@playwright/test';
import { ReportPanelPage } from '@pages/reportpanelpage';
import { VerbalVOEPage } from '@pages/ComplianceReportsPages/VerbalVOEpage';
import { TestConfig } from '@config';
import { handleContinueLogin } from "@utils/sessionGuard";

const config = new TestConfig();

const branchNameSets = [
  ['Burtonsville, MD | GLG Team/S15300B153R00D10'],
  ['Coral Gables, FL | HPP Financial/S10801B108R00D11', 'Coral Spring, FL | Suarez Team/S10702B107R00D10'],
];

branchNameSets.forEach((branchNameSet) => {

  test(`Search Verbal VOE by Branch Name: ${branchNameSet.join(', ')}`, async ({ page }) => {

    const verbalVOEPage = new VerbalVOEPage(page);
    const reportPanelPage = new ReportPanelPage(page);

    await page.goto(config.appUrl, {
      waitUntil: 'domcontentloaded',
      timeout: 60_000
    });
    await handleContinueLogin(page);

    const appRoot = page.locator('#app');
    await appRoot.waitFor({ state: 'visible', timeout: 30000 });

    await reportPanelPage.clickSidebarToggle();
    await reportPanelPage.clickVerbalVOELink();

    await verbalVOEPage.branchNameSelection(branchNameSet);

    await verbalVOEPage.clickSubmit();

  //  await verbalVOEPage.verifyComplianceReportLoanNumberData(branchNameSet);

    await verbalVOEPage.verifyDetailsBranchData(branchNameSet);
  });

});