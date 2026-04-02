import { Page, Locator, expect } from "@playwright/test";
import { normalizeBranch } from "../../utils/normalizebranch";

export class BranchActivePage {
  readonly page: Page;

  readonly heading: Locator;
  readonly divisionDropdown: Locator;
  readonly branchDropdown: Locator;
  readonly channelNameDropdown: Locator;
  readonly statusTypeDropdown: Locator;

  readonly divisionSearchBox: Locator;
  readonly branchSearchBox: Locator;
  readonly channelNameSearchBox: Locator;
  readonly statusTypeSearchBox: Locator;
  readonly listBox: Locator;

  readonly submitButton: Locator;
  readonly clearButton: Locator;
  readonly openFilterButton: Locator;

  readonly activeReportExpandButton: Locator;
  readonly loanInvestorExpandButton: Locator;

  readonly activeReportCollapseButton: Locator;
  readonly loanInvestorCollapseButton: Locator;

  readonly countryMap: Locator;
  readonly mapArrowIcon: Locator;
   readonly specificMapLocation: Locator

  readonly activeReportTable: Locator;
  readonly loanStatusReportTable: Locator;
  readonly loanChannelReportTable: Locator;
  readonly productNameReportTable: Locator;
  readonly loanPurposeReportTable: Locator;
  readonly loanInvestorReportTable: Locator;

  readonly loanStatusChart: Locator;
  readonly loanChannelChart: Locator;
  readonly productNameChart: Locator;
  readonly loanPurposeChart: Locator;
  readonly loanInvestorChart: Locator;

  readonly desktopRefresh: Locator;
  readonly mobileRefresh: Locator;

  readonly branchCells: Locator;

  constructor(page: Page) {
    this.page = page;

    this.heading = page.getByRole("link", { name: /Branch Active/i });

    this.divisionDropdown = page.getByRole("combobox").nth(0);
    this.branchDropdown = page.getByRole("combobox").nth(1);
    this.channelNameDropdown = page.getByRole("combobox").nth(2);
    this.statusTypeDropdown = page.getByRole("combobox").nth(3);

    this.divisionSearchBox = this.divisionDropdown.locator("input.multiselect__input");
    this.branchSearchBox = this.branchDropdown.locator("input.multiselect__input");
    this.channelNameSearchBox = this.channelNameDropdown.locator("input.multiselect__input");
    this.statusTypeSearchBox = this.statusTypeDropdown.locator("input.multiselect__input");
    this.listBox = page.locator('ul[role="listbox"]');

    this.submitButton = page.getByRole("button", { name: /Submit|Apply/i });
    this.clearButton = page.getByRole("button", { name: /Clear/i });
    this.openFilterButton = page.getByRole("button", { name: /Open Filters/i });

    this.activeReportExpandButton = page.locator("button").filter({ hasText: "Expand" }).first();
    this.loanInvestorExpandButton = page.locator("button").filter({ hasText: "Expand" }).last();

    this.activeReportCollapseButton = page.locator("button").filter({ hasText: "Collapse" }).first();
    this.loanInvestorCollapseButton = page.locator("button").filter({ hasText: "Collapse" }).last();

    this.countryMap = page.locator("#countyMap");
    this.mapArrowIcon = page.locator('#countyMap path[fill="#f7f7f7"][stroke="#636363"]').last();

    this.activeReportTable = page.locator("div.table-container");
    this.loanStatusReportTable = page.locator("div.table-wrapper").nth(0);
    this.loanChannelReportTable = page.locator("div.table-wrapper").nth(1);
    this.productNameReportTable = page.locator("div.table-wrapper").nth(2);
    this.loanPurposeReportTable = page.locator("div.table-wrapper").nth(3);
    this.loanInvestorReportTable = page.locator("div.table-wrapper").nth(4);

    this.loanStatusChart = page.locator("div.chart-container").nth(0);
    this.loanChannelChart = page.locator("div.chart-container").nth(1);
    this.productNameChart = page.locator("div.chart-container").nth(2);
    this.loanPurposeChart = page.locator("div.chart-container").nth(3);
    this.loanInvestorChart = page.locator("div.chart-container").nth(4);

    this.desktopRefresh = page.locator('div.ba-desktop-only.last-refresh-text')
    this.mobileRefresh =page.locator("div[class='ba-mobile-refresh'] span")
    this.branchCells = page.locator('td[data-key="BranchName"]').filter({
  hasNotText: 'Total'
});
      this.specificMapLocation = page.locator("#countyMap path.sm_state_30099");
  }
  async waitForCountyMapToRender(timeout = 90000): Promise<void> {
  await expect(this.countryMap).toBeVisible({ timeout });

  const holder = this.page.locator("#countyMap_holder");
  await expect(holder).toBeVisible({ timeout });
}

