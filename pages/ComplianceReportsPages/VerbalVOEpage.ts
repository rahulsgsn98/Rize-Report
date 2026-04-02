import { expect, Locator, Page } from '@playwright/test';

export function normalizeBranch(value: string): string {
  return value.split('/')[0].trim();
}

export class VerbalVOEPage {
  readonly page: Page;

  readonly heading: Locator;
  readonly desktopRefresh: Locator;
  readonly mobileRefresh: Locator;

  readonly openFilterButton: Locator;

  // Dropdown
  readonly branchNameDropdown: Locator;
  readonly branchNameSearchBox: Locator;
  readonly listBox: Locator;

  readonly submitButton: Locator;
  readonly clearButton: Locator;

  // Export
  readonly exportButtonDesktop: Locator;
  readonly exportButtonMobile: Locator;
   readonly exportDefaultButton: Locator;
readonly exportFilteredButton: Locator;
readonly exportModal: Locator;

  // Expand / Collapse
  readonly compliancereportexpandButton: Locator;
  readonly compliancereportcollapseButton: Locator;

  // Tables
  readonly complianceReportTable: Locator;
  readonly detailsTable: Locator;
  readonly mobileDetailsTable: Locator;

  // Compliance Report Table Cells
  readonly complianceReportLoanNumberCells: Locator;
  readonly complianceReportBorrowerNameCells: Locator;

  // Details Table Cells (desktop) — Branch Name is 1st column
  readonly detailsBranchNameCells: Locator;

  // Mobile Details Button
  readonly mobileDetailsButtons: Locator;

  // Mobile Details Modal
  readonly mobileDetailsModal: Locator;
  readonly mobileDetailsModalCloseButton: Locator;

  constructor(page: Page) {
    this.page = page;

    // Heading
    this.heading = page.getByRole('heading', { name: /VERBAL-VOE/i });

    // Refresh
    this.desktopRefresh = page.locator('div.vv-last-refresh');
    this.mobileRefresh = page.locator('div.vv-mobile-refresh')
    // Filter (mobile)
    this.openFilterButton = page.getByRole('button', { name: /Open Filters/i });

    // Dropdown
    this.branchNameDropdown = page.getByRole('combobox').nth(0);
    this.branchNameSearchBox = this.branchNameDropdown.locator('input.multiselect__input');
    this.listBox = page.locator('ul[role="listbox"]');

    // Buttons
    this.submitButton = page.getByRole('button', { name: /Submit|Apply/i });
    this.clearButton = page.getByRole('button', { name: /Clear/i });

    // Export
    this.exportButtonDesktop = page.getByRole('button', { name: /Export/i });
    this.exportButtonMobile = page.locator('button.vv-export-btn')
     this.exportDefaultButton = page.getByRole('button', { name: 'Export (Default)' })
    this.exportFilteredButton  = page.getByRole('button', { name: 'Export (Filtered)' })
    this.exportModal = page.locator('div.export-modal')

    // Expand / Collapse
    this.compliancereportexpandButton = page.locator('button').filter({ hasText: 'Expand' }).first();
    this.compliancereportcollapseButton = page.locator('button').filter({ hasText: 'Collapse' }).first();

    // Tables
    this.complianceReportTable = page.locator('div.table-container').nth(0);
    this.detailsTable = page.locator('table.desktop-table');
    this.mobileDetailsTable = page.locator('div.mobile-table');

    // Compliance Report Table Cells
    this.complianceReportLoanNumberCells = page.locator('td[data-key="LoanNumber"]').filter({
      hasNotText: 'Total'
    });
    this.complianceReportBorrowerNameCells = page.locator('td[data-key="BorrowerName"]').filter({
      hasNotText: 'Total'
    });

    // Details Table Branch Name Cells (desktop) — 1st column
    this.detailsBranchNameCells = page.locator('table.desktop-table tbody tr td:nth-child(1)');

    // Mobile Details Buttons
    this.mobileDetailsButtons = page.locator('button.details-btn');

    // Mobile Details Modal
    this.mobileDetailsModal = page.locator('div.popup-card');
    this.mobileDetailsModalCloseButton = page.locator('button.close-btn');
  }

  async waitForGridToLoad(timeout = 90000): Promise<void> {
    await expect(this.complianceReportTable).toBeVisible({ timeout });
  }

  async waitForRefreshDateTimeToBeVisible(): Promise<void> {
    await Promise.race([
      this.desktopRefresh.waitFor({ state: 'visible', timeout: 30000 }),
      this.mobileRefresh.waitFor({ state: 'visible', timeout: 30000 }),
    ]);
  }

  async isRefreshDateTimeDisplayed(): Promise<boolean> {
    return (
      await this.desktopRefresh.isVisible({ timeout: 30000 })
    ) || (
      await this.mobileRefresh.isVisible({ timeout: 30000 })
    );
  }

  async isComplianceReportTableVisible(): Promise<boolean> {
    await expect(this.complianceReportTable).toBeVisible({ timeout: 30000 });
    return await this.complianceReportTable.isVisible({ timeout: 30000 });
  }

