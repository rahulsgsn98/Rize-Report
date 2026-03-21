import { Page, Locator, expect } from "@playwright/test";
import { normalizeBranch } from "../utils/normalizebranch";

export class LoanOfficerActivePage {
  readonly page: Page;

  readonly heading: Locator;
  readonly divisionDropdown: Locator;
  readonly submitButton: Locator;
  readonly openFilterButton: Locator;
  readonly activeReportExpandButton: Locator;
  readonly branchDropdown: Locator;
  readonly loanOfficerDropdown: Locator;
  readonly channelNameDropdown: Locator;
  readonly statusTypeDropdown: Locator;

  readonly loanInvestorExpandButton: Locator;

  readonly activeReportCollapseButton: Locator;
  readonly loanInvestorCollapseButton: Locator;

  readonly countryMap: Locator;
  readonly mapArrowIcon: Locator;

  readonly activeReportTable: Locator;
  readonly loanStatusReportTable: Locator;
  readonly activeLoanChannelReportTable: Locator;
  readonly activeProductNameReportTable: Locator;
  readonly activeLoanPurposeReportTable: Locator;
  readonly activeLoanInvestorReportTable: Locator;

  readonly activeLoanStatusChart: Locator;
  readonly activeLoanChannelChart: Locator;
  readonly activeProductNameChart: Locator;
  readonly activeLoanPurposeChart: Locator;
  readonly activeLoanInvestorChart: Locator;

  readonly activeLoanDesktopRefresh: Locator;
  readonly activeLoanMobileRefresh: Locator;

  readonly clearButton: Locator;

  // repeated locators moved global
  readonly activeReportFirstRow: Locator; // update if row container changes -> done 
  readonly specificMapLocation: Locator; // update if map path changes -> done 
  readonly listBox: Locator; // update if dropdown list container changes > done 

  readonly divisionSearchBox: Locator; // update if multiselect input changes
  readonly branchSearchBox: Locator; // update if multiselect input changes
  readonly loanOfficerSearchBox: Locator; // update if multiselect input changes
  readonly channelNameSearchBox: Locator; // update if multiselect input changes
  readonly statusTypeSearchBox:Locator


  readonly divisionCells: Locator; // update if data-key changes
  readonly branchCells: Locator; // update if data-key changes
  readonly loanOfficerCells: Locator; // update if data-key changes

