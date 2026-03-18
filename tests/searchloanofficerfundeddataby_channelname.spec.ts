import { test, expect } from "@playwright/test";
import { LoanOfficerFundedPage } from "../pages/LoanOfficer-Fundedpage";
import { TestConfig } from "../test.config";
import { ReportPanelPage } from "../pages/reportpanelpage";

const config = new TestConfig();

// multiple test datasets
const channelNameSets = [
  ["Delegated"],
  ["Non-Delegated", "Brokered", "Delegated"],
];

channelNameSets.forEach((channelNameSet) => {

  test(`Search Loan Officer Funded: ${channelNameSet.join(", ")}`, async ({ page }) => {
    test.slow();

    const loanPage = new LoanOfficerFundedPage(page);
    const reportPanelPage = new ReportPanelPage(page);

    // ✅ Fix 1: proper goto wait
    await page.goto(config.appUrl, {
      waitUntil: 'domcontentloaded',
      timeout:60_000
    });

    // ✅ Navigate first
    await reportPanelPage.clickSidebarToggle();
    await reportPanelPage.clickLoanOfficerFundedLink();

    // ✅ Now check heading (correct place)
    await expect(loanPage.heading).toBeVisible();

    // ✅ Perform actions
    await loanPage.channelNameSelection(channelNameSet);

    await loanPage.clickSubmit();

   // await loanPage.verifyChannelNameData(channelNameSet);

  });

});