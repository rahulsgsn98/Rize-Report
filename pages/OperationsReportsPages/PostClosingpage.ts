import { expect, Locator, Page } from '@playwright/test';

export class PostClosingPage {
  readonly page: Page;

  readonly heading: Locator;
  readonly postclosingdesktoprefresh: Locator;
  readonly postclosingmobilerefresh: Locator;

  readonly openFilterButton: Locator;

  readonly postCloserDropdown: Locator;
  readonly monthDropdown: Locator;

  readonly postCloserSearchBox: Locator;
  readonly monthSearchBox: Locator;

  readonly listBox: Locator;

  readonly submitButton: Locator;
  readonly clearButton: Locator;

  readonly operationsreportexpandButton: Locator;
  readonly operationsreportcollapseButton: Locator;
  readonly managerreportexpandButton: Locator;
  readonly managerreportcollapseButton: Locator;
  readonly loaninvestorexpandButton: Locator;
  readonly loaninvestorcollapseButton: Locator;

  readonly operationsReportTable: Locator;
  readonly managerReportTable: Locator;
  readonly dwellTimeReportTable: Locator;
  readonly loanChannelReportTable: Locator;
  readonly loanPurposeReportTable: Locator;
  readonly loanInvestorReportTable: Locator;

  readonly dwellTimechart: Locator;
  readonly loanchannelchart: Locator;
  readonly loanpurposechart: Locator;
  readonly loaninvestorchart: Locator;

  readonly operationsReportPostCloserNameCells: Locator;
  readonly managerReportNameCells: Locator;

  constructor(page: Page) {
    this.page = page;

    // Heading
    this.heading = page.getByRole('heading', { name: /POST CLOSING/i });

    // Refresh
    this.postclosingdesktoprefresh = page.locator('div.pc-desktop-refresh');
    this.postclosingmobilerefresh = page.locator('div.pc-mobile-refresh');

    // Filter (mobile)
    this.openFilterButton = page.getByRole('button', { name: /Open Filters/i });

    // Dropdowns
    this.postCloserDropdown = page.getByRole('combobox').nth(0);
    this.monthDropdown = page.getByRole('combobox').last();

    // Search Boxes (scoped to their dropdown)
    this.postCloserSearchBox = this.postCloserDropdown.locator('input.multiselect__input');
    this.monthSearchBox = this.monthDropdown.locator('input.multiselect__input');

    // Listbox
    this.listBox = page.locator('ul[role="listbox"]');

    // Buttons
    this.submitButton = page.getByRole('button', { name: /Submit|Apply/i });
    this.clearButton = page.getByRole('button', { name: /Clear/i });

    // Expand / Collapse
    this.operationsreportexpandButton = page.locator('button').filter({ hasText: 'Expand' }).nth(0);
    this.operationsreportcollapseButton = page.locator('button').filter({ hasText: 'Collapse' }).nth(0);
    this.managerreportexpandButton = page.locator('button').filter({ hasText: 'Expand' }).nth(1);
    this.managerreportcollapseButton = page.locator('button').filter({ hasText: 'Collapse' });
    this.loaninvestorexpandButton = page.locator('button').filter({ hasText: 'Expand' }).nth(2);
    this.loaninvestorcollapseButton = page.locator('button').filter({ hasText: 'Collapse' }).last();

    // Tables
    this.operationsReportTable = page.locator('div.table-container').nth(0);
    this.managerReportTable = page.locator('div.table-container').nth(1);
    this.dwellTimeReportTable = page.locator('div.table-wrapper').nth(0);
    this.loanChannelReportTable = page.locator('div.table-wrapper').nth(1);
    this.loanPurposeReportTable = page.locator('div.table-wrapper').nth(2);
    this.loanInvestorReportTable = page.locator('div.table-wrapper').nth(3);

    // Charts
    this.dwellTimechart = page.locator('div.chart-container').nth(0);
    this.loanchannelchart = page.locator('div.chart-container').nth(1);
    this.loanpurposechart = page.locator('div.chart-container').nth(2);
    this.loaninvestorchart = page.locator('div.chart-container').nth(3);

    // Table Cells
    this.operationsReportPostCloserNameCells = page.locator('td[data-key="PostCloserName"]').filter({
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
      this.postclosingdesktoprefresh.waitFor({ state: 'visible', timeout: 30000 }),
      this.postclosingmobilerefresh.waitFor({ state: 'visible', timeout: 30000 }),
    ]);
  }

