import { test, expect } from "@playwright/test";
import { ReportDashboardPage } from "../pages/reportdashboardpage";

import { TestConfig } from "../test.config";



let reportDashboardPage: ReportDashboardPage;
let config: TestConfig;

test.beforeEach(async ({ page }) => {

    reportDashboardPage = new ReportDashboardPage(page);
    config = new TestConfig();
    await page.goto(config.appUrl);

    await page.waitForLoadState('domcontentloaded');

})



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




