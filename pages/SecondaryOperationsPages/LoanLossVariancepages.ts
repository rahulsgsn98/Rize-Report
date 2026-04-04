
import { expect, Locator, Page } from '@playwright/test';

export class LoanLossVariancePage {
  readonly page: Page;

  readonly heading: Locator;

  readonly openFilterButton: Locator;

  // Dropdowns
  readonly investorDropdown: Locator;
  readonly channelDropdown: Locator;
  readonly underwriterDropdown: Locator;
  readonly postCloserDropdown: Locator;
  readonly branchDropdown: Locator;
  readonly productDropdown: Locator;
  readonly purchasedMonthDropdown: Locator;
  readonly varianceCategoryDropdown: Locator;
  readonly varianceResearchDropdown: Locator;

  // Search Boxes
  readonly investorSearchBox: Locator;
  readonly channelSearchBox: Locator;
  readonly underwriterSearchBox: Locator;
  readonly postCloserSearchBox: Locator;
  readonly branchSearchBox: Locator;
  readonly productSearchBox: Locator;
  readonly purchasedMonthSearchBox: Locator;
  readonly varianceCategorySearchBox: Locator;
  readonly varianceResearchSearchBox: Locator;

  readonly listBox: Locator;

  readonly submitButton: Locator;
  readonly clearButton: Locator;

  // Export
  readonly exportButtonDesktop: Locator;
  readonly exportButtonMobile: Locator;

  // Expand / Collapse
  readonly secondarytableexpandButton: Locator;
  readonly secondarytablecollapseButton: Locator;

  // Secondary Table
  readonly secondaryTable: Locator;

  // Toggle Buttons
  readonly showDetailsButton: Locator;
  readonly hideDetailsButton: Locator;
  readonly showDatesButton: Locator;
  readonly hideDatesButton: Locator;

  // Table Cells
  readonly investorCells: Locator;
  readonly channelCells: Locator;
  readonly underwriterCells: Locator;
  readonly postCloserCells: Locator;
  readonly branchCells: Locator;
  readonly productCells: Locator;
  readonly varianceCategoryCells: Locator;
  readonly varianceResearchCells: Locator;

  constructor(page: Page) {
    this.page = page;

    // Heading
    this.heading = page.getByRole('heading', { name: /LOAN LOSS VARIANCE/i });

    // Filter (mobile)
    this.openFilterButton = page.locator('button.pm4-filter-btn');

    // Dropdowns
    this.investorDropdown = page.getByRole('combobox').nth(0);
    this.channelDropdown = page.getByRole('combobox').nth(1);
    this.underwriterDropdown = page.getByRole('combobox').nth(2);
    this.postCloserDropdown = page.getByRole('combobox').nth(3);
    this.branchDropdown = page.getByRole('combobox').nth(4);
    this.productDropdown = page.getByRole('combobox').nth(5);
    this.purchasedMonthDropdown = page.getByRole('combobox').nth(6);
    this.varianceCategoryDropdown = page.getByRole('combobox').nth(7);
    this.varianceResearchDropdown = page.getByRole('combobox').nth(8);

    // Search Boxes
    this.investorSearchBox = this.investorDropdown.locator('input.multiselect__input');
    this.channelSearchBox = this.channelDropdown.locator('input.multiselect__input');
    this.underwriterSearchBox = this.underwriterDropdown.locator('input.multiselect__input');
    this.postCloserSearchBox = this.postCloserDropdown.locator('input.multiselect__input');
    this.branchSearchBox = this.branchDropdown.locator('input.multiselect__input');
    this.productSearchBox = this.productDropdown.locator('input.multiselect__input');
    this.purchasedMonthSearchBox = this.purchasedMonthDropdown.locator('input.multiselect__input');
    this.varianceCategorySearchBox = this.varianceCategoryDropdown.locator('input.multiselect__input');
    this.varianceResearchSearchBox = this.varianceResearchDropdown.locator('input.multiselect__input');

    // Listbox
    this.listBox = page.locator('ul[role="listbox"]');

    // Buttons
    this.submitButton = page.getByRole('button', { name: /Submit|Apply/i });
    this.clearButton = page.getByRole('button', { name: /Clear/i });

    // Export
    this.exportButtonDesktop = page.getByRole('button', { name: /Export/i });
    this.exportButtonMobile = page.locator('button.pm4-export-btn');

    // Expand / Collapse
    this.secondarytableexpandButton = page.locator('button').filter({ hasText: 'Expand' }).first();
    this.secondarytablecollapseButton = page.locator('button').filter({ hasText: 'Collapse' }).first();

    // Table
    this.secondaryTable = page.locator('div.table-container').nth(0);

    // Toggle Buttons
    this.showDetailsButton = page.getByRole('button', { name: /Show Details/i });
    this.hideDetailsButton = page.getByRole('button', { name: /Hide Details/i });
    this.showDatesButton = page.getByRole('button', { name: /Show Dates/i });
    this.hideDatesButton = page.getByRole('button', { name: /Hide Dates/i });

    // Table Cells
    this.investorCells = page.locator('td[data-key="Investor"]');
    this.channelCells = page.locator('td[data-key="Channel"]');
    this.underwriterCells = page.locator('td[data-key="Underwriter"]');
    this.postCloserCells = page.locator('td[data-key="PostCloser"]');
    this.branchCells = page.locator('td[data-key="Branch"]');
    this.productCells = page.locator('td[data-key="Loan_Type"]');
    this.varianceCategoryCells = page.locator('td[data-key="Variance_Category"]');
    this.varianceResearchCells = page.locator('td[data-key="Variance_Research"]')
  }