  async isRefreshDateTimeDisplayed(): Promise<boolean> {
    return (
      await this.postclosingdesktoprefresh.isVisible({ timeout: 30000 })
    ) || (
      await this.postclosingmobilerefresh.isVisible({ timeout: 30000 })
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

  async isDwellTimeReportTableVisible(): Promise<boolean> {
    await expect(this.dwellTimeReportTable).toBeVisible({ timeout: 30000 });
    return await this.dwellTimeReportTable.isVisible({ timeout: 30000 });
  }

  async isLoanChannelReportTableVisible(): Promise<boolean> {
    await expect(this.loanChannelReportTable).toBeVisible({ timeout: 30000 });
    return await this.loanChannelReportTable.isVisible({ timeout: 30000 });
  }

  async isLoanPurposeReportTableVisible(): Promise<boolean> {
    await expect(this.loanPurposeReportTable).toBeVisible({ timeout: 30000 });
    return await this.loanPurposeReportTable.isVisible({ timeout: 30000 });
  }

  async isLoanInvestorReportTableVisible(): Promise<boolean> {
    await expect(this.loanInvestorReportTable).toBeVisible({ timeout: 30000 });
    return await this.loanInvestorReportTable.isVisible({ timeout: 30000 });
  }

  async isDwellTimechartVisible(): Promise<boolean> {
    await expect(this.dwellTimechart).toBeVisible({ timeout: 30000 });
    return await this.dwellTimechart.isVisible({ timeout: 30000 });
  }

  async isloanchannelchartVisible(): Promise<boolean> {
    await expect(this.loanchannelchart).toBeVisible({ timeout: 30000 });
    return await this.loanchannelchart.isVisible({ timeout: 30000 });
  }

  async isloanpurposechartVisible(): Promise<boolean> {
    await expect(this.loanpurposechart).toBeVisible({ timeout: 30000 });
    return await this.loanpurposechart.isVisible({ timeout: 30000 });
  }

  async isloaninvestorchartVisible(): Promise<boolean> {
    await expect(this.loaninvestorchart).toBeVisible({ timeout: 30000 });
    return await this.loaninvestorchart.isVisible({ timeout: 30000 });
  }

  // Mobile only — Expand/Collapse buttons are not present on desktop
  async clickOperationsReportExpand(): Promise<void> {
    if (await this.operationsreportexpandButton.isVisible({ timeout: 30000 }).catch(() => false)) {
      await this.operationsreportexpandButton.click({ timeout: 30000 });
      console.log('🔍 [Mobile] Operations Report Expand button clicked');
    } else {
      console.log('⚠️ Operations Report Expand button not visible (desktop mode — expected)');
    }
  }

  async clickManagerReportExpand(): Promise<void> {
    if (await this.managerreportexpandButton.isVisible({ timeout: 30000 }).catch(() => false)) {
      await this.managerreportexpandButton.click({ timeout: 30000 });
      console.log('🔍 [Mobile] Manager Report Expand button clicked');
    } else {
      console.log('⚠️ Manager Report Expand button not visible (desktop mode — expected)');
    }
  }

  async clickLoanInvestorExpand(): Promise<void> {
    if (await this.loaninvestorexpandButton.isVisible({ timeout: 30000 }).catch(() => false)) {
      await this.loaninvestorexpandButton.click({ timeout: 30000 });
      console.log('🔍 [Mobile] Loan Investor Expand button clicked');
    } else {
      console.log('⚠️ Loan Investor Expand button not visible (desktop mode — expected)');
    }
  }

  async postCloserSelection(postCloserNames: string[]): Promise<void> {
    await this.waitForGridToLoad();
    if (await this.openFilterButton.isVisible({ timeout: 30000 }).catch(() => false)) {
      await this.openFilterButton.click({ timeout: 30000 });
    }

    await expect(this.postCloserDropdown).toBeVisible({ timeout: 30000 });
    await this.postCloserDropdown.click({ timeout: 30000 });

    for (const postCloserName of postCloserNames) {
      await this.postCloserSearchBox.click();
      await this.postCloserSearchBox.fill(postCloserName);
      await this.listBox.getByRole('option', { name: postCloserName, exact: true }).click();
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

  async verifyPostCloserNameData(expectedPostCloserNames: string[]): Promise<void> {
    await this.waitForGridToLoad();

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
}