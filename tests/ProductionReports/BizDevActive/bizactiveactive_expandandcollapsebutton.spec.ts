import { test, expect } from '@playwright/test';
import { ReportPanelPage } from '@pages/reportpanelpage';
import { BizDevActivePage } from '@pages/ProductionReportsPages/BizDevActivepage';
import { ReportDashboardPage } from '@pages/reportdashboardpage';
import { TestConfig } from '@config';
import { handleContinueLogin } from "@utils/sessionGuard";

let reportDashboardPage: ReportDashboardPage;
let config: TestConfig;
let reportPanelPage: ReportPanelPage;
let bizDevActivePage: BizDevActivePage;

test.beforeEach(async ({ page }) => {

    reportPanelPage = new ReportPanelPage(page);
    bizDevActivePage = new BizDevActivePage(page);
    reportDashboardPage = new ReportDashboardPage(page);
    config = new TestConfig();

    await page.goto(config.appUrl, {
      waitUntil: 'domcontentloaded',
      timeout: 60_000
    });
    await handleContinueLogin(page);
     const appRoot = page.locator('#app');

  // wait for app root at least
  await appRoot.waitFor({ state: 'visible', timeout: 30000 });
});


test('Verify that the Expand button is visible and clickable', async ({ page }) => {

await reportPanelPage.clickSidebarToggle();
await reportPanelPage.clickBizDevActiveLink();



const expandButton = bizDevActivePage.activereportexpandButton;
await expect(expandButton).toBeVisible({timeout:30000});
if (await expandButton.isVisible({timeout:30000})) {
    console.log("Expand button is visible");
}
await expect(expandButton).toBeEnabled({timeout:30000});
await expect(expandButton).toHaveText(/Expand/i);

await bizDevActivePage.clickactivereportExpand();

});


test('Expand/Collapse - Mobile & Tablet Only', async ({ page, isMobile }, testInfo) => {

  test.skip(!isMobile, 'Runs only on Mobile/Tablet');

await reportPanelPage.clickSidebarToggle();
await reportPanelPage.clickBizDevActiveLink();



const expandButton = bizDevActivePage.loaninvestorexpendButton;
await expect(expandButton).toBeVisible({timeout:30000});
if (await expandButton.isVisible({timeout:30000})) {
    console.log("Expand button is visible");
}
await expect(expandButton).toBeEnabled({timeout:30000});
await expect(expandButton).toHaveText(/Expand/i);

await bizDevActivePage.clickloaninvestorExpand();
});


// Additional tests for collapse functionality can be added similarly, ensuring to check the state of the buttons and the visibility of the content after each action.

test('Verify that the active report Collapse button is visible and clickable after expanding', async ({ page }) => {

await reportPanelPage.clickSidebarToggle();
await reportPanelPage.clickBizDevActiveLink();


await expect(bizDevActivePage.activereportexpandButton).toBeVisible({timeout:30000});
await expect(bizDevActivePage.activereportexpandButton).toBeEnabled({timeout:30000});

await bizDevActivePage.clickactivereportExpand();

const collapseButton = bizDevActivePage.activereportcollapseButton;
await expect(collapseButton).toBeVisible({timeout:30000});
if (await collapseButton.isVisible({timeout:30000})) {
    console.log("Collapse button is visible");
}

await expect(collapseButton).toBeEnabled({timeout:30000});
await expect(collapseButton).toHaveText(/Collapse/i);
await expect(collapseButton).toBeVisible({timeout:30000});

await collapseButton.click({timeout:30000});

await expect(collapseButton).toBeHidden({timeout:30000});

console.log("Collapse button is not visible after collapsing");
});


test('Verify that the Investor Collapse button is visible and clickable after expanding', async ({ page, isMobile }, testInfo) => {

  test.skip(!isMobile, 'Runs only on Mobile/Tablet');

await reportPanelPage.clickSidebarToggle();
await reportPanelPage.clickBizDevActiveLink();



expect(bizDevActivePage.activereportexpandButton).toBeVisible({timeout:30000});
expect(bizDevActivePage.activereportexpandButton).toBeEnabled({timeout:30000});

await bizDevActivePage.clickloaninvestorExpand();

const collapseButton = bizDevActivePage.loaninvestorcollapseButton;
await expect(collapseButton).toBeVisible({ timeout: 30000 });
if (await collapseButton.isVisible({timeout:30000})) {
    console.log("Investor Collapse button is visible");
}
await expect(collapseButton).toBeEnabled({timeout:30000});
await expect(collapseButton).toHaveText(/Collapse/i);

await expect(collapseButton).toBeVisible({timeout:30000});

await collapseButton.click({timeout:30000});

await expect(collapseButton).toBeHidden({timeout:30000});

console.log("Collapse button is not visible after collapsing");

});