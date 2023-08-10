import { Page,Locator } from "@playwright/test";

export class ShoppingCart{

    readonly page:Page;
    readonly headerTitle:Locator;
    readonly tableLocator :Locator;  
    readonly rowLocator: Locator;
    readonly updateCartButton :Locator;    
    productTotalCost: Locator | PromiseLike<Locator>;
    totalValOfShoppingCart : string;
    readonly returnToHomeFromShoppingCart :Locator;
    readonly proceedToCheckOut :Locator;
    readonly continueOnBilling :Locator; 
    readonly confirmOrder :Locator;
    readonly confirmMessage :Locator ; 
    

    constructor (page:Page){

        this.page = page;
        this.headerTitle = page.getByRole('heading', { name: 'Shopping Cart' });
        this.tableLocator = page.getByRole('table');  
        this.rowLocator = this.tableLocator.locator('tbody tr');
        this.updateCartButton =page.getByRole('button', { name: 'Update Cart' });
        this.returnToHomeFromShoppingCart = page.getByRole('link', { name: 'Return to Main Menu' });
        this.proceedToCheckOut = page.getByRole('link',{name:'Proceed to Checkout'});
        this.continueOnBilling = page.getByRole('button',{name:'Continue'});
        this.confirmOrder = page.getByRole('link', { name: 'Confirm' });
        this.confirmMessage=page.locator('.messages li');

    }

    async changeProductQuantityInCart(productName :string, quantity:string){
        let filteredRow = this.rowLocator.filter({ hasText: productName });
        await filteredRow.locator('td').getByRole('textbox').fill(quantity);  

    }

    async setTotalCostPerProduct(productName :string) {

        let rows =this.rowLocator;
        let rowcount = await rows.count();
        //let productTotalCost :Locator; 
        for (let i = 1; i < rowcount; i++) {
            let prodDesc = await rows.nth(i).getByRole("cell").nth(2).innerText();

            if(prodDesc==productName){                       
                this.productTotalCost = rows.nth(i).getByRole("cell").nth(6);            
                break;
           }          
        }             
    }

    async getTotalCostPerProduct():Promise<Locator> {
            
        return this.productTotalCost;

    }

    async getTotalValOfShoppingCart():Promise<string>{

        let rows =this.rowLocator;
        let rowcount = await rows.count();
        let strVal = await rows.nth(rowcount-1).getByRole("cell").nth(0).innerText();
        let strArry = strVal.split(':')
        this. totalValOfShoppingCart = strArry[1].trim();
        return this.totalValOfShoppingCart;
        
    }




}