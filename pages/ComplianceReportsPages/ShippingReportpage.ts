import { Locator, Page,expect } from '@playwright/test';

export class ShippingReportPage {
  readonly page: Page;

  // ================================
  // 🔹 Page Elements
  // ================================
  readonly heading: Locator;
  readonly complianceReportTable: Locator;

  // Refresh
  readonly desktopRefresh: Locator;
  readonly mobileRefresh: Locator;

  // Expand
  readonly expandButton: Locator;
  readonly collapseButton: Locator;

  // Table
  readonly table: Locator;
  readonly rows: Locator;

  // ================================
  // 🔹 Column Locators (Direct)
  // ================================
  readonly loanNumberCells: Locator;
  readonly borrowerNameCells: Locator;
  readonly loanAmountCells: Locator;
  readonly disbursementDateCells: Locator;
  readonly lenderNameCells: Locator;
  readonly pdfLinks: Locator;

  constructor(page: Page) {
    this.page = page;

    // Headings
    this.heading = page.getByRole('heading', { name: /SHIPPING/i });
    this.complianceReportTable = page.locator('.table-container')

    // Refresh
    this.desktopRefresh = page.locator('div.last-refresh:visible')
    this.mobileRefresh = page.locator('div.ship-mobile-refresh')

    // Expand
    this.expandButton = page.getByRole('button', { name: /Expand/i });
    this.collapseButton = page.getByRole('button', { name: /Collapse/i });
/* 
    // Table
    this.table = page.locator('#report-table');
    this.rows = this.table.locator('tbody tr');

    // Columns (using data-key)
    this.loanNumberCells = this.table.locator('td[data-key="LoanNumber"]');
    this.borrowerNameCells = this.table.locator('td[data-key="BorrowerName"]');
    this.loanAmountCells = this.table.locator('td[data-key="OriginalAmount"]');
    this.disbursementDateCells = this.table.locator('td[data-key="DisbursementDate"]');
    this.lenderNameCells = this.table.locator('td[data-key="LenderName"]');
    this.pdfLinks = this.table.locator('td[data-key="PdfFile"] a'); */
  }

  // ================================
  // 🔹 Page Actions
  // ================================
  async waitForPageLoad(): Promise<void> {
    await this.heading.waitFor({ state: 'visible' });
    await this.table.waitFor({ state: 'visible', timeout: 60000 });
  }

  async clickExpand(): Promise<void> {
    if (await this.expandButton.isVisible().catch(() => false)) {
      await this.expandButton.click();
    }
  }
async clickCollapse(): Promise<void> {
  if (await this.collapseButton.isVisible().catch(() => false)) {
    await this.collapseButton.click();
  }
}
  // ================================
  // 🔹 Refresh Helpers
  // ================================
  async waitForRefreshVisible(): Promise<void> {
    await Promise.race([
      this.desktopRefresh.waitFor({ state: 'visible', timeout: 30000 }),
      this.mobileRefresh.waitFor({ state: 'visible', timeout: 30000 }),
    ]);
  }

  async isRefreshDisplayed(): Promise<boolean> {
    return (
      await this.desktopRefresh.isVisible().catch(() => false)
    ) || (
      await this.mobileRefresh.isVisible().catch(() => false)
    );
  }
  // Table displays 

  async  iscomplianceReportTable():Promise<boolean>{
 await  expect(this.complianceReportTable).toBeVisible()
 
    return await this.complianceReportTable.isVisible()
  }

 /*  // ================================
  // 🔹 Table Utilities
  // ================================
  async getRowCount(): Promise<number> {
    return await this.rows.count();
  }

  async getAllLoanNumbers(): Promise<string[]> {
    return (await this.loanNumberCells.allTextContents())
      .map(t => t.trim())
      .filter(t => t && t.toLowerCase() !== 'total');
  }

  async getAllBorrowerNames(): Promise<string[]> {
    return (await this.borrowerNameCells.allTextContents())
      .map(t => t.trim())
      .filter(t => t && t.toLowerCase() !== 'total');
  }

  async getAllLoanAmounts(): Promise<string[]> {
    return (await this.loanAmountCells.allTextContents())
      .map(t => t.trim())
      .filter(t => t && t.toLowerCase() !== 'total');
  }

  async getAllLenderNames(): Promise<string[]> {
    return (await this.lenderNameCells.allTextContents())
      .map(t => t.trim())
      .filter(t => t && t.toLowerCase() !== 'total');
  }

  // ================================
  // 🔹 Row Data Helper
  // ================================
  async getRowData(index: number) {
    return {
      loanNumber: await this.loanNumberCells.nth(index).textContent(),
      borrower: await this.borrowerNameCells.nth(index).textContent(),
      amount: await this.loanAmountCells.nth(index).textContent(),
      date: await this.disbursementDateCells.nth(index).textContent(),
      lender: await this.lenderNameCells.nth(index).textContent(),
    };
  }
   */
}