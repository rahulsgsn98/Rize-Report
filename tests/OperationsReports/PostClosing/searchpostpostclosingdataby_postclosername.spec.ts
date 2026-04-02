import { test, expect } from '@playwright/test';
import { ReportPanelPage } from '@pages/reportpanelpage';
import { PostClosingPage } from '@pages/OperationsReportsPages/PostClosingpage';
import { TestConfig } from '@config';
import { handleContinueLogin } from "@utils/sessionGuard";

const config = new TestConfig();

// multiple test datasets
const postCloserSets = [
  ['Lindy Osten'],
 // ['John Doe', 'Jane Smith'],
];

postCloserSets.forEach((postCloserSet) => {

  test(`Search Post Closing by post closer: ${postCloserSet.join(', ')}`, async ({ page }) => {
    test.slow();

    const postClosingPage = new PostClosingPage(page);
    const reportPanelPage = new ReportPanelPage(page);

    await page.goto(config.appUrl, {
      waitUntil: 'domcontentloaded',
      timeout: 60_000
    });
    await handleContinueLogin(page);

    const appRoot = page.locator('#app');

    await appRoot.waitFor({ state: 'visible', timeout: 30000 });

    await reportPanelPage.clickSidebarToggle();
    await reportPanelPage.clickPostClosingLink();

    await postClosingPage.postCloserSelection(postCloserSet);

    await postClosingPage.clickSubmit();

    await postClosingPage.verifyPostCloserNameData(postCloserSet);

  });

});