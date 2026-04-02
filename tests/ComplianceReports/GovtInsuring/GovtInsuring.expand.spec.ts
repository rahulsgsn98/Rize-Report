import { test, expect } from '@playwright/test';
import { ReportPanelPage } from '@pages/reportpanelpage';
import { GovtInsuringPage } from '@pages/ComplianceReportsPages/GovtInsuringpage';
import { ReportDashboardPage } from '@pages/reportdashboardpage';
import { TestConfig } from '@config';
import { handleContinueLogin } from "@utils/sessionGuard";

let reportDashboardPage: ReportDashboardPage;
let config: TestConfig;
let reportPanelPage: ReportPanelPage;
let govtInsuringPage: GovtInsuringPage;

test.beforeEach(async ({ page }) => {
  reportPanelPage = new ReportPanelPage(page);
  govtInsuringPage = new GovtInsuringPage(page);
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


// ─── Delegated Expand / Collapse (Desktop + Mobile) ──────────────────────────

test('Verify that the Delegated Expand button is visible and clickable', async ({ page }) => {

  await reportPanelPage.clickSidebarToggle();
  await reportPanelPage.clickGovtInsuringLink();

  const expandButton = govtInsuringPage.delegatedExpandButton;

  await expect(expandButton).toBeVisible({ timeout: 30000 });

  if (await expandButton.isVisible({ timeout: 30000 })) {
    console.log('Delegated Expand button is visible');
  }

  await expect(expandButton).toBeEnabled({ timeout: 30000 });
  await expect(expandButton).toHaveText(/Expand/i);

  await govtInsuringPage.clickDelegatedExpand();
});


test('Verify that the Delegated Collapse button is visible and clickable after expanding', async ({ page }) => {

  await reportPanelPage.clickSidebarToggle();
  await reportPanelPage.clickGovtInsuringLink();

  await expect(govtInsuringPage.delegatedExpandButton).toBeVisible({ timeout: 30000 });
  await expect(govtInsuringPage.delegatedExpandButton).toBeEnabled({ timeout: 30000 });

  await govtInsuringPage.clickDelegatedExpand();

  const collapseButton = govtInsuringPage.delegatedCollapseButton;

  await expect(collapseButton).toBeVisible({ timeout: 30000 });

  if (await collapseButton.isVisible()) {
    console.log('Delegated Collapse button is visible');
  }

  await expect(collapseButton).toBeEnabled({ timeout: 30000 });
  await expect(collapseButton).toHaveText(/Collapse/i);

  await collapseButton.click({ timeout: 30000 });

  await expect(collapseButton).toBeHidden({ timeout: 30000 });

  console.log('Delegated Collapse button is not visible after collapsing');
});


// ─── Non Delegated Expand / Collapse (Mobile Only) ───────────────────────────

test('Verify that the Non Delegated Expand button is visible and clickable - Mobile & Tablet Only', async ({ page, isMobile }) => {

  test.skip(!isMobile, 'Runs only on Mobile/Tablet');

  await reportPanelPage.clickSidebarToggle();
  await reportPanelPage.clickGovtInsuringLink();

  const expandButton = govtInsuringPage.nonDelegatedExpandButton;

  await expect(expandButton).toBeVisible({ timeout: 30000 });

  if (await expandButton.isVisible({ timeout: 30000 })) {
    console.log('Non Delegated Expand button is visible');
  }

  await expect(expandButton).toBeEnabled({ timeout: 30000 });
  await expect(expandButton).toHaveText(/Expand/i);

  await govtInsuringPage.clickNonDelegatedExpand();
});


test('Verify that the Non Delegated Collapse button is visible and clickable after expanding - Mobile & Tablet Only', async ({ page, isMobile }) => {

  test.skip(!isMobile, 'Runs only on Mobile/Tablet');

  await reportPanelPage.clickSidebarToggle();
  await reportPanelPage.clickGovtInsuringLink();

  await expect(govtInsuringPage.nonDelegatedExpandButton).toBeVisible({ timeout: 30000 });
  await expect(govtInsuringPage.nonDelegatedExpandButton).toBeEnabled({ timeout: 30000 });

  await govtInsuringPage.clickNonDelegatedExpand();

  const collapseButton = govtInsuringPage.nonDelegatedCollapseButton;

  await expect(collapseButton).toBeVisible({ timeout: 30000 });

  if (await collapseButton.isVisible()) {
    console.log('Non Delegated Collapse button is visible');
  }

  await expect(collapseButton).toBeEnabled({ timeout: 30000 });
  await expect(collapseButton).toHaveText(/Collapse/i);

  await collapseButton.click({ timeout: 30000 });

  await expect(collapseButton).toBeHidden({ timeout: 30000 });

  console.log('Non Delegated Collapse button is not visible after collapsing');
});


// ─── Archived Delegated Expand / Collapse (Desktop + Mobile) ─────────────────

test('Verify that the Archived Delegated Expand button is visible and clickable', async ({ page }) => {

  await reportPanelPage.clickSidebarToggle();
  await reportPanelPage.clickGovtInsuringLink();

  await govtInsuringPage.clickViewArchivedAndPaid();

  const expandButton = govtInsuringPage.archivedDelegatedExpandButton;

  await expect(expandButton).toBeVisible({ timeout: 30000 });

  if (await expandButton.isVisible({ timeout: 30000 })) {
    console.log('Archived Delegated Expand button is visible');
  }

  await expect(expandButton).toBeEnabled({ timeout: 30000 });
  await expect(expandButton).toHaveText(/Expand/i);

  await govtInsuringPage.clickArchivedDelegatedExpand();
});


test('Verify that the Archived Delegated Collapse button is visible and clickable after expanding', async ({ page }) => {

  await reportPanelPage.clickSidebarToggle();
  await reportPanelPage.clickGovtInsuringLink();

  await govtInsuringPage.clickViewArchivedAndPaid();

  await expect(govtInsuringPage.archivedDelegatedExpandButton).toBeVisible({ timeout: 30000 });
  await expect(govtInsuringPage.archivedDelegatedExpandButton).toBeEnabled({ timeout: 30000 });

  await govtInsuringPage.clickArchivedDelegatedExpand();

  const collapseButton = govtInsuringPage.archivedDelegatedCollapseButton;

  await expect(collapseButton).toBeVisible({ timeout: 30000 });

  if (await collapseButton.isVisible()) {
    console.log('Archived Delegated Collapse button is visible');
  }

  await expect(collapseButton).toBeEnabled({ timeout: 30000 });
  await expect(collapseButton).toHaveText(/Collapse/i);

  await collapseButton.click({ timeout: 30000 });

  await expect(collapseButton).toBeHidden({ timeout: 30000 });

  console.log('Archived Delegated Collapse button is not visible after collapsing');
});


// ─── Archived Non Delegated Expand / Collapse (Mobile Only) ──────────────────

test('Verify that the Archived Non Delegated Expand button is visible and clickable - Mobile & Tablet Only', async ({ page, isMobile }) => {

  test.skip(!isMobile, 'Runs only on Mobile/Tablet');

  await reportPanelPage.clickSidebarToggle();
  await reportPanelPage.clickGovtInsuringLink();

  await govtInsuringPage.clickViewArchivedAndPaid();

  const expandButton = govtInsuringPage.archivedNonDelegatedExpandButton;

  await expect(expandButton).toBeVisible({ timeout: 30000 });

  if (await expandButton.isVisible({ timeout: 30000 })) {
    console.log('Archived Non Delegated Expand button is visible');
  }

  await expect(expandButton).toBeEnabled({ timeout: 30000 });
  await expect(expandButton).toHaveText(/Expand/i);

  await govtInsuringPage.clickArchivedNonDelegatedExpand();
});


test('Verify that the Archived Non Delegated Collapse button is visible and clickable after expanding - Mobile & Tablet Only', async ({ page, isMobile }) => {

  test.skip(!isMobile, 'Runs only on Mobile/Tablet');

  await reportPanelPage.clickSidebarToggle();
  await reportPanelPage.clickGovtInsuringLink();

  await govtInsuringPage.clickViewArchivedAndPaid();

  await expect(govtInsuringPage.archivedNonDelegatedExpandButton).toBeVisible({ timeout: 30000 });
  await expect(govtInsuringPage.archivedNonDelegatedExpandButton).toBeEnabled({ timeout: 30000 });

  await govtInsuringPage.clickArchivedNonDelegatedExpand();

  const collapseButton = govtInsuringPage.archivedNonDelegatedCollapseButton;

  await expect(collapseButton).toBeVisible({ timeout: 30000 });

  if (await collapseButton.isVisible()) {
    console.log('Archived Non Delegated Collapse button is visible');
  }

  await expect(collapseButton).toBeEnabled({ timeout: 30000 });
  await expect(collapseButton).toHaveText(/Collapse/i);

  await collapseButton.click({ timeout: 30000 });

  await expect(collapseButton).toBeHidden({ timeout: 30000 });

  console.log('Archived Non Delegated Collapse button is not visible after collapsing');
});