import { expect, Locator, Page } from '@playwright/test';

export class WarehouseTrackingPage {
  readonly page: Page;

  readonly heading: Locator;

  readonly openFilterButton: Locator;

  // Dropdowns
  readonly loanNumberDropdown: Locator;
  readonly borrowerNameDropdown: Locator;
  readonly loanPurposeDropdown: Locator;
  readonly loanTypeDropdown: Locator;
  readonly selectDateTypeDropdown: Locator;

  // Search Boxes
  readonly loanNumberSearchBox: Locator;
  readonly borrowerNameSearchBox: Locator;
  readonly loanPurposeSearchBox: Locator;
  readonly loanTypeSearchBox: Locator;
  readonly selectDateTypeSearchBox: Locator;

  // Date Range
  readonly dateRangeInput: Locator;
  readonly dateRangeClearButton: Locator;
  readonly calendarPrevButton: Locator;
  readonly calendarNextButton: Locator;

  readonly listBox: Locator;

  readonly submitButton: Locator;
  readonly clearButton: Locator;

  // Refresh
  readonly refreshButtonDesktop: Locator;
  readonly refreshButtonMobile: Locator;

  // Export
  readonly exportButtonDesktop: Locator;
  readonly exportButtonMobile: Locator;

  // Expand / Collapse
  readonly secondarytableexpandButton: Locator;
  readonly secondarytablecollapseButton: Locator;

  // Secondary Table
  readonly secondaryTable: Locator;

  // No Data Message
  readonly noRecordFoundMessage: Locator;

  // Toggle Buttons
  readonly showDetailsButton: Locator;
  readonly hideDetailsButton: Locator;
  readonly showDatesButton: Locator;
  readonly hideDatesButton: Locator;

  // Table Cells
  readonly loanNumberCells: Locator;
  readonly borrowerNameCells: Locator;
  readonly loanPurposeCells: Locator;
  readonly loanTypeCells: Locator;
  readonly investorCells: Locator;
  readonly channelCells: Locator;
  readonly productionStatusCells: Locator;
  readonly warehouseNameCells: Locator;

