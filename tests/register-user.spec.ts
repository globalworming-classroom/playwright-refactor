import {test,expect} from '@playwright/test';
import { Navigate } from './page-objects/navigate';
import { SignIn } from './page-objects/sign-in';


let navigateHome;
let signInPage;

test.beforeEach(async({page})=>{

    navigateHome = new Navigate(page);
    await navigateHome.navigateToHome();
    signInPage = new SignIn(page);
});

test('Should navigate to signing in page',async({page})=>{

    await navigateHome.signInLink.click();
    await expect(signInPage.signingInPageheaderText).toHaveText(/Please/);

});

test('Should navigate to the registration page',async({page})=>{

    let registrationPageHeaderText;
    let signingInPageheaderText;

    await page.getByRole('link', { name: 'Sign In' }).click();

    await expect(signInPage.signingInPageheaderText).toHaveText(/Please/);

    await page.getByRole('link', { name: 'Register Now!' }).click();
    registrationPageHeaderText = page.getByRole('heading', { name: 'User Information' });

    await expect(registrationPageHeaderText).toHaveText(/User/);
});
