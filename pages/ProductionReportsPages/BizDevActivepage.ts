import { expect, Locator, Page } from '@playwright/test';

export class BizDevActivePage {
  readonly page: Page;

  readonly heading: Locator;
  readonly bizdevactivedesktoprefresh: Locator;
  readonly bizdevactivemobilerefresh: Locator;

  readonly openFilterButton: Locator;

  readonly divisionDropdown: Locator;
  readonly branchDropdown: Locator;
  readonly bdsNameDropdown: Locator;
  readonly channelNameDropdown: Locator;
  readonly statusTypeDropdown: Locator;

  readonly divisionSearchBox: Locator;
  readonly branchSearchBox: Locator;
  readonly bdsNameSearchBox: Locator;
  readonly channelNameSearchBox: Locator;
  readonly statusTypeSearchBox: Locator;

  readonly listBox: Locator;

  readonly submitButton: Locator;
  readonly clearButton: Locator;

  readonly activeReportTable: Locator;
  readonly loanStatusReportTable: Locator;
  readonly loanChannelReportTable: Locator;
  readonly productNameReportTable: Locator;
  readonly loanPurposeReportTable: Locator;
  readonly loanInvestorReportTable: Locator;

  readonly activereportexpandButton: Locator;
  readonly activereportcollapseButton: Locator;
  readonly loaninvestorexpendButton: Locator;
  readonly loaninvestorcollapseButton: Locator;

  readonly countryMap: Locator;
  readonly mapArrowIcon: Locator;
  readonly specificMapLocation: Locator;

  readonly loanstatuschart: Locator;
  readonly loanchannelchart: Locator;
  readonly productnamechart: Locator;
  readonly loanpurposechart: Locator;
  readonly loaninvestorchart: Locator;

  readonly activeReportBdsNameCells: Locator;
  readonly activeReportBranchCells: Locator;
  readonly activeReportDivisionCells: Locator;

  constructor(page: Page) {
    this.page = page;

    // Heading
    this.heading = page.getByRole('heading', { name: /BIZ-DIV ACTIVE/i });

    // Refresh
    this.bizdevactivedesktoprefresh = page.locator('div.bizA-desktop-only.last-refresh-text')
    this.bizdevactivemobilerefresh = page.locator('div.bizA-mobile-refresh:visible')

    // Filter
    this.openFilterButton = page.getByRole('button', { name: /Open Filters/i });

    // Dropdowns
    this.divisionDropdown = page.getByRole('combobox').nth(0);
    this.branchDropdown = page.getByRole('combobox').nth(1);
    this.bdsNameDropdown = page.getByRole('combobox').nth(2);
    this.channelNameDropdown = page.getByRole('combobox').nth(3);
    this.statusTypeDropdown = page.getByRole('combobox').nth(4);

    // Search Boxes (scoped to their dropdown)
    this.divisionSearchBox = this.divisionDropdown.locator('input.multiselect__input');
    this.branchSearchBox = this.branchDropdown.locator('input.multiselect__input');
    this.bdsNameSearchBox = this.bdsNameDropdown.locator('input.multiselect__input');
    this.channelNameSearchBox = this.channelNameDropdown.locator('input.multiselect__input');
    this.statusTypeSearchBox = this.statusTypeDropdown.locator('input.multiselect__input');

    // Listbox
    this.listBox = page.locator('ul[role="listbox"]');

    // Buttons
    this.submitButton = page.getByRole('button', { name: /Submit|Apply/i });
    this.clearButton = page.getByRole('button', { name: /Clear/i });

    // Expand / Collapse
    this.activereportexpandButton = page.locator('button').filter({ hasText: 'Expand' }).first();
    this.loaninvestorexpendButton = page.locator('button').filter({ hasText: 'Expand' }).last();
    this.activereportcollapseButton = page.locator('button').filter({ hasText: 'Collapse' }).first();
    this.loaninvestorcollapseButton = page.locator('button').filter({ hasText: 'Collapse' }).last();

    // Map
    this.countryMap = page.locator('#countyMap');
    this.specificMapLocation = page.locator('#countyMap path.sm_state_30099');
    this.mapArrowIcon = page.locator('#countyMap path[fill="#f7f7f7"][stroke="#636363"]').last();

    // Tables
    this.activeReportTable = page.locator('div.table-container');
    this.loanStatusReportTable = page.locator('div.table-wrapper').nth(0);
    this.loanChannelReportTable = page.locator('div.table-wrapper').nth(1);
    this.productNameReportTable = page.locator('div.table-wrapper').nth(2);
    this.loanPurposeReportTable = page.locator('div.table-wrapper').nth(3);
    this.loanInvestorReportTable = page.locator('div.table-wrapper').nth(4);

    // Charts
    this.loanstatuschart = page.locator('div.chart-container').nth(0);
    this.loanchannelchart = page.locator('div.chart-container').nth(1);
    this.productnamechart = page.locator('div.chart-container').nth(2);
    this.loanpurposechart = page.locator('div.chart-container').nth(3);
    this.loaninvestorchart = page.locator('div.chart-container').nth(4);

    // Table Cells
    this.activeReportBdsNameCells = page.locator('td[data-key="BdsName"]').filter({
      hasNotText: 'Total'
    });

    this.activeReportBranchCells = page.locator('td[data-key="BranchName"]').filter({
      hasNotText: 'Total'
    });

    this.activeReportDivisionCells = page.locator('td[data-key="DivisionName"]').filter({
      hasNotText: 'Total'
    });
  }

