import {test,expect} from '@playwright/test';
import { Navigate } from './page-objects/navigate';
import { SignIn } from './page-objects/sign-in';
import { TopMenu } from './page-objects/topMenu';
import Steps from "./steps";

let navigateHome;
let signInPage;
let topMenuItems; 
let steps;

test.beforeEach(async({page})=>{

    steps = new Steps(page)
    navigateHome = new Navigate(page);
    await navigateHome.navigateToHome();
    signInPage = new SignIn(page);
    topMenuItems = new TopMenu(page);
    
});

test('Should navigate to signing in page',async({page})=>{

    await navigateHome.signInLink.click();
    await expect(signInPage.signingInPageheaderText).toHaveText(/Please/);
    
});


test('Should successfully logged in',async({page})=>{
    await navigateHome.signInLink.click();
    await steps.login("j2ee","j2ee")
    await expect(topMenuItems.menuMyAccount).toBeVisible;
});