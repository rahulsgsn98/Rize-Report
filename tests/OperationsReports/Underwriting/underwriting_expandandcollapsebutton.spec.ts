import { test, expect } from '@playwright/test';
import { ReportPanelPage } from '@pages/reportpanelpage';
import { UnderwritingFundedPage } from '@pages/OperationsReportsPages/Underwritingpage';
import { ReportDashboardPage } from '@pages/reportdashboardpage';
import { TestConfig } from '@config';
import { handleContinueLogin } from "@utils/sessionGuard";

let reportDashboardPage: ReportDashboardPage;
let config: TestConfig;
let reportPanelPage: ReportPanelPage;
let underwritingFundedPage: UnderwritingFundedPage;

test.beforeEach(async ({ page }) => {

  reportPanelPage = new ReportPanelPage(page);
  underwritingFundedPage = new UnderwritingFundedPage(page);
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


test('Verify that the Expand button is visible and clickable', async ({ page }) => {

  await reportPanelPage.clickSidebarToggle();
  await reportPanelPage.clickUnderwritingFundedLink();

  const expandButton = underwritingFundedPage.operationsreportexpandButton;

  await expect(expandButton).toBeVisible({
    timeout: 30000
  });

  if (await expandButton.isVisible({ timeout: 30000 })) {
    console.log("Expand button is visible");
  }

  await expect(expandButton).toBeEnabled({
    timeout: 30000
  });

  await expect(expandButton).toHaveText(/Expand/i);

  await underwritingFundedPage.clickoperationsreportExpand();
});


test('Expand/Collapse - Mobile & Tablet Only', async ({ page, isMobile }) => {

  test.skip(!isMobile, 'Runs only on Mobile/Tablet');

  await reportPanelPage.clickSidebarToggle();
  await reportPanelPage.clickUnderwritingFundedLink();

  const expandButton = underwritingFundedPage.loaninvestorexpendButton;

  await expect(expandButton).toBeVisible({
    timeout: 30000
  });

  if (await expandButton.isVisible({ timeout: 30000 })) {
    console.log("Expand button is visible");
  }

  await expect(expandButton).toBeEnabled({
    timeout: 30000
  });

  await expect(expandButton).toHaveText(/Expand/i);

  await underwritingFundedPage.clickloaninvestorExpand();
});


test('Verify that the operations report Collapse button is visible and clickable after expanding', async ({ page }) => {

  await reportPanelPage.clickSidebarToggle();
  await reportPanelPage.clickUnderwritingFundedLink();

  await expect(underwritingFundedPage.operationsreportexpandButton).toBeVisible({
    timeout: 30000
  });

  await expect(underwritingFundedPage.operationsreportexpandButton).toBeEnabled({
    timeout: 30000
  });

  await underwritingFundedPage.clickoperationsreportExpand();

  const collapseButton = underwritingFundedPage.operationsreportcollapseButton;

  await expect(collapseButton).toBeVisible({
    timeout: 30000
  });

  if (await collapseButton.isVisible()) {
    console.log("Collapse button is visible");
  }

  await expect(collapseButton).toBeEnabled({
    timeout: 30000
  });

  await expect(collapseButton).toHaveText(/Collapse/i);

  await expect(collapseButton).toBeVisible({
    timeout: 30000
  });

  await collapseButton.click({
    timeout: 30000
  });

  await expect(collapseButton).toBeHidden({
    timeout: 30000
  });

  console.log("Collapse button is not visible after collapsing");
});


test('Verify that the Investor Collapse button is visible and clickable after expanding', async ({ page, isMobile }) => {

  test.skip(!isMobile, 'Runs only on Mobile/Tablet');

  await reportPanelPage.clickSidebarToggle();
  await reportPanelPage.clickUnderwritingFundedLink();

  await expect(underwritingFundedPage.loaninvestorexpendButton).toBeVisible({
    timeout: 30000
  });

  await expect(underwritingFundedPage.loaninvestorexpendButton).toBeEnabled({
    timeout: 30000
  });

  await underwritingFundedPage.clickloaninvestorExpand();

  const collapseButton = underwritingFundedPage.loaninvestorcollapseButton;

  await expect(collapseButton).toBeVisible({
    timeout: 30000
  });

  if (await collapseButton.isVisible({ timeout: 30000 })) {
    console.log("Investor Collapse button is visible");
  }

  await expect(collapseButton).toBeEnabled({
    timeout: 30000
  });

  await expect(collapseButton).toHaveText(/Collapse/i);

  await expect(collapseButton).toBeVisible({
    timeout: 30000
  });

  await collapseButton.click({
    timeout: 30000
  });

  await expect(collapseButton).toBeHidden({
    timeout: 30000
  });

  console.log("Collapse button is not visible after collapsing");

});