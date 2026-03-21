import { Page, Locator,expect } from "@playwright/test";
import { normalizeBranch } from "../utils/normalizebranch";

export class LoanOfficerFundedPage {

  /* loanofficerfundedheading(loanofficerfundedheading: any) {
    throw new Error("Method not implemented.");
  } */

  readonly page: Page;

  readonly heading: Locator;
  readonly divisionDropdown: Locator;
  readonly submitButton: Locator;
  readonly openFilterButton: Locator;
  readonly fundreportexpandButton: Locator;
  readonly branchdropdown: Locator;
  readonly loanofficerdropdown: Locator;
  readonly channelnamedropdown: Locator;
  readonly monthdropdown:Locator;

  readonly selectyeardropdowndesktop: Locator;
  readonly selectyeardropdownmobile: Locator;
  readonly loaninvestorexpendButton: Locator;

  readonly fundreportcollapseButton: Locator;
  readonly loaninvestorcollapseButton: Locator;

  readonly countrymap:Locator;
  readonly maparroewicon:Locator;

  readonly fundedreporttable:Locator;
  readonly loanchannelreporttable:Locator;
  readonly loanprogramreporttable:Locator;
  readonly loanpurposereporttable:Locator;

  readonly loaninvestorreporttable: Locator;

  readonly loanchannelchart:Locator
  readonly loanprogramchart:Locator

  readonly loanpurposechart:Locator
  readonly loaninvestorchart:Locator

  readonly loanfundeddesktoprefresh:Locator
  readonly loanfundedmobilerefresh:Locator


  readonly clearButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.heading = page
      .getByRole('heading', { name: /LOAN OFFICER FUNDED/i })
      .first();

    this.divisionDropdown = page.getByRole('combobox').nth(0);

    this.submitButton = page.getByRole('button', { name: /Submit|Apply/i });

    this.openFilterButton = page.getByRole('button', { name: 'Open Filters' });

    this.fundreportexpandButton = page.locator('button').filter({ hasText: 'Expand' }).first();


    this.branchdropdown = page.getByRole('combobox').nth(1);

    this.loanofficerdropdown = page.getByRole('combobox').nth(2);
    this.channelnamedropdown = page.getByRole('combobox').nth(3);
    this.monthdropdown = page.getByRole('combobox').nth(4);

    this.selectyeardropdowndesktop = page.locator('div.dropdown')

    this.selectyeardropdownmobile = page.locator('i.fa-solid.fa-calendar-days:visible');


    this.clearButton = page.getByRole('button', { name: /Clear/i });

    this.loaninvestorexpendButton = page.locator('button').filter({ hasText: 'Expand' }).last();

    this.fundreportcollapseButton = page.locator('button').filter({ hasText: 'Collapse' }).first();

    this.loaninvestorcollapseButton = page.locator('button').filter({ hasText: 'Collapse' }).last();


    this.countrymap = page.locator('#countyMap');

    this.maparroewicon= page.locator('#countyMap path[fill="#f7f7f7"][stroke="#636363"]').last();

    this.fundedreporttable = page.locator('div.table-container');

    this.loanchannelreporttable = page.locator('div.table-wrapper').nth(0);

    this.loanprogramreporttable = page.locator('div.table-wrapper').nth(1);

    this.loanpurposereporttable = page.locator('div.table-wrapper').nth(2);

    this.loaninvestorreporttable = page.locator('div.table-wrapper').nth(3);

    this.loanchannelchart = page.locator('div.chart-container').nth(0);
    this.loanprogramchart = page.locator('div.chart-container').nth(1);
    this.loanpurposechart = page.locator('div.chart-container').nth(2);
    this.loaninvestorchart= page.locator('div.chart-container').nth(3);

    this.loanfundeddesktoprefresh = page.locator('span.last-refresh-text');
    this.loanfundedmobilerefresh = page.locator('div.lof-mobile-refresh')




  }

  // refresh is displays 

  async waitForRefreshDateTimeToBeVisible(): Promise<void> {
  await Promise.race([
    this.loanfundeddesktoprefresh.waitFor({ state: 'visible', timeout: 10000 }),
    this.loanfundedmobilerefresh.waitFor({ state: 'visible', timeout: 10000 }),
  ]);
}

async isRefreshDateTimeDisplayed(): Promise<boolean> {
  return (
    await this.loanfundeddesktoprefresh.isVisible()
  ) || (
    await this.loanfundedmobilerefresh.isVisible()
  );
}
  // loanchannelchart is displays 