  constructor(page: Page) {
    this.page = page;

    // Heading
    this.heading = page.getByRole('heading', { name: /WAREHOUSE TRACKING/i });

    // Filter (mobile)
    this.openFilterButton = page.locator('button.wh-tracking-filter-btn')

    // Dropdowns
    this.loanNumberDropdown = page.getByRole('combobox').nth(0);
    this.borrowerNameDropdown = page.getByRole('combobox').nth(1);
    this.loanPurposeDropdown = page.getByRole('combobox').nth(2);
    this.loanTypeDropdown = page.getByRole('combobox').nth(3);
    this.selectDateTypeDropdown = page.getByRole('combobox').nth(4);

    // Search Boxes
    this.loanNumberSearchBox = this.loanNumberDropdown.locator('input.multiselect__input');
    this.borrowerNameSearchBox = this.borrowerNameDropdown.locator('input.multiselect__input');
    this.loanPurposeSearchBox = this.loanPurposeDropdown.locator('input.multiselect__input');
    this.loanTypeSearchBox = this.loanTypeDropdown.locator('input.multiselect__input');
    this.selectDateTypeSearchBox = this.selectDateTypeDropdown.locator('input.multiselect__input');

    // Date Range
    this.dateRangeInput = page.locator('input[placeholder="Select Date Range"]');
    this.dateRangeClearButton = page.locator('div.dp__clear_icon');
    this.calendarPrevButton = page.locator('[data-dp-element="action-prev"]');
    this.calendarNextButton = page.locator('[data-dp-element="action-next"]');

    // Listbox
    this.listBox = page.locator('ul[role="listbox"]');

    // Buttons
    this.submitButton = page.getByRole('button', { name: /Submit|Apply/i });
    this.clearButton = page.getByText('Clear', { exact: true });

    // Refresh
    this.refreshButtonDesktop = page.getByRole('button', { name: /Refresh/i });
    this.refreshButtonMobile = page.locator('div.icons-container button').nth(0);

    // Export
    this.exportButtonDesktop = page.getByRole('button', { name: /Export/i });
    this.exportButtonMobile = page.locator('button.wh-tracking-export-btn')

    // Expand / Collapse
    this.secondarytableexpandButton = page.locator('button').filter({ hasText: 'Expand' }).first();
    this.secondarytablecollapseButton = page.locator('button').filter({ hasText: 'Collapse' }).first();

    // Table
    this.secondaryTable = page.locator('div.table-container').nth(0);

    // No Data Message
    this.noRecordFoundMessage = page.getByText('No record found of date range', { exact: true });

    // Toggle Buttons
    this.showDetailsButton = page.getByRole('button', { name: /Show Details/i });
    this.hideDetailsButton = page.getByRole('button', { name: /Hide Details/i });
    this.showDatesButton = page.getByRole('button', { name: /Show Dates/i });
    this.hideDatesButton = page.getByRole('button', { name: /Hide Dates/i });

    // Table Cells
    this.loanNumberCells = page.locator('td[data-key="loanNumber"]').filter({
      hasNotText: 'Total'
    });
    this.borrowerNameCells = page.locator('td[data-key="borrowerName"]').filter({
      hasNotText: 'Total'
    });
    this.loanPurposeCells = page.locator('td[data-key="loanPurpose"]').filter({
      hasNotText: 'Total'
    });
    this.loanTypeCells = page.locator('td[data-key="loanType"]').filter({
      hasNotText: 'Total'
    });
    this.investorCells = page.locator('td[data-key="investor"]').filter({
      hasNotText: 'Total'
    });
    this.channelCells = page.locator('td[data-key="channel"]').filter({
      hasNotText: 'Total'
    });
    this.productionStatusCells = page.locator('td[data-key="productionStatus"]').filter({
      hasNotText: 'Total'
    });
    this.warehouseNameCells = page.locator('td[data-key="warehouseName"]').filter({
      hasNotText: 'Total'
    });
  }

  async waitForGridToLoad(timeout = 90000): Promise<void> {
    await expect(this.secondaryTable).toBeVisible({ timeout });
  }

  async clickClear(): Promise<void> {
    await this.waitForGridToLoad();
    if (await this.openFilterButton.isVisible({ timeout: 30000 }).catch(() => false)) {
      await this.openFilterButton.click({ timeout: 30000 });
    }

    await expect(this.clearButton).toBeVisible({ timeout: 30000 });
    await expect(this.clearButton).toBeEnabled({ timeout: 30000 });
    await this.clearButton.click({ timeout: 30000 });

    console.log('Clear button clicked, filters reset');
  }

  async clickSubmit(): Promise<void> {
    await expect(this.submitButton).toBeVisible({ timeout: 30000 });
    await this.submitButton.click({ timeout: 30000 });
  }

  async isSecondaryTableVisible(): Promise<boolean> {
    await expect(this.secondaryTable).toBeVisible({ timeout: 30000 });
    return await this.secondaryTable.isVisible({ timeout: 30000 });
  }

  async isNoRecordFoundMessageVisible(): Promise<boolean> {
    return await this.noRecordFoundMessage.isVisible({ timeout: 30000 });
  }

  async waitForTableOrNoRecord(): Promise<'table' | 'noRecord'> {
    await Promise.race([
      this.secondaryTable.waitFor({ state: 'visible', timeout: 30000 }),
      this.noRecordFoundMessage.waitFor({ state: 'visible', timeout: 30000 }),
    ]);

    if (await this.noRecordFoundMessage.isVisible({ timeout: 5000 }).catch(() => false)) {
      console.log('⚠️ No record found of date range');
      return 'noRecord';
    }

    console.log('📊 Secondary Table is visible');
    return 'table';
  }

