import {HomePage} from "../pages/HomePage";
import {OnlineShoppingPage} from "../pages/OnlineShoppingPage";
import {ProductsPage} from "../pages/ProductsPage";
import {MyCartPage} from "../pages/MyCartPage";
import {browser} from "protractor";
// @ts-ignore
import * as productData from "../data/productData.json";

describe('Test Requirement 2 - Navigate into a category, add several products with DDT with pagination validate cart and remove several products from cart', () => {

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
        await onlineShoppingPage.clickCategory("VSE ZA ZAJTRK, MALICO ALI KOSILO");
        await onlineShoppingPage.clickSubCategory();
        let currentUrl = await browser.getCurrentUrl();
        expect(currentUrl).toContain("vse-za-zajtrk-malico-ali-kosilo");
    });

    let sum = 0;
    productData.forEach((item) => {
        it('should add product to cart and remember its price', async () => {
            sum += await selectProduct(item.prod1);
            sum += await selectProduct(item.prod2);
            sum += await selectProduct(item.prod3);
            browser.sleep(2000);
            await productsPage.nextPage();
            expect(sum).toBeGreaterThan(0);
        });
    });

    it('should go to card and check if price is consistent with delivery price', async () => {
        await productsPage.clickGoToCartButton();
        browser.sleep(2000);
        let priceWithDelivery: number = await myCartPage.getTotalPriceWithDelivery();
        sum += 3.50;
        expect(sum).toEqual(priceWithDelivery);
    });

    it('should remove several products from card', async () => {
        await myCartPage.clickDeleteProductFromCartByIndex(0);
        await myCartPage.clickDeleteProductFromCartByIndex(7);
        browser.sleep(2000);
        let priceWithDelivery: number = await myCartPage.getTotalPriceWithDelivery();
        expect(priceWithDelivery).toBeLessThan(sum);
    });

    it('should close browser', async () => {
        browser.close();
    });

    async function selectProduct(prod): Promise<number> {
        browser.sleep(3000);
        let sumProduct = 0;
        let price = await productsPage.getPriceOfProductByIndex(prod);
        await productsPage.clickAddToCartButtonOfProductByIndex(prod);
        sumProduct += price;
        return sumProduct;
    }
});