  async waitForGridToLoad(timeout = 90000) {
    await expect(this.activeReportTable).toBeVisible({ timeout });
  }

  async waitForCountyMapToRender(timeout = 90000) {
    await expect(this.countryMap).toBeVisible({ timeout });

    const holder = this.page.locator('#countyMap_holder');
    await expect(holder).toBeVisible({ timeout });
  }

  async clickSubmit(): Promise<void> {
    await expect(this.submitButton).toBeVisible({ timeout: 30000 });
    await this.submitButton.click({ timeout: 30000 });
  }

  async clickClear(): Promise<void> {
    await this.waitForCountyMapToRender();
    if (await this.openFilterButton.isVisible({ timeout: 30000 }).catch(() => false)) {
      await this.openFilterButton.click({ timeout: 30000 });
    }

    await expect(this.clearButton).toBeVisible({ timeout: 30000 });
    await expect(this.clearButton).toBeEnabled({ timeout: 30000 });
    await this.clearButton.click({ timeout: 30000 });

    console.log('Clear button clicked, filters reset');
  }

  async waitForRefreshDateTimeToBeVisible(): Promise<void> {
    await Promise.race([
      this.bizdevactivedesktoprefresh.waitFor({ state: 'visible', timeout: 30000 }),
      this.bizdevactivemobilerefresh.waitFor({ state: 'visible', timeout: 30000 }),
    ]);
  }

  async isRefreshDateTimeDisplayed(): Promise<boolean> {
    return (
      await this.bizdevactivedesktoprefresh.isVisible({ timeout: 30000 })
    ) || (
      await this.bizdevactivemobilerefresh.isVisible({ timeout: 30000 })
    );
  }

  async isActiveReportTableVisible(): Promise<boolean> {
    await expect(this.activeReportTable).toBeVisible({ timeout: 30000 });
    return await this.activeReportTable.isVisible({ timeout: 30000 });
  }

  async isLoanStatusReportTableVisible(): Promise<boolean> {
    await expect(this.loanStatusReportTable).toBeVisible({ timeout: 30000 });
    return await this.loanStatusReportTable.isVisible({ timeout: 30000 });
  }

  async isLoanChannelReportTableVisible(): Promise<boolean> {
    await expect(this.loanChannelReportTable).toBeVisible({ timeout: 30000 });
    return await this.loanChannelReportTable.isVisible({ timeout: 30000 });
  }

  async isProductNameReportTableVisible(): Promise<boolean> {
    await expect(this.productNameReportTable).toBeVisible({ timeout: 30000 });
    return await this.productNameReportTable.isVisible({ timeout: 30000 });
  }

  async isLoanPurposeReportTableVisible(): Promise<boolean> {
    await expect(this.loanPurposeReportTable).toBeVisible({ timeout: 30000 });
    return await this.loanPurposeReportTable.isVisible({ timeout: 30000 });
  }

