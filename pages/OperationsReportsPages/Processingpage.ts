import { expect, Locator, Page } from '@playwright/test';

export class ProcessorFundedPage {
  readonly page: Page;

  readonly heading: Locator;
  readonly processorfundeddesktoprefresh: Locator;
  readonly processorfundedmobilerefresh: Locator;

  readonly openFilterButton: Locator;

  readonly processorNameDropdown: Locator;
  readonly monthDropdown: Locator;

  readonly processorNameSearchBox: Locator;
  readonly monthSearchBox: Locator;

  readonly listBox: Locator;

  readonly submitButton: Locator;
  readonly clearButton: Locator;

  readonly selectyeardropdowndesktop: Locator;
  readonly selectyeardropdownmobile: Locator;

  readonly operationsReportTable: Locator;
  readonly loanChannelReportTable: Locator;
  readonly loanProductReportTable: Locator;
  readonly loanPurposeReportTable: Locator;
  readonly loanInvestorReportTable: Locator;

  readonly operationsreportexpandButton: Locator;
  readonly operationsreportcollapseButton: Locator;
  readonly loaninvestorexpendButton: Locator;
  readonly loaninvestorcollapseButton: Locator;

  readonly loanchannelchart: Locator;
  readonly loanproductchart: Locator;
  readonly loanpurposechart: Locator;
  readonly loaninvestorchart: Locator;

  readonly operationsReportProcessorNameCells: Locator;

  constructor(page: Page) {
    this.page = page;

    // Heading
    this.heading = page.getByRole('heading', { name: /PROCESSOR FUNDED/i });

    // Refresh
    this.processorfundeddesktoprefresh = page.locator('span.last-refresh-text');
    this.processorfundedmobilerefresh = page.locator('div.proc-mobile-refresh:visible')
    // Filter (mobile)
    this.openFilterButton = page.getByRole('button', { name: /Open Filters/i });

    // Dropdowns
    this.processorNameDropdown = page.getByRole('combobox').nth(0);
    this.monthDropdown = page.getByRole('combobox').nth(1);

    // Search Boxes (scoped to their dropdown)
    this.processorNameSearchBox = this.processorNameDropdown.locator('input.multiselect__input');
    this.monthSearchBox = this.monthDropdown.locator('input.multiselect__input');

    // Listbox
    this.listBox = page.locator('ul[role="listbox"]');

    // Buttons
    this.submitButton = page.getByRole('button', { name: /Submit|Apply/i });
    this.clearButton = page.getByRole('button', { name: /Clear/i });

    // Year dropdown
    this.selectyeardropdowndesktop = page.locator('div.dropdown');
    this.selectyeardropdownmobile = page.locator('i.fa-solid.fa-calendar-days:visible');

    // Expand / Collapse
    this.operationsreportexpandButton = page.locator('button').filter({ hasText: 'Expand' }).first();
    this.loaninvestorexpendButton = page.locator('button').filter({ hasText: 'Expand' }).last();
    this.operationsreportcollapseButton = page.locator('button').filter({ hasText: 'Collapse' }).first();
    this.loaninvestorcollapseButton = page.locator('button').filter({ hasText: 'Collapse' }).last();

    // Tables
    this.operationsReportTable = page.locator('div.table-container');
    this.loanChannelReportTable = page.locator('div.table-wrapper').nth(0);
    this.loanProductReportTable = page.locator('div.table-wrapper').nth(1);
    this.loanPurposeReportTable = page.locator('div.table-wrapper').nth(2);
    this.loanInvestorReportTable = page.locator('div.table-wrapper').nth(3);

    // Charts
    this.loanchannelchart = page.locator('div.chart-container').nth(0);
    this.loanproductchart = page.locator('div.chart-container').nth(1);
    this.loanpurposechart = page.locator('div.chart-container').nth(2);
    this.loaninvestorchart = page.locator('div.chart-container').nth(3);

    // Table Cells
    this.operationsReportProcessorNameCells = page.locator('td[data-key="ProcessorName"]').filter({
      hasNotText: 'Total'
    });
  }

