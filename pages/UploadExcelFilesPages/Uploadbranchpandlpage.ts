import { expect, Locator, Page } from '@playwright/test';

export class UploadBranchPandLPage {
  readonly page: Page;

  // Heading
  readonly heading: Locator;

  // Verification Loader
  readonly verificationLoader: Locator;

  // Upload Section
  readonly chooseExcelFileLabel: Locator;
  readonly chooseExcelFileInput: Locator;
  readonly uploadButton: Locator;

  // Messages
  readonly uploadSuccessMessage: Locator;
  readonly uploadErrorMessage: Locator;
  readonly noFileSelectedMessage: Locator;
  readonly noRecordsFoundMessage: Locator;

  // Date Picker
  readonly datePickerDisplay: Locator;
  readonly customCalendar: Locator;
  readonly calendarPrevButton: Locator;
  readonly calendarNextButton: Locator;
  readonly currentMonth: Locator;
  readonly calendarDays: Locator;
  readonly todayButton: Locator;

  // Payment Details Table
  readonly paymentDetailsTable: Locator;

  // Expand / Collapse
  readonly expandButton: Locator;
  readonly collapseButton: Locator;

  // Table Cells (Desktop)
  readonly entryNoCells: Locator;
  readonly costCenterIdCells: Locator;
  readonly glCodeCells: Locator;
  readonly amountCells: Locator;
  readonly postingDateCells: Locator;
  readonly updatedOnCells: Locator;

  // Mobile Details Button
  readonly mobileDetailsButtons: Locator;

  // Mobile Details Modal
  readonly mobileDetailsModal: Locator;
  readonly mobileDetailsModalCloseButton: Locator;

  // Pagination
  readonly paginationContainer: Locator;
  readonly paginationPrevButton: Locator;
  readonly paginationNextButton: Locator;
  readonly paginationNumberButtons: Locator;
  readonly paginationActiveButton: Locator;
  readonly paginationInfo: Locator;

  constructor(page: Page) {
    this.page = page;

    // Heading
    this.heading = page.getByRole('heading', { name: /UPLOAD BRANCH P&L EXCEL FILE/i });

    // Verification Loader
    this.verificationLoader = page.getByText('Verification in progress...');

    // Upload Section
    this.chooseExcelFileLabel = page.locator('label.premium-file-label');
    this.chooseExcelFileInput = page.locator('input#custom-file-upload');
    this.uploadButton = page.getByRole('button', { name: /Upload/i });

    // Messages
    this.uploadSuccessMessage = page.getByText('File uploaded successfully');
    this.uploadErrorMessage = page.getByText('Invalid file format');
    this.noFileSelectedMessage = page.getByText('Please select a file first');
    this.noRecordsFoundMessage = page.getByText('No records found for the selected date.');

    // Date Picker
    this.datePickerDisplay = page.locator('div.date-picker-display');
    this.customCalendar = page.locator('div.custom-calendar');
    this.calendarPrevButton = page.locator('div.custom-calendar button.cal-nav-btn').nth(0);
    this.calendarNextButton = page.locator('div.custom-calendar button.cal-nav-btn').nth(1);
    this.currentMonth = page.locator('div.current-month');
    this.calendarDays = page.locator('div.calendar-grid div.calendar-day');
    this.todayButton = page.locator('button.today-btn');

    // Payment Details Table
    this.paymentDetailsTable = page.locator('div.table-container').nth(0);

    // Expand / Collapse
    this.expandButton = page.locator('button').filter({ hasText: 'Expand' }).first();
    this.collapseButton = page.locator('button').filter({ hasText: 'Collapse' }).first();

    // Table Cells (Desktop)
    this.entryNoCells = page.locator('td[data-key="EntryNo"]').filter({ hasNotText: 'Total' });
    this.costCenterIdCells = page.locator('td[data-key="CostCenterId"]').filter({ hasNotText: 'Total' });
    this.glCodeCells = page.locator('td[data-key="GlCode"]').filter({ hasNotText: 'Total' });
    this.amountCells = page.locator('td[data-key="Amount"]').filter({ hasNotText: 'Total' });
    this.postingDateCells = page.locator('td[data-key="PostingDate"]').filter({ hasNotText: 'Total' });
    this.updatedOnCells = page.locator('td[data-key="UpdatedOn"]').filter({ hasNotText: 'Total' });

    // Mobile Details Buttons
    this.mobileDetailsButtons = page.locator('button.details-btn');

    // Mobile Details Modal
    this.mobileDetailsModal = page.locator('div.popup-card');
    this.mobileDetailsModalCloseButton = page.locator('button.close-btn');

    // Pagination
    this.paginationContainer = page.locator('div.pagination-container');
    this.paginationPrevButton = page.locator('button.pag-btn.text-btn', { hasText: 'Previous' });
    this.paginationNextButton = page.locator('button.pag-btn.text-btn', { hasText: 'Next' });
    this.paginationNumberButtons = page.locator('div.page-numbers button.pag-btn.num-btn');
    this.paginationActiveButton = page.locator('button.pag-btn.num-btn.active');
    this.paginationInfo = page.locator('div.pagination-right');
  }

