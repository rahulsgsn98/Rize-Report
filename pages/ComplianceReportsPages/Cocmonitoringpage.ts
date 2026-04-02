import { expect, Locator, Page } from '@playwright/test';

export class CocMonitoringPage {
  readonly page: Page;

  readonly heading: Locator;
  readonly desktopRefresh: Locator;
  readonly mobileRefresh: Locator;

  readonly openFilterButton: Locator;

  // Dropdowns
  readonly loanOfficerDropdown: Locator;
  readonly loanOfficerSearchBox: Locator;

  readonly cocReasonDropdown: Locator;
  readonly cocReasonSearchBox: Locator;

  readonly loanStatusDropdown: Locator;
  readonly loanStatusSearchBox: Locator;

  readonly complianceStatusDropdown: Locator;
  readonly complianceStatusSearchBox: Locator;

  readonly lockStatusDropdown: Locator;
  readonly lockStatusSearchBox: Locator;

  readonly listBox: Locator;

  // Date Range
  readonly dateRangeInput: Locator;
  readonly dateRangeClearButton: Locator;
  readonly calendarPrevButton: Locator;
  readonly calendarNextButton: Locator;

  // Buttons
  readonly submitButton: Locator;
  readonly clearButton: Locator;

  // Export
  readonly exportButtonDesktop: Locator;
  readonly exportButtonMobile: Locator;

  // Expand / Collapse
  readonly compliancereportexpandButton: Locator;
  readonly compliancereportcollapseButton: Locator;

  // Table
  readonly complianceReportTable: Locator;

  // Compliance Report Table Cells
  readonly complianceReportLoanNumberCells: Locator;
  readonly complianceReportBorrowerLastNameCells: Locator;
  readonly complianceReportLoanOfficerCells: Locator;
  readonly complianceReportProcessorCells: Locator;
  readonly complianceReportUnderwriterCells: Locator;
  readonly complianceReportCloserCells: Locator;
  readonly complianceReportLastDisclosedDateCells: Locator;
  readonly complianceReportCocReasonCells: Locator;
  readonly complianceReportDiscrepancyNotesCells: Locator;
  readonly complianceReportLoanStatusCells: Locator;
  readonly complianceReportComplianceStatusCells: Locator;
  readonly complianceReportLockStatusCells: Locator;

  constructor(page: Page) {
    this.page = page;

    // Heading
    this.heading = page.getByRole('heading', { name: /COC MONITORING/i });

    // Refresh
    this.desktopRefresh = page.locator('span.last-refresh-text');
    this.mobileRefresh = page.locator('span.biz-refresh-text');

    // Filter (mobile)
    this.openFilterButton = page.locator('button.coc-report-filter-btn')

    // Dropdowns
    this.loanOfficerDropdown = page.getByRole('combobox').nth(0);
    this.loanOfficerSearchBox = this.loanOfficerDropdown.locator('input.multiselect__input');

    this.cocReasonDropdown = page.getByRole('combobox').nth(1);
    this.cocReasonSearchBox = this.cocReasonDropdown.locator('input.multiselect__input');

    this.loanStatusDropdown = page.getByRole('combobox').nth(2);
    this.loanStatusSearchBox = this.loanStatusDropdown.locator('input.multiselect__input');

    this.complianceStatusDropdown = page.getByRole('combobox').nth(3);
    this.complianceStatusSearchBox = this.complianceStatusDropdown.locator('input.multiselect__input');

    this.lockStatusDropdown = page.getByRole('combobox').nth(4);
    this.lockStatusSearchBox = this.lockStatusDropdown.locator('input.multiselect__input');

    // Listbox
    this.listBox = page.locator('ul[role="listbox"]');

    // Date Range
    this.dateRangeInput = page.locator('input[placeholder="Select Date Range"]');
    this.dateRangeClearButton = page.locator('div.dp__clear_icon');
    this.calendarPrevButton = page.locator('[data-dp-element="action-prev"]');
    this.calendarNextButton = page.locator('[data-dp-element="action-next"]');

    // Buttons
    this.submitButton = page.getByRole('button', { name: /Submit|Apply/i });
    this.clearButton = page.getByText('Clear', { exact: true })

    // Export
    this.exportButtonDesktop = page.getByRole('button', { name: /Export/i });
    this.exportButtonMobile = page.locator('button.coc-report-export-btn')
    // Expand / Collapse
    this.compliancereportexpandButton = page.locator('button').filter({ hasText: 'Expand' }).first();
    this.compliancereportcollapseButton = page.locator('button').filter({ hasText: 'Collapse' }).first();

    // Table
    this.complianceReportTable = page.locator('div.table-container').nth(0);

    // Compliance Report Table Cells
    this.complianceReportLoanNumberCells = page.locator('td[data-key="loanNumber"]').filter({
      hasNotText: 'Total'
    });
    this.complianceReportBorrowerLastNameCells = page.locator('td[data-key="borrowerLastName"]').filter({
      hasNotText: 'Total'
    });
    this.complianceReportLoanOfficerCells = page.locator('td[data-key="loanOfficer"]').filter({
      hasNotText: 'Total'
    });
    this.complianceReportProcessorCells = page.locator('td[data-key="processor"]').filter({
      hasNotText: 'Total'
    });
    this.complianceReportUnderwriterCells = page.locator('td[data-key="underwriter"]').filter({
      hasNotText: 'Total'
    });
    this.complianceReportCloserCells = page.locator('td[data-key="closer"]').filter({
      hasNotText: 'Total'
    });
    this.complianceReportLastDisclosedDateCells = page.locator('td[data-key="lastDisclosedDate"]').filter({
      hasNotText: 'Total'
    });
    this.complianceReportCocReasonCells = page.locator('td[data-key="cocReason"]').filter({
      hasNotText: 'Total'
    });
    this.complianceReportDiscrepancyNotesCells = page.locator('td[data-key="discrepancyNotes"]').filter({
      hasNotText: 'Total'
    });
    this.complianceReportLoanStatusCells = page.locator('td[data-key="loanStatus"]').filter({
      hasNotText: 'Total'
    });
    this.complianceReportComplianceStatusCells = page.locator('td[data-key="complianceStatus"]').filter({
      hasNotText: 'Total'
    });
    this.complianceReportLockStatusCells = page.locator('td[data-key="lockStatus"]').filter({
      hasNotText: 'Total'
    });
  }

