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


// Verify Delegated table displays

test('Verify that the Delegated table displays correctly after click on the Govt Insuring link', async ({ page }) => {

  await reportPanelPage.clickSidebarToggle();
  await reportPanelPage.clickGovtInsuringLink();

  const isVisible = await govtInsuringPage.isDelegatedTableVisible();

  expect(isVisible).toBeTruthy();

  console.log('Delegated table displays', isVisible);
});


// Verify Non Delegated table displays

test('Verify that the Non Delegated table displays correctly after click on the Govt Insuring link', async ({ page }) => {

  await reportPanelPage.clickSidebarToggle();
  await reportPanelPage.clickGovtInsuringLink();

  const isVisible = await govtInsuringPage.isNonDelegatedTableVisible();

  expect(isVisible).toBeTruthy();

  console.log('Non Delegated table displays', isVisible);
});


// Verify Archived Delegated table displays

test('Verify that the Archived Delegated table displays correctly after clicking View Archived & Paid', async ({ page }) => {

  await reportPanelPage.clickSidebarToggle();
  await reportPanelPage.clickGovtInsuringLink();

  await govtInsuringPage.clickViewArchivedAndPaid();

  const isVisible = await govtInsuringPage.isArchivedDelegatedTableVisible();

  expect(isVisible).toBeTruthy();

  console.log('Archived Delegated table displays', isVisible);
});


// Verify Archived Non Delegated table displays

test('Verify that the Archived Non Delegated table displays correctly after clicking View Archived & Paid', async ({ page }) => {

  await reportPanelPage.clickSidebarToggle();
  await reportPanelPage.clickGovtInsuringLink();

  await govtInsuringPage.clickViewArchivedAndPaid();

  const isVisible = await govtInsuringPage.isArchivedNonDelegatedTableVisible();

  expect(isVisible).toBeTruthy();

  console.log('Archived Non Delegated table displays', isVisible);
});