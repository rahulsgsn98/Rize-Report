import { expect, Locator, Page } from '@playwright/test';

export class GovtInsuringPage {
  readonly page: Page;

  readonly heading: Locator;
  readonly desktopRefresh: Locator;
  readonly mobileRefresh: Locator;

  // Export
  readonly exportButtonDesktop: Locator;
  readonly exportButtonMobile: Locator;

  // View / Hide Archived & Paid
  readonly viewArchivedAndPaidButton: Locator;
  readonly hideArchivedAndPaidButton: Locator;

  // Expand / Collapse — Delegated (Desktop + Mobile)
  readonly delegatedExpandButton: Locator;
  readonly delegatedCollapseButton: Locator;

  // Expand / Collapse — Non Delegated (Mobile Only)
  readonly nonDelegatedExpandButton: Locator;
  readonly nonDelegatedCollapseButton: Locator;

  // Expand / Collapse — Archived Delegated (Desktop + Mobile)
  readonly archivedDelegatedExpandButton: Locator;
  readonly archivedDelegatedCollapseButton: Locator;

  // Expand / Collapse — Archived Non Delegated (Mobile Only)
  readonly archivedNonDelegatedExpandButton: Locator;
  readonly archivedNonDelegatedCollapseButton: Locator;

  // Tables
  readonly delegatedTable: Locator;
  readonly nonDelegatedTable: Locator;
  readonly archivedDelegatedTable: Locator;
  readonly archivedNonDelegatedTable: Locator;
  readonly detailsTable: Locator;
  readonly mobileDetailsTable: Locator;

  // Delegated Table Cells
  readonly delegatedLoanNumberCells: Locator;
  readonly delegatedBorrowerNameCells: Locator;

  // Non Delegated Table Cells
  readonly nonDelegatedLoanNumberCells: Locator;
  readonly nonDelegatedBorrowerNameCells: Locator;

  // Archived Delegated Table Cells
  readonly archivedDelegatedLoanNumberCells: Locator;
  readonly archivedDelegatedBorrowerNameCells: Locator;

  // Archived Non Delegated Table Cells
  readonly archivedNonDelegatedLoanNumberCells: Locator;
  readonly archivedNonDelegatedBorrowerNameCells: Locator;

  constructor(page: Page) {
    this.page = page;

    // Heading
    this.heading = page.getByRole('heading', { name: /GOVT INSURING/i });

    // Refresh
    this.desktopRefresh = page.locator("//div[@class='last-refresh-desktop']//div[1]");
    this.mobileRefresh = page.locator('div.gov-mobile-refresh');

    // Export
    this.exportButtonDesktop = page.getByRole('button', { name: /Export/i });
    this.exportButtonMobile = page.locator('button.gov-export-btn')

    // View / Hide Archived & Paid
    this.viewArchivedAndPaidButton = page.getByRole('button', { name: /View Archived & Paid/i });
    this.hideArchivedAndPaidButton = page.getByRole('button', { name: /Hide Archived & Paid/i });

    // Expand / Collapse — Delegated (Desktop + Mobile)
    this.delegatedExpandButton = page.locator('button').filter({ hasText: 'Expand' }).first();
    this.delegatedCollapseButton = page.locator('button').filter({ hasText: 'Collapse' }).first();

    // Expand / Collapse — Non Delegated (Mobile Only)
    this.nonDelegatedExpandButton = page.locator('button').filter({ hasText: 'Expand' }).nth(1);
    this.nonDelegatedCollapseButton = page.locator('button').filter({ hasText: 'Collapse' });

    // Expand / Collapse — Archived Delegated (Desktop + Mobile)
    this.archivedDelegatedExpandButton = page.locator('button').filter({ hasText: 'Expand' }).nth(2);
    this.archivedDelegatedCollapseButton = page.locator('button').filter({ hasText: 'Collapse' });

    // Expand / Collapse — Archived Non Delegated (Mobile Only)
    this.archivedNonDelegatedExpandButton = page.locator('button').filter({ hasText: 'Expand' }).nth(3);
    this.archivedNonDelegatedCollapseButton = page.locator('button').filter({ hasText: 'Collapse' });

    // Tables
    this.delegatedTable = page.locator('div.table-container').nth(0);
    this.nonDelegatedTable = page.locator('div.table-container').nth(1);
    this.archivedDelegatedTable = page.locator('div.table-container').nth(2);
    this.archivedNonDelegatedTable = page.locator('div.table-container').nth(3);
    this.detailsTable = page.locator('table.desktop-table');
    this.mobileDetailsTable = page.locator('div.mobile-table');

    // Delegated Table Cells
    this.delegatedLoanNumberCells = page.locator('td[data-key="LoanNumber"]').nth(0);
    this.delegatedBorrowerNameCells = page.locator('td[data-key="BorrowerName"]').nth(0);

    // Non Delegated Table Cells
    this.nonDelegatedLoanNumberCells = page.locator('td[data-key="LoanNumber"]').nth(1);
    this.nonDelegatedBorrowerNameCells = page.locator('td[data-key="BorrowerName"]').nth(1);

    // Archived Delegated Table Cells
    this.archivedDelegatedLoanNumberCells = page.locator('td[data-key="LoanNumber"]').nth(2);
    this.archivedDelegatedBorrowerNameCells = page.locator('td[data-key="BorrowerName"]').nth(2);

    // Archived Non Delegated Table Cells
    this.archivedNonDelegatedLoanNumberCells = page.locator('td[data-key="LoanNumber"]').nth(3);
    this.archivedNonDelegatedBorrowerNameCells = page.locator('td[data-key="BorrowerName"]').nth(3);
  }