  // ─── Wait / Visibility ───────────────────────────────────────────────────────

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

  // ─── Buttons ─────────────────────────────────────────────────────────────────

  async clickSubmit(): Promise<void> {
    await expect(this.submitButton).toBeVisible({ timeout: 30000 });
    await this.submitButton.click({ timeout: 30000 });
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

  // ─── Expand / Collapse ───────────────────────────────────────────────────────

  async clickComplianceReportExpand(): Promise<void> {
    if (await this.compliancereportexpandButton.isVisible({ timeout: 30000 }).catch(() => false)) {
      await this.compliancereportexpandButton.click({ timeout: 30000 });
      console.log('🔍 Compliance Report Expand button clicked');
    }
  }

  // ─── Dropdown Selections ─────────────────────────────────────────────────────

  async loanOfficerSelection(loanOfficers: string[]): Promise<void> {
    await this.waitForGridToLoad();
    /* if (await this.openFilterButton.isVisible({ timeout: 30000 }).catch(() => false)) {
      await this.openFilterButton.click({ timeout: 30000 });
    } */
    await this.openFiltersIfMobile()

    await expect(this.loanOfficerDropdown).toBeVisible({ timeout: 30000 });
    await this.loanOfficerDropdown.click({ timeout: 30000 });

    for (const loanOfficer of loanOfficers) {
      await this.loanOfficerSearchBox.click();
      await this.loanOfficerSearchBox.fill(loanOfficer);
      await this.listBox.getByRole('option', { name: loanOfficer, exact: true }).click();
    }
      // ensure dropdown closes
  await this.page.keyboard.press('Escape');
  }

  async cocReasonSelection(cocReasons: string[]): Promise<void> {
    await this.waitForGridToLoad();
   /*  if (await this.openFilterButton.isVisible({ timeout: 30000 }).catch(() => false)) {
      await this.openFilterButton.click({ timeout: 30000 });
    } */
    await this.openFiltersIfMobile()

    await expect(this.cocReasonDropdown).toBeVisible({ timeout: 30000 });
    await this.cocReasonDropdown.click({ timeout: 30000 });

    for (const cocReason of cocReasons) {
      await this.cocReasonSearchBox.click();
      await this.cocReasonSearchBox.fill(cocReason);
      await this.listBox.getByRole('option', { name: cocReason, exact: true }).click();
    }
      // ensure dropdown closes
  await this.page.keyboard.press('Escape');
  }

  async loanStatusSelection(loanStatuses: string[]): Promise<void> {
    await this.waitForGridToLoad();
   /*  if (await this.openFilterButton.isVisible({ timeout: 30000 }).catch(() => false)) {
      await this.openFilterButton.click({ timeout: 30000 });
    } */
 await this.openFiltersIfMobile()
    await expect(this.loanStatusDropdown).toBeVisible({ timeout: 30000 });
    await this.loanStatusDropdown.click({ timeout: 30000 });

    for (const loanStatus of loanStatuses) {
      await this.loanStatusSearchBox.click();
      await this.loanStatusSearchBox.fill(loanStatus);
      await this.listBox.getByRole('option', { name: loanStatus, exact: true }).click();
    }
      // ensure dropdown closes
  await this.page.keyboard.press('Escape');
  }

  async complianceStatusSelection(complianceStatuses: string[]): Promise<void> {
    await this.waitForGridToLoad();
   /*  if (await this.openFilterButton.isVisible({ timeout: 30000 }).catch(() => false)) {
      await this.openFilterButton.click({ timeout: 30000 });
    } */
    await this.openFiltersIfMobile()

    await expect(this.complianceStatusDropdown).toBeVisible({ timeout: 30000 });
    await this.complianceStatusDropdown.click({ timeout: 30000 });

    for (const complianceStatus of complianceStatuses) {
      await this.complianceStatusSearchBox.click();
      await this.complianceStatusSearchBox.fill(complianceStatus);
      await this.listBox.getByRole('option', { name: complianceStatus, exact: true }).click();
    }
      // ensure dropdown closes
  await this.page.keyboard.press('Escape');
  }

  async lockStatusSelection(lockStatuses: string[]): Promise<void> {
    await this.waitForGridToLoad();
   /*  if (await this.openFilterButton.isVisible({ timeout: 30000 }).catch(() => false)) {
      await this.openFilterButton.click({ timeout: 30000 });
    } */
    await this.openFiltersIfMobile()

    await expect(this.lockStatusDropdown).toBeVisible({ timeout: 30000 });
    await this.lockStatusDropdown.click({ timeout: 30000 });

    for (const lockStatus of lockStatuses) {
      await this.lockStatusSearchBox.click();
      await this.lockStatusSearchBox.fill(lockStatus);
      await this.listBox.getByRole('option', { name: lockStatus, exact: true }).click();
    }
      // ensure dropdown closes
  await this.page.keyboard.press('Escape');
  }

  // ─── Date Range ──────────────────────────────────────────────────────────────

  // startDate and endDate format: 'YYYY-MM-DD' (e.g., '2026-01-01')
  async selectLastDisclosedDateRange(startDate: string, endDate: string): Promise<void> {
    await this.waitForGridToLoad();
   /*  if (await this.openFilterButton.isVisible({ timeout: 30000 }).catch(() => false)) {
      await this.openFilterButton.click({ timeout: 30000 });
    } */
    await this.openFiltersIfMobile()

    await expect(this.dateRangeInput).toBeVisible({ timeout: 30000 });
    await this.dateRangeInput.click({ timeout: 30000 });

    // Navigate to start date month and click it
    await this.navigateToDate(startDate);
    await this.page.locator(`[data-test-id="dp-${startDate}"]`).click({ timeout: 30000 });
    console.log(`📅 Start date selected: ${startDate}`);

    // Navigate to end date month and click it
    await this.navigateToDate(endDate);
    await this.page.locator(`[data-test-id="dp-${endDate}"]`).click({ timeout: 30000 });
    console.log(`📅 End date selected: ${endDate}`);
      // ensure dropdown closes
  await this.page.keyboard.press('Escape');
  }

  private async navigateToDate(targetDate: string): Promise<void> {
    const [targetYear, targetMonth] = targetDate.split('-').map(Number);

    while (true) {
      const monthText = await this.page.locator('[data-dp-element="overlay-month"]').textContent();
      const yearText = await this.page.locator('[data-dp-element="overlay-year"]').textContent();

      if (!monthText || !yearText) throw new Error('Calendar month/year not found');

      const monthMap: Record<string, number> = {
        Jan: 1, Feb: 2, Mar: 3, Apr: 4, May: 5, Jun: 6,
        Jul: 7, Aug: 8, Sep: 9, Oct: 10, Nov: 11, Dec: 12
      };

      const currentMonth = monthMap[monthText.trim()];
      const currentYear = parseInt(yearText.trim());

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

  async clearDateRange(): Promise<void> {
    if (await this.dateRangeClearButton.isVisible({ timeout: 30000 }).catch(() => false)) {
      await this.dateRangeClearButton.click({ timeout: 30000 });
      console.log('🗑️ Date range cleared');
    }
  }

  // ─── Verify Methods ──────────────────────────────────────────────────────────

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
        throw new Error(`Unexpected Loan Number in Compliance Report: ${cleanActual}`);
      }

      console.log('✅ Valid Loan Number:', cleanActual);
    }
  }