   async isDetailsTableVisible(): Promise<boolean> {
  try {

    await Promise.race([
      this.detailsTable.waitFor({ state: 'visible', timeout: 30000 }),
      this.mobileDetailsTable.waitFor({ state: 'visible', timeout: 30000 })
    ]);

    return true;

  } catch {
    return false;
  }
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
async clickExportDefault(): Promise<void> {
  await expect(this.exportDefaultButton).toBeVisible({ timeout: 30000 });
  await this.exportDefaultButton.click({ timeout: 30000 });
  console.log('📤 Export (Default) clicked');
  // Wait for modal to close after download completes
  await this.exportModal.waitFor({ state: 'hidden', timeout: 90000 });
  console.log('✅ Export modal closed — download complete');
}

async clickExportFiltered(): Promise<void> {
  await expect(this.exportFilteredButton).toBeVisible({ timeout: 30000 });
  await this.exportFilteredButton.click({ timeout: 30000 });
  console.log('📤 Export (Filtered) clicked');
  // Wait for modal to close after download completes
  await this.exportModal.waitFor({ state: 'hidden', timeout: 90000 });
  console.log('✅ Export modal closed — download complete');
}


  // Expand / Collapse
  async clickComplianceReportExpand(): Promise<void> {
    if (await this.compliancereportexpandButton.isVisible({ timeout: 30000 }).catch(() => false)) {
      await this.compliancereportexpandButton.click({ timeout: 30000 });
      console.log('🔍 Compliance Report Expand button clicked');
    }
  }

  // Branch Name Selection
  async branchNameSelection(branchNames: string[]): Promise<void> {
    await this.waitForGridToLoad();
   /*  if (await this.openFilterButton.isVisible({ timeout: 30000 }).catch(() => false)) {
      await this.openFilterButton.click({ timeout: 30000 });
    } */
 await this.openFiltersIfMobile()
    await expect(this.branchNameDropdown).toBeVisible({ timeout: 30000 });
    await this.branchNameDropdown.click({ timeout: 30000 });

    for (const branchName of branchNames) {
      await this.branchNameSearchBox.click();
      await this.branchNameSearchBox.fill(branchName);
      await this.listBox.getByRole('option', { name: branchName, exact: true }).click();
    }
      // ensure dropdown closes
  await this.page.keyboard.press('Escape');
  }

  // Verify Compliance Report Branch Data via Loan Number
  async verifyComplianceReportLoanNumberData(expectedLoanNumbers: string[]): Promise<void> {
    await this.waitForGridToLoad();

    if (await this.compliancereportexpandButton.isVisible({ timeout: 30000 }).catch(() => false)) {
      await this.compliancereportexpandButton.click({ force: true });
    }

    const allLoanNumbers = await this.complianceReportLoanNumberCells.allTextContents();

    for (const loanNumber of allLoanNumbers) {
      const cleanActual = loanNumber.trim();
      if (!cleanActual || cleanActual.toLowerCase() === 'total') continue;

      const isMatch = expectedLoanNumbers.some(expected => expected.trim() === cleanActual);

      if (!isMatch) {
        console.log('❌ Unexpected Loan Number found:', cleanActual);
        throw new Error(`Unexpected Loan Number in table: ${cleanActual}`);
      }

      console.log('✅ Valid Loan Number:', cleanActual);
    }
  }

  // Verify Details Table Branch Name Data
  // Uses normalizeBranch() — Details table shows name+number, dropdown shows name+number
  async verifyDetailsBranchData(expectedBranchNames: string[]): Promise<void> {
    await this.waitForGridToLoad();

    if (await this.compliancereportexpandButton.isVisible({ timeout: 30000 }).catch(() => false)) {
      await this.compliancereportexpandButton.click({ force: true });
    }

    const allBranchNames = await this.detailsBranchNameCells.allTextContents();

    for (const branchName of allBranchNames) {
      const cleanActual = branchName.trim();
      if (!cleanActual) continue;

      const isMatch = expectedBranchNames.some(
        expected => normalizeBranch(expected).trim() === normalizeBranch(cleanActual).trim()
      );

      if (!isMatch) {
        console.log('❌ Unexpected Branch Name found in Details table:', cleanActual);
        throw new Error(`Unexpected Branch Name in Details table: ${cleanActual}`);
      }

      console.log('✅ Valid Branch Name in Details table:', cleanActual);
    }
  }

  // Mobile Details Button — click first button
  async clickFirstMobileDetailsButton(): Promise<void> {
    const firstButton = this.mobileDetailsButtons.first();
    await expect(firstButton).toBeVisible({ timeout: 30000 });
    await expect(firstButton).toBeEnabled({ timeout: 30000 });
    await firstButton.click({ timeout: 30000 });
    console.log('📋 First Details button clicked');
  }

  // Mobile Details Modal — verify it opens
  async isMobileDetailsModalVisible(): Promise<boolean> {
    return await this.mobileDetailsModal.isVisible({ timeout: 30000 }).catch(() => false);
  }

  // Mobile Details Modal — close it
  async closeMobileDetailsModal(): Promise<void> {
    await expect(this.mobileDetailsModalCloseButton).toBeVisible({ timeout: 30000 });
    await this.mobileDetailsModalCloseButton.click({ timeout: 30000 });
    console.log('❌ Details modal closed');
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