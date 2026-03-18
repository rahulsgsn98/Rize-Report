# Loan Officer - Funded Positive & Negative Test Plan

## Application Overview

Expanded positive and negative test plan for the Loan Officer - Funded page. Assumptions: tests run with authenticated state (`playwright/.auth/user.json`) and each scenario starts from a fresh browser context. Focus: navigation, filters, data rendering, drilldowns, export, accessibility, and negative/error cases.

## Test Scenarios

### 1. Loan Officer - Funded Positive & Negative

**Seed:** `tests/seed.setup.ts`

#### 1.1. Navigate to Loan Officer - Funded

**File:** `tests/loanOfficerFunded/navigation.spec.ts`

**Steps:**
  1. Load the app with storageState and navigate to /LoanOfficer-Funded.
    - expect: Page loads and heading 'LOAN OFFICER FUNDED' is visible.
    - expect: No auth redirect occurs.
  2. Hover sidebar toggle and click 'Loan Officer - Funded'.
    - expect: Sidebar reveals the menu item.
    - expect: Navigation completes to /LoanOfficer-Funded.

#### 1.2. Filters and Controls (positive)

**File:** `tests/loanOfficerFunded/positive/filters.spec.ts`

**Steps:**
  1. Identify year selector, state/region select, and search inputs.
    - expect: All filter controls are present and have expected options/placeholders.
  2. Select a valid year and state, enter search term, then click Submit.
    - expect: Network request returns data; table or charts populate.
    - expect: No console errors during rendering.
  3. Click Clear to reset filters.
    - expect: Filters return to defaults; data view resets.

#### 1.3. Data Rendering, Sorting & Pagination

**File:** `tests/loanOfficerFunded/positive/table.spec.ts`

**Steps:**
  1. Submit filters that return data and verify table/chart appears.
    - expect: Table has headers and rows; charts render as canvas/svg.
  2. Sort by a numeric/date column and verify order.
    - expect: Rows reorder and sort indicator updates.
  3. Use pagination controls and verify pages change.
    - expect: Rows update per page; navigation is functional.

#### 1.4. Drilldown and Details

**File:** `tests/loanOfficerFunded/positive/drilldown.spec.ts`

**Steps:**
  1. Open a row detail (Expand or click row).
    - expect: Details panel/modal shows loan id, officer, funded date, amount.
  2. Close details and verify focus and filters/pagination preserved.
    - expect: Focus returns to origin and view state is unchanged.

#### 1.5. Accessibility (positive)

**File:** `tests/loanOfficerFunded/positive/accessibility.spec.ts`

**Steps:**
  1. Keyboard-only navigation through sidebar and filters.
    - expect: Sidebar toggle and menu items reachable; Enter/Space activate items.
  2. Open modal and verify focus trap and Escape closes it.
    - expect: Focus is contained while modal open; Escape returns focus to trigger.

#### 1.6. Invalid Filter Values (negative)

**File:** `tests/loanOfficerFunded/negative/invalidFilters.spec.ts`

**Steps:**
  1. Select a non-existent state or type invalid text in search and submit.
    - expect: UI shows 'No data available' or validation; no crashes.
  2. Enter extremely long strings or special characters and submit.
    - expect: Input is sanitized or safely handled; server returns safe status.

#### 1.7. Network Failure & Slow Responses (negative)

**File:** `tests/loanOfficerFunded/negative/network.spec.ts`

**Steps:**
  1. Simulate server 500 or timeout for data fetch.
    - expect: Page displays clear error or retry option; no infinite spinner.
  2. Simulate very slow response and verify loading UI.
    - expect: Loading indicator appears and UI remains responsive.

#### 1.8. Missing/Expired Auth (negative)

**File:** `tests/loanOfficerFunded/negative/auth.spec.ts`

**Steps:**
  1. Start without storageState or simulate token expiry.
    - expect: User is redirected to login or sees authorization error; no private data accessible.
  2. Attempt a protected action when unauthenticated.
    - expect: App prompts for re-authentication or fails gracefully with 401/403.

#### 1.9. Malformed Responses & Large Payloads (negative)

**File:** `tests/loanOfficerFunded/negative/malformedAndLarge.spec.ts`

**Steps:**
  1. Mock malformed JSON or missing fields in API response.
    - expect: UI handles missing fields gracefully and shows placeholders.
  2. Mock a very large dataset and observe UI behavior.
    - expect: Pagination/virtualization handles large payload; UI remains responsive.

#### 1.10. Security & Boundary Checks (negative)

**File:** `tests/loanOfficerFunded/negative/security.spec.ts`

**Steps:**
  1. Submit inputs with common injection patterns (e.g., `'; DROP TABLE --`, `<script>`).
    - expect: Inputs are escaped/rejected; server does not execute payloads; UI shows safe error messages.
  2. Select out-of-range years (ancient or far future) and submit.
    - expect: UI returns 'No data' guidance and no errors.
