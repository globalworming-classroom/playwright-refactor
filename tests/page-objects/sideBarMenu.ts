import { Page,Locator } from "@playwright/test";

export class SideBarMenu{

    readonly page:Page;
    readonly sideBarMenuFish;
    readonly sideBarMenuDogs;
    readonly sideBarMenuCats;
    readonly sideBarMenuReptiles;
    readonly sideBarMenuBirds;
    

constructor(page:Page){
    this.page = page;
    this.sideBarMenuFish =page.locator('#SidebarContent').getByRole('link').first();
    this.sideBarMenuDogs =page.locator('#SidebarContent').getByRole('link').nth(1);
    this.sideBarMenuCats =page.locator('#SidebarContent').getByRole('link').nth(2);
    this.sideBarMenuReptiles = page.locator('#SidebarContent').getByRole('link').nth(3);
    this.sideBarMenuBirds =page.locator('#SidebarContent').getByRole('link').nth(4);

}

}