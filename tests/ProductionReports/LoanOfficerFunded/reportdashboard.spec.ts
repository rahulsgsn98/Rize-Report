import { test, expect } from '@playwright/test';
import { ReportPanelPage } from '@pages/reportpanelpage';
import { LoanOfficerFundedPage } from '@pages/ProductionReportsPages/LoanOfficerFundedpage';
import { ReportDashboardPage } from '@pages/reportdashboardpage';
import { TestConfig } from '@config';
import { handleContinueLogin } from "@utils/sessionGuard";



let reportDashboardPage: ReportDashboardPage;
let config: TestConfig;

test.beforeEach(async ({ page }) => {

    reportDashboardPage = new ReportDashboardPage(page);
    config = new TestConfig();
    await page.goto(config.appUrl,{
        waitUntil: 'domcontentloaded',
        timeout:90_000
    }
        
        
    );
    await handleContinueLogin(page);

   const appRoot = page.locator('#app');

  // wait for app root at least
  await appRoot.waitFor({ state: 'visible', timeout: 30000 });

});



test('Verify that the welcome dashboard heading is displayed', async ({page}) => {

   


    expect(await reportDashboardPage.isWelcomeDashboardHeadingDisplayed()).toBeTruthy();


    expect(await reportDashboardPage.getWelcomeDashboardHeadingText()).toBe('Welcome to the Rize Reporting Portal!');

    console.log(await page.title());

})


test('Verify email and get the email from the profile dropdown', async ({page}) => {

    await reportDashboardPage.clickProfile();

    expect(await reportDashboardPage.verifyProfileEmailIsDisplayed()).toBeTruthy();

    const email = await reportDashboardPage.getProfileEmail();
    expect(email).toBe(config.email);
});




/* test('Verify logout visibility and perform logout', async ({page}) => {

    await reportDashboardPage.clickProfile();
    expect(await reportDashboardPage.verifyProfileLogoutIsDisplayed()).toBeTruthy();
    await reportDashboardPage.clickLogout();

    console.log('Logout successful, current page title:', await page.title());
}); */




