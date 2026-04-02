import { test, expect } from '@playwright/test';
import { ReportPanelPage } from '@pages/reportpanelpage';
import { ProcessorFundedPage } from '@pages/OperationsReportsPages/Processingpage';
import { ReportDashboardPage } from '@pages/reportdashboardpage';
import { TestConfig } from '@config';
import { handleContinueLogin } from "@utils/sessionGuard";

let reportDashboardPage: ReportDashboardPage;
let config: TestConfig;
let reportPanelPage: ReportPanelPage;
let processorFundedPage: ProcessorFundedPage;

test.beforeEach(async ({ page }) => {

  reportPanelPage = new ReportPanelPage(page);
  processorFundedPage = new ProcessorFundedPage(page);
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
  await reportPanelPage.clickProcessorFundedLink();

  const expandButton = processorFundedPage.operationsreportexpandButton;

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

  await processorFundedPage.clickoperationsreportExpand();
});


test('Expand/Collapse - Mobile & Tablet Only', async ({ page, isMobile }) => {

  test.skip(!isMobile, 'Runs only on Mobile/Tablet');

  await reportPanelPage.clickSidebarToggle();
  await reportPanelPage.clickProcessorFundedLink();

  const expandButton = processorFundedPage.loaninvestorexpendButton;

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

  await processorFundedPage.clickloaninvestorExpand();
});


test('Verify that the operations report Collapse button is visible and clickable after expanding', async ({ page }) => {

  await reportPanelPage.clickSidebarToggle();
  await reportPanelPage.clickProcessorFundedLink();

  await expect(processorFundedPage.operationsreportexpandButton).toBeVisible({
    timeout: 30000
  });

  await expect(processorFundedPage.operationsreportexpandButton).toBeEnabled({
    timeout: 30000
  });

  await processorFundedPage.clickoperationsreportExpand();

  const collapseButton = processorFundedPage.operationsreportcollapseButton;

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
  await reportPanelPage.clickProcessorFundedLink();

  await expect(processorFundedPage.loaninvestorexpendButton).toBeVisible({
    timeout: 30000
  });

  await expect(processorFundedPage.loaninvestorexpendButton).toBeEnabled({
    timeout: 30000
  });

  await processorFundedPage.clickloaninvestorExpand();

  const collapseButton = processorFundedPage.loaninvestorcollapseButton;

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