  async isLoanInvestorReportTableVisible(): Promise<boolean> {
    await expect(this.loanInvestorReportTable).toBeVisible({ timeout: 30000 });
    return await this.loanInvestorReportTable.isVisible({ timeout: 30000 });
  }

  async isloanstatuschartVisible(): Promise<boolean> {
    await expect(this.loanstatuschart).toBeVisible({ timeout: 30000 });
    return await this.loanstatuschart.isVisible({ timeout: 30000 });
  }

  async isloanchannelchartVisible(): Promise<boolean> {
    await expect(this.loanchannelchart).toBeVisible({ timeout: 30000 });
    return await this.loanchannelchart.isVisible({ timeout: 30000 });
  }

  async isproductnamechartVisible(): Promise<boolean> {
    await expect(this.productnamechart).toBeVisible({ timeout: 30000 });
    return await this.productnamechart.isVisible({ timeout: 30000 });
  }

  async isloanpurposechartVisible(): Promise<boolean> {
    await expect(this.loanpurposechart).toBeVisible({ timeout: 30000 });
    return await this.loanpurposechart.isVisible({ timeout: 30000 });
  }

  async isloaninvestorchartVisible(): Promise<boolean> {
    await expect(this.loaninvestorchart).toBeVisible({ timeout: 30000 });
    return await this.loaninvestorchart.isVisible({ timeout: 30000 });
  }

  async isCountryMapVisible(): Promise<boolean> {
    await this.waitForCountyMapToRender();
    return true;
  }

  async clickOnCountryMap(): Promise<void> {
    await expect(this.countryMap).toBeVisible({ timeout: 30000 });
    await expect(this.specificMapLocation).toBeVisible({ timeout: 30000 });

    await this.specificMapLocation.hover({ timeout: 30000 });
    await this.specificMapLocation.click({ timeout: 30000 });

    console.log('Clicked on specific location in country map');
  }

  async isMapInLargeView(): Promise<boolean> {
    await expect(this.countryMap).toBeVisible({ timeout: 30000 });
    await expect(this.mapArrowIcon).toBeVisible({ timeout: 30000 });

    try {
      await this.mapArrowIcon.waitFor({ state: 'visible', timeout: 30000 });
      return true;
    } catch (error) {
      console.error('Error occurred while checking map view:', error);
      return false;
    }
  }

  async clickactivereportExpand(): Promise<void> {
    if (await this.activereportexpandButton.isVisible({ timeout: 30000 }).catch(() => false)) {
      await this.activereportexpandButton.click({ timeout: 30000 });
      console.log('🔍 Active report Expand button clicked');
    }
  }

  async clickloaninvestorExpand(): Promise<void> {
    if (await this.loaninvestorexpendButton.isVisible({ timeout: 30000 }).catch(() => false)) {
      await this.loaninvestorexpendButton.click({ timeout: 30000 });
      console.log('🔍 Loan investor Expand button clicked');
    }
  }

  async bdsNameSelection(bdsNames: string[]): Promise<void> {
    await this.waitForCountyMapToRender();
    
    if (await this.openFilterButton.isVisible({ timeout: 30000 }).catch(() => false)) {
      await this.openFilterButton.click({ timeout: 30000 });
    }

    await expect(this.bdsNameDropdown).toBeVisible({ timeout: 30000 });
    await this.bdsNameDropdown.click({ timeout: 30000 });

    for (const bdsName of bdsNames) {
      await this.bdsNameSearchBox.click();
      await this.bdsNameSearchBox.fill(bdsName);
      await this.listBox.getByRole('option', { name: bdsName, exact: true }).click();
    }
  }

  async selectDivisionNames(divisions: string[]): Promise<void> {
    await this.waitForCountyMapToRender();
    if (await this.openFilterButton.isVisible({ timeout: 30000 }).catch(() => false)) {
      await this.openFilterButton.click({ timeout: 30000 });
    }

    await expect(this.divisionDropdown).toBeVisible({ timeout: 30000 });
    await this.divisionDropdown.click({ timeout: 30000 });

    for (const division of divisions) {
      await this.divisionSearchBox.click();
      await this.divisionSearchBox.fill(division);
      await this.listBox.getByRole('option', { name: division, exact: true }).click();
    }
  }