async isloanchannelchartVisible(): Promise<boolean> {
    await this.page.waitForLoadState('networkidle');

    await expect(this.loanchannelchart).toBeVisible({ timeout: 10000 });
    return await this.loanchannelchart.isVisible();
  }

// loan purpose chart is displays 
async isloanpurposechartVisible(): Promise<boolean> {
    await this.page.waitForLoadState('networkidle');

    await expect(this.loanpurposechart).toBeVisible({ timeout: 10000 });
    return await this.loanpurposechart.isVisible();
  }

  // loan investor chart is displays 
async isloaninvestorchartVisible(): Promise<boolean> {
    await this.page.waitForLoadState('networkidle');

    await expect(this.loaninvestorchart).toBeVisible({ timeout: 10000 });
    return await this.loaninvestorchart.isVisible();
  }

  
// loan program chart is displays 
async isloanprogramchartVisible(): Promise<boolean> {
    await this.page.waitForLoadState('networkidle');

    await expect(this.loanprogramchart).toBeVisible({ timeout: 10000 });
    return await this.loanprogramchart.isVisible();
  }


  // funded report is displayed or not
  async isFundedReportTableVisible(): Promise<boolean> {
    await this.page.waitForLoadState('networkidle');

    await expect(this.fundedreporttable).toBeVisible({ timeout: 10000 });
    return await this.fundedreporttable.isVisible();
  }

  // loan channel report is displayed or not
  async isLoanChannelReportTableVisible(): Promise<boolean> {
    await this.page.waitForLoadState('networkidle');
    await expect(this.loanchannelreporttable).toBeVisible({ timeout: 10000 });
    return await this.loanchannelreporttable.isVisible();
  }

 

  // loan program report is displayed or not
  async isLoanProgramReportTableVisible(): Promise<boolean> {
    await this.page.waitForLoadState('networkidle');
    await expect(this.loanprogramreporttable).toBeVisible({ timeout: 10000 });
    return await this.loanprogramreporttable.isVisible();
  }

  // loan purpose report is displayed or not
  async isLoanPurposeReportTableVisible(): Promise<boolean> {
    await this.page.waitForLoadState('networkidle');
    await expect(this.loanpurposereporttable).toBeVisible({ timeout: 10000 });
    return await this.loanpurposereporttable.isVisible();
  }

  // loan investor report is displayed or not
  async isLoanInvestorReportTableVisible(): Promise<boolean> {
    await this.page.waitForLoadState('networkidle');
    await expect(this.loaninvestorreporttable).toBeVisible({ timeout: 10000 });
    return await this.loaninvestorreporttable.isVisible();
  }


  // 


  // contrymap is displays or not 

  async isCountryMapVisible(): Promise<boolean> {
    await this.page.waitForLoadState('networkidle');
  await  expect(this.countrymap).toBeVisible({ timeout: 10000 });
    return await this.countrymap.isVisible();
  }

  // click on map 
  async clickOnCountryMap(): Promise<void> {
    await this.page.waitForLoadState('networkidle');

     await expect(this.countrymap).toBeVisible({ timeout: 10000 });

     const specificlocation =this.page.locator('#countyMap path.sm_state_30099')

     

      await expect(specificlocation).toBeVisible({ timeout: 10000 });

     await specificlocation.hover();

      await specificlocation.click();

      console.log("Clicked on specific location in country map");

  }


  // check map is displayed in large view after click on map or not
  async isMapInLargeView(): Promise<boolean> {
   
    // after click if arrow icon displays then it is in large view otherwise not
    await expect(this.countrymap).toBeVisible();
    await expect(this.maparroewicon).toBeVisible({ timeout: 10000 });
   try{
     await this.maparroewicon.waitFor({ state: 'visible', timeout: 10000 });
      return true;
   }
    catch(error){
      console.error("Error occurred while checking map view:", error);
      return false;
    }

  }


  // click on expand button 
  async clickfundreportExpand(): Promise<void> {
    await this.page
      .locator('div.production-report.theme-loan-officer-funded tr')
      .first()
      .waitFor();

     
    if (await this.fundreportexpandButton.isVisible()) {
      await this.fundreportexpandButton.click();
      console.log("🔍 Expand button clicked");
    }
  }

  // click on expand button for loan investor data 
  async clickloaninvestorExpand(): Promise<void> {
    await this.page
      .locator('div.production-report.theme-loan-officer-funded tr')
      .first()
      .waitFor();

     

    if (await this.loaninvestorexpendButton.isVisible()) {
      await this.loaninvestorexpendButton.click({ force: true });
      console.log("🔍 loan investor Expand button clicked");
    }
  }


  


