import { test as setup, expect } from '@playwright/test';
import path from 'path';
import fs from 'fs';
import { TestConfig } from '../test.config';

const authFile = path.join(__dirname, '../playwright/.auth/user.json');

// --- Login data from config ---
const config = new TestConfig();
const EMAIL = config.email;
const PASSWORD = config.password;

setup('authenticate', async ({ page, context }) => {
  setup.setTimeout(240000);
// Skip login only locally if session exists
if (fs.existsSync(authFile)) {
  console.log('Session exists. Skipping login.');
  return;
}

  // --- Use URL from config ---
  await page.goto(config.appUrl);

  const welcomeHeading = page.getByRole('heading', { name: 'Welcome to the Rize Reporting Portal!' })

  const alreadyLoggedIn = await welcomeHeading.isVisible({ timeout: 5000 }).catch(() => false);
  if (alreadyLoggedIn) {
    await context.storageState({ path: authFile });
    return;
  }

  const continueButton = page.getByRole('button', { name: /Continue to Login/i });

  let loginPage = page;

  if (await continueButton.isVisible({ timeout: 5000 }).catch(() => false)) {
    console.log('Clicking Continue to Login...');

    const [popup] = await Promise.all([
      page.waitForEvent('popup', { timeout: 10000 }).catch(() => null),
      continueButton.click(),
    ]);

    if (popup) {
      console.log('✅ Popup detected');
      loginPage = popup;
    } else {
      console.log('ℹ️ No popup appeared. Login continues in same tab.');
    }
  }

  // --- MICROSOFT LOGIN ---
  const accountOption = loginPage.getByText(EMAIL, { exact: false });
  const emailInput = loginPage.getByPlaceholder(/Email|phone|Skype/i);

  if (await accountOption.isVisible({ timeout: 10000 }).catch(() => false)) {
    console.log('Scenario: Pick Account');
    await accountOption.click();
  } else {
    console.log('Scenario: Fresh Email Login');

    await emailInput.waitFor({ state: 'visible' });
    await emailInput.fill(EMAIL);

    await loginPage.getByRole('button', { name: /Next/i }).click();

    const passwordInput = loginPage.getByPlaceholder(/Password/i);

    await passwordInput.waitFor({ state: 'visible' });
    await passwordInput.fill(PASSWORD);

    await loginPage.getByRole('button', { name: /Sign in/i }).click();
  }

  // --- STAY SIGNED IN ---
  console.log('⌛ Waiting for MFA approval and "Stay signed in?"');

  const staySignedInScreen = loginPage.getByText(/Stay signed in\?/i);
  const dontShowAgainCheckbox = loginPage.locator('#KmsiCheckboxField');
  const yesButton = loginPage.getByRole('button', { name: /Yes/i });

  try {
    await staySignedInScreen.waitFor({ state: 'visible', timeout: 60000 });

    if (await dontShowAgainCheckbox.count()) {
      await dontShowAgainCheckbox.check();
      console.log('✅ Checked "Don’t show again"');
    }

    await yesButton.click();
    console.log('✅ Clicked Yes');
  } catch {
    console.log('ℹ️ Stay signed in screen skipped.');
  }

  console.log('⚠️ Waiting for dashboard...');

    await page.waitForLoadState('domcontentloaded');
  await expect(welcomeHeading).toBeVisible({ timeout: 120000 });

  await context.storageState({ path: authFile });

  console.log('🚀 Session saved successfully:', authFile);
});