  async verifyComplianceReportLoanOfficerData(expectedLoanOfficers: string[]): Promise<void> {
    await this.waitForGridToLoad();

    if (await this.compliancereportexpandButton.isVisible({ timeout: 30000 }).catch(() => false)) {
      await this.compliancereportexpandButton.click({ force: true });
    }

    const allLoanOfficers = await this.complianceReportLoanOfficerCells.allTextContents();

    for (const loanOfficer of allLoanOfficers) {
      const cleanActual = loanOfficer.trim();
      if (!cleanActual || cleanActual === 'N/A') continue;

      const isMatch = expectedLoanOfficers.some(expected => expected.trim() === cleanActual);

      if (!isMatch) {
        console.log('❌ Unexpected Loan Officer found:', cleanActual);
        throw new Error(`Unexpected Loan Officer in Compliance Report: ${cleanActual}`);
      }

      console.log('✅ Valid Loan Officer:', cleanActual);
    }
  }

  async verifyComplianceReportCocReasonData(expectedCocReasons: string[]): Promise<void> {
    await this.waitForGridToLoad();

    if (await this.compliancereportexpandButton.isVisible({ timeout: 30000 }).catch(() => false)) {
      await this.compliancereportexpandButton.click({ force: true });
    }

    const allCocReasons = await this.complianceReportCocReasonCells.allTextContents();

    for (const cocReason of allCocReasons) {
      const cleanActual = cocReason.trim();
      if (!cleanActual || cleanActual === 'N/A') continue;

      const isMatch = expectedCocReasons.some(expected => expected.trim() === cleanActual);

      if (!isMatch) {
        console.log('❌ Unexpected COC Reason found:', cleanActual);
        throw new Error(`Unexpected COC Reason in Compliance Report: ${cleanActual}`);
      }

      console.log('✅ Valid COC Reason:', cleanActual);
    }
  }

