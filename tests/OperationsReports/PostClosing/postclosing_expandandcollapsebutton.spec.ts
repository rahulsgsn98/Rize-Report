import { test, expect } from '@playwright/test';
import { ReportPanelPage } from '@pages/reportpanelpage';
import { PostClosingPage } from '@pages/OperationsReportsPages/PostClosingpage';
import { ReportDashboardPage } from '@pages/reportdashboardpage';
import { TestConfig } from '@config';
import { handleContinueLogin } from "@utils/sessionGuard";

let reportDashboardPage: ReportDashboardPage;
let config: TestConfig;
let reportPanelPage: ReportPanelPage;
let postClosingPage: PostClosingPage;

test.beforeEach(async ({ page }) => {
  reportPanelPage = new ReportPanelPage(page);
  postClosingPage = new PostClosingPage(page);
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


// ─── Operations Report ────────────────────────────────────────────────────────

test('Verify that the Operations Report Expand button is visible and clickable - Mobile & Tablet Only', async ({ page, isMobile }) => {

  test.skip(!isMobile, 'Runs only on Mobile/Tablet');

  await reportPanelPage.clickSidebarToggle();
  await reportPanelPage.clickPostClosingLink();

  const expandButton = postClosingPage.operationsreportexpandButton;

  await expect(expandButton).toBeVisible({ timeout: 30000 });

  if (await expandButton.isVisible({ timeout: 30000 })) {
    console.log('Operations Report Expand button is visible');
  }

  await expect(expandButton).toBeEnabled({ timeout: 30000 });
  await expect(expandButton).toHaveText(/Expand/i);

  await postClosingPage.clickOperationsReportExpand();
});


test('Verify that the Operations Report Collapse button is visible and clickable after expanding - Mobile & Tablet Only', async ({ page, isMobile }) => {

  test.skip(!isMobile, 'Runs only on Mobile/Tablet');

  await reportPanelPage.clickSidebarToggle();
  await reportPanelPage.clickPostClosingLink();

  await expect(postClosingPage.operationsreportexpandButton).toBeVisible({ timeout: 30000 });
  await expect(postClosingPage.operationsreportexpandButton).toBeEnabled({ timeout: 30000 });

  await postClosingPage.clickOperationsReportExpand();

  const collapseButton = postClosingPage.operationsreportcollapseButton;

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
  await reportPanelPage.clickPostClosingLink();

  const expandButton = postClosingPage.managerreportexpandButton;

  await expect(expandButton).toBeVisible({ timeout: 30000 });

  if (await expandButton.isVisible({ timeout: 30000 })) {
    console.log('Manager Report Expand button is visible');
  }

  await expect(expandButton).toBeEnabled({ timeout: 30000 });
  await expect(expandButton).toHaveText(/Expand/i);

  await postClosingPage.clickManagerReportExpand();
});


test('Verify that the Manager Report Collapse button is visible and clickable after expanding - Mobile & Tablet Only', async ({ page, isMobile }) => {

  test.skip(!isMobile, 'Runs only on Mobile/Tablet');

  await reportPanelPage.clickSidebarToggle();
  await reportPanelPage.clickPostClosingLink();

  await expect(postClosingPage.managerreportexpandButton).toBeVisible({ timeout: 30000 });
  await expect(postClosingPage.managerreportexpandButton).toBeEnabled({ timeout: 30000 });

  await postClosingPage.clickManagerReportExpand();

  const collapseButton = postClosingPage.managerreportcollapseButton;

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
  await reportPanelPage.clickPostClosingLink();

  const expandButton = postClosingPage.loaninvestorexpandButton;

  await expect(expandButton).toBeVisible({ timeout: 30000 });

  if (await expandButton.isVisible({ timeout: 30000 })) {
    console.log('Loan Investor Expand button is visible');
  }

  await expect(expandButton).toBeEnabled({ timeout: 30000 });
  await expect(expandButton).toHaveText(/Expand/i);

  await postClosingPage.clickLoanInvestorExpand();
});


test('Verify that the Loan Investor Collapse button is visible and clickable after expanding - Mobile & Tablet Only', async ({ page, isMobile }) => {

  test.skip(!isMobile, 'Runs only on Mobile/Tablet');

  await reportPanelPage.clickSidebarToggle();
  await reportPanelPage.clickPostClosingLink();

  await expect(postClosingPage.loaninvestorexpandButton).toBeVisible({ timeout: 30000 });
  await expect(postClosingPage.loaninvestorexpandButton).toBeEnabled({ timeout: 30000 });

  await postClosingPage.clickLoanInvestorExpand();

  const collapseButton = postClosingPage.loaninvestorcollapseButton;

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