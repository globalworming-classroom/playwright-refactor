import { Locator, Page } from "@playwright/test";

export class Navigate{

  readonly page :Page;
  readonly signInLink:Locator;
  readonly mapImage :Locator;
  

  constructor (page:Page){
    this.page =page;
    this.signInLink = page.getByRole('link', { name: 'Sign In' });   
    this.mapImage = page.locator('#MainImageContent').getByRole('img');

  }

  async navigateToHome(){

    await this.page.goto('https://petstore.octoperf.com/actions/Catalog.action');
  }


}