  async waitForGridToLoad(): Promise<void> {
    await this.page.locator("div.production-report tr").first().waitFor();
  }

  async openFiltersIfMobile(): Promise<void> {
    if (await this.openFilterButton.isVisible({ timeout: 5000 }).catch(() => false)) {
      await this.openFilterButton.click({ force: true });
    }
  }

  async waitForRefreshDateTimeToBeVisible(): Promise<void> {
    

    await Promise.race([
      this.desktopRefresh.waitFor({ state: "visible", timeout: 30000 }),
      this.mobileRefresh.waitFor({ state: "visible", timeout: 30000 }),
    ]);
  }

  async isRefreshDateTimeDisplayed(): Promise<boolean> {
    return (
      await this.desktopRefresh.isVisible({
        timeout: 30000 
      }).catch(() => false)
    ) || (
      await this.mobileRefresh.isVisible({
        timeout: 30000 
      }).catch(() => false)
    );
  }

  async isLoanStatusChartVisible(): Promise<boolean> {
   
    
    await expect(this.loanStatusChart).toBeVisible({
        timeout: 30000 
      });
    return await this.loanStatusChart.isVisible({
        timeout: 30000 
      });
  }

  async isLoanChannelChartVisible(): Promise<boolean> {
  
    await expect(this.loanChannelChart).toBeVisible({
        timeout: 30000 
      });
    return await this.loanChannelChart.isVisible({
        timeout: 30000 
      });
  }

  async isProductNameChartVisible(): Promise<boolean> {
    
    await expect(this.productNameChart).toBeVisible({
        timeout: 30000 
      });
    return await this.productNameChart.isVisible({
        timeout: 30000 
      });
  }

  async isLoanPurposeChartVisible(): Promise<boolean> {
  
    await expect(this.loanPurposeChart).toBeVisible({
        timeout: 30000 
      });
    return await this.loanPurposeChart.isVisible({
        timeout: 30000 
      });
  }

  async isLoanInvestorChartVisible(): Promise<boolean> {
   
    await expect(this.loanInvestorChart).toBeVisible({
        timeout: 30000 
      });
    return await this.loanInvestorChart.isVisible({
        timeout: 30000 
      });
  }

  async isActiveReportTableVisible(): Promise<boolean> {
   
    await expect(this.activeReportTable).toBeVisible({
        timeout: 30000 
      });
    return await this.activeReportTable.isVisible({
        timeout: 30000 
      });
  }

  async isLoanStatusReportTableVisible(): Promise<boolean> {
  
    await expect(this.loanStatusReportTable).toBeVisible({
        timeout: 30000 
      });
    return await this.loanStatusReportTable.isVisible({
        timeout: 30000 
      });
  }

  async isLoanChannelReportTableVisible(): Promise<boolean> {
    
    await expect(this.loanChannelReportTable).toBeVisible({
        timeout: 30000 
      });
    return await this.loanChannelReportTable.isVisible({
        timeout: 30000 
      });
  }

  async isProductNameReportTableVisible(): Promise<boolean> {
    
    await expect(this.productNameReportTable).toBeVisible({
        timeout: 30000 
      });
    return await this.productNameReportTable.isVisible({
        timeout: 30000 
      });
  }

