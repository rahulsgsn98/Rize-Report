import { test, expect } from '@playwright/test';
import { ReportPanelPage } from '@pages/reportpanelpage';
import { MortgageInsurancePage } from '@pages/ComplianceReportsPages/Mortgageinsurancepage';
import { ReportDashboardPage } from '@pages/reportdashboardpage';
import { TestConfig } from '@config';
import { handleContinueLogin } from "@utils/sessionGuard";

let reportDashboardPage: ReportDashboardPage;
let config: TestConfig;
let reportPanelPage: ReportPanelPage;
let mortgageInsurancePage: MortgageInsurancePage;

test.beforeEach(async ({ page }) => {
  reportPanelPage = new ReportPanelPage(page);
  mortgageInsurancePage = new MortgageInsurancePage(page);
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


// ─── Mortgage Insurance Expand / Collapse (Desktop + Mobile) ──────────────────

test('Verify that the Mortgage Insurance Expand button is visible and clickable', async ({ page }) => {

  await reportPanelPage.clickSidebarToggle();
  await reportPanelPage.clickMortgageInsuranceLink();

  const expandButton = mortgageInsurancePage.expandButton;

  await expect(expandButton).toBeVisible({ timeout: 30000 });

  if (await expandButton.isVisible({ timeout: 30000 })) {
    console.log('Mortgage Insurance Expand button is visible');
  }

  await expect(expandButton).toBeEnabled({ timeout: 30000 });
  await expect(expandButton).toHaveText(/Expand/i);

  await mortgageInsurancePage.clickExpand();
});


test('Verify that the Mortgage Insurance Collapse button is visible and clickable after expanding', async ({ page }) => {

  await reportPanelPage.clickSidebarToggle();
  await reportPanelPage.clickMortgageInsuranceLink();

  await expect(mortgageInsurancePage.expandButton).toBeVisible({ timeout: 30000 });
  await expect(mortgageInsurancePage.expandButton).toBeEnabled({ timeout: 30000 });

  await mortgageInsurancePage.clickExpand();

  const collapseButton = mortgageInsurancePage.collapseButton;

  await expect(collapseButton).toBeVisible({ timeout: 30000 });

  if (await collapseButton.isVisible()) {
    console.log('Mortgage Insurance Collapse button is visible');
  }

  await expect(collapseButton).toBeEnabled({ timeout: 30000 });
  await expect(collapseButton).toHaveText(/Collapse/i);

//  await collapseButton.click({ timeout: 30000 });
 await  mortgageInsurancePage.clickCollapse()

  await expect(collapseButton).toBeHidden({ timeout: 30000 });

  console.log('Mortgage Insurance Collapse button is not visible after collapsing');
});