  // Refresh
  async clickRefresh(): Promise<void> {
    if (await this.refreshButtonDesktop.isVisible({ timeout: 30000 }).catch(() => false)) {
      await this.refreshButtonDesktop.click({ timeout: 30000 });
      console.log('🔄 Refresh button (desktop) clicked');
    } else if (await this.refreshButtonMobile.isVisible({ timeout: 30000 }).catch(() => false)) {
      await this.refreshButtonMobile.click({ timeout: 30000 });
      console.log('🔄 Refresh button (mobile) clicked');
    }
  }

  // Export
  async clickExport(): Promise<void> {
    if (await this.exportButtonDesktop.isVisible({ timeout: 30000 }).catch(() => false)) {
      await this.exportButtonDesktop.click({ timeout: 30000 });
      console.log('📤 Export button (desktop) clicked');
    } else if (await this.exportButtonMobile.isVisible({ timeout: 30000 }).catch(() => false)) {
      await this.exportButtonMobile.click({ timeout: 30000 });
      console.log('📤 Export button (mobile) clicked');
    }
  }

  // Expand / Collapse
  async clickSecondaryTableExpand(): Promise<void> {
    if (await this.secondarytableexpandButton.isVisible({ timeout: 30000 }).catch(() => false)) {
      await this.secondarytableexpandButton.click({ timeout: 30000 });
      console.log('🔍 Secondary Table Expand button clicked');
    }
  }

  // Show / Hide Details
  async clickShowDetails(): Promise<void> {
    await expect(this.showDetailsButton).toBeVisible({ timeout: 30000 });
    await this.showDetailsButton.click({ timeout: 30000 });
    console.log('📋 Show Details button clicked');
  }

  async clickHideDetails(): Promise<void> {
    await expect(this.hideDetailsButton).toBeVisible({ timeout: 30000 });
    await this.hideDetailsButton.click({ timeout: 30000 });
    console.log('📋 Hide Details button clicked');
  }

  // Show / Hide Dates
  async clickShowDates(): Promise<void> {
    await expect(this.showDatesButton).toBeVisible({ timeout: 30000 });
    await this.showDatesButton.click({ timeout: 30000 });
    console.log('📅 Show Dates button clicked');
  }

  async clickHideDates(): Promise<void> {
    await expect(this.hideDatesButton).toBeVisible({ timeout: 30000 });
    await this.hideDatesButton.click({ timeout: 30000 });
    console.log('📅 Hide Dates button clicked');
  }

  // Dropdown Selections
  async loanNumberSelection(loanNumbers: string[]): Promise<void> {
    await this.waitForGridToLoad();
     await this.openFiltersIfMobile()

    await expect(this.loanNumberDropdown).toBeVisible({ timeout: 30000 });
    await this.loanNumberDropdown.click({ timeout: 30000 });
    for (const loanNumber of loanNumbers) {
      await this.loanNumberSearchBox.click();
      await this.loanNumberSearchBox.fill(loanNumber);
      await this.listBox.getByRole('option', { name: loanNumber, exact: true }).click();
    }
     // ensure dropdown closes
  await this.page.keyboard.press('Escape');
  }

  async borrowerNameSelection(borrowerNames: string[]): Promise<void> {
    await this.waitForGridToLoad();
     await this.openFiltersIfMobile()

    await expect(this.borrowerNameDropdown).toBeVisible({ timeout: 30000 });
    await this.borrowerNameDropdown.click({ timeout: 30000 });
    for (const borrowerName of borrowerNames) {
      await this.borrowerNameSearchBox.click();
      await this.borrowerNameSearchBox.fill(borrowerName);
      await this.listBox.getByRole('option', { name: borrowerName, exact: true }).click();
    }
     // ensure dropdown closes
  await this.page.keyboard.press('Escape');
  }

