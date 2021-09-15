import {BasePageObject} from "./BasePageObject";
import {browser, by, element, ElementArrayFinder, ElementFinder} from "protractor";

export class MyCartPage extends BasePageObject {
    private priceWithoutDelivery = element(by.xpath("//*[@id=\"cartLayer\"]/div/div[3]/div[1]/div[1]/div/ul[1]/li[1]/span"));
    private priceWithDelivery = element(by.xpath("//*[@id=\"cartLayer\"]/div/div[3]/div[1]/div[1]/div/ul[1]/li[4]/span"));
    private priceWithAction = element(by.xpath("//*[@id=\"cartLayer\"]/div/div[3]/div[1]/div[1]/div/ul[1]/li[7]/span"));
    private emptyCartButton = element(by.cssContainingText(".emptyCartStep1", "Počistite košarico"));
    private acceptEmptyCart = element(by.xpath("/html/body/div[7]/div[3]/div/div[1]/div[3]/div/div[2]/div[1]/div[3]/div/div/div/span[1]"));
    private alertEmptyCart = element(by.cssContainingText(".emptyCart", "Vaša košarica je prazna"));
    private _productsInCart: ElementArrayFinder = element.all(by.className("cartEntry"));
    private cartEntryProductName = element(by.className("cartEntryProductName"));

    public async getTotalPriceWithoutDelivery(): Promise<number> {
        let price = await this.priceWithoutDelivery.getText();
        return Number(price.replace(' €', '').replace(",", "."));
    }

    public async getTotalPriceWithDelivery(): Promise<number> {
        let price = await this.priceWithDelivery.getText();
        return Number(price.replace(' €', '').replace(",", "."));
    }

    public async getTotalPriceWithAction(): Promise<number> {
        let price = await this.priceWithAction.getText();
        return Number(price.replace(' €', '').replace(",", ".").replace("-", ""));
    }

    public async emptyCart(): Promise<void> {
        browser.sleep(2000);
        await this.waitForElementToBeClickableAndClick(this.emptyCartButton);
    }

    public async agreeEmptyCart(): Promise<void> {
        browser.sleep(2000);
        await this.waitForElementToBeClickableAndClick(this.acceptEmptyCart);
    }

    public async validateCartIsEmpty(): Promise<string> {
        browser.sleep(2000);
        return this.alertEmptyCart.getText();
    }

    get productsInCart(): ElementArrayFinder {
        return this._productsInCart;
    }

    public async getProductInCartByIndex(index: number): Promise<ElementFinder> {
        return this._productsInCart.get(index);
    }

    public async clickDeleteProductFromCartByIndex(index: number): Promise<void> {
        const productByIndex: ElementFinder = await this.getProductInCartByIndex(index);
        browser.sleep(8000);
        await this.waitForElementToBeClickableAndClick(productByIndex.element(by.className("cartEntryRemoveIco")));
    }

    public async continueShopping(): Promise<void> {
        browser.sleep(3000);
        await this.waitForElementToBeClickableAndClick(element(by.xpath("//*[@id=\"cartLayer\"]/div/div[3]/div[1]/a")));
    }

    public async goToCheckout(): Promise<void> {
        browser.sleep(2000);
        await this.waitForElementToBeClickableAndClick(element(by.xpath("/html/body/div[7]/div[3]/div/div[1]/div[3]/div/div[3]/div[1]/button")));
    }

    public async seeProductInfo(): Promise<void> {
        await this.waitForElementToBeClickableAndClick(this.cartEntryProductName);
    }
}