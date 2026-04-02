import { test, expect } from '@playwright/test';
import { ReportPanelPage } from '@pages/reportpanelpage';
import { LoanOfficerInactivePage } from '@pages/ComplianceReportsPages/LoanOfficerInactivepage';
import { ReportDashboardPage } from '@pages/reportdashboardpage';
import { TestConfig } from '@config';
import { handleContinueLogin } from "@utils/sessionGuard";

let reportDashboardPage: ReportDashboardPage;
let config: TestConfig;
let reportPanelPage: ReportPanelPage;
let loanOfficerInactivePage: LoanOfficerInactivePage;

test.beforeEach(async ({ page }) => {
  reportPanelPage = new ReportPanelPage(page);
  loanOfficerInactivePage = new LoanOfficerInactivePage(page);
  reportDashboardPage = new ReportDashboardPage(page);
  config = new TestConfig();

  await page.goto(config.appUrl, {
    waitUntil: 'domcontentloaded',
    timeout: 60_000
  });
  await handleContinueLogin(page);

  const appRoot = page.locator('#app');
  await appRoot.waitFor({ state: 'visible', timeout: 30000 });
});


// ─── Compliance Report Expand / Collapse (Desktop + Mobile) ───────────────────

test('Verify that the Compliance Report Expand button is visible and clickable', async ({ page }) => {

  await reportPanelPage.clickSidebarToggle();
  await reportPanelPage.clickLoanOfficerInactiveLink();

  const expandButton = loanOfficerInactivePage.compliancereportexpandButton;

  await expect(expandButton).toBeVisible({ timeout: 30000 });

  if (await expandButton.isVisible({ timeout: 30000 })) {
    console.log('Compliance Report Expand button is visible');
  }

  await expect(expandButton).toBeEnabled({ timeout: 30000 });
  await expect(expandButton).toHaveText(/Expand/i);

  await loanOfficerInactivePage.clickComplianceReportExpand();
});


test('Verify that the Compliance Report Collapse button is visible and clickable after expanding', async ({ page }) => {

  await reportPanelPage.clickSidebarToggle();
  await reportPanelPage.clickLoanOfficerInactiveLink();

  await expect(loanOfficerInactivePage.compliancereportexpandButton).toBeVisible({ timeout: 30000 });
  await expect(loanOfficerInactivePage.compliancereportexpandButton).toBeEnabled({ timeout: 30000 });

  await loanOfficerInactivePage.clickComplianceReportExpand();

  const collapseButton = loanOfficerInactivePage.compliancereportcollapseButton;

  await expect(collapseButton).toBeVisible({ timeout: 30000 });

  if (await collapseButton.isVisible()) {
    console.log('Compliance Report Collapse button is visible');
  }

  await expect(collapseButton).toBeEnabled({ timeout: 30000 });
  await expect(collapseButton).toHaveText(/Collapse/i);

  await collapseButton.click({ timeout: 30000 });

  await expect(collapseButton).toBeHidden({ timeout: 30000 });

  console.log('Compliance Report Collapse button is not visible after collapsing');
});