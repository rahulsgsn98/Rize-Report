import { Page, Locator, expect } from "@playwright/test";
import { normalizeBranch } from "../../utils/normalizebranch";

export class BranchFundedPage {
  readonly page: Page;

  readonly heading: Locator;
  readonly divisionDropdown: Locator;
  readonly submitButton: Locator;
  readonly openFilterButton: Locator;
  readonly fundedReportExpandButton: Locator;
  readonly branchDropdown: Locator;
  readonly channelNameDropdown: Locator;
  readonly monthDropdown: Locator;

  readonly loanInvestorExpandButton: Locator;

  readonly fundedReportCollapseButton: Locator;
  readonly loanInvestorCollapseButton: Locator;

  readonly countryMap: Locator;
  readonly mapArrowIcon: Locator;

  readonly fundedReportTable: Locator;
  readonly loanChannelReportTable: Locator;
  readonly loanProgramReportTable: Locator;
  readonly loanPurposeReportTable: Locator;
  readonly loanInvestorReportTable: Locator;

  readonly loanChannelChart: Locator;
  readonly loanProgramChart: Locator;
  readonly loanPurposeChart: Locator;
  readonly loanInvestorChart: Locator;

  readonly fundedDesktopRefresh: Locator;
  readonly fundedMobileRefresh: Locator;

  readonly clearButton: Locator;

  // repeated locators moved global
  readonly fundedReportFirstRow: Locator;
  readonly specificMapLocation: Locator;
  readonly listBox: Locator;

  readonly divisionSearchBox: Locator;
  readonly branchSearchBox: Locator;
  readonly channelNameSearchBox: Locator;
  readonly monthSearchBox: Locator;

  readonly divisionCells: Locator;
  readonly branchCells: Locator;

  readonly selectYearDropdownDesktop: Locator;
  readonly selectYearDropdownMobile: Locator;

  constructor(page: Page) {
    this.page = page;

    this.heading = page.getByRole("heading", { name: /BRANCH FUNDED/i }).first();

    this.divisionDropdown = page.getByRole("combobox").nth(0);
    this.branchDropdown = page.getByRole("combobox").nth(1);
    this.channelNameDropdown = page.getByRole("combobox").nth(2);
    this.monthDropdown = page.getByRole("combobox").nth(3);

    this.submitButton = page.getByRole("button", { name: /Submit|Apply/i });
    this.openFilterButton = page.getByRole("button", { name: "Open Filters" });
    this.clearButton = page.getByRole("button", { name: /Clear/i });

    this.fundedReportExpandButton = page.locator("button").filter({ hasText: "Expand" }).first();
    this.loanInvestorExpandButton = page.locator("button").filter({ hasText: "Expand" }).last();

    this.fundedReportCollapseButton = page.locator("button").filter({ hasText: "Collapse" }).first();
    this.loanInvestorCollapseButton = page.locator("button").filter({ hasText: "Collapse" }).last();

    this.countryMap = page.locator("#countyMap");
    this.mapArrowIcon = page.locator('#countyMap path[fill="#f7f7f7"][stroke="#636363"]').last();

    this.fundedReportTable = page.locator("div.table-container");
    this.loanChannelReportTable = page.locator("div.table-wrapper").nth(0);
    this.loanProgramReportTable = page.locator("div.table-wrapper").nth(1);
    this.loanPurposeReportTable = page.locator("div.table-wrapper").nth(2);
    this.loanInvestorReportTable = page.locator("div.table-wrapper").nth(3);

    this.loanChannelChart = page.locator("div.chart-container").nth(0);
    this.loanProgramChart = page.locator("div.chart-container").nth(1);
    this.loanPurposeChart = page.locator("div.chart-container").nth(2);
    this.loanInvestorChart = page.locator("div.chart-container").nth(3);

    this.fundedDesktopRefresh = page.locator('strong:visible');
    this.fundedMobileRefresh = page.locator('span.bf-refresh-text')
    this.fundedReportFirstRow = page.getByText("Branch Name ↑↓", { exact: true });
    this.specificMapLocation = page.locator("#countyMap path.sm_state_30099");
    this.listBox = page.locator('ul[role="listbox"]');

    this.divisionSearchBox = this.divisionDropdown.locator("input.multiselect__input");
    this.branchSearchBox = this.branchDropdown.locator("input.multiselect__input");
    this.channelNameSearchBox = this.channelNameDropdown.locator("input.multiselect__input");
    this.monthSearchBox = this.monthDropdown.locator("input.multiselect__input");

    this.divisionCells = page.locator('td[data-key="DivisionName"]');
    this.branchCells = page.locator('td[data-key="BranchName"]').filter({
  hasNotText: 'Total'
});

    this.selectYearDropdownDesktop = page.locator("div.dropdown");
    this.selectYearDropdownMobile = page.locator("i.fa-solid.fa-calendar-days:visible");
  }