  async branchSelection(branchNames: string[]): Promise<void> {
    await this.waitForCountyMapToRender();
    if (await this.openFilterButton.isVisible({ timeout: 30000 }).catch(() => false)) {
      await this.openFilterButton.click({ timeout: 30000 });
    }

    await expect(this.branchDropdown).toBeVisible({ timeout: 30000 });
    await this.branchDropdown.click({ timeout: 30000 });

    for (const branchName of branchNames) {
      await this.branchSearchBox.click();
      await this.branchSearchBox.fill(branchName);
      await this.listBox.getByRole('option', { name: branchName, exact: true }).click();
    }
  }

  async channelNameSelection(channelNames: string[]): Promise<void> {
    await this.waitForCountyMapToRender();
    if (await this.openFilterButton.isVisible({ timeout: 30000 }).catch(() => false)) {
      await this.openFilterButton.click({ timeout: 30000 });
    }

    await expect(this.channelNameDropdown).toBeVisible({ timeout: 30000 });
    await this.channelNameDropdown.click({ timeout: 30000 });

    for (const channelName of channelNames) {
      await this.channelNameSearchBox.click();
      await this.channelNameSearchBox.fill(channelName);
      await this.listBox.getByRole('option', { name: channelName, exact: true }).click();
    }
  }

  async statusTypeSelection(statusTypes: string[]): Promise<void> {
    await this.waitForCountyMapToRender();
    if (await this.openFilterButton.isVisible({ timeout: 30000 }).catch(() => false)) {
      await this.openFilterButton.click({ timeout: 30000 });
    }

    await expect(this.statusTypeDropdown).toBeVisible({ timeout: 30000 });
    await this.statusTypeDropdown.click({ timeout: 30000 });

    for (const statusType of statusTypes) {
      await this.statusTypeSearchBox.click();
      await this.statusTypeSearchBox.fill(statusType);
      await this.listBox.getByRole('option', { name: statusType, exact: true }).click();
    }
  }

  async verifyBdsNameData(expectedBdsNames: string[]): Promise<void> {
    await this.waitForCountyMapToRender();

    const allBdsNames = await this.activeReportBdsNameCells.allTextContents();

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
  await this.waitForCountyMapToRender();

  if (await this.activereportexpandButton.isVisible({timeout:30000}).catch(() => false)) {
    await this.activereportexpandButton.click({timeout:30000});
  }

  await expect(this.activeReportBranchCells.first()).toBeVisible({timeout:30000});

  const normalize = (val: string) =>
    val.split('/')[0].trim().toLowerCase();

  const allBranches = await this.activeReportBranchCells.allTextContents();

  for (const branch of allBranches) {
    const cleanActual = normalize(branch);

    if (!cleanActual || cleanActual === 'total') continue;

    const isMatch = expectedBranches.some(expected =>
      normalize(expected) === cleanActual
    );

    if (!isMatch) {
      console.log('❌ Unexpected branch found:', cleanActual);
      throw new Error(`Unexpected branch in table: ${cleanActual}`);
    }

    console.log('✅ Valid branch:', cleanActual);
  }
}

  async verifyDivisionData(expectedDivisions: string[]): Promise<void> {
    await this.waitForCountyMapToRender();

    if (await this.activereportexpandButton.isVisible({ timeout: 30000 }).catch(() => false)) {
      await this.activereportexpandButton.click({ timeout: 30000 });
    }

    const allDivisions = await this.activeReportDivisionCells.allTextContents();

    for (const division of allDivisions) {
      const cleanDivision = division.trim();

      if (!cleanDivision) continue;

      if (!expectedDivisions.includes(cleanDivision)) {
        console.log('❌ Unexpected division found:', cleanDivision);
        throw new Error(`Unexpected division in table: ${cleanDivision}`);
      }

      console.log('✅ Valid division:', cleanDivision);
    }
  }

  async verifyStatusTypeData(expectedStatuses: string[]): Promise<void> {
    await this.waitForGridToLoad();
    await this.waitForCountyMapToRender();

    const headers = await this.page.locator('table thead tr:first-child th').allTextContents();

    for (const status of expectedStatuses) {
      const isMatch = headers.some(header =>
        header.trim().toLowerCase().includes(status.trim().toLowerCase())
      );

      if (!isMatch) {
        throw new Error(`Expected status type header not found: ${status}`);
      }
    }
  }
}