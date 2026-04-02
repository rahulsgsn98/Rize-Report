import { expect, Locator, Page } from '@playwright/test';

export class MortgageInsurancePage {
  readonly page: Page;

  readonly heading: Locator;

  readonly exportButtonDesktop: Locator;
  readonly exportButtonMobile: Locator;

  readonly ComplianceReportTable: Locator;

  readonly expandButton: Locator;
  readonly collapseButton: Locator;

  readonly miCompanyNameCells: Locator;
  readonly numberOfLoansCells: Locator;
  readonly totalLoanVolumeCells: Locator;

  constructor(page: Page) {
    this.page = page;

    // Heading
    this.heading = page.getByRole('heading', { name: /MORTGAGE INSURANCE/i });

    // Export Button
    this.exportButtonDesktop = page.getByRole('button', { name: 'Export' });
    this.exportButtonMobile = page.locator('button.br-tracking-export-btn');

    // Expand / Collapse
    this.expandButton = page.locator('button').filter({ hasText: 'Expand' }).first();
    this.collapseButton = page.locator('button').filter({ hasText: 'Collapse' }).first();

    // Table
    this.ComplianceReportTable = page.locator('div.table-container');

    // Table Cells
    this.miCompanyNameCells = page.locator('td[data-key="MICompanyName"]').filter({
      hasNotText: 'Total'
    });

    this.numberOfLoansCells = page.locator('td[data-key="NumberOfLoans"]').filter({
      hasNotText: 'Total'
    });

    this.totalLoanVolumeCells = page.locator('td[data-key="TotalLoanVolume"]').filter({
      hasNotText: 'Total'
    });
  }

  async waitForGridToLoad(timeout = 90000): Promise<void> {
    await expect(this.ComplianceReportTable).toBeVisible({ timeout });
  }

  async isComplianceReportTableVisible(): Promise<boolean> {
    await expect(this.ComplianceReportTable).toBeVisible({ timeout: 30000 });
    return await this.ComplianceReportTable.isVisible({ timeout: 30000 });
  }

  async isExportButtonVisible(): Promise<boolean> {
    return (
      await this.exportButtonDesktop.isVisible({ timeout: 30000 }).catch(() => false)
    ) || (
      await this.exportButtonMobile.isVisible({ timeout: 30000 }).catch(() => false)
    );
  }

  async clickExport(): Promise<void> {
    if (await this.exportButtonDesktop.isVisible({ timeout: 30000 }).catch(() => false)) {
      await expect(this.exportButtonDesktop).toBeEnabled({ timeout: 30000 });
      await this.exportButtonDesktop.click({ timeout: 30000 });
      console.log('📤 Export button clicked (desktop)');
    } else {
      await expect(this.exportButtonMobile).toBeVisible({ timeout: 30000 });
      await expect(this.exportButtonMobile).toBeEnabled({ timeout: 30000 });
      await this.exportButtonMobile.click({ timeout: 30000 });
      console.log('📤 Export button clicked (mobile)');
    }
  }

  async clickExpand(): Promise<void> {
    if (await this.expandButton.isVisible({ timeout: 30000 }).catch(() => false)) {
      await this.expandButton.click({ timeout: 30000 });
      console.log('🔍 Expand button clicked');
    }
  }

  async clickCollapse(): Promise<void> {
    if (await this.collapseButton.isVisible({ timeout: 30000 }).catch(() => false)) {
      await this.collapseButton.click({ timeout: 30000 });
      console.log('🔍 Collapse button clicked');
    }
  }


}