  constructor(page: Page) {
    this.page = page;

    this.heading = page.getByRole("link", { name: /Loan Officer - Active/i });

    this.divisionDropdown = page.getByRole("combobox").nth(0);
    this.branchDropdown = page.getByRole("combobox").nth(1);
    this.loanOfficerDropdown = page.getByRole("combobox").nth(2);
    this.channelNameDropdown = page.getByRole("combobox").nth(3);
    this.statusTypeDropdown = page.getByRole("combobox").nth(4);

    this.submitButton = page.getByRole("button", { name: /Submit|Apply/i });
    this.openFilterButton = page.getByRole("button", { name: "Open Filters" });
    this.clearButton = page.getByRole("button", { name: /Clear/i });

    this.activeReportExpandButton = page.locator("button").filter({ hasText: "Expand" }).first();
    this.loanInvestorExpandButton = page.locator("button").filter({ hasText: "Expand" }).last();

    this.activeReportCollapseButton = page.locator("button").filter({ hasText: "Collapse" }).first();
    this.loanInvestorCollapseButton = page.locator("button").filter({ hasText: "Collapse" }).last();

    this.countryMap = page.locator("#countyMap");
    this.mapArrowIcon = page.locator('#countyMap path[fill="#f7f7f7"][stroke="#636363"]').last();

    this.activeReportTable = page.locator("div.table-container");
    this.loanStatusReportTable = page.locator("div.table-wrapper").nth(0);
    this.activeLoanChannelReportTable = page.locator("div.table-wrapper").nth(1);
    this.activeProductNameReportTable = page.locator("div.table-wrapper").nth(2);
    this.activeLoanPurposeReportTable = page.locator("div.table-wrapper").nth(3);
    this.activeLoanInvestorReportTable = page.locator("div.table-wrapper").nth(4);

    this.activeLoanStatusChart = page.locator("div.chart-container").nth(0);
    this.activeLoanChannelChart = page.locator("div.chart-container").nth(1);
    this.activeProductNameChart = page.locator("div.chart-container").nth(2);
    this.activeLoanPurposeChart = page.locator("div.chart-container").nth(3);
    this.activeLoanInvestorChart = page.locator("div.chart-container").nth(4);

    this.activeLoanDesktopRefresh = page.locator('strong:visible');
    this.activeLoanMobileRefresh = page.locator("div[class='lo-mobile-refresh'] span")

    // repeated locators
    this.activeReportFirstRow = page.getByText('Loan Officer Name ↑↓', { exact: true });
    this.specificMapLocation = page.locator("#countyMap path.sm_state_30099");
    this.listBox = page.locator('ul[role="listbox"]');

    this.divisionSearchBox = this.divisionDropdown.locator("input.multiselect__input");
    this.branchSearchBox = this.branchDropdown.locator("input.multiselect__input");
    this.loanOfficerSearchBox = this.loanOfficerDropdown.locator("input.multiselect__input");
    this.channelNameSearchBox = this.channelNameDropdown.locator("input.multiselect__input");
    this.statusTypeSearchBox = this.statusTypeDropdown.locator("input.multiselect__input");

    this.divisionCells = page.locator('td[data-key="DivisionName"]');
    this.branchCells = page.locator('td[data-key="BranchName"]');
    this.loanOfficerCells = page.locator('td[data-key="LoanOfficers"]');
  }

  async waitForLoanOfficerActiveFiltersApi(): Promise<void> {
  await this.page.waitForResponse(
    response =>
      response.url().includes('/api/Reporting/GeLoanOfficerActiveFilters') &&
      response.status() === 200
  );
}

  async waitForGridToLoad(): Promise<void> {
    await this.activeReportFirstRow.waitFor({state:'visible'});
  }

  async openFiltersIfMobile(): Promise<void> {
    if (await this.openFilterButton.isVisible({ timeout: 3000 }).catch(() => false)) {
      await this.openFilterButton.click({ force: true });
    }
  }

  async waitForRefreshDateTimeToBeVisible(): Promise<void> {
    await Promise.race([
      this.activeLoanDesktopRefresh.waitFor({ state: "visible", timeout: 10000 }),
      this.activeLoanMobileRefresh.waitFor({ state: "visible", timeout: 10000 }),
    ]);
  }

  async isRefreshDateTimeDisplayed(): Promise<boolean> {
    return (
      await this.activeLoanDesktopRefresh.isVisible().catch(() => false)
    ) || (
      await this.activeLoanMobileRefresh.isVisible().catch(() => false)
    );
  }

  async isLoanStatusChartVisible(): Promise<boolean> {
    await this.page.waitForLoadState("networkidle");
    await expect(this.activeLoanStatusChart).toBeVisible({ timeout: 10000 });
    return await this.activeLoanStatusChart.isVisible();
  }

  async isLoanChannelChartVisible(): Promise<boolean> {
    await this.page.waitForLoadState("networkidle");
    await expect(this.activeLoanChannelChart).toBeVisible({ timeout: 10000 });
    return await this.activeLoanChannelChart.isVisible();
  }

  async isProductNameChartVisible(): Promise<boolean> {
    await this.page.waitForLoadState("networkidle");
    await expect(this.activeProductNameChart).toBeVisible({ timeout: 10000 });
    return await this.activeProductNameChart.isVisible();
  }