  async isLoanPurposeReportTableVisible(): Promise<boolean> {
  
    await expect(this.loanPurposeReportTable).toBeVisible({
        timeout: 30000 
      });
    return await this.loanPurposeReportTable.isVisible({
        timeout: 30000 
      });
  }

  async isLoanInvestorReportTableVisible(): Promise<boolean> {
   
    await expect(this.loanInvestorReportTable).toBeVisible({
        timeout: 30000 
      });
    return await this.loanInvestorReportTable.isVisible({
        timeout: 30000 
      });
  }

 async isCountryMapVisible(): Promise<boolean> {
   await this.waitForCountyMapToRender()
    
//  await  expect(this.countrymap).toBeVisible({ timeout: 30000 });
   // return await this.countrymap.isVisible();
   return true
  }

  async clickOnCountryMap(): Promise<void> {
    // await this.waitForCountyMapToRender()
    await expect(this.countryMap).toBeVisible({
        timeout: 30000 
      })

    await expect(this.specificMapLocation).toBeVisible({ timeout: 30000})

    await this.specificMapLocation.hover(
      { timeout: 30000}
    );
    await this.specificMapLocation.click(
      { timeout: 30000}
    );

    console.log("Clicked on specific location in country map");
  }

  async isMapInLargeView(): Promise<boolean> {
   //await this.waitForCountyMapToRender()
    await expect(this.countryMap).toBeVisible(
      { timeout: 30000}
    );
    await expect(this.mapArrowIcon).toBeVisible(
      { timeout: 30000}
    );

    try {
      await this.mapArrowIcon.waitFor({ state: "visible", timeout:30000})
      return true;
    } catch (error) {
      console.error("Error occurred while checking map view:", error);
      return false;
    }
  }

  async clickActiveReportExpand(): Promise<void> {
  

    if (await this.activeReportExpandButton.isVisible({
        timeout: 30000 
      }).catch(() => false)) {
      await this.activeReportExpandButton.click({
        timeout: 30000 
      });
      console.log("Active report Expand button clicked");
    }
  }

  async clickLoanInvestorExpand(): Promise<void> {
   

    if (await this.loanInvestorExpandButton.isVisible({
        timeout: 30000 
      }).catch(() => false)) {
      await this.loanInvestorExpandButton.click({
        timeout: 30000 
      });
      console.log("Loan investor Expand button clicked");
    }
  }

  async clickClear(): Promise<void> {
   await this.waitForCountyMapToRender()
    if (await this.openFilterButton.isVisible({
        timeout: 30000 
      }).catch(() => false)) {
      await this.openFilterButton.click({
        timeout: 30000 
      });
    }

    await expect(this.clearButton).toBeVisible({
        timeout: 30000 
      });
    await expect(this.clearButton).toBeEnabled({
        timeout: 30000 
      });
    await this.clearButton.click({
        timeout: 30000 
      });

    console.log("Clear button clicked, filters reset");
  }

  async clickSubmit(): Promise<void> {
     await expect(this.submitButton).toBeVisible({timeout: 30000})
    
      await this.submitButton.click({timeout: 30000})
  }

  async selectDivisionNames(divisions: string[]): Promise<void> {
    await this.waitForCountyMapToRender()
   

    if (await this.openFilterButton.isVisible({
        timeout: 30000 
      }).catch(() => false)) {
      await this.openFilterButton.click({
        timeout: 30000 
      });
      await expect(this.divisionDropdown).toBeVisible({
        timeout: 30000 
      });
    }

    await this.divisionDropdown.click({
        timeout: 30000 
      });

    for (const division of divisions) {
      await this.divisionSearchBox.click();
      await this.divisionSearchBox.fill(division);

      await this.listBox
        .getByRole("option", { name: division })
        .click();
    }
  }

