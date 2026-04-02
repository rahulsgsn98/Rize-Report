import { expect, Locator, Page } from '@playwright/test';

export class UploadWarehousePage {
  readonly page: Page;

  // Heading
  readonly heading: Locator;

  // Verification Loader
  readonly verificationLoader: Locator;

  // Upload Section
  readonly chooseWarehouseFileLabel: Locator;
  readonly chooseWarehouseFileInput: Locator;
  readonly bokToggle: Locator;
  readonly uploadButton: Locator;

  // Messages
  readonly uploadSuccessMessage: Locator;
  readonly uploadErrorMessage: Locator;
  readonly noFileSelectedMessage: Locator;

  constructor(page: Page) {
    this.page = page;

    // Heading
    this.heading = page.getByRole('heading', { name: /UPLOAD WAREHOUSE/i });

    // Verification Loader
    this.verificationLoader = page.getByText('Verification in progress...');

    // Upload Section
    this.chooseWarehouseFileLabel = page.locator('label.premium-file-label');
    this.chooseWarehouseFileInput = page.locator('input#custom-file-upload');
    this.bokToggle = page.locator('input[type="checkbox"]');
    this.uploadButton = page.getByRole('button', { name: /Upload/i });

    // Messages
    this.uploadSuccessMessage = page.getByText('File uploaded successfully');
    this.uploadErrorMessage = page.getByText('Invalid file format');
    this.noFileSelectedMessage = page.getByText('Please select a file first');
  }

  // ─── Wait / Visibility ───────────────────────────────────────────────────────

  async waitForVerificationAndLoad(): Promise<void> {
    if (await this.verificationLoader.isVisible({ timeout: 5000 }).catch(() => false)) {
      console.log('⏳ Verification in progress...');
      await this.verificationLoader.waitFor({ state: 'hidden', timeout: 90000 });
      console.log('✅ Verification complete');
    }
  }

  async isUploadSuccessMessageVisible(): Promise<boolean> {
    return await this.uploadSuccessMessage.isVisible({ timeout: 30000 }).catch(() => false);
  }

  async isUploadErrorMessageVisible(): Promise<boolean> {
    return await this.uploadErrorMessage.isVisible({ timeout: 30000 }).catch(() => false);
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

  async uploadWarehouseFile(filePath: string): Promise<void> {
    await expect(this.chooseWarehouseFileLabel).toBeVisible({ timeout: 30000 });

    // Set file directly on hidden input
    await this.chooseWarehouseFileInput.setInputFiles(filePath);
    console.log(`📂 File selected: ${filePath}`);

    await this.clickUpload();
  }

  // ─── BOK Toggle ──────────────────────────────────────────────────────────────

  async isBokToggleOn(): Promise<boolean> {
    const isChecked = await this.bokToggle.isChecked({ timeout: 30000 });
    console.log(`🔘 BOK toggle is ${isChecked ? 'ON' : 'OFF'}`);
    return isChecked;
  }

  async isBokToggleOff(): Promise<boolean> {
    const isChecked = await this.bokToggle.isChecked({ timeout: 30000 });
    console.log(`🔘 BOK toggle is ${isChecked ? 'ON' : 'OFF'}`);
    return !isChecked;
  }

  async turnBokToggleOn(): Promise<void> {
    const isChecked = await this.bokToggle.isChecked({ timeout: 30000 });
    if (!isChecked) {
      await this.bokToggle.click({ timeout: 30000 });
      console.log('✅ BOK toggle turned ON');
    } else {
      console.log('ℹ️ BOK toggle is already ON');
    }
  }

  async turnBokToggleOff(): Promise<void> {
    const isChecked = await this.bokToggle.isChecked({ timeout: 30000 });
    if (isChecked) {
      await this.bokToggle.click({ timeout: 30000 });
      console.log('✅ BOK toggle turned OFF');
    } else {
      console.log('ℹ️ BOK toggle is already OFF');
    }
  }
}