  async isLoanPurposeChartVisible(): Promise<boolean> {
    await this.page.waitForLoadState("networkidle");
    await expect(this.activeLoanPurposeChart).toBeVisible({ timeout: 10000 });
    return await this.activeLoanPurposeChart.isVisible();
  }

  async isLoanInvestorChartVisible(): Promise<boolean> {
    await this.page.waitForLoadState("networkidle");
    await expect(this.activeLoanInvestorChart).toBeVisible({ timeout: 10000 });
    return await this.activeLoanInvestorChart.isVisible();
  }

  async isActiveReportTableVisible(): Promise<boolean> {
    await this.page.waitForLoadState("networkidle");
    await expect(this.activeReportTable).toBeVisible({ timeout: 10000 });
    return await this.activeReportTable.isVisible();
  }

  async isLoanStatusReportTableVisible(): Promise<boolean> {
    await this.page.waitForLoadState("networkidle");
    await expect(this.loanStatusReportTable).toBeVisible({ timeout: 10000 });
    return await this.loanStatusReportTable.isVisible();
  }

  async isLoanChannelReportTableVisible(): Promise<boolean> {
    await this.page.waitForLoadState("networkidle");
    await expect(this.activeLoanChannelReportTable).toBeVisible({ timeout: 10000 });
    return await this.activeLoanChannelReportTable.isVisible();
  }

  async isProductNameReportTableVisible(): Promise<boolean> {

    await this.page.waitForLoadState("networkidle");

    await expect(this.activeProductNameReportTable).toBeVisible({ timeout: 10000 });
    return await this.activeProductNameReportTable.isVisible();
  }

  async isLoanPurposeReportTableVisible(): Promise<boolean> {
    await this.page.waitForLoadState("networkidle");
    await expect(this.activeLoanPurposeReportTable).toBeVisible({ timeout: 10000 });
    return await this.activeLoanPurposeReportTable.isVisible();
  }

  async isLoanInvestorReportTableVisible(): Promise<boolean> {
    await this.page.waitForLoadState("networkidle");
    await expect(this.activeLoanInvestorReportTable).toBeVisible({ timeout: 10000 });
    return await this.activeLoanInvestorReportTable.isVisible();
  }

  async isCountryMapVisible(): Promise<boolean> {
    await this.page.waitForLoadState("networkidle");
    await expect(this.countryMap).toBeVisible({ timeout: 10000 });
    return await this.countryMap.isVisible();
  }

  async clickOnCountryMap(): Promise<void> {
    await this.page.waitForLoadState("networkidle");
    await expect(this.countryMap).toBeVisible({ timeout: 10000 });

    await expect(this.specificMapLocation).toBeVisible({ timeout: 10000 });

    await this.specificMapLocation.hover();
    await this.specificMapLocation.click();

    console.log("Clicked on specific location in country map");
  }

  async isMapInLargeView(): Promise<boolean> {
    await expect(this.countryMap).toBeVisible();
    await expect(this.mapArrowIcon).toBeVisible({ timeout: 10000 });

    try {
      await this.mapArrowIcon.waitFor({ state: "visible", timeout: 10000 });
      return true;
    } catch (error) {
      console.error("Error occurred while checking map view:", error);
      return false;
    }
  }

  async clickActiveReportExpand(): Promise<void> {
    await this.waitForGridToLoad();

    

    if (await this.activeReportExpandButton.isVisible().catch(() => false)) {
      await this.activeReportExpandButton.click();
      console.log("🔍 Active report Expand button clicked");
    }
  }

  async clickLoanInvestorExpand(): Promise<void> {
    await this.waitForGridToLoad();

    if (await this.loanInvestorExpandButton.isVisible().catch(() => false)) {
      await this.loanInvestorExpandButton.click();
      console.log("🔍 Loan investor Expand button clicked");
    }
  }

