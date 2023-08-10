import {test , expect } from '@playwright/test';
import { SideBarMenu } from './page-objects/sideBarMenu';
import { Navigate } from './page-objects/navigate';
import { CategoryDogs } from './page-objects/category-dogs';

let navigateHome;
let sideBarMenu;
let categoryDogs; 


test.beforeEach(async({page})=>{

    navigateHome = new Navigate(page);
    await navigateHome.navigateToHome();
    sideBarMenu = new SideBarMenu(page);
    categoryDogs = new CategoryDogs(page);

});

test ('Should navigate to category Fish',async({page})=>{

   await sideBarMenu.sideBarMenuDogs.click();
   await expect(categoryDogs.dogCategoryTitle).toHaveText('Dogs');  

});

test('Should be able to browse different dog breeds ',async({page})=>{

    await sideBarMenu.sideBarMenuDogs.click();
    await expect(categoryDogs.dogCategoryTitle).toHaveText('Dogs');  

    await categoryDogs.viewDogBreeds('Bulldog');
    await expect(page.getByRole('heading', { name: 'Bulldog' })).toBeVisible();

    await categoryDogs.navigateBackToDogs.click();

    await categoryDogs.viewDogBreeds('Poodle');
    await expect(page.getByRole('heading', { name: 'Poodle' })).toBeVisible();

    await categoryDogs.navigateBackToDogs.click();

    await categoryDogs.viewDogBreeds('Dalmation');
    await expect(page.getByRole('heading', { name: 'Dalmation' })).toBeVisible();

    await categoryDogs.navigateBackToDogs.click();

    await categoryDogs.viewDogBreeds('Golden Retriever');
    await expect(page.getByRole('heading', { name: 'Golden Retriever' })).toBeVisible();

    await categoryDogs.navigateBackToDogs.click();

    await categoryDogs.viewDogBreeds('Labrador Retriever');
    await expect(page.getByRole('heading', { name: 'Labrador Retriever' })).toBeVisible();

    await categoryDogs.navigateBackToDogs.click();

    await categoryDogs.viewDogBreeds('Chihuahua');
    await expect(page.getByRole('heading', { name: 'Chihuahua' })).toBeVisible();

    await categoryDogs.navigateBackToDogs.click();
    await expect(categoryDogs.dogCategoryTitle).toHaveText('Dogs'); 


});


test('Should be able to return to home page from dogs catalog',async({page})=>{
    await sideBarMenu.sideBarMenuDogs.click();
    await expect(categoryDogs.dogCategoryTitle).toHaveText('Dogs'); 

    await categoryDogs.goToMainPage.click();
    await expect(navigateHome.mapImage).toBeVisible();

});


