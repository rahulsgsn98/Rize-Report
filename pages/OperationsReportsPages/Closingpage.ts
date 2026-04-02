import { expect, Locator, Page } from '@playwright/test';

export class ClosingPage {
  readonly page: Page;

  readonly heading: Locator;
  readonly closingdesktoprefresh: Locator;
  readonly closingmobilerefresh: Locator;

  readonly openFilterButton: Locator;

  readonly closerNameDropdown: Locator;
  readonly monthDropdown: Locator;

  readonly closerNameSearchBox: Locator;
  readonly monthSearchBox: Locator;

  readonly listBox: Locator;

  readonly submitButton: Locator;
  readonly clearButton: Locator;

  readonly selectyeardropdowndesktop: Locator;
  readonly selectyeardropdownmobile: Locator;

  // Expand / Collapse
  // Operations Report  → visible on Desktop + Mobile (nth(0))
  readonly operationsreportexpandButton: Locator;
  readonly operationsreportcollapseButton: Locator;

  // Manager Report     → visible on Mobile only (nth(1))
  readonly managerreportexpandButton: Locator;
  readonly managerreportcollapseButton: Locator;

  // Loan Investor      → visible on Mobile only (nth(2) mobile / nth(1) desktop — use last())
  readonly loaninvestorexpandButton: Locator;
  readonly loaninvestorcollapseButton: Locator;

  readonly operationsReportTable: Locator;
  readonly managerReportTable: Locator;
  readonly loanChannelReportTable: Locator;
  readonly loanProductReportTable: Locator;
  readonly loanPurposeReportTable: Locator;
  readonly loanInvestorReportTable: Locator;

  readonly loanchannelchart: Locator;
  readonly loanproductchart: Locator;
  readonly loanpurposechart: Locator;
  readonly loaninvestorchart: Locator;

  readonly operationsReportCloserNameCells: Locator;
  readonly managerReportNameCells: Locator;

  constructor(page: Page) {
    this.page = page;

    // Heading
    this.heading = page.getByRole('heading', { name: /CLOSING/i });

    // Refresh
    this.closingdesktoprefresh = page.locator('span.last-refresh-text');
    this.closingmobilerefresh = page.locator('div.cl-mobile-refresh');

    // Filter (mobile)
    this.openFilterButton = page.getByRole('button', { name: /Open Filters/i });

    // Dropdowns
    this.closerNameDropdown = page.getByRole('combobox').nth(0);
    this.monthDropdown = page.getByRole('combobox').nth(1);

    // Search Boxes (scoped to their dropdown)
    this.closerNameSearchBox = this.closerNameDropdown.locator('input.multiselect__input');
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
    // Desktop: only Operations (nth(0)) is visible
    // Mobile:  Operations (nth(0)), Manager (nth(1)), Loan Investor (nth(2))
    this.operationsreportexpandButton = page.locator('button').filter({ hasText: 'Expand' }).nth(0);
    this.operationsreportcollapseButton = page.locator('button').filter({ hasText: 'Collapse' }).nth(0);

    this.managerreportexpandButton = page.locator('button').filter({ hasText: 'Expand' }).nth(1);
    this.managerreportcollapseButton = page.getByRole('button', { name: /Collapse/i })

    this.loaninvestorexpandButton = page.locator('button').filter({ hasText: 'Expand' }).last();
    this.loaninvestorcollapseButton = page.locator('button').filter({ hasText: 'Collapse' }).last();

    // Tables
    this.operationsReportTable = page.locator('div.table-container').nth(0);
    this.managerReportTable = page.locator('div.table-container').nth(1);
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
    this.operationsReportCloserNameCells = page.locator('td[data-key="CloserName"]').filter({
      hasNotText: 'Total'
    });

    this.managerReportNameCells = page.locator('td[data-key="Name"]').filter({
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
      this.closingdesktoprefresh.waitFor({ state: 'visible', timeout: 30000 }),
      this.closingmobilerefresh.waitFor({ state: 'visible', timeout: 30000 }),
    ]);
  }

  async isRefreshDateTimeDisplayed(): Promise<boolean> {
    return (
      await this.closingdesktoprefresh.isVisible({ timeout: 30000 })
    ) || (
      await this.closingmobilerefresh.isVisible({ timeout: 30000 })
    );
  }

  async isOperationsReportTableVisible(): Promise<boolean> {
    await expect(this.operationsReportTable).toBeVisible({ timeout: 30000 });
    return await this.operationsReportTable.isVisible({ timeout: 30000 });
  }

