import { test } from '@playwright/test';
import { ReportPanelPage } from '@pages/reportpanelpage';
import { PostClosingManagerPage } from '@pages/OperationsReportsPages/PostClosingManagerpage';
import { TestConfig } from '@config';
import { handleContinueLogin } from "@utils/sessionGuard";

const config = new TestConfig();

const statusSets = [
  ['To Be Purchased'],
  ['Suspense Conditions Submitted', 'Loan Shipped'],
];

statusSets.forEach((statusSet) => {

  test(`Search Post Closing Manager by status: ${statusSet.join(', ')}`, async ({ page }) => {
    test.slow();

    const postClosingManagerPage = new PostClosingManagerPage(page);
    const reportPanelPage = new ReportPanelPage(page);

    await page.goto(config.appUrl, {
      waitUntil: 'domcontentloaded',
      timeout: 60_000
    });
    await handleContinueLogin(page);

    const appRoot = page.locator('#app');
    await appRoot.waitFor({ state: 'visible', timeout: 30000 });

    await reportPanelPage.clickSidebarToggle();
    await reportPanelPage.clickPostClosingManagerLink();

    await postClosingManagerPage.statusSelection(statusSet);

    await postClosingManagerPage.clickSubmit();

    await postClosingManagerPage.verifyProductionStatusData(statusSet);
  });

});