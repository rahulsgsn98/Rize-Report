import { expect, Locator, Page } from '@playwright/test';

export function normalizeBranch(value: string): string {
  return value.split('/')[0].trim();
}

export class LoanOfficerInactivePage {
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

  // Expand / Collapse — Desktop + Mobile
  readonly compliancereportexpandButton: Locator;
  readonly compliancereportcollapseButton: Locator;

  // Tables
  readonly complianceReportTable: Locator;
  readonly desktopdetailsTable: Locator;
  readonly mobileDetailsTable: Locator;

  // Compliance Report Table Cells
  readonly complianceReportBranchNameCells: Locator;
  readonly complianceReportDivisionNameCells: Locator;

  // Details Table Cells (desktop) — by column index (no data-key)
  readonly detailsTableRows: Locator;
  readonly detailsBranchNameCells: Locator;

  // Mobile Details Button
  readonly mobileDetailsButtons: Locator;

  // Mobile Details Modal
  readonly mobileDetailsModal: Locator;
  readonly mobileDetailsModalCloseButton: Locator;

  constructor(page: Page) {
    this.page = page;

    // Heading
    this.heading = page.getByRole('heading', { name: /LOAN OFFICER INACTIVE/i });

    // Refresh
    this.desktopRefresh = page.locator('div.last-refresh-text:visible');
    this.mobileRefresh = page.locator('div.inactive-mobile-refresh')

    // Filter (mobile)
    this.openFilterButton = page.getByRole('button', { name: /Open Filters/i });

    // Dropdown
    this.branchNameDropdown = page.getByRole('combobox').nth(0);
    this.branchNameSearchBox = this.branchNameDropdown.locator('input.multiselect__input');
    this.listBox = page.locator('ul[role="listbox"]');

    // Buttons
    this.submitButton = page.getByRole('button', { name: /Submit|Apply/i });
    this.clearButton = page.getByRole('button', { name: /Clear/i });

    // Expand / Collapse
    this.compliancereportexpandButton = page.locator('button').filter({ hasText: 'Expand' }).first();
    this.compliancereportcollapseButton = page.locator('button').filter({ hasText: 'Collapse' }).first();

    // Tables
    this.complianceReportTable = page.locator('div.table-container').nth(0);
    this.desktopdetailsTable = page.locator('table.desktop-table')
    this.mobileDetailsTable = page.locator('div.mobile-table');

    // Compliance Report Table Cells
    this.complianceReportBranchNameCells = page.locator('td[data-key="BranchName"]').filter({
      hasNotText: 'Total'
    });
    this.complianceReportDivisionNameCells = page.locator('td[data-key="DivisionName"]').filter({
      hasNotText: 'Total'
    });

    // Details Table Rows (desktop)
    this.detailsTableRows = page.locator('table.desktop-table tbody tr');

    // Details Table Branch Name Cells (3rd column — index 2)
    this.detailsBranchNameCells = page.locator('table.desktop-table tbody tr td:nth-child(3)');

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
      this.desktopdetailsTable.waitFor({ state: 'visible', timeout: 30000 }),
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
    /* if (await this.openFilterButton.isVisible({ timeout: 30000 }).catch(() => false)) {
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

  // Verify Compliance Report Branch Name Data
  // Uses normalizeBranch() because dropdown has name+number but table shows name only
  async verifyComplianceReportBranchData(expectedBranchNames: string[]): Promise<void> {
    await this.waitForGridToLoad();

    if (await this.compliancereportexpandButton.isVisible({ timeout: 30000 }).catch(() => false)) {
      await this.compliancereportexpandButton.click({ force: true });
    }

    const allBranchNames = await this.complianceReportBranchNameCells.allTextContents();

    for (const branchName of allBranchNames) {
      const cleanActual = branchName.trim();
      if (!cleanActual || cleanActual.toLowerCase() === 'total') continue;

      const isMatch = expectedBranchNames.some(
        expected => normalizeBranch(expected).trim() === cleanActual
      );

      if (!isMatch) {
        console.log('❌ Unexpected Branch Name found:', cleanActual);
        throw new Error(`Unexpected Branch Name in table: ${cleanActual}`);
      }

      console.log('✅ Valid Branch Name:', cleanActual);
    }
  }

  // Verify Details Table Branch Name Data (no normalization — shows name+number)
  async verifyDetailsBranchData(expectedBranchNames: string[]): Promise<void> {
    await this.waitForGridToLoad();

    if (await this.compliancereportexpandButton.isVisible({ timeout: 30000 }).catch(() => false)) {
      await this.compliancereportexpandButton.click({ force: true });
    }

    const allBranchNames = await this.detailsBranchNameCells.allTextContents();

    for (const branchName of allBranchNames) {
      const cleanActual = branchName.trim();
      if (!cleanActual) continue;

      const isMatch = expectedBranchNames.some(expected => {
        const normalizedExpected = expected.trim();
        return cleanActual.startsWith(normalizeBranch(normalizedExpected));
      });

      if (!isMatch) {
        console.log('❌ Unexpected Branch Name found in Details table:', cleanActual);
        throw new Error(`Unexpected Branch Name in Details table: ${cleanActual}`);
      }

      console.log('✅ Valid Branch Name in Details table:', cleanActual);
    }
  }
  async clickFirstMobileDetailsButton(): Promise<void> {
    const firstButton = this.mobileDetailsButtons.first();
    await expect(firstButton).toBeVisible({ timeout: 30000 });
    await expect(firstButton).toBeEnabled({ timeout: 30000 });
    await firstButton.click({ timeout: 30000 });
    console.log('📋 First Details button clicked');
  }

  // Mobile Details Modal — verify it opens (Option 2)
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