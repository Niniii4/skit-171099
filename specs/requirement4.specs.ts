import {HomePage} from "../pages/HomePage";
import {OnlineShoppingPage} from "../pages/OnlineShoppingPage";
import {ProductsPage} from "../pages/ProductsPage";
import {MyCartPage} from "../pages/MyCartPage";
import {browser} from "protractor";

describe('Test Requirement 4 - Add one product per subcategory for a certain category, validate cart and go to checkout', () => {

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
    for (let i = 3; i < 5; i++) {
        it('should navigate to a sub category', async () => {
            browser.sleep(2000);
            await onlineShoppingPage.clickAllCategoriesButton();
            await onlineShoppingPage.clickCategory("PIJAČE");
            await onlineShoppingPage.clickSubCategoryById(i);
            await onlineShoppingPage.clickThirdLevelSubCategory();
            let currentUrl = await browser.getCurrentUrl();
            expect(currentUrl).toContain("pijace");
        });

        it('should add product to cart and remember its price', async () => {
            let price = await productsPage.getPriceOfProductByIndex(i - 1);
            browser.sleep(2000);
            await productsPage.clickAddToCartButtonOfProductByIndex(i - 1);
            sum += price;
            expect(sum).toBeGreaterThan(0);
        });
    }

    it('should go to card and check if price is consistent', async () => {
        await productsPage.clickGoToCartButton();
        browser.sleep(2000);
        let priceWithoutDelivery: number = await myCartPage.getTotalPriceWithoutDelivery();
        expect(sum).toEqual(priceWithoutDelivery);
    });

    it('should go to checkout', async () => {
        await myCartPage.goToCheckout();
        let currentUrl = await browser.getCurrentUrl();
        expect(currentUrl).toContain("checkout");
    });

    it('should close browser', async () => {
        browser.close();
    });
});