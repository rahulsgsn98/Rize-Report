import {Page,Locator  } from "@playwright/test";



export class ReportPanelPage {


    readonly page: Page;

    readonly sidebartoggle:Locator;
    readonly loanofficerfundedlink:Locator;
    readonly loanofficerActivelink:Locator
    readonly branchfundedlink:Locator;
    readonly branchactivelink:Locator
    readonly bizDevFundedLink:Locator;
    readonly bizDevActiveLink:Locator

    // operationreports 
    readonly  processorFundedLink:Locator

    readonly UnderwritingFundedLink:Locator
    readonly ClosingLink:Locator

    readonly PostClosingLink:Locator
   readonly  PostClosingManagerLink:Locator


// secondary operation table  
 readonly  LoanLossVarianceLink:Locator
 readonly  WarehouseTrackingLink:Locator



 // Compliance Report 

 readonly  LoanOfficerInactiveLink:Locator
 readonly  WarehouseReportsLink:Locator
 readonly  VerbalVOELink:Locator
readonly  GovtInsuringLink:Locator
readonly  ShippingLink:Locator
readonly   CocMonitoringLink:Locator
 readonly   UploadWarehouseLink :Locator
 readonly   MortgageInsuranceLink:Locator


// page.getByRole('link', { name: 'Upload Warehouse' })  , this page ,




// Upload Excel Files

readonly UploadBranchPandLLink :Locator

    constructor(page: Page) {
        this.page = page;

        this.sidebartoggle = page.locator('button.sidebar-toggle');

        this.loanofficerfundedlink = page.getByText('Loan Officer Funded', { exact: true })

        this.loanofficerActivelink = page.getByRole('link', { name: 'Loan Officer Active' })

        this.branchfundedlink = page.getByRole('link', { name: 'Branch Funded' })
        this.branchactivelink = page.getByRole('link', { name: 'Branch Active' })

        this.bizDevFundedLink = page.getByRole('link', { name: 'Biz Dev Funded' })
        this.bizDevActiveLink= page.getByRole('link', { name: 'Biz Dev Active' })

    


 // operationreports 

 this.processorFundedLink = page.getByRole('link', { name: /Processing/i })
 this.UnderwritingFundedLink = page.getByRole('link', { name: /Underwriting/i })
 this.ClosingLink = page.getByText('Closing', { exact: true })
 this.PostClosingLink = page.getByText('Post Closing', { exact: true })
 this.PostClosingManagerLink = page.getByRole('link', { name: 'Post Closing Manager' })




 // secondary operation table  

   this.LoanLossVarianceLink = page.getByRole('link', { name: /Loan Loss Variance/i })

   this.WarehouseTrackingLink = page.getByRole('link', { name: /Warehouse Utilization/i })




   // Compliance report 

   this.LoanOfficerInactiveLink = page.getByText('Loan Officer Inactive', { exact: true }),

   this.WarehouseReportsLink= page.getByText('Warehouse', { exact: true })
   this.VerbalVOELink = page.getByRole('link', { name: 'Verbal VOE' })

   this.GovtInsuringLink = page.getByRole('link', { name: 'Govt Insuring' })

   this.ShippingLink = page.getByRole('link', { name: /Shipping Report/i })
   this.CocMonitoringLink = page.getByRole('link', { name: /COC Monitoring/i })
   this.MortgageInsuranceLink = page.getByRole('link', { name: 'Mortgage Insurance' })



 





   // Upload Excel Files
   this.UploadBranchPandLLink = page.getByRole('link', { name: 'Upload Branch P&L' })
     this.UploadWarehouseLink = page.getByRole('link', { name: 'Upload Warehouse' })


    }







    async clickSidebarToggle(): Promise<void> {
        await this.sidebartoggle.click();
    }

    async clickLoanOfficerFundedLink(): Promise<void> {
     //   await this.page.locator('a').filter({ hasText: 'Loan Officer - Funded' }).first().waitFor();
        await this.loanofficerfundedlink.click();

        
    }

async clickLoanOfficerActiveLink(): Promise<void> {
       // await this.page.locator('a').filter({ hasText: 'Loan Officer - Active' }).first().waitFor();
        await  this.loanofficerActivelink.click();

        
    }

async clickBranchFundedLink(): Promise<void> {
   //   await this.page.locator('a').filter({ hasText: 'Branch Funded' }).first().waitFor();
        await  this.branchfundedlink.click();

        
    }

    async clickBranchActiveLink(): Promise<void> {
        await this.page.locator('a').filter({ hasText: 'Branch Active' }).first().waitFor();
        await  this.branchactivelink.click();

        
    }

    async clickBizDevFundedLink(): Promise<void> {
      //  await this.page.locator('a').filter({ hasText: 'Biz Dev - Funded' }).first().waitFor();
        await  this.bizDevFundedLink.click();

        
    }

    async clickBizDevActiveLink(): Promise<void> {
       // await this.page.locator('a').filter({ hasText: 'Biz Dev - Active' }).first().waitFor();
        await  this.bizDevActiveLink.click();

        
    }
    // operation report 


async clickProcessorFundedLink(): Promise<void> {
      
        await  this.processorFundedLink.click();

        
    }

    async clickUnderwritingFundedLink(): Promise<void> {
      
        await  this.UnderwritingFundedLink.click();

        
    }

 async clickClosingLink(): Promise<void> {
      
        await  this.ClosingLink.click();

        
    }
async clickPostClosingLink(): Promise<void> {
      
        await  this.PostClosingLink.click();

        
    }

    async clickPostClosingManagerLink(): Promise<void> {
      
        await  this.PostClosingManagerLink.click();

        
    }




    // secondary operation table  

    async clickLoanLossVarianceLink(): Promise<void> {
      
        await  this.LoanLossVarianceLink.click();

        
    }

    async clickWarehouseTrackingLink(): Promise<void> {
      
        await  this.WarehouseTrackingLink.click()

        
    }




      // Compliance report 
   async clickLoanOfficerInactiveLink(): Promise<void> {
      
        await  this.LoanOfficerInactiveLink.click()

        
    }

    async clickWarehouseReportsLink(): Promise<void> {
      
        await  this.WarehouseReportsLink.click()

        
    }

      async clickVerbalVOELink(): Promise<void> {
      
        await  this.VerbalVOELink.click()

        
    }

     async clickGovtInsuringLink(): Promise<void> {
      
        await  this.GovtInsuringLink.click()

        
    }

     async clickShippingLink(): Promise<void> {
      
        await  this.ShippingLink.click()

        
    }


     async clickCocMonitoringLink(): Promise<void> {
      
        await  this.CocMonitoringLink.click()

        
    }

    // page.getByRole('link', { name: 'Mortgage Insurance' })

    async clickMortgageInsuranceLink(): Promise<void> {
      
        await  this.MortgageInsuranceLink.click()

        
    }


     // Upload Excel Files

      async clickUploadBranchPandLLink(): Promise<void> {
      
        await  this.UploadBranchPandLLink.click()

        
    }

    async clickUploadWarehouseLink(): Promise<void> {
      
        await  this.UploadWarehouseLink.click()

        
    }

}