  async waitForCountyMapToRender(timeout = 90000) {
    await expect(this.countryMap).toBeVisible({ timeout });

    const holder = this.page.locator("#countyMap_holder");
    await expect(holder).toBeVisible({ timeout });
  }

  async waitForGeographicLoadingToFinish(timeout = 90000) {
    const loadingText = this.page.getByText("Loading...", { exact: true });
    const geoText = this.page.getByText("Updating Geographic Data...", { exact: true });

    if (await loadingText.isVisible().catch(() => false)) {
      await loadingText.waitFor({ state: "hidden", timeout });
    }

    if (await geoText.isVisible().catch(() => false)) {
      await geoText.waitFor({ state: "hidden", timeout });
    }
  }

  async waitForGridToLoad(): Promise<void> {
    await this.fundedReportFirstRow.waitFor({ state: "visible" });
  }

  async openFiltersIfMobile(): Promise<void> {
     await this.waitForCountyMapToRender()
    if (await this.openFilterButton.isVisible({ timeout: 30000 }).catch(() => false)) {
      await this.openFilterButton.click( {
          timeout:30000
        });
    }
  }

  async waitForRefreshDateTimeToBeVisible(): Promise<void> {
    
    await Promise.race([
      this.fundedDesktopRefresh.waitFor({ state: "visible", timeout: 30000 }),
      this.fundedMobileRefresh.waitFor({ state: "visible", timeout: 30000 }),
    ]);
  }

  async isRefreshDateTimeDisplayed(): Promise<boolean> {
    return (
      await this.fundedDesktopRefresh.isVisible(
         {
          timeout:30000
        }
      ).catch(() => false)
    ) || (
      await this.fundedMobileRefresh.isVisible(
         {
          timeout:30000
        }
      ).catch(() => false)
    );
  }

  async isLoanChannelChartVisible(): Promise<boolean> {
  
    await expect(this.loanChannelChart).toBeVisible( {
          timeout:30000
        });
    return await this.loanChannelChart.isVisible();
  }

  async isLoanProgramChartVisible(): Promise<boolean> {
   
    await expect(this.loanProgramChart).toBeVisible( {
          timeout:30000
        });
    return await this.loanProgramChart.isVisible( {
          timeout:30000
        });
  }

  async isLoanPurposeChartVisible(): Promise<boolean> {
  
    await expect(this.loanPurposeChart).toBeVisible( {
          timeout:30000
        });
    return await this.loanPurposeChart.isVisible( {
          timeout:30000
        });
  }

  async isLoanInvestorChartVisible(): Promise<boolean> {
   
    await expect(this.loanInvestorChart).toBeVisible( {
          timeout:30000
        });
    return await this.loanInvestorChart.isVisible( {
          timeout:30000
        });
  }

  async isFundedReportTableVisible(): Promise<boolean> {
    
    await expect(this.fundedReportTable).toBeVisible( {
          timeout:30000
        });
    return await this.fundedReportTable.isVisible( {
          timeout:30000
        });
  }

  async isLoanChannelReportTableVisible(): Promise<boolean> {
   
    await expect(this.loanChannelReportTable).toBeVisible( {
          timeout:30000
        });
    return await this.loanChannelReportTable.isVisible( {
          timeout:30000
        });
  }

  async isLoanProgramReportTableVisible(): Promise<boolean> {
  
    await expect(this.loanProgramReportTable).toBeVisible( {
          timeout:30000
        });
    return await this.loanProgramReportTable.isVisible( {
          timeout:30000
        });
  }

