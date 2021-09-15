import {HomePage} from "../pages/HomePage";
import {OnlineShoppingPage} from "../pages/OnlineShoppingPage";
import {ProductsPage} from "../pages/ProductsPage";
import {MyCartPage} from "../pages/MyCartPage";
import {browser} from "protractor";

describe('Test Requirement 6 - Navigate to a category from Products in action, add several items in cart with pagination, validate cart with computing total price with vs without discounts', () => {

    let homePage: HomePage = new HomePage();
    let onlineShoppingPage: OnlineShoppingPage = new OnlineShoppingPage();
    let productsPage: ProductsPage = new ProductsPage();
    let myCartPage: MyCartPage = new MyCartPage();

    it('should to Spar online shopping', async () => {
        await browser.get('https://www.spar.si/online/welcome/');
        let currentUrl = await browser.getCurrentUrl();
        expect(currentUrl).toContain('online');
    });

    it('should skip type of payment', async () => {
        await homePage.clickAcceptCookies();
        await homePage.clickSkip();
        let currentUrl = await browser.getCurrentUrl();
        expect(currentUrl).toContain('spar');
    });

    it('should click products in action and choose category', async () => {
        await onlineShoppingPage.clickProductsInAction();
        await onlineShoppingPage.clickSubCategoryInAction("DOM IN GOSPODINJSTVO");
        let appliedFilter: string = await productsPage.getFilterOption();
        expect(appliedFilter).toContain('Izdelki v promociji');
    });

    let actualSum = 0;
    let actionSum = 0;
    it('should add several items on action in cart with pagination', async () => {
        for (let i = 0; i < 5; i++) {
            let priceOnAction = await productsPage.getPriceOfProductOnActionByIndex(i + 1);
            let price = await productsPage.getPriceOfProductByIndex(i + 1);
            await productsPage.clickAddToCartButtonOfProductByIndex(i + 1);
            actualSum += price;
            actionSum += priceOnAction;
            browser.sleep(2000);
            await productsPage.nextPage();
            expect(actionSum).toBeGreaterThan(actualSum);
        }
        console.log(actualSum, actionSum);
    });

    it('should go to card and check if price is consistent having in mind actual and action price', async () => {
        await productsPage.clickGoToCartButton();
        browser.sleep(2000);
        let priceWithoutDelivery: number = await myCartPage.getTotalPriceWithoutDelivery();
        let priceWithAction: number = await myCartPage.getTotalPriceWithAction();
        expect(actualSum).toEqual(priceWithoutDelivery - priceWithAction);
        expect(actionSum).toEqual(priceWithoutDelivery);
    });

    it('should close browser', async () => {
        browser.close();
    });
});