  async clickClear(): Promise<void> {
    // mobile
     await this.waitForGridToLoad();

   await this.page.waitForLoadState("networkidle");
    if (await this.openFilterButton.isVisible({ timeout: 5000 })) {
      await this.openFilterButton.click({ force: true });
    }

    // Click the Clear button
    await expect(this.clearButton).toBeVisible({ timeout: 5000 });
    await expect(this.clearButton).toBeEnabled({ timeout: 5000 });

    await this.clearButton.click({ force: true });

    console.log("🧹 Clear button clicked, filters reset");
  }

  async selectDivisionNames(divisions: string[]): Promise<void> {
    // mobile
   await this.page.waitForLoadState("networkidle");
    if (await this.openFilterButton.isVisible({ timeout: 5000 })) {
      await this.openFilterButton.click({ force: true });
      expect(this.divisionDropdown).toBeVisible()

    }

    await this.divisionDropdown.click({ timeout: 5000 });

    for (const division of divisions) {
      await this.divisionSearchBox.click();
      await this.divisionSearchBox.fill(division);

      await this.listBox
        .getByRole("option", { name: division })
        .click();
    }
  }

  // select status Type 

  async statusTypeSelection(statusTypes: string[]): Promise<void> {
  // mobile
  await this.page.waitForLoadState("networkidle");
  if (await this.openFilterButton.isVisible({ timeout: 5000 })) {
    await this.openFilterButton.click({ force: true });
    await expect(this.statusTypeDropdown).toBeVisible();
  }

  await this.statusTypeDropdown.click({ timeout: 5000 });

  for (const statusType of statusTypes) {
    await this.statusTypeSearchBox.click();
    await this.statusTypeSearchBox.fill(statusType);

    await this.listBox
      .getByRole("option", { name: statusType })
      .click();
  }
}
// verify status 
 async verifyStatusTypeData(expectedStatusTypes: string[]): Promise<void> {
  await this.waitForGridToLoad();
  await this.page.waitForLoadState('networkidle');

  if (await this.activeReportExpandButton.isVisible().catch(() => false)) {
    await this.activeReportExpandButton.click({ force: true });
  }

  const groupHeaders = await this.page
    .locator('table thead tr:first-child th[data-group]')
    .allTextContents();

  const cleanGroupHeaders = groupHeaders
    .map(header => header.trim())
    .filter(header => header && header !== 'Total');

  for (const statusType of expectedStatusTypes) {
    const isMatch = cleanGroupHeaders.some(
      actual => actual.toLowerCase() === statusType.trim().toLowerCase()
    );

    if (!isMatch) {
      console.log('❌ Expected status type header not found:', statusType);
      throw new Error(`Expected status type header not found in table: ${statusType}`);
    }

    console.log('✅ Valid status type header:', statusType);
  }
}

   // ✅ Submit / Apply (desktop + mobile)
  async clickSubmit(): Promise<void> {
  await Promise.all([
    this.page.waitForLoadState('networkidle'),
    this.submitButton.click({timeout: 5000 }),
  ]);
}
  async verifyDivisionData(expectedDivisions: string[]): Promise<void> {
    await this.waitForGridToLoad();
   await this.page.waitForLoadState('networkidle')

    if (await this.activeReportExpandButton.isVisible().catch(() => false)) {
    await  expect(this.activeReportExpandButton).toBeVisible()
      await this.activeReportExpandButton.click({ force: true });
    }

    await this.waitForGridToLoad();

    const allDivisions = await this.divisionCells.allTextContents();

    for (const division of allDivisions) {
      const cleanDivision = division.trim();

      if (!cleanDivision) continue;

      if (!expectedDivisions.includes(cleanDivision)) {
        console.log("❌ Unexpected division found:", cleanDivision);
        throw new Error(`Unexpected division in table: ${cleanDivision}`);
      }

      console.log("✅ Valid division:", cleanDivision);
    }
  }

