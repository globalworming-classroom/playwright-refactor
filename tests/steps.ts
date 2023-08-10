import {SideBarMenu} from "./page-objects/sideBarMenu";
import {CategoryFish} from "./page-objects/category-fish";
import {CategoryDogs} from "./page-objects/category-dogs";
import {ShoppingCart} from "./page-objects/shopping-cart";
import {SignIn} from "./page-objects/sign-in";
import {TopMenu} from "./page-objects/topMenu";
import {test} from "@playwright/test";

class Navigation {
    goToHomepage = () => {}
}

class OrderItem {
    //...
}


class Steps {

    navigateHome;
    sideBarMenu;
    categoryFish;
    shoppingCart;
    categoryDogs;
    signIn;
    topMenu;

    constructor(page) {
        this.sideBarMenu = new SideBarMenu(page);
        this.categoryFish = new CategoryFish(page);
        this.categoryDogs = new CategoryDogs(page)
        this.shoppingCart = new ShoppingCart(page);
        this.signIn = new SignIn(page);
        this.topMenu = new TopMenu(page);
    }

    orderFish = async (fishType: string, fishDesc: string, quantity: string) => {
        await test.step("order goldfish", async () => {
            await this.sideBarMenu.sideBarMenuFish.click();
            await this.categoryFish.viewFishTypes(fishType);
            await this.categoryFish.addFishToShoppingCart(fishDesc);
            await this.shoppingCart.changeProductQuantityInCart(fishDesc, quantity);
            await this.shoppingCart.updateCartButton.click();
        })
    }

    orderDog = async (dogBreed: string, dogBreed1: string) => {
        await this.sideBarMenu.sideBarMenuDogs.click();
        await this.categoryDogs.viewDogBreeds(dogBreed);
        await this.categoryDogs.addDogToShoppingCart(dogBreed1);
        await this.shoppingCart.updateCartButton.click();
    }

    login = async (username: string, password: string) => {
        await this.signIn.logIntoAccount(username, password);
    }
}

export default Steps
