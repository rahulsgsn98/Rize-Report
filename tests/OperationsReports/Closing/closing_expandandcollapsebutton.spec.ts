import { test, expect } from '@playwright/test';
import { ReportPanelPage } from '@pages/reportpanelpage';
import { ClosingPage } from '@pages/OperationsReportsPages/Closingpage';
import { ReportDashboardPage } from '@pages/reportdashboardpage';
import { TestConfig } from '@config';
import { handleContinueLogin } from "@utils/sessionGuard";

let reportDashboardPage: ReportDashboardPage;
let config: TestConfig;
let reportPanelPage: ReportPanelPage;
let closingPage: ClosingPage;

test.beforeEach(async ({ page }) => {
  reportPanelPage = new ReportPanelPage(page);
  closingPage = new ClosingPage(page);
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


// ─── Operations Report (Desktop + Mobile) ─────────────────────────────────────

test('Verify that the Operations Report Expand button is visible and clickable', async ({ page }) => {

  await reportPanelPage.clickSidebarToggle();
  await reportPanelPage.clickClosingLink();

  const expandButton = closingPage.operationsreportexpandButton;

  await expect(expandButton).toBeVisible({ timeout: 30000 });

  if (await expandButton.isVisible({ timeout: 30000 })) {
    console.log('Operations Report Expand button is visible');
  }

  await expect(expandButton).toBeEnabled({ timeout: 30000 });
  await expect(expandButton).toHaveText(/Expand/i);

  await closingPage.clickoperationsreportExpand();
});


test('Verify that the Operations Report Collapse button is visible and clickable after expanding', async ({ page }) => {

  await reportPanelPage.clickSidebarToggle();
  await reportPanelPage.clickClosingLink();

  await expect(closingPage.operationsreportexpandButton).toBeVisible({ timeout: 30000 });
  await expect(closingPage.operationsreportexpandButton).toBeEnabled({ timeout: 30000 });

  await closingPage.clickoperationsreportExpand();

  const collapseButton = closingPage.operationsreportcollapseButton;

  await expect(collapseButton).toBeVisible({ timeout: 30000 });

  if (await collapseButton.isVisible()) {
    console.log('Operations Report Collapse button is visible');
  }

  await expect(collapseButton).toBeEnabled({ timeout: 30000 });
  await expect(collapseButton).toHaveText(/Collapse/i);

  await collapseButton.click({ timeout: 30000 });

  await expect(collapseButton).toBeHidden({ timeout: 30000 });

  console.log('Operations Report Collapse button is not visible after collapsing');
});


// ─── Manager Report (Mobile & Tablet Only) ────────────────────────────────────

test('Verify that the Manager Report Expand button is visible and clickable - Mobile & Tablet Only', async ({ page, isMobile }) => {

  test.skip(!isMobile, 'Runs only on Mobile/Tablet');

  await reportPanelPage.clickSidebarToggle();
  await reportPanelPage.clickClosingLink();

  const expandButton = closingPage.managerreportexpandButton;

  await expect(expandButton).toBeVisible({ timeout: 30000 });

  if (await expandButton.isVisible({ timeout: 30000 })) {
    console.log('Manager Report Expand button is visible');
  }

  await expect(expandButton).toBeEnabled({ timeout: 30000 });
  await expect(expandButton).toHaveText(/Expand/i);

  await closingPage.clickManagerReportExpand();
});


test('Verify that the Manager Report Collapse button is visible and clickable after expanding - Mobile & Tablet Only', async ({ page, isMobile }) => {

  test.skip(!isMobile, 'Runs only on Mobile/Tablet');

  await reportPanelPage.clickSidebarToggle();
  await reportPanelPage.clickClosingLink();

  await expect(closingPage.managerreportexpandButton).toBeVisible({ timeout: 30000 });
  await expect(closingPage.managerreportexpandButton).toBeEnabled({ timeout: 30000 });

  await closingPage.clickManagerReportExpand();

  const collapseButton = closingPage.managerreportcollapseButton;

  await expect(collapseButton).toBeVisible({ timeout: 30000 });

  if (await collapseButton.isVisible({ timeout: 30000 })) {
    console.log('Manager Report Collapse button is visible');
  }

  await expect(collapseButton).toBeEnabled({ timeout: 30000 });
  await expect(collapseButton).toHaveText(/Collapse/i);

  await collapseButton.click({ timeout: 30000 });

  await expect(collapseButton).toBeHidden({ timeout: 30000 });

  console.log('Manager Report Collapse button is not visible after collapsing');
});


// ─── Loan Investor (Mobile & Tablet Only) ─────────────────────────────────────

test('Verify that the Loan Investor Expand button is visible and clickable - Mobile & Tablet Only', async ({ page, isMobile }) => {

  test.skip(!isMobile, 'Runs only on Mobile/Tablet');

  await reportPanelPage.clickSidebarToggle();
  await reportPanelPage.clickClosingLink();

  const expandButton = closingPage.loaninvestorexpandButton;

  await expect(expandButton).toBeVisible({ timeout: 30000 });

  if (await expandButton.isVisible({ timeout: 30000 })) {
    console.log('Loan Investor Expand button is visible');
  }

  await expect(expandButton).toBeEnabled({ timeout: 30000 });
  await expect(expandButton).toHaveText(/Expand/i);

  await closingPage.clickloaninvestorExpand();
});


test('Verify that the Loan Investor Collapse button is visible and clickable after expanding - Mobile & Tablet Only', async ({ page, isMobile }) => {

  test.skip(!isMobile, 'Runs only on Mobile/Tablet');

  await reportPanelPage.clickSidebarToggle();
  await reportPanelPage.clickClosingLink();

  await expect(closingPage.loaninvestorexpandButton).toBeVisible({ timeout: 30000 });
  await expect(closingPage.loaninvestorexpandButton).toBeEnabled({ timeout: 30000 });

  await closingPage.clickloaninvestorExpand();

  const collapseButton = closingPage.loaninvestorcollapseButton;

  await expect(collapseButton).toBeVisible({ timeout: 30000 });

  if (await collapseButton.isVisible({ timeout: 30000 })) {
    console.log('Loan Investor Collapse button is visible');
  }

  await expect(collapseButton).toBeEnabled({ timeout: 30000 });
  await expect(collapseButton).toHaveText(/Collapse/i);

  await collapseButton.click({ timeout: 30000 });

  await expect(collapseButton).toBeHidden({ timeout: 30000 });

  console.log('Loan Investor Collapse button is not visible after collapsing');
});