import {BasePageObject} from "./BasePageObject";
import {browser, by, element, ElementArrayFinder, ElementFinder} from "protractor";

export class ProductsPage extends BasePageObject {
    private _products: ElementArrayFinder = element.all(by.className("js-productBox"));
    private nextPageLocator = element(by.className("numPage__next"));
    private filterOption = element(by.xpath("//*[@id=\"content\"]/div[2]/div[2]/div[2]/div[1]/div[1]/div[4]/div/a"));

    get products(): ElementArrayFinder {
        return this._products;
    }

    public async getProductByIndex(index: number): Promise<ElementFinder> {
        return this._products.get(index);
    }

    public async getPriceOfProductByIndex(index: number): Promise<number> {
        const productByIndex: ElementFinder = await this.getProductByIndex(index);
        browser.sleep(3000);
        let euro = await productByIndex.element(by.className("spar-productBox__price--priceInteger")).getText();
        let cents = await productByIndex.element(by.className("spar-productBox__price--priceDecimal")).getText();
        return Number(euro + "." + cents);
    }

    public async getPriceOfProductOnActionByIndex(index: number): Promise<number> {
        const productByIndex: ElementFinder = await this.getProductByIndex(index);
        browser.sleep(3000);
        let priceOnAction = await productByIndex.element(by.className("spar-productBox__price--insteadOfPrice")).getText();
        return Number(priceOnAction.replace("Namesto: ", "").replace(",",".").replace(" €",""));
    }

    public async getNameOfProductByIndex(index: number): Promise<string> {
        const productByIndex: ElementFinder = await this.getProductByIndex(index);
        browser.sleep(3000);
        return productByIndex.element(by.className("spar-productBox__title--main")).getText();
    }

    public async clickAddToCartButtonOfProductByIndex(index: number): Promise<void> {
        const productByIndex: ElementFinder = await this.getProductByIndex(index);
        await this.waitForElementToBeClickableAndClick(productByIndex.element(by.className("spar-productBox__addToCart__btn")));
    }

    public async clickIncreaseQuantityButtonOfProductByIndex(index: number): Promise<void> {
        const productByIndex: ElementFinder = await this.getProductByIndex(index);
        browser.sleep(2000);
        await this.waitForElementToBeClickableAndClick(productByIndex.element(by.className("productPlusQty")));
    }

    public async clickGoToCartButton(): Promise<void> {
        await this.waitForElementToBeClickableAndClick(element(by.className("ico-shopping_cart")));
    }

    public async nextPage(): Promise<void> {
        browser.sleep(2000);
        await this.waitForElementToBeClickableAndClick(this.nextPageLocator);
    }

    public async getFilterOption(): Promise<string> {
        browser.sleep(3000);
        return this.filterOption.getText();
    }
}