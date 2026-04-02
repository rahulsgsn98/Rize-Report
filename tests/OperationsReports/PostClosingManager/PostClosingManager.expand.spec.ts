import { test, expect } from '@playwright/test';
import { ReportPanelPage } from '@pages/reportpanelpage';
import { PostClosingManagerPage } from '@pages/OperationsReportsPages/PostClosingManagerpage';
import { ReportDashboardPage } from '@pages/reportdashboardpage';
import { TestConfig } from '@config';
import { handleContinueLogin } from "@utils/sessionGuard";

let reportDashboardPage: ReportDashboardPage;
let config: TestConfig;
let reportPanelPage: ReportPanelPage;
let postClosingManagerPage: PostClosingManagerPage;

test.beforeEach(async ({ page }) => {
  reportPanelPage = new ReportPanelPage(page);
  postClosingManagerPage = new PostClosingManagerPage(page);
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
  await reportPanelPage.clickPostClosingManagerLink();

  const expandButton = postClosingManagerPage.operationsreportexpandButton;

  await expect(expandButton).toBeVisible({ timeout: 30000 });

  if (await expandButton.isVisible({ timeout: 30000 })) {
    console.log('Operations Report Expand button is visible');
  }

  await expect(expandButton).toBeEnabled({ timeout: 30000 });
  await expect(expandButton).toHaveText(/Expand/i);

  await postClosingManagerPage.clickoperationsreportExpand();
});


test('Verify that the Operations Report Collapse button is visible and clickable after expanding', async ({ page }) => {

  await reportPanelPage.clickSidebarToggle();
  await reportPanelPage.clickPostClosingManagerLink();

  await expect(postClosingManagerPage.operationsreportexpandButton).toBeVisible({ timeout: 30000 });
  await expect(postClosingManagerPage.operationsreportexpandButton).toBeEnabled({ timeout: 30000 });

  await postClosingManagerPage.clickoperationsreportExpand();

  const collapseButton = postClosingManagerPage.operationsreportcollapseButton;

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