import {HomePage} from "../pages/HomePage";
import {OnlineShoppingPage} from "../pages/OnlineShoppingPage";
import {ProductsPage} from "../pages/ProductsPage";
import {MyCartPage} from "../pages/MyCartPage";
import {browser} from "protractor";

describe('Test Requirement 3 - Go to a category, increase the quantity of product items and add item to cart, validate cart and keep shopping', () => {

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

    it('should navigate to a category', async () => {
        await onlineShoppingPage.clickAllCategoriesButton();
        await onlineShoppingPage.clickCategory("BIO IN DRUGA POSEBNA HRANA");
        await onlineShoppingPage.clickSubCategory();
        let currentUrl = await browser.getCurrentUrl();
        expect(currentUrl).toContain("bio-in-druga-posebna-hrana");
        browser.driver.sleep(2000);
    });

    let sum = 0;
    it('should increase quantity and add item from second page to cart', async () => {
        await productsPage.nextPage();
        for (let i = 0; i < 5; i++) {
            await productsPage.clickIncreaseQuantityButtonOfProductByIndex(11);
        }
        let price = await productsPage.getPriceOfProductByIndex(11);
        await productsPage.clickAddToCartButtonOfProductByIndex(11);
        sum += 6*price;
        expect(sum).toBeGreaterThan(0);
    });

    it('should go to card and check if price is consistent', async () => {
        await productsPage.clickGoToCartButton();
        browser.sleep(2000);
        let priceWithoutDelivery: number = await myCartPage.getTotalPriceWithoutDelivery();
        expect(sum).toEqual(priceWithoutDelivery);
    });

    it('should keep shopping', async () => {
        await myCartPage.continueShopping();
        let currentUrl = await browser.getCurrentUrl();
        expect(currentUrl).not.toContain("cart");
    });

    it('should close browser', async () => {
        browser.close();
    });
});