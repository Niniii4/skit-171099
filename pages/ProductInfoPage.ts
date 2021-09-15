import {BasePageObject} from "./BasePageObject";
import {by, element} from "protractor";

export class ProductInfoPage extends BasePageObject {
    private productDetailsName = element(by.className("productDetailsName"));
    private productPrice = element(by.className("productDetailsPrice"));

    public async getProductName(): Promise<string> {
        return this.productDetailsName.getText();
    }

    public async getProductPrice(): Promise<number> {
        let price = await this.productPrice.getText();
        return Number(price.replace(' €', '').replace(",", "."))
    }
}