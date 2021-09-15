import {browser} from "protractor";
import {HomePage} from "../pages/HomePage";
import {OnlineShoppingPage} from "../pages/OnlineShoppingPage";
import {ProductsPage} from "../pages/ProductsPage";
import {MyCartPage} from "../pages/MyCartPage";
// @ts-ignore
import * as categoryData from "../data/categoryData.json";

describe('Test Requirement 1 - Navigate through categories with DDT, add one product to cart per category, validate cart, empty whole cart and validate empty cart', () => {

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

    let sum = 0;
    categoryData.forEach((item) => {
        it('should navigate to a sub category', async () => {
            await onlineShoppingPage.clickAllCategoriesButton();
            await onlineShoppingPage.clickCategory(item.categoryName);
            await onlineShoppingPage.clickSubCategory();
            let currentUrl = await browser.getCurrentUrl();
            expect(currentUrl).toContain(item.categoryPath);
        });

        it('should add product to cart and remember its price', async () => {
            let price = await productsPage.getPriceOfProductByIndex(item.productNumber);
            await productsPage.clickAddToCartButtonOfProductByIndex(item.productNumber);
            sum += price;
            expect(sum).toBeGreaterThan(0);
        });
    })

    it('should go to card and check if price is consistent', async () => {
        await productsPage.clickGoToCartButton();
        browser.sleep(2000);
        let priceWithoutDelivery: number = await myCartPage.getTotalPriceWithoutDelivery();
        expect(sum).toEqual(priceWithoutDelivery);
    });

    it('should empty cart', async () => {
        await myCartPage.emptyCart()
        await myCartPage.agreeEmptyCart();
        let assertion = await myCartPage.validateCartIsEmpty();
        expect(assertion).toContain("PRAZNA");
    });

    it('should close browser', async () => {
        browser.close();
    });
});