  async loanPurposeSelection(loanPurposes: string[]): Promise<void> {
    await this.waitForGridToLoad();
     await this.openFiltersIfMobile()

    await expect(this.loanPurposeDropdown).toBeVisible({ timeout: 30000 });
    await this.loanPurposeDropdown.click({ timeout: 30000 });
    for (const loanPurpose of loanPurposes) {
      await this.loanPurposeSearchBox.click();
      await this.loanPurposeSearchBox.fill(loanPurpose);
      await this.listBox.getByRole('option', { name: loanPurpose, exact: true }).click();
    }
     // ensure dropdown closes
  await this.page.keyboard.press('Escape');
  }

  async loanTypeSelection(loanTypes: string[]): Promise<void> {
    await this.waitForGridToLoad();
     await this.openFiltersIfMobile()

    await expect(this.loanTypeDropdown).toBeVisible({ timeout: 30000 });
    await this.loanTypeDropdown.click({ timeout: 30000 });
    for (const loanType of loanTypes) {
      await this.loanTypeSearchBox.click();
      await this.loanTypeSearchBox.fill(loanType);
      await this.listBox.getByRole('option', { name: loanType, exact: true }).click();
    }
     // ensure dropdown closes
  await this.page.keyboard.press('Escape');
  }

  async selectDateTypeSelection(dateTypes: string[]): Promise<void> {
    await this.waitForGridToLoad();
     await this.openFiltersIfMobile()

    await expect(this.selectDateTypeDropdown).toBeVisible({ timeout: 30000 });
    await this.selectDateTypeDropdown.click({ timeout: 30000 });
    for (const dateType of dateTypes) {
      await this.selectDateTypeSearchBox.click();
      await this.selectDateTypeSearchBox.fill(dateType);
      await this.listBox.getByRole('option', { name: dateType, exact: true }).click();
    }
     // ensure dropdown closes
  await this.page.keyboard.press('Escape');
  }

  // Date Range Selection
  // startDate and endDate format: 'YYYY-MM-DD' (e.g., '2026-01-01')
  async selectDateRange(startDate: string, endDate: string): Promise<void> {
    await expect(this.dateRangeInput).toBeVisible({ timeout: 30000 });
    await this.dateRangeInput.click({ timeout: 30000 });

    // Navigate to start date month if needed and click it
    await this.navigateToDate(startDate);
    await this.page.locator(`[data-test-id="dp-${startDate}"]`).click({ timeout: 30000 });
    console.log(`📅 Start date selected: ${startDate}`);

    // Navigate to end date month if needed and click it
    await this.navigateToDate(endDate);
    await this.page.locator(`[data-test-id="dp-${endDate}"]`).click({ timeout: 30000 });
    console.log(`📅 End date selected: ${endDate}`);
  }

  private async navigateToDate(targetDate: string): Promise<void> {
    const [targetYear, targetMonth] = targetDate.split('-').map(Number);

    while (true) {
      const monthText = await this.page.locator('[data-dp-element="overlay-month"]').textContent();
      const yearText = await this.page.locator('[data-dp-element="overlay-year"]').textContent();

      if (!monthText || !yearText) throw new Error('Calendar month/year not found');

      const monthMap: Record<string, number> = {
        Jan: 1, Feb: 2, Mar: 3, Apr: 4, May: 5, Jun: 6,
        Jul: 7, Aug: 8, Sep: 9, Oct: 10, Nov: 11, Dec: 12
      };

      const currentMonth = monthMap[monthText.trim()];
      const currentYear = parseInt(yearText.trim());

      if (currentYear === targetYear && currentMonth === targetMonth) break;

      if (
        currentYear > targetYear ||
        (currentYear === targetYear && currentMonth > targetMonth)
      ) {
        await this.calendarPrevButton.click({ timeout: 30000 });
      } else {
        await this.calendarNextButton.click({ timeout: 30000 });
      }

      await this.page.waitForLoadState('domcontentloaded');
    }
  }

  async clearDateRange(): Promise<void> {
    if (await this.dateRangeClearButton.isVisible({ timeout: 30000 }).catch(() => false)) {
      await this.dateRangeClearButton.click({ timeout: 30000 });
      console.log('🗑️ Date range cleared');
    }
  }

