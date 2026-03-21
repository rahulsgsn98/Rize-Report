import {Page,Locator  } from "@playwright/test";



export class ReportPanelPage {


    readonly page: Page;

    readonly sidebartoggle:Locator;
    readonly loanofficerfundedlink:Locator;
    readonly loanofficerActivelink:Locator




    constructor(page: Page) {
        this.page = page;

        this.sidebartoggle = page.locator('button.sidebar-toggle');

        this.loanofficerfundedlink = page.getByText('Loan Officer - Funded', { exact: true });

        this.loanofficerActivelink = page.getByRole('link', { name: 'Loan Officer - Active' })



    }

    async clickSidebarToggle(): Promise<void> {
        await this.sidebartoggle.click();
    }

    async clickLoanOfficerFundedLink(): Promise<void> {
        await this.page.locator('a').filter({ hasText: 'Loan Officer - Funded' }).first().waitFor();
        await this.loanofficerfundedlink.click();

        
    }

async clickLoanOfficerActiveLink(): Promise<void> {
        await this.page.locator('a').filter({ hasText: 'Loan Officer - Active' }).first().waitFor();
        await  this.loanofficerActivelink.click();

        
    }


}