import { Locator, Page } from "@playwright/test";

export class SignIn{

  readonly page :Page;
  readonly signingInPageheaderText : Locator;
  readonly username;
  readonly password ;
  

  constructor (page:Page){
    this.page =page;
    this.signingInPageheaderText = page.getByText('Please enter your username and password.');
    this.username =page.locator('input[name="username"]');
    this.password =page.locator('input[name="password"]');
  }

  async logIntoAccount( username :string ,password:string){
    await this.username.fill(username);
    await this.password.clear();
    await this.password.fill(password);
    await this.password.press('Enter');

  }
  

}