  async waitForGridToLoad(timeout = 90000) {
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
      this.processorfundeddesktoprefresh.waitFor({ state: 'visible', timeout: 30000 }),
      this.processorfundedmobilerefresh.waitFor({ state: 'visible', timeout: 30000 }),
    ]);
  }

  async isRefreshDateTimeDisplayed(): Promise<boolean> {
    return (
      await this.processorfundeddesktoprefresh.isVisible({ timeout: 30000 })
    ) || (
      await this.processorfundedmobilerefresh.isVisible({ timeout: 30000 })
    );
  }

  async isOperationsReportTableVisible(): Promise<boolean> {
    await expect(this.operationsReportTable).toBeVisible({ timeout: 30000 });
    return await this.operationsReportTable.isVisible({ timeout: 30000 });
  }

  async isLoanChannelReportTableVisible(): Promise<boolean> {
    await expect(this.loanChannelReportTable).toBeVisible({ timeout: 30000 });
    return await this.loanChannelReportTable.isVisible({ timeout: 30000 });
  }

  async isLoanProductReportTableVisible(): Promise<boolean> {
    await expect(this.loanProductReportTable).toBeVisible({ timeout: 30000 });
    return await this.loanProductReportTable.isVisible({ timeout: 30000 });
  }

  async isLoanPurposeReportTableVisible(): Promise<boolean> {
    await expect(this.loanPurposeReportTable).toBeVisible({ timeout: 30000 });
    return await this.loanPurposeReportTable.isVisible({ timeout: 30000 });
  }

  async isLoanInvestorReportTableVisible(): Promise<boolean> {
    await expect(this.loanInvestorReportTable).toBeVisible({ timeout: 30000 });
    return await this.loanInvestorReportTable.isVisible({ timeout: 30000 });
  }

  async isloanchannelchartVisible(): Promise<boolean> {
    await expect(this.loanchannelchart).toBeVisible({ timeout: 30000 });
    return await this.loanchannelchart.isVisible({ timeout: 30000 });
  }

  async isloanproductchartVisible(): Promise<boolean> {
    await expect(this.loanproductchart).toBeVisible({ timeout: 30000 });
    return await this.loanproductchart.isVisible({ timeout: 30000 });
  }

  async isloanpurposechartVisible(): Promise<boolean> {
    await expect(this.loanpurposechart).toBeVisible({ timeout: 30000 });
    return await this.loanpurposechart.isVisible({ timeout: 30000 });
  }

  async isloaninvestorchartVisible(): Promise<boolean> {
    await expect(this.loaninvestorchart).toBeVisible({ timeout: 30000 });
    return await this.loaninvestorchart.isVisible({ timeout: 30000 });
  }

  async clickoperationsreportExpand(): Promise<void> {
    if (await this.operationsreportexpandButton.isVisible({ timeout: 30000 }).catch(() => false)) {
      await this.operationsreportexpandButton.click({ timeout: 30000 });
      console.log('🔍 Operations report Expand button clicked');
    }
  }

  async clickloaninvestorExpand(): Promise<void> {
    if (await this.loaninvestorexpendButton.isVisible({ timeout: 30000 }).catch(() => false)) {
      await this.loaninvestorexpendButton.click({ timeout: 30000 });
      console.log('🔍 Loan investor Expand button clicked');
    }
  }

  async processorNameSelection(processorNames: string[]): Promise<void> {
    await this.waitForGridToLoad();
    if (await this.openFilterButton.isVisible({ timeout: 30000 }).catch(() => false)) {
      await this.openFilterButton.click({ timeout: 30000 });
    }

    await expect(this.processorNameDropdown).toBeVisible({ timeout: 30000 });
    await this.processorNameDropdown.click({ timeout: 30000 });

    for (const processorName of processorNames) {
      await this.processorNameSearchBox.click();
      await this.processorNameSearchBox.fill(processorName);
      await this.listBox.getByRole('option', { name: processorName, exact: true }).click();
    }
  }

  async monthSelection(months: string[]): Promise<void> {
    await this.waitForGridToLoad();
    if (await this.openFilterButton.isVisible({ timeout: 30000 }).catch(() => false)) {
      await this.openFilterButton.click({ timeout: 30000 });
    }

    await expect(this.monthDropdown).toBeVisible({ timeout: 30000 });
    await this.monthDropdown.click({ timeout: 30000 });

    for (const month of months) {
      await this.monthSearchBox.click();
      await this.monthSearchBox.fill(month);
      await this.listBox.getByRole('option', { name: month, exact: true }).click();
     

    }
       // ensure dropdown closes
  await this.page.keyboard.press('Escape');
  }

  // Year dropdown selection
  async selectYear(targetYear: number): Promise<void> {
    await this.waitForGridToLoad();

    // Mobile filter support
    if (await this.openFilterButton.isVisible({ timeout: 30000 }).catch(() => false)) {
      await this.openFilterButton.click();
      await this.selectyeardropdownmobile.click({ timeout: 30000 });
    } else {
      await this.selectyeardropdowndesktop.click({ timeout: 30000 });
    }

    while (true) {
      const rangeText = await this.page.locator('div.decade').textContent();
      if (!rangeText) throw new Error('Year range not found');

      const [start, end] = rangeText
        .split(/[-–]/)
        .map(val => parseInt(val.trim()));

      if (targetYear >= start && targetYear <= end) {
        await this.page
          .locator('div.year-grid div.year', { hasText: targetYear.toString() })
          .click();
        break;
      }

      await this.page.waitForLoadState('domcontentloaded');

      if (targetYear < start) {
        await this.page.getByRole('button', { name: '‹' }).click({ timeout: 30000 });
      } else {
        await this.page.getByRole('button', { name: '›' }).click({ timeout: 30000 });
      }
    }
  }