  async isManagerReportTableVisible(): Promise<boolean> {
    await expect(this.managerReportTable).toBeVisible({ timeout: 30000 });
    return await this.managerReportTable.isVisible({ timeout: 30000 });
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

  // Desktop + Mobile
  async clickoperationsreportExpand(): Promise<void> {
    if (await this.operationsreportexpandButton.isVisible({ timeout: 30000 }).catch(() => false)) {
      await this.operationsreportexpandButton.click({ timeout: 30000 });
      console.log('🔍 Operations Report Expand button clicked');
    }
  }

  // Mobile only
  async clickManagerReportExpand(): Promise<void> {
    if (await this.managerreportexpandButton.isVisible({ timeout: 30000 }).catch(() => false)) {
      await this.managerreportexpandButton.click({ timeout: 30000 });
      console.log('🔍 [Mobile] Manager Report Expand button clicked');
    } else {
      console.log('⚠️ Manager Report Expand button not visible (desktop mode — expected)');
    }
  }

  // Mobile only
  async clickloaninvestorExpand(): Promise<void> {
    if (await this.loaninvestorexpandButton.isVisible({ timeout: 30000 }).catch(() => false)) {
      await this.loaninvestorexpandButton.click({ timeout: 30000 });
      console.log('🔍 [Mobile] Loan Investor Expand button clicked');
    } else {
      console.log('⚠️ Loan Investor Expand button not visible (desktop mode — expected)');
    }
  }

  async closerNameSelection(closerNames: string[]): Promise<void> {
    await this.waitForGridToLoad();
    if (await this.openFilterButton.isVisible({ timeout: 30000 }).catch(() => false)) {
      await this.openFilterButton.click({ timeout: 30000 });
    }

    await expect(this.closerNameDropdown).toBeVisible({ timeout: 30000 });
    await this.closerNameDropdown.click({ timeout: 30000 });

    for (const closerName of closerNames) {
      await this.closerNameSearchBox.click();
      await this.closerNameSearchBox.fill(closerName);
      await this.listBox.getByRole('option', { name: closerName, exact: true }).click();
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

  async selectYear(targetYear: number): Promise<void> {
    await this.waitForGridToLoad();

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

  async verifyCloserNameData(expectedCloserNames: string[]): Promise<void> {
    await this.waitForGridToLoad();

    const allCloserNames = await this.operationsReportCloserNameCells.allTextContents();

    for (const closerName of allCloserNames) {
      const cleanActual = closerName.trim();
      if (!cleanActual || cleanActual.toLowerCase() === 'total') continue;

      const isMatch = expectedCloserNames.some(expected => expected.trim() === cleanActual);

      if (!isMatch) {
        console.log('❌ Unexpected Closer Name found:', cleanActual);
        throw new Error(`Unexpected Closer Name in table: ${cleanActual}`);
      }

      console.log('✅ Valid Closer Name:', cleanActual);
    }
  }

  async verifyManagerNameData(expectedManagerNames: string[]): Promise<void> {
    await this.waitForGridToLoad();

    const allManagerNames = await this.managerReportNameCells.allTextContents();

    for (const managerName of allManagerNames) {
      const cleanActual = managerName.trim();
      if (!cleanActual || cleanActual.toLowerCase() === 'total') continue;

      const isMatch = expectedManagerNames.some(expected => expected.trim() === cleanActual);

      if (!isMatch) {
        console.log('❌ Unexpected Manager Name found:', cleanActual);
        throw new Error(`Unexpected Manager Name in table: ${cleanActual}`);
      }

      console.log('✅ Valid Manager Name:', cleanActual);
    }
  }

  async verifyMonthData(expectedMonths: string[]): Promise<void> {
  await this.waitForGridToLoad();

  if (await this.operationsreportexpandButton.isVisible({timeout:30000}).catch(() => false)) {
    await this.operationsreportexpandButton.click({timeout:30000});
  }

  const monthCells = this.page.locator('table thead tr:first-child th');

  await expect(monthCells.first()).toBeVisible({timeout:30000});

  const allMonths = await monthCells.allTextContents();

  const validMonths = allMonths
    .map(m => m.trim())
    .filter(m => m && /\d{4}/.test(m));

  for (const expected of expectedMonths) {
    const isPresent = validMonths.some(month =>
      month.toLowerCase().includes(expected.toLowerCase())
    );

    if (!isPresent) {
      console.log('❌ Expected month NOT found:', expected);
      throw new Error(`Expected month not found: ${expected}`);
    }

    console.log('✅ Found month:', expected);
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