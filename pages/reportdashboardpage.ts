import { Page, Locator } from "@playwright/test";

export class ReportDashboardPage {

    private readonly page: Page;
    private readonly welcomeDashboardHeading: Locator;
    private readonly profilecircle: Locator;
    private readonly profile_email: Locator;
    private readonly profile_logout: Locator;

    constructor(page: Page) {
        this.page = page;

        this.welcomeDashboardHeading = page.getByRole('heading', {
            name: 'Welcome to the Rize Reporting Portal!'
        });

        this.profilecircle = page.locator('div.profile-circle');
        this.profile_email = page.locator('p.dropdown-email');
        this.profile_logout = page.getByText('Logout');
    }

    async isWelcomeDashboardHeadingDisplayed(): Promise<boolean> {
        return await this.welcomeDashboardHeading.isVisible({timeout: 10000});
    }

    async getWelcomeDashboardHeadingText(): Promise<string> {
        return await this.welcomeDashboardHeading.innerText();
    }

    async verifyProfileCircleIsDisplayed(): Promise<boolean> {
        return await this.profilecircle.isVisible({timeout: 10000});
    }

    // 🔹 Open profile dropdown
    async clickProfile(): Promise<void> {
        await this.profilecircle.click();
    }


    // 🔹 Check email visibility (no click here)
    async verifyProfileEmailIsDisplayed(): Promise<boolean> {
        return await this.profile_email.isVisible({timeout: 10000});
    }

    // 🔹 Get email (no click here)
    async getProfileEmail(): Promise<string> {

        
        const email = await this.profile_email.innerText();
        return email.trim();
    }

    // 🔹 Check logout visibility (no click here)
    async verifyProfileLogoutIsDisplayed(): Promise<boolean> {
        return await this.profile_logout.isVisible({timeout: 10000});
    }

    async clickLogout(): Promise<void> {
        await this.profile_logout.click();
    }

}