  // ─── Wait / Visibility ───────────────────────────────────────────────────────

  async waitForGridToLoad(timeout = 90000): Promise<void> {
    await expect(this.paymentDetailsTable).toBeVisible({ timeout });
  }

  async waitForVerificationAndLoad(): Promise<void> {
    // If verification loader appears, wait for it to disappear
    if (await this.verificationLoader.isVisible({ timeout: 5000 }).catch(() => false)) {
      console.log('⏳ Verification in progress...');
      await this.verificationLoader.waitFor({ state: 'hidden', timeout: 90000 });
      console.log('✅ Verification complete');
    }
    // Then wait for table to be visible
    await this.waitForGridToLoad();
  }

  async waitForTableOrNoRecord(): Promise<'table' | 'noRecord'> {
    await Promise.race([
      this.paymentDetailsTable.waitFor({ state: 'visible', timeout: 30000 }),
      this.noRecordsFoundMessage.waitFor({ state: 'visible', timeout: 30000 }),
    ]);

    if (await this.noRecordsFoundMessage.isVisible({ timeout: 5000 }).catch(() => false)) {
      console.log('⚠️ No records found for the selected date.');
      return 'noRecord';
    }

    console.log('📊 Payment Details Table is visible');
    return 'table';
  }

  async isPaymentDetailsTableVisible(): Promise<boolean> {
    await expect(this.paymentDetailsTable).toBeVisible({ timeout: 30000 });
    return await this.paymentDetailsTable.isVisible({ timeout: 30000 });
  }

  async isNoRecordsFoundMessageVisible(): Promise<boolean> {
    return await this.noRecordsFoundMessage.isVisible({ timeout: 30000 }).catch(() => false);
  }

  async isNoFileSelectedMessageVisible(): Promise<boolean> {
    return await this.noFileSelectedMessage.isVisible({ timeout: 30000 }).catch(() => false);
  }

  // ─── Upload ──────────────────────────────────────────────────────────────────

  async clickUpload(): Promise<void> {
    await expect(this.uploadButton).toBeVisible({ timeout: 30000 });
    await expect(this.uploadButton).toBeEnabled({ timeout: 30000 });
    await this.uploadButton.click({ timeout: 30000 });
    console.log('📤 Upload button clicked');
  }

  async uploadExcelFile(filePath: string): Promise<void> {
    await expect(this.chooseExcelFileLabel).toBeVisible({ timeout: 30000 });

    // Set file directly on hidden input
    await this.chooseExcelFileInput.setInputFiles(filePath);
    console.log(`📂 File selected: ${filePath}`);

    await this.clickUpload();
  }

  // ─── Date Picker ─────────────────────────────────────────────────────────────

  // targetDate format: 'YYYY-MM-DD' (e.g., '2026-02-28')
  async selectDate(targetDate: string): Promise<void> {
    await expect(this.datePickerDisplay).toBeVisible({ timeout: 30000 });
    await this.datePickerDisplay.click({ timeout: 30000 });

    await expect(this.customCalendar).toBeVisible({ timeout: 30000 });

    // Navigate to the correct month/year
    await this.navigateToMonth(targetDate);

    // Click the correct day
    const [, , day] = targetDate.split('-').map(Number);
    await this.calendarDays.filter({ hasText: String(day) }).first().click({ timeout: 30000 });
    console.log(`📅 Date selected: ${targetDate}`);

    // Wait for data to load after date selection
    await this.waitForVerificationAndLoad();
  }

  private async navigateToMonth(targetDate: string): Promise<void> {
    const [targetYear, targetMonth] = targetDate.split('-').map(Number);

    const monthMap: Record<string, number> = {
      January: 1, February: 2, March: 3, April: 4,
      May: 5, June: 6, July: 7, August: 8,
      September: 9, October: 10, November: 11, December: 12
    };

    while (true) {
      const monthYearText = await this.currentMonth.textContent();
      if (!monthYearText) throw new Error('Calendar month/year not found');

      const [monthName, yearStr] = monthYearText.trim().split(' ');
      const currentMonth = monthMap[monthName];
      const currentYear = parseInt(yearStr);

      if (currentYear === targetYear && currentMonth === targetMonth) break;

      if (
        currentYear > targetYear ||
        (currentYear === targetYear && currentMonth > targetMonth)
      ) {
        await this.calendarPrevButton.click({ timeout: 30000 });
      } else {
        await this.calendarNextButton.click({ timeout: 30000 });
      }

      await this.page.waitForTimeout(300);
    }
  }