  async verifyComplianceReportLoanStatusData(expectedLoanStatuses: string[]): Promise<void> {
    await this.waitForGridToLoad();

    if (await this.compliancereportexpandButton.isVisible({ timeout: 30000 }).catch(() => false)) {
      await this.compliancereportexpandButton.click({ force: true });
    }

    const allLoanStatuses = await this.complianceReportLoanStatusCells.allTextContents();

    for (const loanStatus of allLoanStatuses) {
      const cleanActual = loanStatus.trim();
      if (!cleanActual || cleanActual === 'N/A') continue;

      const isMatch = expectedLoanStatuses.some(expected => expected.trim() === cleanActual);

      if (!isMatch) {
        console.log('❌ Unexpected Loan Status found:', cleanActual);
        throw new Error(`Unexpected Loan Status in Compliance Report: ${cleanActual}`);
      }

      console.log('✅ Valid Loan Status:', cleanActual);
    }
  }

  async verifyComplianceReportComplianceStatusData(expectedComplianceStatuses: string[]): Promise<void> {
    await this.waitForGridToLoad();

    if (await this.compliancereportexpandButton.isVisible({ timeout: 30000 }).catch(() => false)) {
      await this.compliancereportexpandButton.click({ force: true });
    }

    const allComplianceStatuses = await this.complianceReportComplianceStatusCells.allTextContents();

    for (const complianceStatus of allComplianceStatuses) {
      const cleanActual = complianceStatus.trim();
      if (!cleanActual || cleanActual === 'N/A') continue;

      const isMatch = expectedComplianceStatuses.some(expected => expected.trim() === cleanActual);

      if (!isMatch) {
        console.log('❌ Unexpected Compliance Status found:', cleanActual);
        throw new Error(`Unexpected Compliance Status in Compliance Report: ${cleanActual}`);
      }

      console.log('✅ Valid Compliance Status:', cleanActual);
    }
  }

  async verifyComplianceReportLockStatusData(expectedLockStatuses: string[]): Promise<void> {
    await this.waitForGridToLoad();

    if (await this.compliancereportexpandButton.isVisible({ timeout: 30000 }).catch(() => false)) {
      await this.compliancereportexpandButton.click({ force: true });
    }

    const allLockStatuses = await this.complianceReportLockStatusCells.allTextContents();

    for (const lockStatus of allLockStatuses) {
      const cleanActual = lockStatus.trim();
      if (!cleanActual || cleanActual === 'N/A') continue;

      const isMatch = expectedLockStatuses.some(expected => expected.trim() === cleanActual);

      if (!isMatch) {
        console.log('❌ Unexpected Lock Status found:', cleanActual);
        throw new Error(`Unexpected Lock Status in Compliance Report: ${cleanActual}`);
      }

      console.log('✅ Valid Lock Status:', cleanActual);
    }
  }
  // extra added 

  async openFiltersIfMobile(): Promise<void> {
  try {
    await this.openFilterButton.waitFor({ state: 'visible', timeout: 3000 });
    await this.openFilterButton.click();
    console.log('🔽 Filter button clicked');
  } catch {
    // Not visible — desktop or iPad in desktop mode — skip
    console.log('ℹ️ Filter button not visible — skipping');
  }
}
}