  async isLoanPurposeReportTableVisible(): Promise<boolean> {
   
    await expect(this.loanPurposeReportTable).toBeVisible( {
          timeout:30000
        });
    return await this.loanPurposeReportTable.isVisible( {
          timeout:30000
        });
  }

  async isLoanInvestorReportTableVisible(): Promise<boolean> {
  
    await expect(this.loanInvestorReportTable).toBeVisible( {
          timeout:30000
        });
    return await this.loanInvestorReportTable.isVisible( {
          timeout:30000
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
    await expect(this.countryMap).toBeVisible({ timeout: 30000})

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

  async clickFundedReportExpand(): Promise<void> {
   

    if (await this.fundedReportExpandButton.isVisible( {
          timeout:30000
        }).catch(() => false)) {
      await this.fundedReportExpandButton.click( {
          timeout:30000
        });
      console.log("🔍 Funded report Expand button clicked");
    }
  }

  async clickLoanInvestorExpand(): Promise<void> {
   
    if (await this.loanInvestorExpandButton.isVisible( {
          timeout:30000
        }).catch(() => false)) {
      await this.loanInvestorExpandButton.click( {
          timeout:30000
        });
      console.log("🔍 Loan investor Expand button clicked");
    }
  }

  async clickClear(): Promise<void> {
  
    await this.waitForCountyMapToRender();

    if (await this.openFilterButton.isVisible({ timeout: 30000 })) {
      await expect(this.openFilterButton).toBeVisible( {
          timeout:30000
        });
      await this.openFilterButton.click( {
          timeout:30000
        });
    }

    await expect(this.clearButton).toBeVisible( {
          timeout:30000
        });
    await expect(this.clearButton).toBeEnabled( {
          timeout:30000
        });

    await this.clearButton.click( {
          timeout:30000
        });

    console.log("🧹 Clear button clicked, filters reset");
  }

  async selectDivisionNames(divisions: string[]): Promise<void> {
    await this.waitForCountyMapToRender();

    if (await this.openFilterButton.isVisible({ timeout: 30000 })) {
      await this.openFilterButton.click({ timeout: 30000 });
      await expect(this.divisionDropdown).toBeVisible({ timeout: 30000 });
    }

    await this.divisionDropdown.click({ timeout: 30000 });

    for (const division of divisions) {
      await this.divisionSearchBox.click();
      await this.divisionSearchBox.fill(division);

      await this.listBox
        .getByRole("option", { name: division })
        .click();
    }
  }

  async clickSubmit(): Promise<void> {
    await expect(this.submitButton).toBeVisible({timeout: 30000})
    
     await this.submitButton.click({timeout: 30000})
  }

  async verifyDivisionData(expectedDivisions: string[]): Promise<void> {
    /* await this.waitForGridToLoad();
    await this.page.waitForLoadState("networkidle"); */

    await this.waitForCountyMapToRender();

    

    if (await this.fundedReportExpandButton.isVisible({ timeout: 30000 }).catch(() => false)) {
      await expect(this.fundedReportExpandButton).toBeVisible({ timeout: 30000 });
      await this.fundedReportExpandButton.click({ timeout: 30000 });
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
    await this.waitForCountyMapToRender();

    if (await this.openFilterButton.isVisible({ timeout: 30000 })) {
      await this.openFilterButton.click({ timeout: 30000 });
    }

    await this.branchDropdown.click({ timeout: 30000 });

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
     await this.waitForCountyMapToRender()

    if (await this.fundedReportExpandButton.isVisible({
      timeout:30000
    }).catch(() => false)) {
      await this.fundedReportExpandButton.click({
      timeout:30000
    });
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


  async channelNameSelection(channelNames: string[]): Promise<void> {
    await this.waitForCountyMapToRender();

    if (await this.openFilterButton.isVisible({ timeout: 30000 })) {
      await expect(this.openFilterButton).toBeVisible({ timeout: 30000 });
      await this.openFilterButton.click({ timeout: 30000 });
      await expect(this.channelNameDropdown).toBeVisible({ timeout: 30000 });
    }

    await this.channelNameDropdown.click({ timeout: 30000 });

    for (const channelName of channelNames) {
      await this.channelNameSearchBox.click();
      await this.channelNameSearchBox.fill(channelName);

      await this.listBox
        .getByRole("option", { name: channelName, exact: true })
        .click();
    }
  }

  async monthSelection(monthNames: string[]): Promise<void> {
    await this.waitForCountyMapToRender();
   
    if (await this.openFilterButton.isVisible({ timeout: 30000 }))
       {
      await expect(this.openFilterButton).toBeVisible({ timeout: 30000 });
      await this.openFilterButton.click({ timeout: 30000 });
      
      await expect(this.monthDropdown).toBeVisible({ timeout: 30000 });
    }

    await this.monthDropdown.click({ timeout: 30000 });

    for (const monthName of monthNames) {
      await this.monthSearchBox.click();
      await this.monthSearchBox.fill(monthName);

      await this.listBox
        .getByRole("option", { name: monthName, exact: true })
        .click();
    }
  }

  async verifyMonthData(expectedMonths: string[]): Promise<void> {
    
    await this.waitForCountyMapToRender();

    if (await this.fundedReportExpandButton.isVisible({ timeout: 30000 }).catch(() => false)) {
      await this.fundedReportExpandButton.click({ timeout: 30000 });
    }

    const monthCells = this.page.locator("table thead tr:first-child th");
    const allMonths = await monthCells.allTextContents();

    for (const month of allMonths) {
      const cleanMonth = month.trim();

      if (!cleanMonth || !/\d{4}/.test(cleanMonth)) {
        continue;
      }

      if (!expectedMonths.includes(cleanMonth)) {
        console.log("❌ Unexpected month found:", cleanMonth);
        throw new Error(`Unexpected month in table: ${cleanMonth}`);
      }

      console.log("✅ Valid month:", cleanMonth);
    }
  }

 // Year dropdown selection
async selectYear(targetYear: number): Promise<void> {

  await this.waitForCountyMapToRender()

   // Mobile filter support
  if (await this.openFilterButton.isVisible({
    timeout:30000
})) {
    await this.openFilterButton.click();
    await this.selectYearDropdownMobile.click({
    timeout:30000
});
   
  }

else{ await this.selectYearDropdownDesktop.click({
    timeout:30000
});}
 // await this.selectyeardropdowndesktop.click({timeout: 5000 });

  while (true) {

    // get current range (e.g. "2023 – 2032")
    const rangeText = await this.page.locator('div.decade').textContent();

    if (!rangeText) throw new Error("Year range not found");

    const [start, end] = rangeText
  .split(/[-–]/) // supports both
  .map(val => parseInt(val.trim()));

    // ✅ check if target year is in range
    if (targetYear >= start && targetYear <= end) {

      await this.page
        .locator('div.year-grid div.year', { hasText: targetYear.toString() })
        .click();

      break;
    }

    await this.page.waitForLoadState('domcontentloaded'); // wait for UI to update after click

    // ❌ navigate
    if (targetYear < start) {
      await this.page.getByRole('button', { name: '‹' }).click({
    timeout:30000
});
    } else {
      await this.page.getByRole('button', { name: '›' }).click({
    timeout:30000
});
    }
  }

 
}

async verifyYearData(targetYear: string): Promise<void> {

   await this.waitForCountyMapToRender(); // ensure data has loaded
  const dataRows = this.page.locator('table.custom-table.collapsed-mode tr')

  const noData = this.page.getByRole('heading', {
    name: 'No Geographic Data Found'
  });

  // ⏳ wait until either appears
  await this.page.waitForTimeout(1000); // small buffer for UI render

  // ✅ CASE 1: Data present
  if (await dataRows.count() > 0) {

    console.log("📊 Data found, validating table...");

    const headers = await this.page
      .locator('table thead tr:first-child th')
      .allTextContents();

    const hasYear = headers.some(h => h.includes(targetYear));

    if (!hasYear) {
      throw new Error(`❌ Year ${targetYear} not reflected in table`);
    }

    console.log(`✅ Year ${targetYear} validated in table`);
    return;
  }

  // ❌ CASE 2: No data
  if (await noData.isVisible()) {

    console.log(`⚠️ No data found for year ${targetYear}`);

    await expect(noData).toBeVisible({
    timeout:30000
});
    return;
  }

  // ❌ EDGE CASE (unexpected UI)
  throw new Error("❌ Neither table data nor 'No Data' message found");
}

}