// click on clear button to reset filters
async clickClear(): Promise<void> {
  // mobile 
  this.page.waitForLoadState('networkidle'); // ensure any ongoing loads are done
  if (await this.openFilterButton.isVisible({ timeout: 5000 })) {
    await this.openFilterButton.click({force: true});
  }
  // Click the Clear button
   await expect(this.clearButton).toBeVisible({ timeout: 5000 });
  await expect(this.clearButton).toBeEnabled({ timeout: 5000 });
  


  await this.clearButton.click({force: true});

  console.log("🧹 Clear button clicked, filters reset");
}

// check fil



  // ✅ Select single or multiple divisions
  async selectDivisionNames(divisions: string[]): Promise<void> {

   

    await this.page
      .locator('div.production-report.theme-loan-officer-funded tr')
      .first()
      .waitFor();

    // Mobile filter support
    if (await this.openFilterButton.isVisible()) {
      await this.openFilterButton.click();
    }

    await this.divisionDropdown.click({timeout: 5000 });

    const searchBox = this.divisionDropdown.locator('input.multiselect__input');

    for (const division of divisions) {

      await searchBox.click();
      await searchBox.fill(division);

      // Click exact option
      await this.page
        .locator('ul[role="listbox"]')
        .getByRole('option', { name: division })
        .click();
    }
  }

  // ✅ Submit / Apply (desktop + mobile)
  async clickSubmit(): Promise<void> {
  await Promise.all([
    this.page.waitForLoadState('networkidle'),
    this.submitButton.click({timeout: 5000 }),
  ]);
}

  // ✅ Verify Division  table data (your simple loop version)
  async verifyDivisionData(expectedDivisions: string[]): Promise<void> {

    await this.page
      .locator('div.production-report.theme-loan-officer-funded tr')
      .first()
      .waitFor();

    // Expand if needed
   if (await this.fundreportexpandButton.isVisible()) {
  await this.fundreportexpandButton.click({ force: true });
}

    await this.page
      .locator('div.production-report.theme-loan-officer-funded tr')
      .first()
      .waitFor();

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




  // Branch drodown selection 
  async branchSelection(branchNames: string[]): Promise<void> {

   

    await this.page
      .locator('div.production-report.theme-loan-officer-funded tr')
      .first()
      .waitFor();

    // Mobile filter support
    if (await this.openFilterButton.isVisible()) {
      await this.openFilterButton.click();
    }

    await this.branchdropdown.click({timeout: 5000 });

    const searchBox = this.branchdropdown.locator('input.multiselect__input');

    for (const branch of branchNames) {

      await searchBox.click();
      await searchBox.fill(branch);

      // Click exact option
      await this.page
        .locator('ul[role="listbox"]')
        .getByRole('option', { name: branch })
        .click();
    }

    
  }




  // ✅ Verify Branch  table data (your simple loop version)
 async verifyBranchData(expectedBranches: string[]): Promise<void> {

  await this.page
    .locator('div.production-report.theme-loan-officer-funded tr')
    .first()
    .waitFor();

  if (await this.fundreportexpandButton.isVisible()) {
    await this.fundreportexpandButton.click({ force: true });
  }

  const branchCells = this.page.locator('td[data-key="BranchName"]');
  const allBranches = await branchCells.allTextContents();

  for (const branch of allBranches) {

    const cleanActual = normalizeBranch(branch);

    if (!cleanActual) continue;

    const isMatch = expectedBranches.some(expected =>
      normalizeBranch(expected) === cleanActual
    );

    if (!isMatch) {

      console.log("❌ Unexpected branch found:", cleanActual);

      throw new Error(`Unexpected branch in table: ${cleanActual}`);
    }

    console.log("✅ Valid branch:", cleanActual);
  }
}





// Selecting loan officer from dropdown
async loanOfficerSelection(loanOfficerNames: string[]): Promise<void> {

  await this.page
    .locator('div.production-report.theme-loan-officer-funded tr')
    .first()
    .waitFor();
  // Mobile filter support
  if (await this.openFilterButton.isVisible()) {
    await this.openFilterButton.click();
  }
  await this.loanofficerdropdown.click({timeout: 5000 });

  const searchBox = this.loanofficerdropdown.locator('input.multiselect__input');
  for (const loanOfficer of loanOfficerNames) {
    await searchBox.click();
    await searchBox.fill(loanOfficer);
    // Click exact option
    await this.page
      .locator('ul[role="listbox"]')
      .getByRole('option', { name: loanOfficer })
      .click();
  }
}

// Verify loan officer table data
async verifyLoanOfficerData(expectedLoanOfficers: string[]): Promise<void> {
  await this.page
    .locator('div.production-report.theme-loan-officer-funded tr')
    .first()
    .waitFor();
  if (await this.fundreportexpandButton.isVisible()) {
    await this.fundreportexpandButton.click({ force: true });
  }
  const loanOfficerCells = this.page.locator('td[data-key="LoanOfficers"]');
  const allLoanOfficers = await loanOfficerCells.allTextContents();
  for (const loanOfficer of allLoanOfficers) {
    const cleanLoanOfficer = loanOfficer.trim();
   // ✅ skip empty + total row
    if (!cleanLoanOfficer || cleanLoanOfficer === "Total") {
      continue;
    }
    if (!expectedLoanOfficers.includes(cleanLoanOfficer)) {
      console.log("❌ Unexpected loan officer found:", cleanLoanOfficer);
      throw new Error(`Unexpected loan officer in table: ${cleanLoanOfficer}`);
    }
    console.log("✅ Valid loan officer:", cleanLoanOfficer);
  }
}


// Channel name dropdown selection
async channelNameSelection(channelNames: string[]): Promise<void> {
  await this.page
    .locator('div.production-report.theme-loan-officer-funded tr')
    .first()
    .waitFor();
  // Mobile filter support
  if (await this.openFilterButton.isVisible()) {
    await this.openFilterButton.click();
  }

  await this.channelnamedropdown.click({timeout: 5000 });

  const searchBox = this.channelnamedropdown.locator('input.multiselect__input');
  for (const channelName of channelNames) {
    await searchBox.click();
    await searchBox.fill(channelName);
    // Click exact option
    await this.page
      .locator('ul[role="listbox"]')
      .getByRole('option', { name: channelName, exact: true })
      .click();
  }

}


// Verify channel name table data  - done later 





// Month dropdown selection
async monthSelection(monthNames: string[]): Promise<void> {
  await this.page
    .locator('div.production-report.theme-loan-officer-funded tr')
    .first()
    .waitFor();
  // Mobile filter support
  if (await this.openFilterButton.isVisible()) {
    await this.openFilterButton.click();
  }
  await this.monthdropdown.click({timeout: 5000 });

  const searchBox = this.monthdropdown.locator('input.multiselect__input');
  for (const monthName of monthNames) {
    await searchBox.click();
    await searchBox.fill(monthName);


    // Click exact option
    await this.page
      .locator('ul[role="listbox"]')
      .getByRole('option', { name: monthName, exact: true })
      .click();
  }

}







// Verify month name table data  -

async verifyMonthData(expectedMonths: string[]): Promise<void> {

  await this.page
    .locator('div.production-report.theme-loan-officer-funded tr')
    .first()
    .waitFor();

  if (await this.fundreportexpandButton.isVisible()) {
    await this.fundreportexpandButton.click({ force: true });
  }

  // ✅ get ALL headers first
  const monthCells = this.page.locator('table thead tr:first-child th');

  const allMonths = await monthCells.allTextContents();

  for (const month of allMonths) {

    const cleanMonth = month.trim();

    // skip empty + non-month columns
    if (!cleanMonth || !cleanMonth.includes('2026')) {
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

  await this.page.waitForLoadState('networkidle')

   // Mobile filter support
  if (await this.openFilterButton.isVisible({ timeout: 10000 })) {
    await this.openFilterButton.click();
    await this.selectyeardropdownmobile.click({timeout: 5000 });
   
  }

else{ await this.selectyeardropdowndesktop.click({timeout: 5000 });}
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
      await this.page.getByRole('button', { name: '‹' }).click();
    } else {
      await this.page.getByRole('button', { name: '›' }).click();
    }
  }

 
}

async verifyYearData(targetYear: string): Promise<void> {

  await this.page.waitForLoadState('networkidle'); // ensure data has loaded
  const dataRows = this.page.locator(
    'div.production-report.theme-loan-officer-funded tbody tr'
  );

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

}




