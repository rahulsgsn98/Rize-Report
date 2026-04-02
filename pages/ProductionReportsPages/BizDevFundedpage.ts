import { expect, Locator, Page } from '@playwright/test';
import { normalizeBranch } from "../../utils/normalizebranch";

export class BizDevFundedPage {
  readonly page: Page;

 readonly heading: Locator;
 readonly bizdevfundeddesktoprefresh: Locator;
 readonly bizdevfundedmobilerefresh: Locator;

 readonly openFilterButton: Locator;

  readonly bdsNameDropdown: Locator;
  readonly divisionDropdown: Locator;
  readonly branchDropdown: Locator;
  readonly channelNameDropdown: Locator;
  readonly monthDropdown: Locator;
 // readonly yearDropdown: Locator;

  readonly bdsNameSearchBox: Locator;
  readonly divisionSearchBox: Locator;
  readonly branchSearchBox: Locator;
  readonly channelNameSearchBox: Locator;
  readonly monthSearchBox: Locator;

  readonly listBox: Locator;

  readonly submitButton: Locator;
  readonly clearButton: Locator;

  readonly fundedReportTable: Locator;
  readonly loanChannelReportTable: Locator;
  readonly loanProgramReportTable: Locator;
  readonly loanPurposeReportTable: Locator;
  readonly loanInvestorReportTable: Locator;

  readonly fundedreportexpandButton: Locator;
  readonly fundedreportcollapseButton: Locator;
  readonly loaninvestorexpendButton: Locator;
  readonly loaninvestorcollapseButton: Locator;

  readonly countryMap: Locator;
  readonly mapArrowIcon: Locator;

  readonly loanchannelchart: Locator;
  readonly loanprogramchart: Locator;
  readonly loanpurposechart: Locator;
  readonly loaninvestorchart: Locator;

 readonly fundedReportBdsNameCells: Locator;
 readonly fundedReportBranchCells: Locator;
 readonly fundedReportDivisionCells: Locator;
  readonly specificMapLocation: Locator;

  
  readonly selectyeardropdowndesktop: Locator;
  readonly selectyeardropdownmobile: Locator;
  