  async branchSelection(branchNames: string[]): Promise<void> {
    await this.waitForGridToLoad();
   await this.page.waitForLoadState('networkidle')
   // Mobile filter support
    if (await this.openFilterButton.isVisible()) {
      await this.openFilterButton.click();
    }

    await this.branchDropdown.click({ timeout: 5000 });

    for (const branch of branchNames) {
      await this.branchSearchBox.click();
      await this.branchSearchBox.fill(branch);

      await this.listBox
        .getByRole("option", { name: branch })
        .click();
    }
  }

  async verifyBranchData(expectedBranches: string[]): Promise<void> {
    await this.waitForGridToLoad();
    await this.page.waitForLoadState('networkidle')

    if (await this.activeReportExpandButton.isVisible().catch(() => false)) {
      await this.activeReportExpandButton.click({ force: true });
    }

    const allBranches = await this.branchCells.allTextContents();

    for (const branch of allBranches) {
      const cleanActual = normalizeBranch(branch);

      if (!cleanActual) continue;

      const isMatch = expectedBranches.some(expected => normalizeBranch(expected) === cleanActual);

      if (!isMatch) {
        console.log("❌ Unexpected branch found:", cleanActual);
        throw new Error(`Unexpected branch in table: ${cleanActual}`);
      }

      console.log("✅ Valid branch:", cleanActual);
    }
  }

  async loanOfficerSelection(loanOfficerNames: string[]): Promise<void> {

 // await this.waitForLoanOfficerActiveFiltersApi();

 await this.page.waitForLoadState('networkidle')

  
 // Mobile filter support
  // Mobile filter support
  if (await this.openFilterButton.isVisible({ timeout: 5000 })) {
   await expect(this.openFilterButton).toBeVisible()
    await this.openFilterButton.click();
    await expect(this.loanOfficerDropdown).toBeVisible({ timeout: 10000 });
  }
  await expect(this.loanOfficerDropdown).toBeVisible()
 await expect(this.loanOfficerDropdown).toBeEnabled() 
  await this.loanOfficerDropdown.click();

  for (const loanOfficer of loanOfficerNames) {
    await this.loanOfficerSearchBox.click();
    await this.loanOfficerSearchBox.fill(loanOfficer);

    await this.listBox
      .getByRole("option", { name: loanOfficer })
      .click();
  }
}

  async verifyLoanOfficerData(expectedLoanOfficers: string[]): Promise<void> {
    await this.waitForGridToLoad();

    if (await this.activeReportExpandButton.isVisible().catch(() => false)) {
      await this.activeReportExpandButton.click({ force: true });
    }

    const allLoanOfficers = await this.loanOfficerCells.allTextContents();

    for (const loanOfficer of allLoanOfficers) {
      const cleanLoanOfficer = loanOfficer.trim();

      if (!cleanLoanOfficer || cleanLoanOfficer === "Total") continue;

      if (!expectedLoanOfficers.includes(cleanLoanOfficer)) {
        console.log("❌ Unexpected loan officer found:", cleanLoanOfficer);
        throw new Error(`Unexpected loan officer in table: ${cleanLoanOfficer}`);
      }

      console.log("✅ Valid loan officer:", cleanLoanOfficer);
    }
  }

  async channelNameSelection(channelNames: string[]): Promise<void> {
    await this.waitForGridToLoad();
   await this.page.waitForLoadState('networkidle')

  
 // Mobile filter support
  // Mobile filter support
  if (await this.openFilterButton.isVisible({ timeout: 5000 })) {
   await expect(this.openFilterButton).toBeVisible()
    await this.openFilterButton.click();
    await expect(this.channelNameDropdown).toBeVisible({ timeout: 10000 });
  }
    await this.channelNameDropdown.click({ timeout: 5000 });

    for (const channelName of channelNames) {
      await this.channelNameSearchBox.click();
      await this.channelNameSearchBox.fill(channelName);

      await this.listBox
        .getByRole("option", { name: channelName, exact: true })
        .click();
    }
  }
}