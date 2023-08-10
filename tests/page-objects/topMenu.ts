import { Locator, Page } from "@playwright/test";

export class TopMenu{

  readonly page :Page;
  readonly menuCart:Locator;
  readonly menuSignOut :Locator;
  readonly menuMyAccount:Locator;
  readonly menuQuestions:Locator;
  
  

  constructor (page:Page){
    this.page =page;
    this.menuCart = page.locator('#MenuContent').getByRole('link').first();
    this.menuSignOut =page.getByRole('link', { name: 'Sign Out' });
    this.menuMyAccount =page.getByRole('link', { name: 'My Account' });
    this.menuQuestions =page.getByRole('link', { name: '?' });

  }


}