  async waitForGridToLoad(timeout = 90000): Promise<void> {
    await expect(this.secondaryTable).toBeVisible({ timeout });
  }

  async clickClear(): Promise<void> {
    await this.waitForGridToLoad();
    if (await this.openFilterButton.isVisible({ timeout: 30000 }).catch(() => false)) {
      await this.openFilterButton.click({ timeout: 30000 });
      console.log("open filter is clicked ")
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
  async investorSelection(investors: string[]): Promise<void> {
    await this.waitForGridToLoad();
    await this.openFiltersIfMobile()
    await expect(this.investorDropdown).toBeVisible({ timeout: 30000 });
    await this.investorDropdown.click({ timeout: 30000 });
    for (const investor of investors) {
      await this.investorSearchBox.click();
      await this.investorSearchBox.fill(investor);
      await this.listBox.getByRole('option', { name: investor, exact: true }).click();
    }
      // ensure dropdown closes
  await this.page.keyboard.press('Escape');
  }

  async channelSelection(channels: string[]): Promise<void> {
    await this.waitForGridToLoad();
      await this.openFiltersIfMobile()
    await expect(this.channelDropdown).toBeVisible({ timeout: 30000 });
    await this.channelDropdown.click({ timeout: 30000 });
    for (const channel of channels) {
      await this.channelSearchBox.click();
      await this.channelSearchBox.fill(channel);
      await this.listBox.getByRole('option', { name: channel, exact: true }).click();
    }
      // ensure dropdown closes
  await this.page.keyboard.press('Escape');
  }

  async underwriterSelection(underwriters: string[]): Promise<void> {
    await this.waitForGridToLoad();
     await this.openFiltersIfMobile()
    await expect(this.underwriterDropdown).toBeVisible({ timeout: 30000 });
    await this.underwriterDropdown.click({ timeout: 30000 });
    for (const underwriter of underwriters) {
      await this.underwriterSearchBox.click();
      await this.underwriterSearchBox.fill(underwriter);
      await this.listBox.getByRole('option', { name: underwriter, exact: true }).click();
    }
      // ensure dropdown closes
  await this.page.keyboard.press('Escape');
  }

  async postCloserSelection(postClosers: string[]): Promise<void> {
    await this.waitForGridToLoad();
     await this.openFiltersIfMobile()
    await expect(this.postCloserDropdown).toBeVisible({ timeout: 30000 });
    await this.postCloserDropdown.click({ timeout: 30000 });
    for (const postCloser of postClosers) {
      await this.postCloserSearchBox.click();
      await this.postCloserSearchBox.fill(postCloser);
      await this.listBox.getByRole('option', { name: postCloser, exact: true }).click();
    }
      // ensure dropdown closes
  await this.page.keyboard.press('Escape');
  }

  async branchSelection(branches: string[]): Promise<void> {
    await this.waitForGridToLoad();
      await this.openFiltersIfMobile()

    await expect(this.branchDropdown).toBeVisible({ timeout: 30000 });
    await this.branchDropdown.click({ timeout: 30000 });
    for (const branch of branches) {
      await this.branchSearchBox.click();
      await this.branchSearchBox.fill(branch);
      await this.listBox.getByRole('option', { name: branch, exact: true }).click();
    }
    // ensure dropdown closes
  await this.page.keyboard.press('Escape');
  }

  async productSelection(products: string[]): Promise<void> {
    await this.waitForGridToLoad();
     await this.openFiltersIfMobile()
    await expect(this.productDropdown).toBeVisible({ timeout: 30000 });
    await this.productDropdown.click({ timeout: 30000 });
    for (const product of products) {
      await this.productSearchBox.click();
      await this.productSearchBox.fill(product);
      await this.listBox.getByRole('option', { name: product, exact: false }).click();
    }
      // ensure dropdown closes
  await this.page.keyboard.press('Escape');
  }

  async purchasedMonthSelection(months: string[]): Promise<void> {
    await this.waitForGridToLoad();
      await this.openFiltersIfMobile()
    await expect(this.purchasedMonthDropdown).toBeVisible({ timeout: 30000 });
    await this.purchasedMonthDropdown.click({ timeout: 30000 });
    for (const month of months) {
      await this.purchasedMonthSearchBox.click();
      await this.purchasedMonthSearchBox.fill(month);
      await this.listBox.getByRole('option', { name: month, exact: true }).click();
    }
      // ensure dropdown closes
  await this.page.keyboard.press('Escape');
  }

  async varianceCategorySelection(categories: string[]): Promise<void> {
    await this.waitForGridToLoad();
      await this.openFiltersIfMobile()
    await expect(this.varianceCategoryDropdown).toBeVisible({ timeout: 30000 });
    await this.varianceCategoryDropdown.click({ timeout: 30000 });
    for (const category of categories) {
      await this.varianceCategorySearchBox.click();
      await this.varianceCategorySearchBox.fill(category);
      await this.listBox.getByRole('option', { name: category, exact: true }).click();
    }
      // ensure dropdown closes
  await this.page.keyboard.press('Escape');
  }

  async varianceResearchSelection(researches: string[]): Promise<void> {
    await this.waitForGridToLoad();
     await this.openFiltersIfMobile()
    await expect(this.varianceResearchDropdown).toBeVisible({ timeout: 30000 });
    await this.varianceResearchDropdown.click({ timeout: 30000 });
    for (const research of researches) {
      await this.varianceResearchSearchBox.click();
      await this.varianceResearchSearchBox.fill(research);
      await this.listBox.getByRole('option', { name: research, exact: true }).click();
    }
     // ensure dropdown closes
  await this.page.keyboard.press('Escape');
  }

  // Verify Methods
  async verifyInvestorData(expectedInvestors: string[]): Promise<void> {
    await this.waitForGridToLoad();
    if (await this.secondarytableexpandButton.isVisible({ timeout: 30000 }).catch(() => false)) {
      await this.secondarytableexpandButton.click({ force: true });
    }
    const allInvestors = await this.investorCells.allTextContents();
    for (const investor of allInvestors) {
      const cleanActual = investor.trim();
      if (!cleanActual) continue;
     const isMatch = expectedInvestors.some(expected =>
  expected.trim().toLowerCase() === cleanActual.toLowerCase()
);
      if (!isMatch) {
        console.log('❌ Unexpected Investor found:', cleanActual);
        throw new Error(`Unexpected Investor in table: ${cleanActual}`);
      }
      console.log('✅ Valid Investor:', cleanActual);
    }
  }

  async verifyChannelData(expectedChannels: string[]): Promise<void> {
    await this.waitForGridToLoad();
    if (await this.secondarytableexpandButton.isVisible({ timeout: 30000 }).catch(() => false)) {
      await this.secondarytableexpandButton.click({ force: true });
    }
    const allChannels = await this.channelCells.allTextContents();
    for (const channel of allChannels) {
      const cleanActual = channel.trim();
      if (!cleanActual) continue;
      const isMatch = expectedChannels.some(expected => expected.trim() === cleanActual);
      if (!isMatch) {
        console.log('❌ Unexpected Channel found:', cleanActual);
        throw new Error(`Unexpected Channel in table: ${cleanActual}`);
      }
      console.log('✅ Valid Channel:', cleanActual);
    }
  }

 async verifyUnderwriterData(expectedUnderwriters: string[]): Promise<void> {
  await this.waitForGridToLoad();

  if (await this.secondarytableexpandButton.isVisible({ timeout: 30000 }).catch(() => false)) {
    await this.secondarytableexpandButton.click({ force: true });
  }

  const allUnderwriters = await this.underwriterCells.allTextContents();

  const naValues: string[] = [];
  const unexpectedValues: string[] = [];

  for (const underwriter of allUnderwriters) {

    const cleanActual = underwriter.trim();

    // ignore empty cells
    if (!cleanActual) continue;

    // track N/A values
    if (cleanActual.toLowerCase() === "n/a") {
      naValues.push(cleanActual);
      continue;
    }

    const isMatch = expectedUnderwriters.some(expected =>
      expected.trim().toLowerCase() === cleanActual.toLowerCase()
    );

    if (isMatch) {
      console.log('✅ Valid Underwriter:', cleanActual);
    } else {
      unexpectedValues.push(cleanActual);
    }
  }

  if (naValues.length > 0) {
    console.log('🟡 N/A Values Found:', naValues);
  }

  if (unexpectedValues.length > 0) {
    console.log('❌ Unexpected Underwriter found:', unexpectedValues);
    throw new Error(`Unexpected Underwriter in table: ${unexpectedValues.join(", ")}`);
  }
}

  async verifyPostCloserData(expectedPostClosers: string[]): Promise<void> {
    await this.waitForGridToLoad();
    if (await this.secondarytableexpandButton.isVisible({ timeout: 30000 }).catch(() => false)) {
      await this.secondarytableexpandButton.click({ force: true });
    }
    const allPostClosers = await this.postCloserCells.allTextContents();
    for (const postCloser of allPostClosers) {
      const cleanActual = postCloser.trim();
      if (!cleanActual) continue;
      const isMatch = expectedPostClosers.some(expected => expected.trim() === cleanActual);
      if (!isMatch) {
        console.log('❌ Unexpected Post Closer found:', cleanActual);
        throw new Error(`Unexpected Post Closer in table: ${cleanActual}`);
      }
      console.log('✅ Valid Post Closer:', cleanActual);
    }
  }

 async verifyBranchData(expectedBranches: string[]): Promise<void> {
  await this.waitForGridToLoad();
  
  if (await this.secondarytableexpandButton.isVisible({ timeout: 30000 }).catch(() => false)) {
    await this.secondarytableexpandButton.click({ force: true });
  }
  await expect(this.branchCells.first()).toBeVisible({timeout:30000});

  const normalize = (val: string) =>
    val.split('/')[0].trim().toLowerCase();

  const allBranches = await this.branchCells.allTextContents();

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

 async verifyProductData(expectedProducts: string[]): Promise<void> {
  await this.waitForGridToLoad();
  if (await this.secondarytableexpandButton.isVisible({ timeout: 30000 }).catch(() => false)) {
    await this.secondarytableexpandButton.click({ force: true });
  }

  const allProducts = await this.productCells.allTextContents();

  for (const product of allProducts) {
    const cleanActual = product.trim();
    if (!cleanActual) continue;

    console.log(`🔹 Product Value: ${cleanActual}`);

    const isMatch = expectedProducts.some(expected =>
      expected.trim().toLowerCase() === cleanActual.toLowerCase()
    );

    if (!isMatch) {
      console.log(`❌ Unexpected Product found: ${cleanActual}`);
      throw new Error(`Unexpected Product in table: ${cleanActual}`);
    }
  }
}
  async verifyVarianceCategoryData(expectedCategories: string[]): Promise<void> {
  await this.waitForGridToLoad();

  if (await this.secondarytableexpandButton.isVisible({ timeout: 30000 }).catch(() => false)) {
    await this.secondarytableexpandButton.click({ force: true });
  }

  const allCategories = await this.varianceCategoryCells.allTextContents();

  const naValues: string[] = [];
  const unexpectedValues: string[] = [];

  for (const category of allCategories) {

    const cleanActual = category.trim();

    // ignore empty cells
    if (!cleanActual) continue;

    // track N/A values
    if (cleanActual.toLowerCase() === "n/a") {
      naValues.push(cleanActual);
      continue;
    }

    const isMatch = expectedCategories.some(expected =>
      expected.trim().toLowerCase() === cleanActual.toLowerCase()
    );

    if (isMatch) {
      console.log('✅ Valid Variance Category:', cleanActual);
    } else {
      unexpectedValues.push(cleanActual);
    }
  }

  if (naValues.length > 0) {
    console.log('🟡 N/A Values Found:', naValues);
  }

  if (unexpectedValues.length > 0) {
    console.log('❌ Unexpected Variance Category found:', unexpectedValues);
    throw new Error(`Unexpected Variance Category in table: ${unexpectedValues.join(", ")}`);
  }
}

  async verifyVarianceResearchData(expectedResearches: string[]): Promise<void> {

  await this.waitForGridToLoad();

  if (await this.secondarytableexpandButton.isVisible().catch(() => false)) {
    await this.secondarytableexpandButton.click({ force: true });
  }

  await this.page.locator('td[data-key="Variance_Research"]').first().waitFor({ state: 'visible' });

  const allResearches = await this.page.locator('td[data-key="Variance_Research"]').allTextContents();

  const naValues: string[] = [];
  const matchedValues: string[] = [];
  const unexpectedValues: string[] = [];

 for (const research of allResearches) {

  const cleanActual = research.trim();

  // ignore empty cells
  if (!cleanActual) continue;

  // track N/A values
  if (cleanActual.toLowerCase() === "n/a") {
    naValues.push(cleanActual);
    continue;
  }

  const isMatch = expectedResearches.some(expected =>
    expected.trim().toLowerCase() === cleanActual.toLowerCase()
  );

  if (isMatch) {
    console.log("✅ Value:", cleanActual);
  } else {
    unexpectedValues.push(cleanActual);
  }
}

if (naValues.length > 0) {
  console.log("🟡 N/A Values Found:", naValues);
}

if (unexpectedValues.length > 0) {
  console.log("🔴 Unexpected Values:", unexpectedValues);
  throw new Error(`Unexpected Variance Research values found: ${unexpectedValues.join(", ")}`);
}
}
   // extra added 

  async openFiltersIfMobile(): Promise<void> {
  try {
    await this.openFilterButton.waitFor({ state: 'visible', timeout: 5000 });
    await this.openFilterButton.click({ force: true });
    console.log('🔽 Filter button clicked');
  } catch {
    // Not visible — desktop or iPad in desktop mode — skip
    console.log('ℹ️ Filter button not visible — skipping');
  }
}
}