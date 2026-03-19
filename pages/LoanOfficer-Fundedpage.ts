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
  readonly expandButton: Locator;
  readonly branchdropdown: Locator;
  readonly loanofficerdropdown: Locator;
  readonly channelnamedropdown: Locator;
  readonly monthdropdown:Locator;

  readonly selectyeardropdowndesktop: Locator;
  readonly selectyeardropdownmobile: Locator;


  readonly clearButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.heading = page
      .getByRole('heading', { name: /LOAN OFFICER FUNDED/i })
      .first();

    this.divisionDropdown = page.getByRole('combobox').nth(0);

    this.submitButton = page.getByRole('button', { name: /Submit|Apply/i });

    this.openFilterButton = page.getByRole('button', { name: 'Open Filters' });

    this.expandButton = page
      .locator('div.production-report.theme-loan-officer-funded')
      .getByRole('button', { name: /Expand/i });


    this.branchdropdown = page.getByRole('combobox').nth(1);

    this.loanofficerdropdown = page.getByRole('combobox').nth(2);
    this.channelnamedropdown = page.getByRole('combobox').nth(3);
    this.monthdropdown = page.getByRole('combobox').nth(4);

    this.selectyeardropdowndesktop = page.locator('div.dropdown')

    this.selectyeardropdownmobile = page.locator('i.fa-solid.fa-calendar-days:visible');


    this.clearButton = page.getByRole('button', { name: /Clear/i });
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
   if (await this.expandButton.isVisible()) {
  await this.expandButton.click({ force: true });
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

  if (await this.expandButton.isVisible()) {
    await this.expandButton.click({ force: true });
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
  if (await this.expandButton.isVisible()) {
    await this.expandButton.click({ force: true });
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

  if (await this.expandButton.isVisible()) {
    await this.expandButton.click({ force: true });
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