  async verifyDivisionData(expectedDivisions: string[]): Promise<void> {
   
   await this.waitForCountyMapToRender()

    if (await this.activeReportExpandButton.isVisible({
        timeout: 30000 
      }).catch(() => false)) {
      await this.activeReportExpandButton.click({
        timeout: 30000 
      });
    }

    const divisionCells = this.page.locator('td[data-key="DivisionName"]');
    const allDivisions = await divisionCells.allTextContents();

    for (const division of allDivisions) {
      const cleanDivision = division.trim();

      if (!cleanDivision || cleanDivision === "Total") continue;

      if (!expectedDivisions.includes(cleanDivision)) {
        console.log("Unexpected division found:", cleanDivision);
        throw new Error(`Unexpected division in table: ${cleanDivision}`);
      }

      console.log("Valid division:", cleanDivision);
    }
  }

  async branchSelection(branchNames: string[]): Promise<void> {
    await this.waitForCountyMapToRender()

    if (await this.openFilterButton.isVisible({
        timeout: 30000 
      }).catch(() => false)) {
      await this.openFilterButton.click({ force: true });
      await expect(this.branchDropdown).toBeVisible({
        timeout: 30000 
      });
    }

    await expect(this.branchDropdown).toBeVisible({
        timeout: 30000 
      });
    await expect(this.branchDropdown).toBeEnabled({
        timeout: 30000 
      });
    await this.branchDropdown.click({
        timeout: 30000 
      });

    for (const branch of branchNames) {
      await this.branchSearchBox.click();
      await this.branchSearchBox.fill(branch);

      await this.listBox
        .getByRole("option", { name: branch })
        .click();
    }
  }

  async verifyBranchData(expectedBranches: string[]): Promise<void> {
    
    await this.waitForCountyMapToRender()
    if (await this.activeReportExpandButton.isVisible({
        timeout: 30000 
      }).catch(() => false)) {
      await this.activeReportExpandButton.click({
        timeout: 30000 
      });
    }

    const allBranches = await this.branchCells.allTextContents();

    for (const branch of allBranches) {
      const cleanActual = normalizeBranch(branch);

      if (!cleanActual || cleanActual === "total") continue;

      const isMatch = expectedBranches.some(
        expected => normalizeBranch(expected) === cleanActual
      );

      if (!isMatch) {
        console.log("Unexpected branch found:", cleanActual);
        throw new Error(`Unexpected branch in table: ${cleanActual}`);
      }

      console.log("Valid branch:", cleanActual);
    }
  }

  async channelNameSelection(channelNames: string[]): Promise<void> {
    await this.waitForCountyMapToRender()

    if (await this.openFilterButton.isVisible({
        timeout: 30000 
      }).catch(() => false)) {
      await this.openFilterButton.click({ force: true });
      await expect(this.channelNameDropdown).toBeVisible({
        timeout: 30000 
      });
    }

    await this.channelNameDropdown.click({
        timeout: 30000 
      });

    for (const channelName of channelNames) {
      await this.channelNameSearchBox.click();
      await this.channelNameSearchBox.fill(channelName);

      await this.listBox
        .getByRole("option", { name: channelName, exact: true })
        .click();
    }
  }

  async statusTypeSelection(statusTypes: string[]): Promise<void> {
    await this.waitForCountyMapToRender()
    if (await this.openFilterButton.isVisible({
        timeout: 30000 
      }).catch(() => false)) {
      await this.openFilterButton.click({
        timeout: 30000 
      });
      await expect(this.statusTypeDropdown).toBeVisible({
        timeout: 30000 
      });
    }

    await this.statusTypeDropdown.click({
        timeout: 30000 
      });

    for (const statusType of statusTypes) {
      await this.statusTypeSearchBox.click();
      await this.statusTypeSearchBox.fill(statusType);

      await this.listBox
        .getByRole("option", { name: statusType, exact: true })
        .click();
    }
  }

  // verify status 
 async verifyStatusTypeData(expectedStatusTypes: string[]): Promise<void> {

 await this.waitForCountyMapToRender()

  if (await this.activeReportExpandButton.isVisible({
        timeout: 30000 
      }).catch(() => false)) {
    await this.activeReportExpandButton.click({
        timeout: 30000 
      });
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
}