async verifyProcessorNameData(expectedProcessorNames: string[]): Promise<void> {
  await this.waitForGridToLoad();

  await expect(this.operationsReportProcessorNameCells.first()).toBeVisible();

  const allProcessorNames = await this.operationsReportProcessorNameCells.allTextContents();

  for (const expected of expectedProcessorNames) {
    const isPresent = allProcessorNames.some(name =>
      name.toLowerCase().includes(expected.toLowerCase())
    );

    if (!isPresent) {
      console.log('❌ Expected Processor NOT found:', expected);
      throw new Error(`Expected Processor not found: ${expected}`);
    }

    console.log('✅ Found:', expected);
  }
}
  async verifyMonthData(expectedMonths: string[]): Promise<void> {
    await this.waitForGridToLoad();

    if (await this.operationsreportexpandButton.isVisible({ timeout: 30000 }).catch(() => false)) {
      await this.operationsreportexpandButton.click({ force: true });
    }

    const monthCells = this.page.locator('table thead tr:first-child th');
    const allMonths = await monthCells.allTextContents();

    for (const month of allMonths) {
      const cleanMonth = month.trim();

      if (!cleanMonth || !/\d{4}/.test(cleanMonth)) continue;

      if (!expectedMonths.includes(cleanMonth)) {
        console.log('❌ Unexpected month found:', cleanMonth);
        throw new Error(`Unexpected month in table: ${cleanMonth}`);
      }

      console.log('✅ Valid month:', cleanMonth);
    }
  }

  async verifyYearData(targetYear: string): Promise<void> {
    await this.waitForGridToLoad();
    const dataRows = this.page.locator('table.custom-table.collapsed-mode tr');
    const noData = this.page.getByRole('heading', { name: 'No Data Found' });

    await this.page.waitForTimeout(1000);

    // CASE 1: Data present
    if (await dataRows.count() > 0) {
      console.log('📊 Data found, validating table...');

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

    // CASE 2: No data
    if (await noData.isVisible()) {
      console.log(`⚠️ No data found for year ${targetYear}`);
      await expect(noData).toBeVisible();
      return;
    }

    throw new Error("❌ Neither table data nor 'No Data' message found");
  }
}