  constructor(page: Page) {
    this.page = page;
    this.specificMapLocation = page.locator("#countyMap path.sm_state_30099");
     this.mapArrowIcon = page.locator('#countyMap path[fill="#f7f7f7"][stroke="#636363"]').last();

    // Heading
    this.heading = page.getByRole("link", { name: /BIZ-DEV FUNDED/i });

    // Refresh
    this.bizdevfundeddesktoprefresh = page.locator('span.last-refresh-text');
    this.bizdevfundedmobilerefresh = page.locator('span.biz-refresh-text')

    // Filter
    this.openFilterButton = page.getByRole("button", { name: /Open Filters/i });

    // Dropdowns
    this.bdsNameDropdown = page.getByRole("combobox").nth(0);
    this.divisionDropdown = page.getByRole("combobox").nth(1);
    this.branchDropdown = page.getByRole("combobox").nth(2);
    this.channelNameDropdown = page.getByRole("combobox").nth(3);
    this.monthDropdown = page.getByRole("combobox").nth(4);
  //  this.yearDropdown = page.getByRole("combobox").nth(5);

    // Search Boxes (scoped - FIXED)
    this.bdsNameSearchBox = this.bdsNameDropdown.locator("input.multiselect__input");
    this.divisionSearchBox = this.divisionDropdown.locator("input.multiselect__input");
    this.branchSearchBox = this.branchDropdown.locator("input.multiselect__input");
    this.channelNameSearchBox = this.channelNameDropdown.locator("input.multiselect__input");
    this.monthSearchBox = this.monthDropdown.locator("input.multiselect__input");

    // Listbox
    this.listBox = page.locator('ul[role="listbox"]');

    // Buttons
    this.submitButton = page.getByRole("button", { name: /Submit|Apply/i });
    this.clearButton = page.getByRole("button", { name: /Clear/i });

    // Expand / Collapse (kept your naming)
    this.fundedreportexpandButton = page.locator("button").filter({ hasText: "Expand" }).first();
    this.loaninvestorexpendButton = page.locator("button").filter({ hasText: "Expand" }).last();

    this.fundedreportcollapseButton = page.locator("button").filter({ hasText: "Collapse" }).first();
    this.loaninvestorcollapseButton = page.locator("button").filter({ hasText: "Collapse" }).last();

    // Map
    this.countryMap = page.locator("#countyMap");

    // Tables (stable structure)
    this.fundedReportTable = page.locator("div.table-container");
    this.loanChannelReportTable = page.locator("div.table-wrapper").nth(0);
    this.loanProgramReportTable = page.locator("div.table-wrapper").nth(1);
    this.loanPurposeReportTable = page.locator("div.table-wrapper").nth(2);
    this.loanInvestorReportTable = page.locator("div.table-wrapper").nth(3);

    // Charts (stable instead of canvas)
    this.loanchannelchart = page.locator("div.chart-container").nth(0);
    this.loanprogramchart = page.locator("div.chart-container").nth(1);
    this.loanpurposechart = page.locator("div.chart-container").nth(2);
    this.loaninvestorchart = page.locator("div.chart-container").nth(3);

    // Table Cells (stable + filtered)
    this.fundedReportBdsNameCells = page.locator('td[data-key="BdsName"]').filter({
      hasNotText: 'Total'
    });

    this.fundedReportBranchCells = page.locator('td[data-key="BranchName"]').filter({
      hasNotText: 'Total'
    });

    this.fundedReportDivisionCells = page.locator('td[data-key="DivisionName"]').filter({
      hasNotText: 'Total'
    });


     this.selectyeardropdowndesktop = page.locator('div.dropdown')

    this.selectyeardropdownmobile = page.locator('i.fa-solid.fa-calendar-days:visible');
  }
  async waitForGridToLoad(timeout = 90000) {
    await expect(this.fundedReportTable).toBeVisible({ timeout });
  }

  async waitForCountyMapToRender(timeout = 90000) {
    await expect(this.countryMap).toBeVisible({ timeout });

    const holder = this.page.locator('#countyMap_holder');
    await expect(holder).toBeVisible({ timeout });
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
    await expect(this.submitButton).toBeVisible({ timeout: 30000 })

    await this.submitButton.click({ timeout: 30000 })
  }
  async waitForRefreshDateTimeToBeVisible(): Promise<void> {
  await Promise.race([
    this.bizdevfundeddesktoprefresh.waitFor({ state: 'visible', timeout: 30000 }),
    this.bizdevfundedmobilerefresh.waitFor({ state: 'visible', timeout: 30000 }),
  ]);
}

  async isRefreshDateTimeDisplayed(): Promise<boolean> {
    
   return (
    await this.bizdevfundeddesktoprefresh.isVisible({
    timeout:30000
})
  ) || (
    await this.bizdevfundedmobilerefresh.isVisible({
    timeout:30000
})
  );
    
  }

