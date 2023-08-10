import {test , expect } from '@playwright/test';
import { SideBarMenu } from './page-objects/sideBarMenu';
import { Navigate } from './page-objects/navigate';
import { CategoryFish } from './page-objects/category-fish';
import { ShoppingCart } from './page-objects/shopping-cart';


let navigateHome;
let sideBarMenu;
let categoryFish; 
let shoppingCart;


test.beforeEach(async({page})=>{

    navigateHome = new Navigate(page);
    await navigateHome.navigateToHome();
    sideBarMenu = new SideBarMenu(page);
    categoryFish = new CategoryFish(page);
    shoppingCart = new ShoppingCart(page);

});

test ('Should navigate to category Fish',async({page})=>{

   await sideBarMenu.sideBarMenuFish.click();
   await expect(categoryFish.fishCategoryTitle).toHaveText('Fish');  


});

test('Should be able to view fish types',async({page})=>{

    await sideBarMenu.sideBarMenuFish.click();
    await expect(categoryFish.fishCategoryTitle).toHaveText('Fish'); 

    await categoryFish.viewFishTypes('Koi');
    await expect(page.getByRole('heading', { name: 'Koi' })).toBeVisible();

    await categoryFish.navigateBackToFish.click();

    await categoryFish.viewFishTypes('Tiger Shark');
    await expect(page.getByRole('heading', { name: 'Tiger Shark' })).toBeVisible();

    await categoryFish.navigateBackToFish.click();

    await categoryFish.viewFishTypes('Angelfish');
    await expect(page.getByRole('heading', { name: 'Angelfish' })).toBeVisible();

    await categoryFish.navigateBackToFish.click();

    await categoryFish.viewFishTypes('Goldfish');
    await expect(page.getByRole('heading', { name: 'Goldfish' })).toBeVisible();

    await categoryFish.navigateBackToFish.click();
    await expect(categoryFish.fishCategoryTitle).toHaveText('Fish'); 


});

test('Should be able to return to home page from fish catalog',async({page})=>{
    await sideBarMenu.sideBarMenuFish.click();
    await expect(categoryFish.fishCategoryTitle).toHaveText('Fish'); 

    await categoryFish.goToMainPage.click();
    await expect(navigateHome.mapImage).toBeVisible();

});

test ('Should be able to add fish into the shopping cart and change quantity',async({page})=>{

    await sideBarMenu.sideBarMenuFish.click();
    await expect(categoryFish.fishCategoryTitle).toHaveText('Fish');

    await categoryFish.viewFishTypes('Goldfish');
    await expect(page.getByRole('heading', { name: 'Goldfish' })).toBeVisible();

    await categoryFish.addFishToShoppingCart('Adult Male Goldfish');
    await expect(shoppingCart.headerTitle).toHaveText('Shopping Cart');

    await shoppingCart.changeProductQuantityInCart('Adult Male Goldfish','2');
    await shoppingCart.updateCartButton.click();
     
    await shoppingCart.setTotalCostPerProduct('Adult Male Goldfish');
    
    let totalCostPerProductLocator = await shoppingCart.getTotalCostPerProduct();
    let totalCostPerProduct = await totalCostPerProductLocator.innerText();

    await expect(totalCostPerProduct).toEqual("$11.00");
    
});