  // Verify Methods
  async verifyLoanPurposeData(expectedLoanPurposes: string[]): Promise<void> {
    await this.waitForGridToLoad();
    if (await this.secondarytableexpandButton.isVisible({ timeout: 30000 }).catch(() => false)) {
      await this.secondarytableexpandButton.click({ force: true });
    }
    const allLoanPurposes = await this.loanPurposeCells.allTextContents();
    for (const loanPurpose of allLoanPurposes) {
      const cleanActual = loanPurpose.trim();
      if (!cleanActual) continue;
      const isMatch = expectedLoanPurposes.some(expected => expected.trim().toLowerCase() === cleanActual.toLowerCase());
      if (!isMatch) {
        console.log('❌ Unexpected Loan Purpose found:', cleanActual);
        throw new Error(`Unexpected Loan Purpose in table: ${cleanActual}`);
      }
      console.log('✅ Valid Loan Purpose:', cleanActual);
    }
  }

  async verifyLoanTypeData(expectedLoanTypes: string[]): Promise<void> {
    await this.waitForGridToLoad();
    if (await this.secondarytableexpandButton.isVisible({ timeout: 30000 }).catch(() => false)) {
      await this.secondarytableexpandButton.click({ force: true });
    }
    const allLoanTypes = await this.loanTypeCells.allTextContents();
    for (const loanType of allLoanTypes) {
      const cleanActual = loanType.trim();
      if (!cleanActual) continue;
      const isMatch = expectedLoanTypes.some(expected => expected.trim().toLowerCase() === cleanActual.toLowerCase());
      if (!isMatch) {
        console.log('❌ Unexpected Loan Type found:', cleanActual);
        throw new Error(`Unexpected Loan Type in table: ${cleanActual}`);
      }
      console.log('✅ Valid Loan Type:', cleanActual);
    }
  }

  async verifyBorrowerNameData(expectedBorrowerNames: string[]): Promise<void> {
    await this.waitForGridToLoad();
    if (await this.secondarytableexpandButton.isVisible({ timeout: 30000 }).catch(() => false)) {
      await this.secondarytableexpandButton.click({ force: true });
    }
    const allBorrowerNames = await this.borrowerNameCells.allTextContents();
    for (const borrowerName of allBorrowerNames) {
      const cleanActual = borrowerName.trim();
      if (!cleanActual) continue;
      const isMatch = expectedBorrowerNames.some(expected => expected.trim().toLowerCase() === cleanActual.toLowerCase());
      if (!isMatch) {
        console.log('❌ Unexpected Borrower Name found:', cleanActual);
        throw new Error(`Unexpected Borrower Name in table: ${cleanActual}`);
      }
      console.log('✅ Valid Borrower Name:', cleanActual);
    }
  }

  async verifyLoanNumberData(expectedLoanNumbers: string[]): Promise<void> {
    await this.waitForGridToLoad();
    if (await this.secondarytableexpandButton.isVisible({ timeout: 30000 }).catch(() => false)) {
      await this.secondarytableexpandButton.click({ force: true });
    }
    const allLoanNumbers = await this.loanNumberCells.allTextContents();
    for (const loanNumber of allLoanNumbers) {
      const cleanActual = loanNumber.trim();
      if (!cleanActual) continue;
      const isMatch = expectedLoanNumbers.some(expected => expected.trim() === cleanActual);
      if (!isMatch) {
        console.log('❌ Unexpected Loan Number found:', cleanActual);
        throw new Error(`Unexpected Loan Number in table: ${cleanActual}`);
      }
      console.log('✅ Valid Loan Number:', cleanActual);
    }
  }

   // extra added 

  async openFiltersIfMobile(): Promise<void> {
  try {
    await this.openFilterButton.waitFor({ state: 'visible', timeout: 3000 });
    await this.openFilterButton.click();
    console.log('🔽 Filter button clicked');
  } catch {
    // Not visible — desktop or iPad in desktop mode — skip
    console.log('ℹ️ Filter button not visible — skipping');
  }
}
}