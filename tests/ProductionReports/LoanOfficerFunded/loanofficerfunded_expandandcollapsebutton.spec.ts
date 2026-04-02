import { test, expect } from '@playwright/test';
import { ReportPanelPage } from '@pages/reportpanelpage';
import { LoanOfficerFundedPage } from '@pages/ProductionReportsPages/LoanOfficerFundedpage';
import { ReportDashboardPage } from '@pages/reportdashboardpage';
import { TestConfig } from '@config';
import { handleContinueLogin } from "@utils/sessionGuard";


let reportDashboardPage: ReportDashboardPage;
let config: TestConfig;
let reportPanelPage: ReportPanelPage;
let loanOfficerFundedPage: LoanOfficerFundedPage;

test.beforeEach(async ({ page }) => {

    reportPanelPage = new ReportPanelPage(page);
    loanOfficerFundedPage = new LoanOfficerFundedPage(page);
    reportDashboardPage = new ReportDashboardPage(page);
    config = new TestConfig();
   // ✅ Fix 1: proper goto wait
    await page.goto(config.appUrl, {
     
      timeout:60_000
    });
    await handleContinueLogin(page);
     const appRoot = page.locator('#app');

  // wait for app root at least
  await appRoot.waitFor({ state: 'visible', timeout: 30000 });
});


test('Verify that the Expand button is visible and clickable', async ({ page }) => {

   // test.slow();
// Navigate to Loan Officer Funded page
await reportPanelPage.clickSidebarToggle();
await reportPanelPage.clickLoanOfficerFundedLink();

// Wait for the page to load
// await loanOfficerFundedPage.waitForCountyMapToRender()
// Verify that the Expand button is visible
const expandButton = loanOfficerFundedPage.fundreportexpandButton;
    await expect(expandButton).toBeVisible({
    timeout:30000
});
if(await expandButton.isVisible({
    timeout:30000
})){
    console.log("Expand button is visible");
}
await expect(expandButton).toBeEnabled();
await expect(expandButton).toHaveText(/Expand/i);

// Click the Expand button
await loanOfficerFundedPage.clickfundreportExpand();



});


test('Expand/Collapse - Mobile & Tablet Only', async ({ page, isMobile }, testInfo) => {

  // Skip Desktop
  test.skip(!isMobile, 'Runs only on Mobile/Tablet');

// Navigate to Loan Officer Funded page
await reportPanelPage.clickSidebarToggle();
await reportPanelPage.clickLoanOfficerFundedLink();

// Wait for the page to load
// await loanOfficerFundedPage.waitForCountyMapToRender()
// Verify that the Expand button is visible
const expandButton = loanOfficerFundedPage.loaninvestorexpendButton;
await expect(expandButton).toBeVisible({
    timeout:30000
});
if(await expandButton.isVisible({
    timeout:30000
})){
    console.log("Expand button is visible");
}
await expect(expandButton).toBeEnabled();
await expect(expandButton).toHaveText(/Expand/i);

await loanOfficerFundedPage.clickloaninvestorExpand();
});





// Additional tests for collapse functionality can be added similarly, ensuring to check the state of the buttons and the visibility of the content after each action.

test('Verify that the fundreport Collapse button is visible and clickable after expanding', async ({ page }) => {

   // test.slow();
// Navigate to Loan Officer Funded page
await reportPanelPage.clickSidebarToggle();
await reportPanelPage.clickLoanOfficerFundedLink();

// Wait for the page to load
await loanOfficerFundedPage.waitForCountyMapToRender()
// Expand first
await loanOfficerFundedPage.clickfundreportExpand();
// Verify that the Collapse button is visible
const collapseButton = loanOfficerFundedPage.fundreportcollapseButton;
await expect(collapseButton).toBeVisible();
if(await collapseButton.isVisible({
    timeout:30000
})){
    console.log("Collapse button is visible");
}

await expect(collapseButton).toBeEnabled();
await expect(collapseButton).toHaveText(/Collapse/i);
await expect(collapseButton).toBeVisible();

await collapseButton.click({timeout:30000});

await expect(collapseButton).toBeHidden();

// Optional log
console.log("Collapse button is not visible after collapsing");
});


test('Verify that the Investor Collapse button is visible and clickable after expanding',async ({ page, isMobile }, testInfo) => {

  // Skip Desktop
  test.skip(!isMobile, 'Runs only on Mobile/Tablet');
// Navigate to Loan Officer Funded page
await reportPanelPage.clickSidebarToggle();
await reportPanelPage.clickLoanOfficerFundedLink()




// Wait for the page to load
await loanOfficerFundedPage.waitForCountyMapToRender()
// Expand first
await loanOfficerFundedPage.clickloaninvestorExpand();
// Verify that the Collapse button is visible
const collapseButton = loanOfficerFundedPage.loaninvestorcollapseButton;
await expect(collapseButton).toBeVisible({timeout: 30000});
if(await collapseButton.isVisible({
    timeout:30000
})){
    console.log("Investor Collapse button is visible");
}
await expect(collapseButton).toBeEnabled();
await expect(collapseButton).toHaveText(/Collapse/i);

await expect(collapseButton).toBeVisible({
    timeout:30000
});


await collapseButton.click({timeout:30000});

await expect(collapseButton).toBeHidden();

// Optional log
console.log("Collapse button is not visible after collapsing");

});