  async isFundedReportTableVisible(): Promise<boolean> {

    await expect(this.fundedReportTable).toBeVisible({
      timeout: 30000
    });
    return await this.fundedReportTable.isVisible({
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

  async isLoanProgramReportTableVisible(): Promise<boolean> {

    await expect(this.loanProgramReportTable).toBeVisible({
      timeout: 30000
    });
    return await this.loanProgramReportTable.isVisible({
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




  async isLoanChannelChartVisible(): Promise<boolean> {

    await expect(this.loanchannelchart).toBeVisible({
      timeout: 30000
    });
    return await this.loanchannelchart.isVisible();
  }

  async isLoanProgramChartVisible(): Promise<boolean> {

    await expect(this.loanprogramchart).toBeVisible({
      timeout: 30000
    });
    return await this.loanprogramchart.isVisible({
      timeout: 30000
    });
  }

  async isLoanPurposeChartVisible(): Promise<boolean> {

    await expect(this.loanpurposechart).toBeVisible({
      timeout: 30000
    });
    return await this.loanpurposechart.isVisible({
      timeout: 30000
    });
  }

  async isLoanInvestorChartVisible(): Promise<boolean> {

    await expect(this.loaninvestorchart).toBeVisible({
      timeout: 30000
    });
    return await this.loaninvestorchart.isVisible({
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
    await expect(this.countryMap).toBeVisible({ timeout: 30000 })

    await expect(this.specificMapLocation).toBeVisible({ timeout: 30000 })

    await this.specificMapLocation.hover(
      { timeout: 30000 }
    );
    await this.specificMapLocation.click(
      { timeout: 30000 }
    );

    console.log("Clicked on specific location in country map");
  }

  async isMapInLargeView(): Promise<boolean> {
    //await this.waitForCountyMapToRender()
    await expect(this.countryMap).toBeVisible(
      { timeout: 30000 }
    );
    await expect(this.mapArrowIcon).toBeVisible(
      { timeout: 30000 }
    );

    try {
      await this.mapArrowIcon.waitFor({ state: "visible", timeout: 30000 })
      return true;
    } catch (error) {
      console.error("Error occurred while checking map view:", error);
      return false;
    }
  }

  async clickfundreportExpand(): Promise<void> {
    
    if (await this.fundedreportexpandButton.isVisible( {
          timeout:30000
        }).catch(() => false)) {
      await this.fundedreportexpandButton.click( {
          timeout:30000
        });
      console.log("🔍 Funded report Expand button clicked");
    }
  }

  async clickloaninvestorExpand(): Promise<void> {
   
    if (await this.loaninvestorexpendButton.isVisible( {
          timeout:30000
        }).catch(() => false)) {
      await this.loaninvestorexpendButton.click( {
          timeout:30000
        });
      console.log("🔍 Loan investor Expand button clicked");
    }
  }

  async bdsNameSelection(bdsNames: string[]): Promise<void> {
    await this.waitForCountyMapToRender()

    if (await this.openFilterButton.isVisible({
          timeout:30000
        }).catch(() => false)) {
      await this.openFilterButton.click({
          timeout:30000
        });
    }

    await expect(this.bdsNameDropdown).toBeVisible({
          timeout:30000
        });

    await this.bdsNameDropdown.click({
          timeout:30000
        });

    for (const bdsName of bdsNames) {
      await this.bdsNameSearchBox.click();
      await this.bdsNameSearchBox.fill(bdsName);

      await this.listBox.getByRole('option', { name: bdsName,exact:true }).click();
    }
  }

  async selectDivisionNames(divisions: string[]): Promise<void> {

     await this.waitForCountyMapToRender()
    if (await this.openFilterButton.isVisible({
          timeout:30000
        }).catch(() => false)) {
      await this.openFilterButton.click({
          timeout:30000
        });
    }

    await expect(this.divisionDropdown).toBeVisible({
          timeout:30000
        });
    await this.divisionDropdown.click({
          timeout:30000
        });

    for (const division of divisions) {
      await this.divisionSearchBox.click();
      await this.divisionSearchBox.fill(division);

      await this.listBox.getByRole('option', { name: division,exact:true }).click();
    }
  }

  async branchSelection(branchNames: string[]): Promise<void> {
     await this.waitForCountyMapToRender()
    if (await this.openFilterButton.isVisible({
          timeout:30000
        }).catch(() => false)) {
      await this.openFilterButton.click({
          timeout:30000
        });
    }

    await expect(this.branchDropdown).toBeVisible({
          timeout:30000
        });
    await this.branchDropdown.click({
          timeout:30000
        });

    for (const branchName of branchNames) {
      await this.branchSearchBox.click();
      await this.branchSearchBox.fill(branchName);

      await this.listBox.getByRole('option', { name: branchName, exact:true }).click();
    }
  }

  async channelNameSelection(channelNames: string[]): Promise<void> {
     await this.waitForCountyMapToRender()
    if (await this.openFilterButton.isVisible({
          timeout:30000
        }).catch(() => false)) {
      await this.openFilterButton.click({
          timeout:30000
        });
    }

    await expect(this.channelNameDropdown).toBeVisible();
    await this.channelNameDropdown.click({
          timeout:30000
        });

    for (const channelName of channelNames) {
      await this.channelNameSearchBox.click();
      await this.channelNameSearchBox.fill(channelName);

      await this.listBox.getByRole('option', { name: channelName, exact: true }).click();
    }
  }

  async monthSelection(months: string[]): Promise<void> {
     await this.waitForCountyMapToRender()
    if (await this.openFilterButton.isVisible({
          timeout:30000
        }).catch(() => false)) {
      await this.openFilterButton.click({
          timeout:30000
        });
    }

    await expect(this.monthDropdown).toBeVisible({
          timeout:30000
        });
    await this.monthDropdown.click({
          timeout:30000
        });

    for (const month of months) {
      await this.monthSearchBox.click();
      await this.monthSearchBox.fill(month);

      await this.listBox.getByRole('option', { name: month ,exact:true}).click();
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
    await this.selectyeardropdownmobile.click({
    timeout:30000
});
   
  }

else{ await this.selectyeardropdowndesktop.click({
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


  

  async verifyBdsNameData(expectedBdsNames: string[]): Promise<void> {
     await this.waitForCountyMapToRender()
   
    const allBdsNames = await this.fundedReportBdsNameCells.allTextContents();

    for (const bdsName of allBdsNames) {
      const cleanActual = bdsName.trim();
      if (!cleanActual || cleanActual.toLowerCase() === 'total') continue;

      const isMatch = expectedBdsNames.some(expected => expected.trim() === cleanActual);

      if (!isMatch) {
        throw new Error(`Unexpected BDS Name in table: ${cleanActual}`);
      }
    }
  }

  async verifyBranchData(expectedBranches: string[]): Promise<void> {
     await this.waitForGridToLoad();
      await this.waitForCountyMapToRender()
 
     if (await this.fundedreportexpandButton.isVisible({
       timeout:30000
     }).catch(() => false)) {
       await this.fundedreportexpandButton.click({
       timeout:30000
     });
     }
 
     const allBranches = await this.fundedReportBranchCells.allTextContents();
 
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
 

  
  // ✅ Verify Division  table data (your simple loop version)
  async verifyDivisionData(expectedDivisions: string[]): Promise<void> {

   

      await this.waitForCountyMapToRender()

    // Expand if needed
   if (await this.fundedreportexpandButton.isVisible({
    timeout:30000
})) {
  await this.fundedreportexpandButton.click({
    timeout:30000
});
}

    const divisionCells = this.page.locator('td[data-key="DivisionName"]');
    const allDivisions = await divisionCells.allTextContents();

    for (const division of allDivisions) {

      const cleanDivision = division.trim();

      // skip empty cells
      if (!cleanDivision) {
        continue;
      }

      if (!expectedDivisions.includes(cleanDivision)) {

        console.log("❌ Unexpected division found:", cleanDivision);

        throw new Error(`Unexpected division in table: ${cleanDivision}`);
      }

      console.log("✅ Valid division:", cleanDivision);
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

      await expect(noData).toBeVisible();
      return;
    }

    // ❌ EDGE CASE (unexpected UI)
    throw new Error("❌ Neither table data nor 'No Data' message found");
  }

  async verifyMonthData(expectedMonths: string[]): Promise<void> {
   
    await this.waitForCountyMapToRender();
    

    

    if (await this.fundedreportexpandButton.isVisible().catch(() => false)) {
      await this.fundedreportexpandButton.click({ force: true });
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

}