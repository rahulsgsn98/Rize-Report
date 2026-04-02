import { expect, Locator, Page } from '@playwright/test';

export class PostClosingManagerPage {
  readonly page: Page;

  readonly heading: Locator;
  readonly postclosingmanagerdesktoprefresh: Locator;
  readonly postclosingmanagermobilerefresh: Locator;

  readonly openFilterButton: Locator;

  readonly statusDropdown: Locator;
  readonly postCloserDropdown: Locator;

  readonly statusSearchBox: Locator;
  readonly postCloserSearchBox: Locator;

  readonly listBox: Locator;

  readonly submitButton: Locator;
  readonly clearButton: Locator;

  readonly exportButtonDesktop: Locator;
  readonly exportButtonMobile: Locator;

  // Expand / Collapse — Desktop + Mobile
  readonly operationsreportexpandButton: Locator;
  readonly operationsreportcollapseButton: Locator;

  // Operations Report Table
  readonly operationsReportTable: Locator;

  // Toggle Buttons
  readonly showLoanDetailsButton: Locator;
  readonly hideLoanDetailsButton: Locator;
  readonly showDatesButton: Locator;
  readonly hideDatesButton: Locator;

  // Table Cells
  readonly operationsReportPostCloserNameCells: Locator;
  readonly operationsReportProductionStatusCells: Locator;

  constructor(page: Page) {
    this.page = page;

    // Heading
    this.heading = page.getByRole('heading', { name: /POST CLOSING MANAGER/i });

    // Refresh
    this.postclosingmanagerdesktoprefresh = page.locator('span.last-refresh-text');
    this.postclosingmanagermobilerefresh = page.locator('span.biz-refresh-text');

    // Filter (mobile)
    this.openFilterButton = page.locator('button.pcm4-filter-btn:visible');

    // Dropdowns
    this.statusDropdown = page.getByRole('combobox').nth(0);
    this.postCloserDropdown = page.getByRole('combobox').nth(1);

    // Search Boxes (scoped to their dropdown)
    this.statusSearchBox = this.statusDropdown.locator('input.multiselect__input');
    this.postCloserSearchBox = this.postCloserDropdown.locator('input.multiselect__input');

    // Listbox
    this.listBox = page.locator('ul[role="listbox"]');

    // Buttons
    this.submitButton = page.getByRole('button', { name: /Submit|Apply/i });
    this.clearButton = page.getByRole('button', { name: /Clear/i });

    // Export
    this.exportButtonDesktop = page.getByRole('button', { name: /Export/i });
    this.exportButtonMobile = page.locator('button.pcm4-export-btn');

    // Expand / Collapse
    this.operationsreportexpandButton = page.locator('button').filter({ hasText: 'Expand' }).first();
    this.operationsreportcollapseButton = page.locator('button').filter({ hasText: 'Collapse' }).first();

    // Table
    this.operationsReportTable = page.locator('div.table-container').nth(0);

    // Toggle Buttons
    this.showLoanDetailsButton = page.getByRole('button', { name: /Show Loan Details/i });
    this.hideLoanDetailsButton = page.getByRole('button', { name: /Hide Loan Details/i });
    this.showDatesButton = page.getByRole('button', { name: /Show Dates/i });
    this.hideDatesButton = page.getByRole('button', { name: /Hide Dates/i });

    // Table Cells
    this.operationsReportPostCloserNameCells = page.locator('td[data-key="PostCloser"]').filter({
      hasNotText: 'Total'
    });

    this.operationsReportProductionStatusCells = page.locator('td[data-key="ProductionStatus"]').filter({
      hasNotText: 'Total'
    });
  }

