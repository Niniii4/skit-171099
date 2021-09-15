import {HomePage} from "../pages/HomePage";
import {OnlineShoppingPage} from "../pages/OnlineShoppingPage";
import {ProductsPage} from "../pages/ProductsPage";
import {MyCartPage} from "../pages/MyCartPage";
import {browser} from "protractor";
import {ProductInfoPage} from "../pages/ProductInfoPage";

describe('Test Requirement 5 - Add same item multiple times, validate cart, click on the item in the cart to see info and validate item', () => {

    let homePage: HomePage = new HomePage();
    let onlineShoppingPage: OnlineShoppingPage = new OnlineShoppingPage();
    let productsPage: ProductsPage = new ProductsPage();
    let myCartPage: MyCartPage = new MyCartPage();
    let productInfoPage: ProductInfoPage = new ProductInfoPage();

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

    it('should navigate to a sub category', async () => {
        await onlineShoppingPage.clickAllCategoriesButton();
        await onlineShoppingPage.clickCategory("KRUH, PECIVO IN SLAŠČICE");
        await onlineShoppingPage.clickSubCategory();
        let currentUrl = await browser.getCurrentUrl();
        expect(currentUrl).toContain("kruh-pecivo-in-slascice");
    })

    let sum = 0;
    let productName = null;
    let productPrice = 0;
    it('should add same item multiple times', async () => {
        productName = await productsPage.getNameOfProductByIndex(14);
        productPrice = await productsPage.getPriceOfProductByIndex(14);
        for (let i = 0; i < 7; i++) {
            await productsPage.clickAddToCartButtonOfProductByIndex(14);
        }
        sum += 7 * productPrice;
        expect(sum).toBeGreaterThan(0);
    })

    it('should go to card and check if price is consistent', async () => {
        await productsPage.clickGoToCartButton();
        browser.sleep(2000);
        let priceWithoutDelivery: number = await myCartPage.getTotalPriceWithoutDelivery();
        expect(sum).toEqual(priceWithoutDelivery);
    })

    it('should see product info in cart and validate product', async () => {
        await myCartPage.seeProductInfo();
        let productInfoName = await productInfoPage.getProductName();
        let productInfoPrice = await productInfoPage.getProductPrice();
        expect(productName).toEqual(productInfoName);
        expect(productPrice).toEqual(productInfoPrice);
    })

    it('should close browser', async () => {
        browser.close();
    });
});