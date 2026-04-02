import { test, expect } from '@playwright/test';
import { ReportPanelPage } from '@pages/reportpanelpage';
import { LoanLossVariancePage } from '@pages/SecondaryOperationsPages/LoanLossVariancepages';
import { ReportDashboardPage } from '@pages/reportdashboardpage';
import { TestConfig } from '@config';
import { handleContinueLogin } from "@utils/sessionGuard";

let reportDashboardPage: ReportDashboardPage;
let config: TestConfig;
let reportPanelPage: ReportPanelPage;
let loanLossVariancePage: LoanLossVariancePage;

test.beforeEach(async ({ page }) => {
  reportPanelPage = new ReportPanelPage(page);
  loanLossVariancePage = new LoanLossVariancePage(page);
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


// ─── Clear Button - Investor Filter ──────────────────────────────────────────

test('Verify that the Clear button resets Investor filter', async ({ page }) => {

  await reportPanelPage.clickSidebarToggle();
  await reportPanelPage.clickLoanLossVarianceLink();

  await loanLossVariancePage.investorSelection(['PennyMac']); // replace with valid data

  await loanLossVariancePage.clickSubmit();

  await loanLossVariancePage.clickClear();
});


// ─── Clear Button - Channel Filter ───────────────────────────────────────────

test('Verify that the Clear button resets Channel filter', async ({ page }) => {

  await reportPanelPage.clickSidebarToggle();
  await reportPanelPage.clickLoanLossVarianceLink();

  await loanLossVariancePage.channelSelection(['Delegated']); // replace with valid data

  await loanLossVariancePage.clickSubmit();

  await loanLossVariancePage.clickClear();
});


// ─── Clear Button - Underwriter Filter ───────────────────────────────────────

test('Verify that the Clear button resets Underwriter filter', async ({ page }) => {

  await reportPanelPage.clickSidebarToggle();
  await reportPanelPage.clickLoanLossVarianceLink();

  await loanLossVariancePage.underwriterSelection(['Cyndi Weatherford']); // replace with valid data

  await loanLossVariancePage.clickSubmit();

  await loanLossVariancePage.clickClear();
});


// ─── Clear Button - Post Closer Filter ───────────────────────────────────────

test('Verify that the Clear button resets Post Closer filter', async ({ page }) => {

  await reportPanelPage.clickSidebarToggle();
  await reportPanelPage.clickLoanLossVarianceLink();

  await loanLossVariancePage.postCloserSelection(['Jodi Briggs']); // replace with valid data

  await loanLossVariancePage.clickSubmit();

  await loanLossVariancePage.clickClear();
});


// ─── Clear Button - Branch Filter ────────────────────────────────────────────

test('Verify that the Clear button resets Branch filter', async ({ page }) => {

  await reportPanelPage.clickSidebarToggle();
  await reportPanelPage.clickLoanLossVarianceLink();

  await loanLossVariancePage.branchSelection(['Pembroke Pines Rize']); // replace with valid data

  await loanLossVariancePage.clickSubmit();

  await loanLossVariancePage.clickClear();
});


// ─── Clear Button - Product Filter ───────────────────────────────────────────

test('Verify that the Clear button resets Product filter', async ({ page }) => {

  await reportPanelPage.clickSidebarToggle();
  await reportPanelPage.clickLoanLossVarianceLink();

  await loanLossVariancePage.productSelection(['Conventional']); // replace with valid data

  await loanLossVariancePage.clickSubmit();

  await loanLossVariancePage.clickClear();
});


// ─── Clear Button - Purchased Month Filter ────────────────────────────────────

test('Verify that the Clear button resets Purchased Month filter', async ({ page }) => {

  await reportPanelPage.clickSidebarToggle();
  await reportPanelPage.clickLoanLossVarianceLink();

  await loanLossVariancePage.purchasedMonthSelection(['Jan 2024']); // replace with valid data

  await loanLossVariancePage.clickSubmit();

  await loanLossVariancePage.clickClear();
});


// ─── Clear Button - Variance Category Filter ──────────────────────────────────

test('Verify that the Clear button resets Variance Category filter', async ({ page }) => {

  await reportPanelPage.clickSidebarToggle();
  await reportPanelPage.clickLoanLossVarianceLink();

  await loanLossVariancePage.varianceCategorySelection(['Loan Data Discrepancy']); // replace with valid data

  await loanLossVariancePage.clickSubmit();

  await loanLossVariancePage.clickClear();
});


// ─── Clear Button - Variance Research Filter ──────────────────────────────────

test('Verify that the Clear button resets Variance Research filter', async ({ page }) => {

  await reportPanelPage.clickSidebarToggle();
  await reportPanelPage.clickLoanLossVarianceLink();

  await loanLossVariancePage.varianceResearchSelection(['Active Rebuttal']); // replace with valid data

  await loanLossVariancePage.clickSubmit();

  await loanLossVariancePage.clickClear();
});