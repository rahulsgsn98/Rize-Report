import { test, expect } from '@playwright/test';
import { ReportPanelPage } from '@pages/reportpanelpage';
import { LoanOfficerActivePage } from '@pages/LoanOfficerActivepage';
import { ReportDashboardPage } from '@pages/reportdashboardpage';
import { TestConfig } from '@config';

let reportDashboardPage: ReportDashboardPage;
let config: TestConfig;
let reportPanelPage: ReportPanelPage;
let loanOfficerActivePage: LoanOfficerActivePage;

test.beforeEach(async ({ page }) => {

    reportPanelPage = new ReportPanelPage(page);
    loanOfficerActivePage = new LoanOfficerActivePage(page);
    reportDashboardPage = new ReportDashboardPage(page);
    config = new TestConfig();
   // ✅ Fix 1: proper goto wait
    await page.goto(config.appUrl, {
      waitUntil: 'networkidle',
      timeout:60_000
    });
});


test('Verify that the Expand button is visible and clickable', async ({ page }) => {

   // test.slow();
// Navigate to Loan Officer Active page
await reportPanelPage.clickSidebarToggle();
await reportPanelPage.clickLoanOfficerActiveLink();

// Wait for the page to load
await page.waitForLoadState('networkidle');
// Verify that the Expand button is visible
const expandButton = loanOfficerActivePage.activeReportExpandButton;
await expect(expandButton).toBeVisible();
if(await expandButton.isVisible()){
    console.log("Expand button is visible");
}
await expect(expandButton).toBeEnabled();
await expect(expandButton).toHaveText(/Expand/i);

// Click the Expand button
await loanOfficerActivePage.clickActiveReportExpand();



});


test('Expand/Collapse - Mobile & Tablet Only', async ({ page, isMobile }, testInfo) => {

  // Skip Desktop
  test.skip(!isMobile, 'Runs only on Mobile/Tablet');

// Navigate to Loan Officer Active page
await reportPanelPage.clickSidebarToggle();
await reportPanelPage.clickLoanOfficerActiveLink();

// Wait for the page to load
await page.waitForLoadState('networkidle');
// Verify that the Expand button is visible
const expandButton = loanOfficerActivePage.loanInvestorExpandButton;
await expect(expandButton).toBeVisible();
if(await expandButton.isVisible()){
    console.log("Expand button is visible");
}
await expect(expandButton).toBeEnabled();
await expect(expandButton).toHaveText(/Expand/i);

await loanOfficerActivePage.clickLoanInvestorExpand();
});





// Additional tests for collapse functionality can be added similarly, ensuring to check the state of the buttons and the visibility of the content after each action.

test('Verify that the active report Collapse button is visible and clickable after expanding', async ({ page }) => {

   // test.slow();
// Navigate to Loan Officer Active page
await reportPanelPage.clickSidebarToggle();
await reportPanelPage.clickLoanOfficerActiveLink();

// Wait for the page to load
await page.waitForLoadState('networkidle');
// Expand first
await  expect(loanOfficerActivePage.activeReportExpandButton).toBeVisible()
await  expect(loanOfficerActivePage.activeReportExpandButton).toBeEnabled()

await loanOfficerActivePage.clickActiveReportExpand();
// Verify that the Collapse button is visible
const collapseButton = loanOfficerActivePage.activeReportCollapseButton;
await expect(collapseButton).toBeVisible();
if(await collapseButton.isVisible()){
    console.log("Collapse button is visible");
}

await expect(collapseButton).toBeEnabled();
await expect(collapseButton).toHaveText(/Collapse/i);
await expect(collapseButton).toBeVisible();

await collapseButton.click({ force: true });

await expect(collapseButton).toBeHidden();

// Optional log
console.log("Collapse button is not visible after collapsing");
});


test('Verify that the Investor Collapse button is visible and clickable after expanding',async ({ page, isMobile }, testInfo) => {

  // Skip Desktop
  test.skip(!isMobile, 'Runs only on Mobile/Tablet');
// Navigate to Loan Officer Active page
await reportPanelPage.clickSidebarToggle();
await reportPanelPage.clickLoanOfficerActiveLink();




// Wait for the page to load
await page.waitForLoadState('networkidle');
// Expand first

expect(loanOfficerActivePage.activeReportExpandButton).toBeVisible()
expect(loanOfficerActivePage.activeReportExpandButton).toBeEnabled()

await loanOfficerActivePage.clickLoanInvestorExpand();
// Verify that the Collapse button is visible
const collapseButton = loanOfficerActivePage.loanInvestorCollapseButton;
await expect(collapseButton).toBeVisible({timeout: 5000});
if(await collapseButton.isVisible()){
    console.log("Investor Collapse button is visible");
}
await expect(collapseButton).toBeEnabled();
await expect(collapseButton).toHaveText(/Collapse/i);

await expect(collapseButton).toBeVisible();


await collapseButton.click();

await expect(collapseButton).toBeHidden({timeout:10000});

// Optional log
console.log("Collapse button is not visible after collapsing");

});