  // ─── Wait / Visibility ───────────────────────────────────────────────────────

  async waitForGridToLoad(timeout = 90000): Promise<void> {
    await expect(this.delegatedTable).toBeVisible({ timeout });
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

  async isDelegatedTableVisible(): Promise<boolean> {
    await expect(this.delegatedTable).toBeVisible({ timeout: 30000 });
    return await this.delegatedTable.isVisible({ timeout: 30000 });
  }

  async isNonDelegatedTableVisible(): Promise<boolean> {
    await expect(this.nonDelegatedTable).toBeVisible({ timeout: 30000 });
    return await this.nonDelegatedTable.isVisible({ timeout: 30000 });
  }

  async isArchivedDelegatedTableVisible(): Promise<boolean> {
    await expect(this.archivedDelegatedTable).toBeVisible({ timeout: 30000 });
    return await this.archivedDelegatedTable.isVisible({ timeout: 30000 });
  }

  async isArchivedNonDelegatedTableVisible(): Promise<boolean> {
    await expect(this.archivedNonDelegatedTable).toBeVisible({ timeout: 30000 });
    return await this.archivedNonDelegatedTable.isVisible({ timeout: 30000 });
  }

  // ─── Export ──────────────────────────────────────────────────────────────────

  async clickExport(): Promise<void> {
    if (await this.exportButtonDesktop.isVisible({ timeout: 30000 }).catch(() => false)) {
      await this.exportButtonDesktop.click({ timeout: 30000 });
      console.log('📤 Export button (desktop) clicked');
    } else if (await this.exportButtonMobile.isVisible({ timeout: 30000 }).catch(() => false)) {
      await this.exportButtonMobile.click({ timeout: 30000 });
      console.log('📤 Export button (mobile) clicked');
    }
  }

  // ─── View / Hide Archived & Paid ─────────────────────────────────────────────

  async clickViewArchivedAndPaid(): Promise<void> {
    await expect(this.viewArchivedAndPaidButton).toBeVisible({ timeout: 30000 });
    await this.viewArchivedAndPaidButton.click({ timeout: 30000 });
    console.log('📂 View Archived & Paid button clicked');
  }

  async clickHideArchivedAndPaid(): Promise<void> {
    await expect(this.hideArchivedAndPaidButton).toBeVisible({ timeout: 30000 });
    await this.hideArchivedAndPaidButton.click({ timeout: 30000 });
    console.log('📂 Hide Archived & Paid button clicked');
  }

  // ─── Expand / Collapse ───────────────────────────────────────────────────────

  async clickDelegatedExpand(): Promise<void> {
    if (await this.delegatedExpandButton.isVisible({ timeout: 30000 }).catch(() => false)) {
      await this.delegatedExpandButton.click({ timeout: 30000 });
      console.log('🔍 Delegated Expand button clicked');
    }
  }

  async clickNonDelegatedExpand(): Promise<void> {
    if (await this.nonDelegatedExpandButton.isVisible({ timeout: 30000 }).catch(() => false)) {
      await this.nonDelegatedExpandButton.click({ timeout: 30000 });
      console.log('🔍 Non Delegated Expand button clicked');
    }
  }

  async clickArchivedDelegatedExpand(): Promise<void> {
    if (await this.archivedDelegatedExpandButton.isVisible({ timeout: 30000 }).catch(() => false)) {
      await this.archivedDelegatedExpandButton.click({ timeout: 30000 });
      console.log('🔍 Archived Delegated Expand button clicked');
    }
  }

  async clickArchivedNonDelegatedExpand(): Promise<void> {
    if (await this.archivedNonDelegatedExpandButton.isVisible({ timeout: 30000 }).catch(() => false)) {
      await this.archivedNonDelegatedExpandButton.click({ timeout: 30000 });
      console.log('🔍 Archived Non Delegated Expand button clicked');
    }
  }

  // ─── Verify Loan Number Data ─────────────────────────────────────────────────

  async verifyDelegatedLoanNumberData(expectedLoanNumbers: string[]): Promise<void> {
    await this.waitForGridToLoad();

    if (await this.delegatedExpandButton.isVisible({ timeout: 30000 }).catch(() => false)) {
      await this.delegatedExpandButton.click({ force: true });
    }

    const allLoanNumbers = await this.delegatedLoanNumberCells.allTextContents();

    for (const loanNumber of allLoanNumbers) {
      const cleanActual = loanNumber.trim();
      if (!cleanActual || cleanActual.toLowerCase() === 'total') continue;

      const isMatch = expectedLoanNumbers.some(expected => expected.trim() === cleanActual);

      if (!isMatch) {
        console.log('❌ Unexpected Loan Number in Delegated table:', cleanActual);
        throw new Error(`Unexpected Loan Number in Delegated table: ${cleanActual}`);
      }

      console.log('✅ Valid Loan Number in Delegated table:', cleanActual);
    }
  }

  async verifyNonDelegatedLoanNumberData(expectedLoanNumbers: string[]): Promise<void> {
    await this.waitForGridToLoad();

    if (await this.nonDelegatedExpandButton.isVisible({ timeout: 30000 }).catch(() => false)) {
      await this.nonDelegatedExpandButton.click({ force: true });
    }

    const allLoanNumbers = await this.nonDelegatedLoanNumberCells.allTextContents();

    for (const loanNumber of allLoanNumbers) {
      const cleanActual = loanNumber.trim();
      if (!cleanActual || cleanActual.toLowerCase() === 'total') continue;

      const isMatch = expectedLoanNumbers.some(expected => expected.trim() === cleanActual);

      if (!isMatch) {
        console.log('❌ Unexpected Loan Number in Non Delegated table:', cleanActual);
        throw new Error(`Unexpected Loan Number in Non Delegated table: ${cleanActual}`);
      }

      console.log('✅ Valid Loan Number in Non Delegated table:', cleanActual);
    }
  }

  async verifyArchivedDelegatedLoanNumberData(expectedLoanNumbers: string[]): Promise<void> {
    await this.waitForGridToLoad();

    if (await this.archivedDelegatedExpandButton.isVisible({ timeout: 30000 }).catch(() => false)) {
      await this.archivedDelegatedExpandButton.click({ force: true });
    }

    const allLoanNumbers = await this.archivedDelegatedLoanNumberCells.allTextContents();

    for (const loanNumber of allLoanNumbers) {
      const cleanActual = loanNumber.trim();
      if (!cleanActual || cleanActual.toLowerCase() === 'total') continue;

      const isMatch = expectedLoanNumbers.some(expected => expected.trim() === cleanActual);

      if (!isMatch) {
        console.log('❌ Unexpected Loan Number in Archived Delegated table:', cleanActual);
        throw new Error(`Unexpected Loan Number in Archived Delegated table: ${cleanActual}`);
      }

      console.log('✅ Valid Loan Number in Archived Delegated table:', cleanActual);
    }
  }

  async verifyArchivedNonDelegatedLoanNumberData(expectedLoanNumbers: string[]): Promise<void> {
    await this.waitForGridToLoad();

    if (await this.archivedNonDelegatedExpandButton.isVisible({ timeout: 30000 }).catch(() => false)) {
      await this.archivedNonDelegatedExpandButton.click({ force: true });
    }

    const allLoanNumbers = await this.archivedNonDelegatedLoanNumberCells.allTextContents();

    for (const loanNumber of allLoanNumbers) {
      const cleanActual = loanNumber.trim();
      if (!cleanActual || cleanActual.toLowerCase() === 'total') continue;

      const isMatch = expectedLoanNumbers.some(expected => expected.trim() === cleanActual);

      if (!isMatch) {
        console.log('❌ Unexpected Loan Number in Archived Non Delegated table:', cleanActual);
        throw new Error(`Unexpected Loan Number in Archived Non Delegated table: ${cleanActual}`);
      }

      console.log('✅ Valid Loan Number in Archived Non Delegated table:', cleanActual);
    }
  }
  
}