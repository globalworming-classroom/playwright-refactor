import {expect, test} from '@playwright/test';
import {SideBarMenu} from './page-objects/sideBarMenu';
import {Navigate} from './page-objects/navigate';
import {CategoryFish} from './page-objects/category-fish';
import {ShoppingCart} from './page-objects/shopping-cart';
import {CategoryDogs} from './page-objects/category-dogs';
import {SignIn} from './page-objects/sign-in';
import {TopMenu} from './page-objects/topMenu';
import Steps from "./steps";


let navigateHome;
let sideBarMenu;
let categoryFish; 
let shoppingCart;
let categoryDogs;
let signIn; 
let topMenu;
let steps;


test.beforeEach(async({page})=>{
    steps = new Steps(page);

    navigateHome = new Navigate(page);
    await navigateHome.navigateToHome();
    sideBarMenu = new SideBarMenu(page);
    categoryFish = new CategoryFish(page);
    categoryDogs = new CategoryDogs(page)
    shoppingCart = new ShoppingCart(page);
    signIn = new SignIn(page);
    topMenu = new TopMenu(page);

});

async function checkoutTillOrderConfirmation() {
    await topMenu.menuCart.click();

    await shoppingCart.proceedToCheckOut.click();

    // payment details page and click continue
    await shoppingCart.continueOnBilling.click();

    //confirm the order
    await shoppingCart.confirmOrder.click();
}

test.only('Should be able to order multiple pets withouth login into the account',async({page})=>{
    await test.step("order 3", async () => {
        await steps.orderFish('Goldfish', 'Adult Male Goldfish', '3');
        await shoppingCart.returnToHomeFromShoppingCart.click();
        await steps.orderFish('Koi', 'Spotted Koi', '2');
        await shoppingCart.returnToHomeFromShoppingCart.click();
        await steps.orderDog('Golden Retriever', 'Adult Female Golden Retriever');
        await shoppingCart.proceedToCheckOut.click();
    })

    //login into the account
    await steps.login('j2ee', 'j2ee');

    //user is navigated to home page
    // Go back to the cart
    // TODO move to steps
    await checkoutTillOrderConfirmation();

    await expect(shoppingCart.confirmMessage).toHaveText(/Thank you/);

});


test('Shoulld be able to order single pet',async({page})=>{
    await sideBarMenu.sideBarMenuDogs.click();
    await categoryDogs.viewDogBreeds('Golden Retriever');
    await categoryDogs.addDogToShoppingCart('Adult Female Golden Retriever');
    await shoppingCart.proceedToCheckOut.click();

    //login into the account
    await signIn.logIntoAccount('j2ee','j2ee');

    //user is navigated to home page
    // Go back to the cart 
    await topMenu.menuCart.click();

    await shoppingCart.proceedToCheckOut.click();

    // payment details page and click continue 
    await shoppingCart.continueOnBilling.click();

    //confirm the order
    await shoppingCart.confirmOrder.click();

    let confirmationMessage = await shoppingCart.confirmMessage.innerText();
    //console.log('text ?? ' + confirmationMessage);

     await expect(shoppingCart.confirmMessage).toContainText('Thank you')
});