  async waitForGridToLoad(timeout = 90000): Promise<void> {
    await expect(this.operationsReportTable).toBeVisible({ timeout });
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

  async waitForRefreshDateTimeToBeVisible(): Promise<void> {
    await Promise.race([
      this.postclosingmanagerdesktoprefresh.waitFor({ state: 'visible', timeout: 30000 }),
      this.postclosingmanagermobilerefresh.waitFor({ state: 'visible', timeout: 30000 }),
    ]);
  }

  async isRefreshDateTimeDisplayed(): Promise<boolean> {
    return (
      await this.postclosingmanagerdesktoprefresh.isVisible({ timeout: 30000 })
    ) || (
      await this.postclosingmanagermobilerefresh.isVisible({ timeout: 30000 })
    );
  }

  async isOperationsReportTableVisible(): Promise<boolean> {
    await expect(this.operationsReportTable).toBeVisible({ timeout: 30000 });
    return await this.operationsReportTable.isVisible({ timeout: 30000 });
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
  async clickoperationsreportExpand(): Promise<void> {
    if (await this.operationsreportexpandButton.isVisible({ timeout: 30000 }).catch(() => false)) {
      await this.operationsreportexpandButton.click({ timeout: 30000 });
      console.log('🔍 Operations Report Expand button clicked');
    }
  }

  // Show / Hide Loan Details
  async clickShowLoanDetails(): Promise<void> {
    await expect(this.showLoanDetailsButton).toBeVisible({ timeout: 30000 });
    await this.showLoanDetailsButton.click({ timeout: 30000 });
    console.log('📋 Show Loan Details button clicked');
  }

  async clickHideLoanDetails(): Promise<void> {
    await expect(this.hideLoanDetailsButton).toBeVisible({ timeout: 30000 });
    await this.hideLoanDetailsButton.click({ timeout: 30000 });
    console.log('📋 Hide Loan Details button clicked');
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
  async statusSelection(statuses: string[]): Promise<void> {
    await this.waitForGridToLoad();
    
    await this.openFiltersIfMobile()


   /*  try {
  await this.openFilterButton.waitFor({ state: 'visible', timeout: 500 });
  await this.openFilterButton.click();
} catch {
  console.log('Filter button not visible, skipping...');
} */

    await expect(this.statusDropdown).toBeVisible({ timeout: 30000 });
    await this.statusDropdown.click({ timeout: 30000 });

    for (const status of statuses) {
      await this.statusSearchBox.click();
      await this.statusSearchBox.fill(status);
      await this.listBox.getByRole('option', { name: status, exact: true }).click();
    }
  }

  async postCloserSelection(postCloserNames: string[]): Promise<void> {
    await this.waitForGridToLoad();
    await this.openFiltersIfMobile()
   /*  if (await this.openFilterButton.isVisible({ timeout: 30000 }).catch(() => false)) {
      await this.openFilterButton.click({ timeout: 30000 });
    } */

    await expect(this.postCloserDropdown).toBeVisible({ timeout: 30000 });
    await this.postCloserDropdown.click({ timeout: 30000 });

    for (const postCloserName of postCloserNames) {
      await this.postCloserSearchBox.click();
      await this.postCloserSearchBox.fill(postCloserName);
      await this.listBox.getByRole('option', { name: postCloserName, exact: true }).click();
    }
      // ensure dropdown closes
  await this.page.keyboard.press('Escape');
  }

  // Verify Methods
  async verifyPostCloserNameData(expectedPostCloserNames: string[]): Promise<void> {
    await this.waitForGridToLoad();

    if (await this.operationsreportexpandButton.isVisible({ timeout: 30000 }).catch(() => false)) {
      await this.operationsreportexpandButton.click({ force: true });
    }

    const allPostCloserNames = await this.operationsReportPostCloserNameCells.allTextContents();

    for (const postCloserName of allPostCloserNames) {
      const cleanActual = postCloserName.trim();
      if (!cleanActual || cleanActual.toLowerCase() === 'total') continue;

      const isMatch = expectedPostCloserNames.some(expected => expected.trim() === cleanActual);

      if (!isMatch) {
        console.log('❌ Unexpected Post Closer Name found:', cleanActual);
        throw new Error(`Unexpected Post Closer Name in table: ${cleanActual}`);
      }

      console.log('✅ Valid Post Closer Name:', cleanActual);
    }
  }

  async verifyProductionStatusData(expectedStatuses: string[]): Promise<void> {
    await this.waitForGridToLoad();

    if (await this.operationsreportexpandButton.isVisible({ timeout: 30000 }).catch(() => false)) {
      await this.operationsreportexpandButton.click({ force: true });
    }

    const allStatuses = await this.operationsReportProductionStatusCells.allTextContents();

    for (const status of allStatuses) {
      const cleanActual = status.trim();
      if (!cleanActual || cleanActual.toLowerCase() === 'total') continue;

      const isMatch = expectedStatuses.some(expected => expected.trim() === cleanActual);

      if (!isMatch) {
        console.log('❌ Unexpected Production Status found:', cleanActual);
        throw new Error(`Unexpected Production Status in table: ${cleanActual}`);
      }

      console.log('✅ Valid Production Status:', cleanActual);
    }
  }




  // extra added 

  async openFiltersIfMobile(): Promise<void> {
  try {
    await this.openFilterButton.waitFor({ state: 'visible', timeout: 3000 });
    await this.openFilterButton.click({ force: true });
    console.log('🔽 Filter button clicked');
  } catch {
    // Not visible — desktop or iPad in desktop mode — skip
    console.log('ℹ️ Filter button not visible — skipping');
  }
}
}