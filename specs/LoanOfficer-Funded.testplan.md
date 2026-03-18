# Loan Officer - Funded Test Plan

## Application Overview

Loan Officer - Funded page test plan. Application: https://happy-river-09e15dc0f.6.azurestaticapps.net. Assumptions: tests run with authenticated state (`playwright/.auth/user.json`) so user is already logged in; tests start from a fresh browser context with storageState loaded. Focus: navigation, UI controls (filters), data/table behavior, empty states, drilldowns, accessibility, and error conditions.

## Test Scenarios

### 1. Loan Officer - Funded

**Seed:** `tests/seed.setup.ts`

#### 1.1. Navigate to Loan Officer - Funded

**File:** `tests/loanOfficerFunded/navigation.spec.ts`

**Steps:**
  1. Open the app URL and ensure authenticated state is loaded (storageState).
    - expect: Browser opens to the app and user is authenticated (not redirected to login).
    - expect: Storage state is loaded before interactions.
  2. Hover the sidebar toggle (`button.sidebar-toggle`) to reveal the sidebar.
    - expect: Sidebar becomes visible or expanded.
    - expect: Sidebar contains a link or menu item labeled 'Loan Officer - Funded'.
  3. Click 'Loan Officer - Funded' in the sidebar.
    - expect: Browser navigates to path /LoanOfficer-Funded.
    - expect: Page title or a heading 'LOAN OFFICER FUNDED' is visible.
    - expect: Main section 'Funded Report' is present.

#### 1.2. Verify filters and controls

**File:** `tests/loanOfficerFunded/filters.spec.ts`

**Steps:**
  1. Locate filter controls (year selector, region/state select, search boxes).
    - expect: Year selector control exists and shows selectable values.
    - expect: State/region select exists and contains options (states list).
    - expect: Search inputs with placeholders exist.
  2. Select a year and click 'Submit'.
    - expect: A data fetch is triggered (network request or loading indicator).
    - expect: UI shows either data table/charts or an empty-state message if no data for selected filters.
  3. Click 'Clear' to reset filters.
    - expect: Filters return to default values.
    - expect: Any displayed data is cleared or returns to default dataset.

#### 1.3. Validate empty-state and messages

**File:** `tests/loanOfficerFunded/empty-state.spec.ts`

**Steps:**
  1. With default filters (or a filter combination known to yield no data), submit filters.
    - expect: The page displays a clear empty-state message such as 'No data available' or 'No Geographic Data Found'.
    - expect: Empty-state copy gives suggested action (e.g., 'Try adjusting your filters').
  2. Verify UI guidance elements around empty state (charts area, geographic message).
    - expect: Charts or map regions show 'no data' messaging or placeholder images.
    - expect: There are no broken UI controls or console errors from the empty-state rendering.

#### 1.4. Table, rows and pagination (if table exists)

**File:** `tests/loanOfficerFunded/table.spec.ts`

**Steps:**
  1. Detect if a data table is present after submitting filters.
    - expect: If a table is present, it has column headers and at least one row for valid data sets.
    - expect: If no table is present, mark this scenario as Not Applicable (N/A).
  2. If rows exist, open pagination and navigate to next page.
    - expect: Pagination controls are visible and functional.
    - expect: Page changes and rows update accordingly.
  3. Sort a column and verify rows order changes accordingly.
    - expect: Sorting action updates the order of displayed rows.
    - expect: Sort indicator (ascending/descending) is visible.

#### 1.5. Row details / Drilldown

**File:** `tests/loanOfficerFunded/drilldown.spec.ts`

**Steps:**
  1. Click a data row (or an action like 'Expand' on a row) to open details or a modal.
    - expect: A details panel or modal opens showing loan-specific fields (loan id, officer, funded date, amount).
    - expect: Details values match the selected row's summary.
  2. Use browser back/close modal and verify focus and state are preserved.
    - expect: Closing details returns focus to the originating row.
    - expect: Filters and pagination remain as they were before drilldown.

#### 1.6. Accessibility & keyboard navigation

**File:** `tests/loanOfficerFunded/accessibility.spec.ts`

**Steps:**
  1. Tab through the sidebar toggle and menu items.
    - expect: Sidebar toggle is reachable by keyboard and can be activated with Enter/Space.
    - expect: Menu items (including 'Loan Officer - Funded') receive focus and can be activated with keyboard.
  2. Run basic ARIA checks on critical controls (filters, Submit/Clear buttons).
    - expect: Filter controls expose proper labels or aria-label attributes.
    - expect: Buttons expose accessible names; no critical accessibility violations for these controls.
  3. Test keyboard operations for modal/dialog (if present)
    - expect: Modal traps focus while open and returns focus to the triggering element when closed.
    - expect: Escape key closes modal.
