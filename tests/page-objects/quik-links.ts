import { Page } from "@playwright/test";

export class QuikLinks{

readonly page:Page ;
readonly quickLinkOptionFish;
readonly quickLinkOptionDogs;
readonly quickLinkOptionCats;
readonly quickLinkOptionReptiles;
readonly quickLinkOptionBirds;
    

    constructor(page:Page){
        this.page = page;
        this.quickLinkOptionFish =page.locator('#QuickLinks').getByRole('link').first();
        this.quickLinkOptionDogs =page.locator('#QuickLinks').getByRole('link').nth(1);
        this.quickLinkOptionReptiles = page.locator('#QuickLinks').getByRole('link').nth(2);
        this.quickLinkOptionCats =page.locator('#QuickLinks').getByRole('link').nth(3);
        this.quickLinkOptionBirds =page.locator('#QuickLinks').getByRole('link').nth(4);


    }
}