  async clickTodayButton(): Promise<void> {
    await expect(this.todayButton).toBeVisible({ timeout: 30000 });
    await this.todayButton.click({ timeout: 30000 });
    console.log('📅 Today button clicked');

    // Wait for data to load after date selection
    await this.waitForVerificationAndLoad();
  }

  // ─── Verify Table Data After Date Selection ──────────────────────────────────

  async verifyTableDataDisplayedAfterDateSelection(): Promise<void> {
    const result = await this.waitForTableOrNoRecord();

    if (result === 'noRecord') {
      console.log('⚠️ No records found for the selected date — skipping row verification');
      return;
    }

    const rowCount = await this.entryNoCells.count();
    if (rowCount === 0) {
      throw new Error('❌ Table is visible but no rows found after date selection');
    }

    console.log(`✅ Table data displayed after date selection — ${rowCount} rows found`);
  }

  // ─── Expand / Collapse ───────────────────────────────────────────────────────

  async clickExpand(): Promise<void> {
    if (await this.expandButton.isVisible({ timeout: 30000 }).catch(() => false)) {
      await this.expandButton.click({ timeout: 30000 });
      console.log('🔍 Expand button clicked');
    }
  }

  // ─── Pagination ──────────────────────────────────────────────────────────────

  async clickNextPage(): Promise<void> {
    await expect(this.paginationNextButton).toBeVisible({ timeout: 30000 });
    await expect(this.paginationNextButton).toBeEnabled({ timeout: 30000 });
    await this.paginationNextButton.click({ timeout: 30000 });
    console.log('➡️ Next page clicked');

    await this.waitForVerificationAndLoad();
    await this.verifyTableDataDisplayedAfterPageClick();
  }

  async clickPrevPage(): Promise<void> {
    await expect(this.paginationPrevButton).toBeVisible({ timeout: 30000 });
    await expect(this.paginationPrevButton).toBeEnabled({ timeout: 30000 });
    await this.paginationPrevButton.click({ timeout: 30000 });
    console.log('⬅️ Previous page clicked');

    await this.waitForVerificationAndLoad();
    await this.verifyTableDataDisplayedAfterPageClick();
  }

  async clickPageNumber(pageNumber: number): Promise<void> {
    const pageButton = this.paginationNumberButtons.filter({ hasText: String(pageNumber) });
    await expect(pageButton).toBeVisible({ timeout: 30000 });
    await expect(pageButton).toBeEnabled({ timeout: 30000 });
    await pageButton.click({ timeout: 30000 });
    console.log(`🔢 Page ${pageNumber} clicked`);

    await this.waitForVerificationAndLoad();
    await this.verifyTableDataDisplayedAfterPageClick();
  }

  async verifyTableDataDisplayedAfterPageClick(): Promise<void> {
    const result = await this.waitForTableOrNoRecord();

    if (result === 'noRecord') {
      console.log('⚠️ No records found on this page — skipping row verification');
      return;
    }

    const rowCount = await this.entryNoCells.count();
    if (rowCount === 0) {
      throw new Error('❌ Table is visible but no rows found after page click');
    }

    console.log(`✅ Table data displayed after page click — ${rowCount} rows found`);
  }

  // ─── Mobile Details ──────────────────────────────────────────────────────────

  async clickFirstMobileDetailsButton(): Promise<void> {
    const firstButton = this.mobileDetailsButtons.first();
    await expect(firstButton).toBeVisible({ timeout: 30000 });
    await expect(firstButton).toBeEnabled({ timeout: 30000 });
    await firstButton.click({ timeout: 30000 });
    console.log('📋 First Details button clicked');
  }

  async isMobileDetailsModalVisible(): Promise<boolean> {
    return await this.mobileDetailsModal.isVisible({ timeout: 30000 }).catch(() => false);
  }

  async closeMobileDetailsModal(): Promise<void> {
    await expect(this.mobileDetailsModalCloseButton).toBeVisible({ timeout: 30000 });
    await this.mobileDetailsModalCloseButton.click({ timeout: 30000 });
    console.log('❌ Details modal closed');
  }
}