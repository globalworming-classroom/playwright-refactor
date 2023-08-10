import {Page,Locator} from '@playwright/test';

export class CategoryFish{

    readonly page:Page;
    readonly fishCategoryTitle :Locator;
    readonly tableLocator :Locator;  
    readonly rowLocator: Locator;
    readonly navigateBackToFish :Locator;
    readonly goToMainPage :Locator;


    constructor (page:Page){
        this.page =page;
        this.fishCategoryTitle = page.getByRole('heading', { name: 'Fish' });
        this.tableLocator = page.getByRole('table');  
        this.rowLocator = this.tableLocator.locator('tbody tr');
        //this.navigateBackToFish = page.locator('#BackLink').getByRole('link',{name:'Return to FISH'});
        this.navigateBackToFish = page.locator('#BackLink',{hasText:'Return to FISH'});    
        this.goToMainPage = page.locator('#BackLink',{hasText:'Return to Main Menu'});           
    }

    async viewFishTypes(fishType :string){
       
       let filteredRow = this.rowLocator.filter({ hasText: fishType });
       await filteredRow.locator('td').getByRole('link',{name:/FI*/}).click();

    }

    async addFishToShoppingCart(fishDesc:string){

        let filteredRowByFishDescription = this.rowLocator.filter({hasText:fishDesc});
        await filteredRowByFishDescription.locator('.Button',{hasText:'Add to Cart'}).click();

    }

    
}