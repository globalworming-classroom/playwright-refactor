import {Page,Locator} from '@playwright/test';

export class CategoryDogs{

    readonly page:Page;
    readonly dogCategoryTitle :Locator;
    readonly tableLocator :Locator;  
    readonly rowLocator: Locator;
    readonly navigateBackToDogs :Locator;
    readonly goToMainPage :Locator;


    constructor (page:Page){
        this.page =page;
        this.dogCategoryTitle = page.getByRole('heading', { name: 'Dogs' });
        this.tableLocator = page.getByRole('table');  
        this.rowLocator = this.tableLocator.locator('tbody tr');
        this.navigateBackToDogs = page.locator('#BackLink',{hasText:'Return to DOGS'});    
        this.goToMainPage = page.locator('#BackLink',{hasText:'Return to Main Menu'});           
    }

    async viewDogBreeds(dogBreed :string){
       
       let filteredRow = this.rowLocator.filter({ hasText: dogBreed });
        await filteredRow.locator('td').getByRole('link',{name:/K9*/}).click();

    }

    async addDogToShoppingCart(dogBreed:string){

        let filteredRowByFishDescription = this.rowLocator.filter({hasText:dogBreed});
        await filteredRowByFishDescription.locator('.Button',{hasText:'Add to Cart'}).click();
    
    }

}

